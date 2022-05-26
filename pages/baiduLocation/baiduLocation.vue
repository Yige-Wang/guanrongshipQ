<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 100vh;" scale='8' :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLocation
	} from "@/util/api.js"
	export default {
		data() {
			return {
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				id:null
			}
		},
		methods: {
			async getLocation1(id) {
				const {
					data,
					code,
					message,
					success
				} = await getLocation({
					'id': id
				})
				if(success===true){
					this.latitude = data.data.lat
					this.longitude = data.data.lon
					const obj = {}
					obj.latitude = data.data.lat
					obj.longitude = data.data.lon
					obj.iconPath = '/static/shipLocation.png'
					obj.title = data.data.englishName
					this.covers.push(obj)
				}else {
					uni.showToast({
						icon:"error",
						title:'联系开发人员',
						duration:2000
					})
				}
			}
		},
		onLoad: function(option) {
			var id1 = option.id
			this.getLocation1(id1)
			this.id = option.id
		},
		onShow:function(){
			this.getLocation1(this.id)
		}
		
		
	}
</script>

<style>

</style>
