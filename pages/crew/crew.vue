<template>
	<page-meta>
		<navigation-bar title="船员基本信息" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn" title-align="auto" />
	</page-meta>
	<uni-search-bar @input="crewList1" @cancel="clear" v-model="crewName">
	</uni-search-bar>
	<view>
		<uni-list>
			<uni-list :border="true"  @longtap="onLongPress(item.id)" >
				<!-- 显示圆形头像 -->
				<view >
					<uni-list-item  v-for="(item, index) in arr" :key="index" :title="item.crewName"
						:note="item.postType==1?'船长':item.postType==2?'大副':item.postType==3?'水手':''"
						:rightText="item.tenure" @click="toCrewDetail(item.id)" :clickable="true"></uni-list-item>
				</view>
			</uni-list>
		</uni-list>
		<uni-pagination :show-icon="true" :current="page" :total="total" :value="page" :pageSize="limit"
			@change="change" title="标题文字" />
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
	</view>
</template>

<script>
	import {
		crewList,
		crewDelete
	} from '@/util/api.js'
	export default {
		data() {
			return {
				arr: [],
				crewName: '',
				page: 1,
				limit: 12,
				total: 0,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				}
			}
		},
		methods: {
			async crewList1() {
				const {
					data,
					code,
					message,
					success
				} = await crewList({
					crewName: this.crewName
				})
				if (success === true) {
					this.arr = data.list
					this.total = data.total
					this.limit = data.limit
					this.page = data.page
				} else {
					uni.showToast({
						icon: 'error',
						duration: 2000,
						title: '获取列表失败'
					})
				}
			},
			toCrewDetail(id) {
				uni.navigateTo({
					url: '/pages/crewDetail/crewDetail?id=' + id
				})

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
				console.log(this.array)
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/crewAdd/crewAdd'
				})
			}
		},
		onShow: function() {
			this.crewList1()
		}
	}
</script>

<style>

</style>
