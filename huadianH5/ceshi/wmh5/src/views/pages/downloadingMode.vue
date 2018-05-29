<template>
	<div id="bg_banner">
		<div class="bg_header">	
			<img :src="bg_header" class="header" />		
		</div>	
		<div class="down">
			<div class="iosDownloadApp" @click="iosApp">
		  		<img :src="iosImg" class="iosDown" />
		  	</div>
		  	<div class="androidDownloadApp" @click="androidApp">
		  		<img :src="androidImg" class="androidDown" />
		  	</div> 
		  	<span class="copyright">{{copyrights}}</span> 
		  	<div class="box"></div>
		  	<div class="guidance">		  		
		  		<img :src="bj_photos" class="bj_img"/>
		  		<span class="onTopRight">{{onTopRightText}}</span>
		  		<span class="open">{{openText}}</span>
		  		<span class="selects">{{selectsText}}</span>
		  		<span class="doing">{{doingText}}</span>
			</div>		  	
		</div>	
	</div>
</template>

<script>
	export default {
		data() {
			return {
			    bg_header:require("src/assets/img/bj_download.png"),
				iosImg:require("src/assets/img/iosDownload.png"),
				androidImg:require("src/assets/img/androidDownload.png"),
				copyrights: "©鹏吉创孵空间(深圳)网络科技有限公司",
				bj_photos: require("src/assets/img/bj_position.png"),
				onTopRightText: "点击右上角",
				openText: "打开菜单",
				selectsText: "选择",
				doingText: "用Safari"
			}
		},
	    mounted(){	 
	    },
		methods: {
			iosApp(){
				window.location.href="http://itunes.apple.com/cn/app/id1194859226?mt=8";
			},
			androidApp(){				
				document.getElementsByClassName("box")[0].style.display = "block";	
				document.getElementsByClassName("guidance")[0].style.display = "block";	
				window.location.href="https://shaohuadian17.oss-cn-beijing.aliyuncs.com/appVersion/android/ShaoHuaDian_release_yingyongbao__2.4.2__.apk";
			}			
		}
	}
</script>

<style lang="scss" scoped>
	#bg_banner{
		width: 100%;
		height: 100%;
		background-color:#fff;
	}
	.header{
		width: 100%;
		height: 400px;
	}
	.down{
	    width: 100%;
	}
	.iosDownloadApp{
		width: 100%;
	}
	.iosDown{
		margin-top: 10%;
		width: 70%;
		height: 11%;
		margin-left: 15%;
	}
	.androidDown{
		margin-top: 3%;
		width: 70%;
		height: 11%;
		margin-left: 15%;
	}
	.copyright{
		margin-left: 18%;
	    font-size: 14px;
	    color: #9e9fa3;
	    position: absolute;
	    bottom: 0.1rem;
	}
	.box{
		display: none;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: #000;
	    z-index: 1000;
	    -moz-opacity: .8;
	    opacity: .8;
	    filter: alpha(opacity=80);
	}
	.guidance{
		display: none;
	    width: 100%;
	    color: #fff;
	    font-size: 0.95em;
	}
	.bj_img{
		width: 100%;
		z-index: 1000;
		position: absolute;
		top: 0;
	}
	.onTopRight{
		position: absolute;
	    top: 6.15em;
	    left: 4.7em;
	    z-index: 1000;
	}
	.open{
		position: absolute;
	    top: 6.15em;
    	left: 12em;
		z-index: 1000;
	}
	.selects{
		position: absolute;
		top: 9.3em;
    	left: 4.5em;
		z-index: 1000;
	}
	.doing{
		position: absolute;
		top: 9.3em;	
   		left: 9em;
		z-index: 1000;
		
	}
</style>
