<template>
	
	<page-meta>
	    <navigation-bar
	      title="冠荣船舶信息管理"
	      title-icon="/static/logo.png"
	      title-icon-radius="20px"
	      subtitle-text="subtitleText"
	      subtitle-color="#000000"
	      front-color="#000000"
	      background-color="#ffffff"
	      color-animation-timing-func="easeIn"
		  title-align="auto"
	    />
	  </page-meta>
	  <view class="content"></view>
	<view class="content">
		<uni-search-bar @input="shipDynamicsList1" @cancel="clear" v-model="shipName">
		</uni-search-bar>
		<uni-list v-for="(item,index) in array" :key="index">
			<uni-list-item :title='item.shipName' :clickable="true" link="navigateTo" to="/pages/shipDynamics/shipDynamics"
				:note="item.route" :rightText="item.addTime"></uni-list-item>
		</uni-list>
		<uni-pagination :show-icon="true" :current="page" :total="total" :value="page" :pageSize="limit"
			@change="change" title="标题文字" />
	</view>
</template>
<script>
	import {
		shipDynamicsList
	} from '@/util/api.js'
	export default {
		data() {
			return {
				data: {
					limit: 0,
					page: 0,
					pages: 0,
					total: 0,
					list: null
				},
				code: '',
				message: "",
				success: false,
				array: [],
				shipName: '',
				page: 1,
				limit: 10,
				total: 0
			}
		},
		onLoad() {
			
		},
		methods: {
			async shipDynamicsList1() {
				const {
					data,
					code,
					message,
					success
				} = await shipDynamicsList({
					shipName: this.shipName,
					page: this.page,
					limit: this.limit
				})
				this.array = data.list
				this.page = data.page
				this.limit = data.limit
				this.total = data.total
			},
			toDetail() {
				uni.reLaunch({
					url: '.../test/test'
				})
			},
			clear() {
				this.shipName === ''
			},
			async change(e) {
				this.page = e.current
				const {
					data,
					code,
					message,
					success
				} = await shipDynamicsList({
					shipName: this.shipName,
					page: this.page,
					limit: this.limit
				})
				this.array = data.list
				this.page = data.page
				this.limit = data.limit
				this.total = data.total
			}
		},
		created: function() {
			this.shipDynamicsList1()
		}
	}
</script>

<style>

</style>
