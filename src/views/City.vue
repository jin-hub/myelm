<template>
	<div>
		<mt-header :title="$store.state.myCity.name" class="fs1-2" fixed>
			<mt-button slot="left">
				<mt-button @click="goHome" icon="back"></mt-button>
			</mt-button>
			<mt-button slot="right" class="fs0-8">切换城市</mt-button>
		</mt-header>

		<div class="mgtop50 padlr10 bgfff padbot10">
			<input class="cityinput" required placeholder="输入商务楼，学校，地址" v-model="inputval" />
			<div @click="searchCity" class="submit bgcol ih40">提交</div>
		</div>

		<div class="main">
			<div v-if="list==''" class="his after">
				<div class="maintop fs0-8 padlr10">搜索历史</div>
				<div v-if="history!=''" class="mainbody bgfff">
					<div
						v-for="item in history"
						:key="item.id"
						class="mgbot10 after"
						@click="changeHistory({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash}),goDelivery()"
					>
						<div class="ih30">{{item.name}}</div>
						<div class="ih30 fs0-8 col9f">{{item.address}}</div>
					</div>
				</div>
				<div class="clearall ih30 pad10 col9f" @click="clearAll">清空所有</div>
			</div>
		</div>

		<div v-if="list!=''" class="search bgfff">
			<div
				v-for="item in list"
				@click="goAddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"
				:key="item.name"
				class="mgbot10 after"
			>
				<div class="ih30">{{item.name}}</div>
				<div class="ih30 fs0-8 col9f">{{item.address}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	data() {
		return {
			inputval: '',
			list: '',
			history: '',
		}
	},
	component: {
		//注册组件
	},
	mounted: function () {
		//生命周期
		if (localStorage.getItem('history')) {
			this.history = JSON.parse(localStorage.getItem('history'))
		}
	},
	computed: {
		//计算属性
	},
	methods: {
		//函数
		goHome() {
			this.$router.push('/')
		},
		goDelivery() {
			this.$router.push('/Delivery')
		},
		searchCity: function () {
			if (this.inputval) {
				this.$http
					.get(
						'http://cangdu.org:8001/v1/pois?city_id=' +
							this.$store.state.myCity.id +
							'&keyword=' +
							this.inputval +
							'&type=search'
					)
					.then(
						(response) => {
							console.log(response)
							this.list = response.body
							if (response.body == '') {
								Toast('没有查找到相关地点，请联系客服')
							}
						},
						(response) => {
							console.log(response)
						}
					)
			}
		},
		goAddress: function (e) {
			var arr = []
			if (localStorage.getItem('history')) {
				arr = JSON.parse(localStorage.getItem('history'))
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].geohash == e.geohash) {
						var isExist = true
					}
				}
				if (!isExist) {
					arr.unshift(e)
				} else {
					return
				}
			} else {
				arr.unshift(e)
			}
			localStorage.setItem('history', JSON.stringify(arr))
			this.history = JSON.parse(localStorage.getItem('history'))
			this.list = ''
			this.goDelivery()
		},
		clearAll: function () {
			this.history = ''
			localStorage.clear()
		},
		changeHistory: function (ss) {
			// this.arr.unshift(ss)
			// sb.unshift(ss)
			// alert(JSON.stringify(sb))
			// this.history = JSON.parse(localStorage.getItem('history'))
			// alert(JSON.stringify(this.history))
			// this.history
			// Object.keys(localStorage).forEach(item => item.indexOf(JSON.stringify(ss)) !== -1 ? localStorage.removeItem(item) : '');
			// alert(JSON.stringify(JSON.parse(localStorage.getItem('history'))) )
			var arr = []
			var obj = {}
			if (localStorage.getItem('history')) {
				arr = JSON.parse(localStorage.getItem('history'))
				arr.unshift(ss)
				arr = arr.reduce(function(item, next) {
					obj[next.geohash] ? '' : obj[next.geohash] = true && item.push(next);
					return item;
					}, []);
				
			}
			// 删除重复的历史记录，并将最近点击的历史记录置顶
			localStorage.setItem('history', JSON.stringify(arr))
			this.history = JSON.parse(localStorage.getItem('history'))
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cityinput {
	width: 100%;
	height: 40px;
	margin: 60px 0px 0px 0px;
	outline: 0px;
	padding: 0px 5px;
	box-sizing: border-box;
}
.submit {
	text-align: center;
	color: white;
	border-radius: 3px;
	margin: 10px;
}
.fs0-8 {
	font-size: 0.8rem !important;
}
.contenttop {
	border-top: 2px solid #e4e4e4;
	border-bottom: 2px solid #e4e4e4;
}
.main {
	border-top: 2px solid #e4e4e4;
}
.maintop {
	border-bottom: 2px solid #e4e4e4;
}
.clearall {
	text-align: center;
}
.mgtop10 {
	margin-bottom: 2px;
}
</style>
