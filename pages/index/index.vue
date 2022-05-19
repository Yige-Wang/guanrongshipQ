<template>
	<page-meta>
		<navigation-bar title="冠荣船舶动态信息" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn" title-align="auto" />
	</page-meta>
	<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th width="150" align="center">船舶名称</uni-th>
					<uni-th width="150" align="center">业务类型</uni-th>
					<uni-th align="center">航次</uni-th>
					<uni-th width="204" align="center">航向</uni-th>
					<uni-th width="204" align="center">航线</uni-th>
					<uni-th width="204" align="center">上午九点船位</uni-th>
					<uni-th width="204" align="center">下午三点船位</uni-th>
					<uni-th width="204" align="center">发航时间</uni-th>
					<uni-th width="204" align="center">抵港时间</uni-th>
					<uni-th width="204" align="center">装载货物名称</uni-th>
					<uni-th width="204" align="center">吨位</uni-th>
					<uni-th width="204" align="center">箱量</uni-th>
					<uni-th width="204" align="center">主机平均转速</uni-th>
					<uni-th width="204" align="center">平均航速</uni-th>
					<uni-th width="204" align="center">备注</uni-th>
					<uni-th width="204" align="center">添加时间</uni-th>
					<uni-th width="204" align="center">设置</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in array" :key="index">
					<uni-td align="center">{{ item.shipName }}</uni-td>
					<uni-td align="center">
						<view class="name">{{ item.businessType }}</view>
					</uni-td align="center">
					<uni-td align="center">{{ item.voyageNumber }}</uni-td>
					<uni-td align="center">{{ item.course }}</uni-td>
					<uni-td align="center">{{ item.airway }}</uni-td>
					<uni-td align="center">{{ item.morningBerth }}</uni-td>
					<uni-td align="center">{{ item.afternoonBerth }}</uni-td>
					<uni-td align="center">{{ item.departureTime }}</uni-td>
					<uni-td align="center">{{ item.arriveTime }}</uni-td>
					<uni-td align="center">{{ item.nameOfDynamicallyLoadedCargo }}</uni-td>
					<uni-td align="center">{{ item.tonnage }}</uni-td>
					<uni-td align="center">{{ item.boxQuantity }}</uni-td>
					<uni-td align="center">{{ item.averageSpeed }}</uni-td>
					<uni-td align="center">{{ item.averageShipSpeed }}</uni-td>
					<uni-td align="center">{{ item.note }}</uni-td>
					<uni-td align="center">{{ item.addTime }}</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button class="uni-button" @click="toDetail(item.id)" size="mini" type="primary">修改</button>
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
				loading:false,
				code: '',
				message: "",
				success: false,
				array: [],
				shipName: '',
				page: 1,
				limit: 12,
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
		onShow: function() {
			this.shipDynamicsList1()
		}
	}
</script>

<style>
	
</style>
