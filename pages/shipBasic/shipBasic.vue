<template>
	<page-meta>
		<navigation-bar title="船舶基础信息" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn" title-align="auto" />
	</page-meta>
	<uni-search-bar @input="shipBasicInformationList1" @cancel="clear" v-model="shipName">
			</uni-search-bar>
	<view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="80" align="center">船舶名称</uni-th>
					<uni-th width="100" align="center">英文名称</uni-th>
					<uni-th align="center" width="120">建造日期</uni-th>
					<uni-th width="100" align="center">船舶类型</uni-th>
					<uni-th width="240" align="center">设置</uni-th>
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
							<button class="uni-button" @click="toDetail(item.id)" size="mini" type="primary">修改</button>
							<button class="uni-button" size="mini" @click="deleteModel(item.id)" type="warn">删除</button>
							<button class="uni-button" size="mini" type="primary">查看证书</button>
							<button class="uni-button" @click="locationBaidu(item.id)" size="mini" type="primary">船舶位置</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box">
				<uni-pagination show-icon :page-size="limit" :current="page" :total="total" @change="change(e)" />
			</view>
		</view>
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" @fabClick="fabClick" />
	</view>
</template>

<script>
	import {
		shipBasicInformationList,
		shipBasicInformationFindById,
		shipBasicDelete
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
				limit: 12,
				total: 0,
				loading: false,
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
					url: '/pages/shipBasicInformationDetail/shipBasicInformationDetail?id=' + id,

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
			locationBaidu(id){
				uni.navigateTo({
					url:"/pages/baiduLocation/baiduLocation?id="+id
				})
			},
			async shipBasicDelete1(id){
				const {code,data,message,success} = await  shipBasicDelete({id :id})
				if(success===true){
					uni.showToast({
						icon:'success',
						duration:2000,
						title:'删除成功'
					})
					this.shipBasicInformationList1()
				}else{
					uni.showToast({
						icon:'success',
						duration:2000,
						title:'联系开发人员处理'
					})
				}
			},
			deleteModel(id){
				var that = this
				uni.showModal({
					title:'提示',
					content:'是否删除该记录',
					success: function(res) {
					    if (res.confirm) {
					        that.shipBasicDelete1(id)
					    } else if (res.cancel) {
					        return
					    }
					}
				})
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
		onShow() {
			this.shipBasicInformationList1()
		}
	}
</script>

<style>

</style>
