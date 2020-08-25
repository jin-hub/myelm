<template>
	<div>
		<mt-header title="密码登录" class="fs1-2" fixde>
			<mt-button slot="left">
				<mt-button icon="back" @click="goHome"></mt-button>
			</mt-button>
			<mt-button>登录</mt-button>
		</mt-header>

		<form>
			<div class="padtop40">
				<mt-field class="mgtop10 after" placeholder="账号"></mt-field>
				<mt-field class="after" placeholder="密码" :type="mytype">
					<mt-switch v-model="value"></mt-switch>
				</mt-field>
				<mt-field class="after" placeholder="验证码">
					<img src alt="验证码" height="45px" width="100px" />
				</mt-field>
			</div>
		</form>

		<div class="padlr10 fs0-8 colred">
			<p>未注册的账号登录时将自动注册</p>
			<p>注册过的用户可以凭账号密码登录</p>
		</div>

		<div class="padlr10">
			<mt-button size="large" type="primary">登录</mt-button>
		</div>

		<div class="padlr10 mgtop10">
			<span class="col right">重置密码</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: true,
		}
	},
	computed: {
		// 计算属性
		mytype: function () {
			return this.value ? 'password' : ''
		},
	},
	methods: {
		goHome() {
			this.$router.push('/')
		},
	},
}
</script>

<style>
</style>