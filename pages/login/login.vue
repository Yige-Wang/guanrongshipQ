<template>

	<view class="img" style="width: 100%;height: 100%;opacity: 0.4;z-index: -1;">
		<form v-model="form">
			<view class="u-input">
				<view class="username">
					<view class="title">账户</view>
					<input class="uni-input" placeholder="输入用户名" v-model="form.username" />
				</view>
				<view class="password">
					<view class="title">密码</view>
					<input class="uni-input" password type="text" placeholder="输入密码" v-model="form.password" />
				</view>
				<view class="submit">
					<fui-button class='loginButoon' @click="loginSubmit" radius="96rpx">登录</fui-button>
					<fui-button class='zhiwen' @click="startSoterAuthenticationFingerPrint" radius="96rpx">指纹认证
					</fui-button>
				</view>
			</view>

		</form>
	</view>
</template>

<script>
	import {
		login
	} from '@/util/api.js'
	export default {
		data() {
			return {
				form: {
					username: "",
					password: ""
				},
				code: '',
				success: false,
				message: '',
				data: ''

			}
		},
		methods: {
			async loginSubmit() {
				const {
					code,
					data,
					success,
					message
				} = await login(this.form)
				if (code === 0 && success === true) {
					uni.showToast({
						title: '登录成功',
						duration: 2000,
						icon: 'success'
					})
					uni.reLaunch({
						url: "../index/index",
					})
				} else {
					uni.showToast({
						icon: '用户名或密码错误',
						title: message,
						duration: 2000
					});
				}
			},
			startSoterAuthenticationFingerPrint() {
				var that = this
				uni.startSoterAuthentication({
					requestAuthModes: ['fingerPrint'],
					authContent: '请用指纹解锁',
					complete(res) {
						if (res.errCode === 0) {
							uni.showToast({
								duration: 2000,
								title: '正在进入页面',
								icon: 'success'
							})
							that.form.username = 'daowei'
							that.form.password = 'daowei'
							that.loginSubmit()
						} else if (res.errCode === 90001) {
							uni.showToast({
								duration: 2000,
								title: '当前设备不支持指纹',
								icon: 'error'
							})
						}else if (res.errCode === 90002) {
							uni.showToast({
								duration: 2000,
								title: '未授权',
								icon: 'error'
							})
						} else if (res.errCode === 90003) {
							uni.showToast({
								duration: 2000,
								title: '不支持指纹解锁',
								icon: 'error'
							})
						} else if (res.errCode === 90007) {
							uni.showToast({
								duration: 2000,
								title: '内部错误',
								icon: 'error'
							})
						} else if (res.errCode === 90009) {
							uni.showToast({
								duration: 2000,
								title: '识别失败',
								icon: 'error'
							})
						} else if (res.errCode === 90010) {
							uni.showToast({
								duration: 2000,
								title: '失败次数过多',
								icon: 'error'
							})
						} else if (res.errCode === 90011) {
							uni.showToast({
								duration: 2000,
								title: '用户未录入所选识别方式',
								icon: 'error'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.u-input {
		margin-top: 60%;
		margin-left: 15%;
	}

	.username {
		width: 80%;
		border-bottom: 2px solid #eee;
	}

	.password {
		width: 80%;
		margin-top: 5%;
		border-bottom: 2px solid #eee;
	}

	.submit {
		margin-top: 8%;
		width: 70%;
		margin-left: 6.5%;
	}

	.img {
		overflow: hidden;
		background-image: url(../../static/login.jpg);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
	}

	.title {
		font-size: ;
	}

	.zhiwen {
		margin-top: 5%;
	}
</style>
