<template>

	<page-meta>
		<navigation-bar title="船舶动态信息详情" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn"
			title-align="center" />
	</page-meta>
	<view>
		<uni-section title="业务类型" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{businessType}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="船舶名称" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{shipName}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="航次" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{voyageNumber}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="航向" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{course}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="上午九点船位" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{morningBerth}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="下午三点船位" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{morningBerth}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="发航时间" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{departureTime}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="抵港时间" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{arriveTime}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="货物名称" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{nameOfDynamicallyLoadedCargo}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="吨位" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{tonnage}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="箱量" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{boxQuantity}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="平均转速" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{averageSpeed}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="平均航速" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{averageShipSpeed}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="航线" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{hangxian}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="备注" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{note}}</text>
			</uni-card>
		</uni-section>
		<uni-section title="24小时油耗" type="line">
			<uni-card :is-shadow="true">
				<text class="uni-body">{{oilConsumption}}</text>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	import {
		shipDynamicsfindById
	} from '@/util/api.js'
	export default {
		data() {
			return {
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
				this.arriveTime = data.arriveTime
				this.nameOfDynamicallyLoadedCargo = data.nameOfDynamicallyLoadedCargo
				this.tonnage = data.tonnage
				this.boxQuantity = data.boxQuantity
				this.averageSpeed = data.averageSpeed
				this.averageShipSpeed = data.averageShipSpeed
				this.note = data.note
				this.oilConsumption = data.oilConsumption
				this.departureTime = data.departureTime
				this.morningBerth = data.morningBerth
				this.afternoonBerth = data.afternoonBerth
				this.shipName = data.shipName
				this.businessType = data.businessType
				this.voyageNumber = data.voyageNumber
				this.course = data.course
				this.hangxian = data.routes
				console.log(this.hangxian)
			}

		},
		created() {}
	}
</script>

<style>

</style>
