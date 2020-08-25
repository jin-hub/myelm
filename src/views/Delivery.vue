<template>
	<div>
		<router-link to="/" slot="left">
			<div class="myhead">
				<icon class="search2" name="search2"></icon>
				<div class="headmain nowarp fs1-2">{{nowCity}}</div>
				<div class="headright fs0-8">登录|注册</div>
			</div>
		</router-link>

		<div class="padtop40">
			<mt-swipe class="myswipe" :auto="0">
				<mt-swipe-item v-for="items in category" :key="items.id" class="myitem">
					<div v-for="item in items" :key="item.title">
						<div class="imgbox">
							<img :src="imgBaseUrl+item.image_url" />
						</div>
						<div class="fs0-8 col9f mgtop5">{{item.title}}</div>
					</div>
				</mt-swipe-item>
			</mt-swipe>

			<div class="mgtop10 bgfff maindiv">
				<div class="ih30 pad10">
					<div class="svgbox left">
						<icon name="shop" class="shopicon"></icon>
					</div>
					<span class="fs0-8 left col9f mgleft20">附近商家</span>
				</div>

				<div v-for="item in shoplist" :key="item.name" class="shoplist after">
					<div class="shopimgbox">
						<img :src="imgshopUrl+item.image_path" />
					</div>
					<div class="rightbox">
						<div class="shoptop">
							<span class="pinpai fs10 mgl">品牌</span>
							<span class="shopname">{{item.name}}</span>
							<span class="rightspan right fs10 mgr">
								<span
									v-for="itemsupports in item.supports"
									:key="itemsupports.icon_name"
									class
								>{{itemsupports.icon_name}}</span>
							</span>
						</div>
						<div class="xxdiv">
							<div class="xxbox fs10 mgl">
								<span v-for="(itemstars,index) in 5" :key="index" class="xxspan1">
									<icon v-if="index+1<=item.rating" name="xx" class="xx"></icon>
									<!-- 假设item.rating=4.7
										 index=0时 给一个彩色星星
										 index=1时 给一个彩色星星 
										 index=2时 给一个彩色星星
										 index=3时 给一个彩色星星
										 index=4时 给一个空星星+70%宽度的彩色星星（覆盖）
									-->
									<icon v-if="index+1>item.rating" name="xx2" class="xx"></icon>
									<span
										v-if="item.rating-(index)>0&&item.rating-(index)<1"
										:class="xxclass+(item.rating*10-index*10)"
									>
										<icon name="xx" class="xx"></icon>
									</span>
								</span>
							</div>
							<span class="colred fs10 mgl mgleft8">{{item.rating}}</span>
							<span class="fs10 mgl">月售{{item.recent_order_num}}单</span>
							<span class="rightspan fs10 right mgr">
								<span v-if="item.delivery_mode" class="fn">{{item.delivery_mode.text}}</span>
								<span class="zs">准时达</span>
							</span>
						</div>
						<div class="shopfoot">
							<div>
								<span
									class="fs10 mgl"
								>￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span>
							</div>
							<div>
								<span class="right fs10 mgr right10 nowarp">
									<span class>{{item.distance}}/</span>
									<span class="col">{{item.order_lead_time}}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 5rem;"></div>
		<foot></foot>
	</div>
</template>

<script>
import foot from '../components/Foot'

