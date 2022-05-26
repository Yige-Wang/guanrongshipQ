<template>
	<page-meta>
		<navigation-bar title="船员基本信息修改" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn"
			title-align="center" />
	</page-meta>
	<view class="all">
		<view class="u-input">
			<view class="username">
				<view class="title">船员名称</view>
				<input class="uni-input" v-model="form.crewName" />
			</view>
			<view class="text">职务类型</view>
			<uni-data-select :clear="true" v-model="form.postType" :localdata="postType"></uni-data-select>
			<view class="text">在职船舶</view>
			<uni-data-select :clear="true" v-model="form.shipId" :localdata="ships"></uni-data-select>
			<view class="username">
				<view class="title">任职时间</view>
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="form.tenure" />
				</view>
			</view>
			<view class="username">
				<view class="title">备注</view>
				<input class="uni-input" v-model="form.note" />
			</view>
			<view class="button-hover">
				<button type="primary" size="default" @click="crewAdd1" plain="true">新增</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		crewFindById,
		shipBasicInformationAll,
		crewAdd
	} from '@/util/api.js'
	export default {
		data() {
			return {
				form: {
					id:null,
					crewName: '',
					postType: null,
					tenure: '',
					note: '',
					shipId: null
				},
				postType: [{
						value: 1,
						text: '船长'
					},
					{
						value: 2,
						text: '大副'
					},
					{
						value: 3,
						text: '水手'
					}
				],
				ships: [],
				id: null
			}
		},
		methods: {
			async shipBasicInformationAll1() {
				const {
					data,
					code,
					message,
					success
				} = await shipBasicInformationAll()
				if (success === true) {
					for (var i = 0; i < data.length; i++) {
						const shipSelector = {}
						shipSelector.value = data[i].id
						shipSelector.text = data[i].shipName
						this.ships.push(shipSelector)
					}
				} else {
					uni.showToast({
						icon: 'error',
						duration: 2000,
						title: '联系开发人员'
					})
				}
			},
			async crewAdd1(){
				const {code,data,message,success} = await crewAdd(this.form)
				if(success===true){
					uni.showToast({
						title: '添加成功',
						icon: success,
						departureTime: 2000
					})
					uni.switchTab({
						url: '/pages/crew/crew'
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'联系开发人员处理',
						duration:2000
					})
				}
			}
		},
		onShow: function() {
			this.shipBasicInformationAll1()
		}
	}
</script>

<style>
	.username {
		width: 100%;
		border-bottom: 2px solid #eee;
		margin-top: 3%;
	}

	.password {
		width: 100%;
		margin-top: 5%;
		border-bottom: 2px solid #eee;
	}

	.title {
		font-size: 18px;
		font-weight: bolder;
		color: #e59ea5;
	}

	.uni-input {
		margin-top: 2%;
	}

	.button-hover {
		margin: auto;
		width: 60%;
		margin-top: 4%;
	}

	.selector {
		margin-right: 0%;
		width: 340px;
	}

	.text {
		font-size: 18px;
		font-weight: bolder;
		color: #e59ea5;
		margin-top: 3%;
	}

	::v-deep .uni-select__input-text {
		width: 350px;
		color: #333;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		border: none;
	}

	.example-body {
		margin-top: 3%;
	}

	.all {
		margin-left: 3%;
	}
</style>
