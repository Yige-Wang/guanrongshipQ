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
					<fui-button @click="loginSubmit" radius="96rpx">登录</fui-button>
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
						icon:'success'
					})
					uni.reLaunch({
						url:"../index/index",
						})
				} else {
					uni.showToast({
						icon : '用户名或密码错误',
						title: message,
						duration: 2000
					});
				}
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
</style>
