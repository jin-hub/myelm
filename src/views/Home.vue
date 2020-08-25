<template>
	<div>
		<div>
			<mt-header fixed class="bgblu">
				<span slot="left">elm</span>
				<mt-button @click="goLogin" slot="right">登录|注册</mt-button>
			</mt-header>
		</div>
		<div class="padtop40 bgf5">
			<div class="after ih50 padlr10 box bgfff">
				<span class>当前选择城市</span>
				<span class="right fs0-8 col9f">定位不准时，请在城市列表选择</span>
			</div>
			<mt-cell :title="$store.state.myCity.name" class="col after" to="city" is-link value></mt-cell>
			<div class="mgtop10 bgfff">
				<mt-cell class="after" title="热门城市"></mt-cell>
				<div class="itembox ovhid col">
					<div
						@click="goCity({name:item.name,id:item.id})"
						v-for="item in hotCity"
						:key="item.id"
					>{{item.name}}</div>
				</div>
			</div>

			<div v-for="(items,index) in getlist" :key="index" class="mgtop10 bgfff">
				<mt-cell class="after" :title="index"></mt-cell>
				<div class="itembox ovhid">
					<div
						@click="goCity({name:item.name,id:item.id})"
						v-for="item in items"
						:key="item.id"
						class="nowarp fs0-8"
					>{{item.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cityList: '',
			hotCity: '',
		}
	},
	components: {
		// 注册组件(注册本组件需要引用的其他外部组件)
	},
	mounted: function () {
		// 生命周期钩子
		this.$http.get('http://cangdu.org:8001/v1/cities?type=group').then(
			(response) => {
				console.log(response)
				this.cityList = response.body
			},
			(response) => {
				console.log(response)
			}
		)
		// 热门
		this.$http.get('http://cangdu.org:8001/v1/cities?type=hot').then(
			(response) => {
				console.log(response)
				this.hotCity = response.body
			},
			(response) => {
				console.log(response)
			}
		)
		// 定位
		this.$http.get('http://cangdu.org:8001/v1/cities?type=guess').then(
			(response) => {
				console.log(response)
				this.$store.state.myCity = {
					name: response.body.name,
					id: response.body.id,
				}
			},
			(response) => {
				console.log(response)
			}
		)
	},
	computed: {
		// 计算属性
		getlist: function () {
			var myCityList = {}
			for (var i = 65; i <= 90; i++) {
				var num = String.fromCharCode(i)
				myCityList[num] = this.cityList[num]
			}
			return myCityList
		},
	},
	methods: {
		// 函数
		goLogin: function () {
			this.$router.push('login')
		},
		goCity: function (name) {
			this.$router.push('city')
			this.$store.state.myCity = name
		},
	},
}
</script>

<style scoped>
.itembox > div {
	width: 25%;
	float: left;
	text-align: center;
	height: 40px;
	line-height: 40px;
	box-sizing: border-box;
	border-right: 1px solid #e4e4e4;
	border-bottom: 1px solod #e4e4e4;
}

.itembox > div:nth-child(4n) {
	border-right: 0px;
}
</style>