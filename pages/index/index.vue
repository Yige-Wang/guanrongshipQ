<template>

	<page-meta>
		<navigation-bar title="冠荣船舶信息管理" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn" title-align="auto" />
	</page-meta>
	<view class="content"></view>
	<view class="content">
		<uni-search-bar @input="shipDynamicsList1" @cancel="clear" v-model="shipName">
		</uni-search-bar>
		<uni-list v-for="(item,index) in array"  :key="index">
			<uni-list-item :title='item.shipName' :clickable="true"  @click="toDetail(item.id)"
				:note="item.route" :rightText="item.addTime"></uni-list-item>
		</uni-list>
		<uni-pagination :show-icon="true" :current="page" :total="total" :value="page" :pageSize="limit"
			@change="change" title="标题文字" />
	</view>
	<view>
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" direction="horizontal"
			@fabClick="fabClick" />
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
					list: []
				},
				code: '',
				message: "",
				success: false,
				array: [],
				shipName: '',
				page: 1,
				limit: 10,
				total: 0,
				shipDynamics: {

				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				}
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
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/shipDynamics/shipDynamics?id=' + id,

				})
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/shipDynamicsAdd/shipDynamicsAdd'
				})
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				});
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
