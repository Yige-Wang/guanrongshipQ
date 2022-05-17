<template>
	<page-meta>
		<navigation-bar title="船舶动态信息详情" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn"
			title-align="center" />
	</page-meta>
	<view class="all">
		<view class="u-input">
			<view class="username">
				<view class="title">船舶名称</view>
				<input class="uni-input" v-model="form.shipName" />
			</view>
			<view class="username">
				<view class="title">航线</view>
				<input class="uni-input" v-model="form.hangxian" />
			</view>
			<view class="text">业务类型</view>
			<uni-data-select :clear="true" v-model="form.businessType" :localdata="businessType"></uni-data-select>
			<view class="username">
				<view class="title">吨位</view>
				<input class="uni-input" v-model="form.tonnage" />
			</view>
			<view class="username">
				<view class="title">箱量</view>
				<input class="uni-input" v-model="form.boxQuantity" />
			</view>
			<view class="username">
				<view class="title">航次</view>
				<input class="uni-input" v-model="form.voyageNumber" />
			</view>
			<view class="text">航向</view>
			<uni-data-select :clear="true" v-model="form.course" :localdata="course"></uni-data-select>
			<view class="username">
				<view class="title">主机平均转速</view>
				<input class="uni-input" v-model="form.averageSpeed" />
			</view>
			<view class="username">
				<view class="title">平均航速</view>
				<input class="uni-input" v-model="form.averageShipSpeed" />
			</view>
			<view class="username">
				<view class="title">下午3点船位</view>
				<input class="uni-input" v-model="form.afternoonBerth" />
			</view>
			<view class="username">
				<view class="title">早上9点船位</view>
				<input class="uni-input" v-model="form.morningBerth" />
			</view>
			<view class="title">发航时间</view>
			<view class="example-body">
				<uni-datetime-picker type="datetime" v-model="form.departureTime" />
			</view>
			<view class="title">抵港时间</view>
			<view class="example-body">
				<uni-datetime-picker type="datetime" v-model="form.arriveTime" />
			</view>
			<view class="username">
				<view class="title">24小时油耗</view>
				<input class="uni-input" v-model="form.oilConsumption" />
			</view>
			<view class="username">
				<view class="title">备注</view>
				<input class="uni-input" v-model="form.note" />
			</view>
			<view class="button-hover">
				<button type="warn" size="default" @click="shipDynamicsAdd" plain="true">新增</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shipDynamicsAdd
	}
	from '@/util/api.js'
	export default {
		data() {
			return {
				form: {
					id: null,
					shipName: '',
					businessType: null,
					voyageNumber: '',
					course: null,
					hangxian: "",
					morningBerth: '',
					afternoonBerth: '',
					departureTime: '',
					arriveTime: '',
					nameOfDynamicallyLoadedCargo: '',
					tonnage: '',
					boxQuantity: '',
					averageSpeed: null,
					averageShipSpeed: null,
					note: '',
					oilConsumption: ''
				},
				businessType: [{
						value: 1,
						text: '散货'
					},
					{
						value: 2,
						text: '集装箱'
					},
					{
						value: 3,
						text: '危险品'
					},
					{
						value: 4,
						text: '商品滚装'
					}
				],
				course: [{
						value: 1,
						text: '上水'
					},
					{
						value: 2,
						text: '下水'
					}
				]
			}
		},
		methods: {
			async shipDynamicsAdd() {
				const {
					data,
					code,
					message,
					success
				} = await shipDynamicsAdd(
					this.form
				)
				console.log(data)
				if (success) {
					uni.showToast({
						title: '添加成功',
						icon: success,
						departureTime: 2000
					})
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: '新增失败，检查数据格式',
						icon: 'error',
						departureTime: 2000
					})
				}
			}
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
</style>
