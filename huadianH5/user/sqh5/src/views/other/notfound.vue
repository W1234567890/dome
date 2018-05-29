<template>
	<div id="notfound">
		<div class="notfound">
			<div class="notfoundLogo">
				<img src="~src/assets/img/404.png"/>
			</div>
			<p class="notfoundTips1">
				页面错误，点击
				<router-link to="/activityIndex">返回首页</router-link>
			</p>
			<p class="notfoundTips2">错误代码：404</p>
			<p class="notfoundTips3">失败原因：错误的页面</p>
			<div class="notfoundBtn">重新加载</div>
		</div>
	</div>
</template>

<script>

export default {
    computed: {
    	
    },
	methods: {
		
	}

}
</script>

<style scoped>
#notfound{
	width: 100%;
	height: 100%;
	background-color: #FFF;
}
.notfound{
	padding-top: 1.2rem;
	text-align: center;
	font-size: .3rem;
}
.notfoundLogo{
	width: 3.84rem;
	height: 3.08rem;
	overflow: hidden;
	text-align: center;
	margin: auto;
}
.notfoundLogo img{
	width: 100%;
	height: 100%;
}
.notfoundTips1 a{
	color: #00aff5;
}
.notfoundBtn,.notfoundTips2,.notfoundTips1{
	margin-top: .8rem;
}
.notfoundBtn{
	border: 1px solid #00aff5;
	border-radius: 100px;
	color: #00aff5;
	width: 4.5rem;
	margin: auto;
	margin-top: .8rem;
	height: .6rem;
	font-size: .28rem;
	line-height: .6rem;
}
</style>