export default {
	data() {
		return {
			category: [],
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			imgshopUrl: 'http://cangdu.org:8001/img/',
			shoplist: '',
			xxclass: 'xxspan2 w',
			nowCity: '',
		}
	},
	components: {
		//注册组件
		foot,
	},
	mounted: function () {
		//生命周期
		//分类
		this.$http.get('http://cangdu.org:8001/v2/index_entry').then(
			(response) => {
				console.log(response)
				var mybody = response.body
				var num = parseInt(mybody.length / 8)
				var category = []
				var arr = []
				for (var i = 0; i < num; i++) {
					arr = []
					for (var h = 0; h < 8; h++) {
						arr.push(mybody[i * 8 + h])
					}
					category.push(arr)
				}
				arr = []
				if (num * 8 < mybody.length) {
					for (var k = num * 8; k < mybody.length; k++) {
						arr.push(mybody[num * 8 + k])
					}
					category.push(arr)
				}
				this.category = category
				console.log(this.category)
			},
			(response) => {
				console.log(response)
			}
		),
			//商品列表
			this.$http
				.get(
					'http://cangdu.org:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762'
				)
				.then(
					(response) => {
						console.log(response)
						this.shoplist = response.body
					},
					(response) => {
						console.log(response)
					}
				)

		var cityName = localStorage.getItem('history')

		cityName = JSON.parse(cityName)
		this.nowCity = cityName[0].name
		// this.nowCity = cityName.name
		// this.loadCityName()
		// this.nowCity =
		// this.nowCity=JSON.parse(localStorage.getItem('history')).
	},
	computed: {
		//计算属性
	},
	methods: {
		//函数
		// loadCityName(){
		// 	var list = localStorage.getItem("history");
		// 	this.nowCity = list;
		// }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fs10 {
	font-size: 12px;
	transform: scale(0.8);
	display: inline-block;
}
/* transform: scale(.8)是缩放，把原来的元素缩放成原来的0.8，注意，这里长度宽度也会缩放。可以改变基点来让元素重新回到最左端或者最右端 */
.mgr {
	transform-origin: 100% 50% 0; /*改变缩放基点*/
}
.mgl {
	transform-origin: 0 50% 0; /*改变缩放基点*/
}
.myswipe {
	height: 210px;
	box-sizing: border-box;
	padding-bottom: 30px;
	padding-top: 10px;
	background-color: #ffffff;
	border-bottom: 1px solid #e4e4e4;
}
.myswipe .mint-swipe-indicators .is-active {
	background-color: #26a2ff;
}

.myitem > div {
	width: 25%;
	height: 50%;
	box-sizing: border-box;
	float: left;
	text-align: center;
}
.imgbox {
	height: 60%;
}
.imgbox img {
	height: 100%;
}
.shopicon {
	width: 100%;
	height: 100%;
	margin-top: 20px;
	margin-left: 2px;
}
.svgbox {
	width: 15px;
	height: 15px;
}
.mgleft20 {
	margin-left: 20px;
}
.mgleft2 {
	margin-left: 2px;
}
.shoplist {
	padding: 10px;
	overflow: hidden;
	display: flex;
}
.shoplist > div {
	float: left;
}
.shopimgbox {
	width: 60px;
	height: 60px;
	margin-right: 5px;
}
.shopimgbox > img {
	height: 100%;
	width: 100%;
	background-color: red;
}
.maindiv {
	border-top: 1px solid #e4e4e4;
}

.search {
	width: 20px;
	height: 20px;
}
.rightbox {
	font-size: 0.8rem;
	flex: 1;
}
.shoptop,
.xxdiv {
	height: 25px;
	line-height: 25px;
}
.pinpai {
	display: inline-block;
	width: 30px;
	text-align: center;
	font-weight: bold;
	height: 20px;
	line-height: 20px;
	background-color: #ffd930;
	border-radius: 3px;
}
.shopname {
	font-weight: bold;
	font-size: 0.8rem;
}
.rightspan > span {
	display: inline-block;
	height: 14px;
	border: 1px solid #a3acb7;
	margin-left: 3px;
	padding: 1px;
	color: #a3acb7;
	line-height: 14px;
	font-size: 12px;
}

.xx {
	width: 10px;
	height: 10px;
}
.xxbox {
	display: inline-block;
	height: 25px;
	box-sizing: border-box;
}
.xxbox > span {
	margin-right: -2px;
}
.xxspan1 {
	position: relative;
	display: inline-block;
}
.xxspan2 {
	display: inline-block;
	position: absolute;
	left: 0px;
	overflow: hidden;
}
.w1 {
	width: 10%;
}
.w2 {
	width: 20%;
}
.w3 {
	width: 30%;
}
.w4 {
	width: 40%;
}
.w5 {
	width: 50%;
}
.w6 {
	width: 60%;
}
.w7 {
	width: 70%;
}
.w8 {
	width: 80%;
}
.w9 {
	width: 90%;
}
.fn {
	background-color: #3190e8;
	color: white !important;
	border-color: #3190e8 !important;
}
.zs {
	color: #3190e8 !important;
	border-color: #3190e8 !important;
}
.mgleft-6 {
	margin-left: -6px;
}
.shopfoot > div {
	width: 50%;
	float: left;
}
.myhead {
	height: 40px;
	box-sizing: border-box;
	line-height: 40px;
	position: fixed;
	background-color: #26a2ff;
	width: 100%;
	color: white;
	padding: 0px 10px;
	text-align: center;
	z-index: 1;
}
.myhead > div {
	display: inline-block;
}
.headright {
	position: absolute;
	right: 10px;
}
.headmain {
	max-width: 55%;
	margin: 0px auto;
}
.search2 {
	width: 40%;
	height: 40%;
	position: absolute;
	left: -50px;
	top: 30%;
}
.right10 {
	/* right: 10px; */
	position: relative;
}
</style>