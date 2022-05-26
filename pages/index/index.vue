<template>
	<page-meta>
		<navigation-bar title="船舶动态信息" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn" title-align="auto" />
	</page-meta>
	<uni-search-bar @input="shipDynamicsList1" @cancel="clear" v-model="shipName">
	</uni-search-bar>
	<view class="uni-container">

		<uni-table ref="table" :loading="loading" border emptyText="暂无更多数据">
			<uni-tr>
				<uni-th width="80" align="center">船舶名称</uni-th>
				<uni-th width="80" align="center">业务类型</uni-th>
				<uni-th align="center" width="60">航次</uni-th>
				<uni-th width="80" align="center">航向</uni-th>
				<uni-th width="60" align="center">航线</uni-th>
				<uni-th width="80" align="center">上午九点船位</uni-th>
				<uni-th width="80" align="center">下午三点船位</uni-th>
				<uni-th width="100" align="center">发航时间</uni-th>
				<uni-th width="100" align="center">抵港时间</uni-th>
				<uni-th width="60" align="center">装载货物名称</uni-th>
				<uni-th width="60" align="center">吨位</uni-th>
				<uni-th width="60" align="center">箱量</uni-th>
				<uni-th width="60" align="center">主机平均转速</uni-th>
				<uni-th width="60" align="center">平均航速</uni-th>
				<uni-th width="100" align="center">备注</uni-th>
				<uni-th width="100" align="center">添加时间</uni-th>
				<uni-th width="150" align="center">设置</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in array" :key="index">
				<uni-td align="center">{{ item.shipName }}</uni-td>
				<uni-td align="center">
					<view class="name" v-if="item.businessType==1">散货</view>
					<view class="name" v-else-if="item.businessType==2">集装箱</view>
					<view class="name" v-else-if="item.businessType==3">危险品</view>
					<view class="name" v-else-if="item.businessType==4">商品滚装</view>
				</uni-td align="center">
				<uni-td align="center">{{ item.voyageNumber }}</uni-td>
				<uni-td align="center">
					<view class="name" v-if="item.course==1">上水</view>
					<view class="name" v-else-if="item.course==2">下水</view>
				</uni-td>
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
						<button class="uni-button" @click="deleteById(item.id)" size="mini" type="warn">删除</button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<uni-pagination :show-icon="true" :current="page" :total="total" :value="page" :pageSize="limit"
			@change="change" title="标题文字" />
	</view>
	<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
	</view>
</template>
<script>
	import {
		shipDynamicsList,
		shipDynamicsDelete
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
				loading: false,
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
			async deleteById(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否删除该记录',
					success: function(res) {
					    if (res.confirm) {
					        that.deleteitem(id)
					    } else if (res.cancel) {
					        return
					    }
					}
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
				console.log(this.array)
			},
			async deleteitem(id){
				const {
					code,
					data,
					message,
					success
				} = await shipDynamicsDelete({
					'id': id
				})
				if (success) {
					uni.showToast({
						icon: 'success',
						duration: 2000,
						title: '删除成功'
					})
					this.shipDynamicsList1()
				} else {
					uni.showToast({
						icon: 'error',
						duration: 2000,
						title: '删除失败'
					})
					this.shipDynamicsList1()
				}
			}
		},
		onShow: function() {
			this.shipDynamicsList1()
		}
	}
</script>

<style>

</style>
