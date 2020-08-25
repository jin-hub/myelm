<template>
	<div class="foot">
		<mt-tabbar v-model="$store.state.selected" fixed>
			<mt-tab-item id="delivery">
				<icon slot="icon" :class="[ $store.state.selected=='delivery'? 'on' : '']" name="delivery"></icon>外卖
			</mt-tab-item>
			<mt-tab-item id="order">
				<icon slot="icon" :class="[ $store.state.selected=='order'? 'on' : '']" name="order"></icon>订单
			</mt-tab-item>
			<mt-tab-item id="search">
				<icon slot="icon" :class="[ $store.state.selected=='search'? 'on' : '']" name="search"></icon>搜索
			</mt-tab-item>
			<mt-tab-item id="profile">
				<icon slot="icon" :class="[ $store.state.selected=='profile'? 'on' : '']" name="profile"></icon>我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
export default {
	date() {
		return {}
	},
	components: {
		// 注册组件
	},
	mounted: function () {
		// 生命周期
	},
	computed: {
		// 计算属性
		goPage: function () {
			return this.$store.state.selected
		},
	},
	methods: {
		// 函数
	},
	watch: {
		goPage(newval, oldval) {
			this.$router.push(newval)
		},
	},
}
</script>

<style scoped>
.on {
	fill: #26a2ff;
}

</style>