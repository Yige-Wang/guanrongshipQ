<template>
	<page-meta>
		<navigation-bar title="船舶基本信息修改" title-icon="/static/logo.png" title-icon-radius="20px" subtitle-color="#000000"
			front-color="#000000" background-color="#ffffff" color-animation-timing-func="easeIn"
			title-align="center" />
	</page-meta>
	<view class="all">
		<view class="u-input">
			<view class="username">
				<view class="title">船舶名称</view>
				<input class="uni-input" v-model="form.shipName"/>
			</view>
			<view class="text">船舶类型</view>
			<uni-data-select :clear="true" v-model="form.shipType" :localdata="shipType"></uni-data-select>
			<view class="username">
				<view class="title">船舶英文名称</view>
				<input class="uni-input" v-model="form.shipeNameEn"/>
			</view>
			<view class="username">
				<view class="title">备注</view>
				<input class="uni-input" v-model="form.note"/>
			</view>
			<view class="username">
				<view class="title">建造日期</view>
				<input class="uni-input" v-model="form.constructionDate"/>
			</view>
			<view class="button-hover">
				<button type="primary" size="default" @click="shipDynamicsUpdate1" plain="true">修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shipBasicInformationFindById
	} from '@/util/api.js'
	export default {
		data() {
			return {
				form:{
					id:null,
					shipName:'',
					sihpType:null,
					shipeNameEn:'',
					note:'',
					constructionDate:''
				},
				shipType:[
					{
						value:1,
						text:'集装箱'
					}
				]
			}
		},
		methods: {
			async shipBasicInformationFindById1(id1){
				const {code,data,message,success} = shipBasicInformationFindById({id:id1})
				this.form.shipName = data.shipName
				this.form.shipType = data.shipType
				this.form.note = data.note
				this.form.constructionDate = data.constructionDate
				this.id = data.id
				this.shipeNameEn = data.shipeNameEn
				console.log(data)
			}
		},
		onLoad:function(option){
			var id1 = option.id			
			shipBasicInformationFindById(id1)
		}
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
	}
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
		color: #e59ea5;
	}
	
	.uni-input {
		margin-top: 2%;
	}
	
	.button-hover {
		margin: auto;
		width: 60%;
		margin-top: 4%;
	}
	
	.selector {
		margin-right: 0%;
		width: 340px;
	}
	
	.text {
		font-size: 18px;
		font-weight: bolder;
		margin-top: 3%;
		color: #e59ea5;
	}
	
	::v-deep .uni-select__input-text {
		width: 350px;
		color: #333;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		border: none;
	}
	
	.example-body {
		margin-top: 3%;
	}
</style>
