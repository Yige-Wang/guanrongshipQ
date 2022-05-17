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
			
			<!-- </view> -->
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
			<view class="username">
				<view class="title">航向</view>
				<input class="uni-input" v-model="form.course" />
			</view>
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
			<view class="username">
				<view class="title">发航时间</view>
				<input class="uni-input" v-model="form.departureTime" />
			</view>
			<view class="username">
				<view class="title">抵港时间</view>
				<input class="uni-input" v-model="form.departureTime" />
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
				<button type="primary" size="default" @click="shipDynamicsUpdate1" plain="true">修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shipDynamicsfindById,
		shipDynamicsUpdate
	} from '@/util/api.js'
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
				]
			}
		},
		onLoad: function(option) {
			var id1 = option.id
			this.getShipDynamicsfindById(id1)
		},
		methods: {
			async getShipDynamicsfindById(id1) {
				const {
					data,
					code,
					message,
					success
				} = await shipDynamicsfindById({
					id: id1
				})
				this.form.arriveTime = data.arriveTime
				this.form.nameOfDynamicallyLoadedCargo = data.nameOfDynamicallyLoadedCargo
				this.form.tonnage = data.tonnage
				this.form.boxQuantity = data.boxQuantity
				this.form.averageSpeed = data.averageSpeed
				this.form.averageShipSpeed = data.averageShipSpeed
				this.form.note = data.note
				this.form.oilConsumption = data.oilConsumption
				this.form.departureTime = data.departureTime
				this.form.morningBerth = data.morningBerth
				this.form.afternoonBerth = data.afternoonBerth
				this.form.shipName = data.shipName
				this.form.businessType = data.businessType
				this.form.voyageNumber = data.voyageNumber
				this.form.course = data.course
				this.form.hangxian = data.routes
				this.form.id = data.id
			},
			async shipDynamicsUpdate1() {
				const {
					data,
					code,
					message,
					success
				} = await shipDynamicsUpdate(this.form)
				if (success === true) {
					uni.showToast({
						title: '修改成功',
						icon: 'success',
						duration: 2000
					})
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: '出现错误，联系人员解决',
						icon: 'error',
						duration: 2000
					})
				}
			}

		},
		created() {}
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
	}

	.uni-input {
		margin-top: 2%;
	}

	.button-hover {
		margin: 0 auto;
		width: 60%;
	}
	.selector {
		margin-right: 0%;
		width: 340px;
	}
	.text {
		font-size: 18px;
		font-weight: bolder;
		margin-top: 3%;
	}
	::v-deep .uni-select__input-text {
	    width: 350px;
	    color: #333;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    -o-text-overflow: ellipsis;
	    overflow: hidden;
	}
</style>
