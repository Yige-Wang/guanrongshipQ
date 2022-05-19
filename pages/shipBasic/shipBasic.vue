<template>
	<view>
			<view class="uni-container">
				<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="150" align="center">船舶名称</uni-th>
						<uni-th width="150" align="center">英文名称</uni-th>
						<uni-th align="center">建造日期</uni-th>
						<uni-th width="204" align="center">船舶类型</uni-th>
						<uni-th width="204" align="center">设置</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in array" :key="index">
						<uni-td align="center">{{ item.shipName }}</uni-td>
						<uni-td align="center">
							<view class="name">{{ item.shipeNameEn }}</view>
						</uni-td align="center">
						<uni-td align="center">{{ item.constructionDate }}</uni-td>
						<uni-td align="center">{{ item.shipType }}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary">修改</button>
								<button class="uni-button" size="mini" type="warn">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box"><uni-pagination show-icon :page-size="limit" :current="page" :total="total" @change="change(e)" /></view>
			</view>
		</view>
</template>

<script>
	import {
		shipBasicInformationList
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
				limit: 20,
				total: 0,
				loading:false,
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
		methods: {
			async shipBasicInformationList1() {
				const {
					code,
					message,
					data,
					success
				} = await shipBasicInformationList({
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
					url: '/pages/shipBasicInformationAdd/shipBasicInformationAdd?id=' + id,

				})
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/shipBasicInformationAdd/shipBasicInformationAdd'
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
				} = await shipBasicInformationList({
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
		created() {
			this.shipBasicInformationList1()
		}
	}
</script>

<style>

</style>
