<template>
	<div id="keyBoard">
		<div class="index-container">
			<div  class="keyboardMain" ref="keybordMain">
				<div class="keyboardHead"><strong>输入数字密码</strong></div>
				<!--<div class="keyboardError"></div>
				<div>
					<ul class="keyboardPassword">
						<li><i style="display: none;"></i></li>
						<li><i style="display: none;"></i></li>
						<li><i style="display: none;"></i></li>
						<li><i style="display: none;"></i></li>
						<li><i style="display: none;"></i></li>
						<li><i style="display: none;"></i></li>
					</ul>
				</div>-->
				<div class="keyboardContent">
					<div class="keyboardTitle icon iconfont"><span>&#xe63d;</span>安全键盘</div>
					<ul class="clearfix">
						<li @touchstart="keyboardStart" 
							@touchmove="keyboardMove" 
							@touchend="keyboardEnd"
							class='keyboardItem' 
							:class="vo=='del' ? 'keyboardIcon icon iconfont' : (vo=='取消' ? 'keyboardHide' : '') " 
							ref="keyboardItem" 
							v-for="vo in keyBoard">
							{{vo == 'del' ?  '&#xe72d;' : vo}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			keyBoard: [1,2,3,4,5,6,7,8,9,'取消',0,'del'],
			isClick: false,
			pwd:[]
		}
	},
    mixins: [],
    props:['callback'],
	methods: {
		keyboardStart( e){
			e.target.style.backgroundColor= '#f7f7f7';
		},
		keyboardMove( e){
			
		},
		keyboardEnd( e){
			let content = Number(e.target.innerText);
			if(content||content=='0'){
				e.target.style.backgroundColor= '#FFF';
				if(this.pwd.length < 6){
					this.pwd.push(content);
					if(this.pwd.length == 6){
						this.callbacks();
					}
				}
			}else{
				if(e.target.innerText == '取消'){
					this.pwd = [];
					this.$refs.keybordMain.className = 'keyboardMain';
				}else{
					this.pwd.splice((this.pwd.length - 1),1)
				}
			}
			this.$emit("showKeyBoard",{
				ref : this.$refs,
				pwd : this.pwd
			});
		},
		callbacks(){
			this.$refs.keybordMain.className = 'keyboardMain';
			this.callback.ref.isCardPassword.className = 'isCardPassword';
			this.callback.callback( ()=>{
				this.pwd = [];
				this.$emit("showKeyBoard",{
					ref : this.$refs,
					pwd : this.pwd
				});
			});
		}
	},
	mounted() {
		this.$emit("showKeyBoard",{
			ref : this.$refs,
			pwd : this.pwd
		});
	}
   
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 298382 */
  src: url('//at.alicdn.com/t/font_vriy6a8x0gflmcxr.eot');
  src: url('//at.alicdn.com/t/font_vriy6a8x0gflmcxr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_vriy6a8x0gflmcxr.woff') format('woff'),
  url('//at.alicdn.com/t/font_vriy6a8x0gflmcxr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_vriy6a8x0gflmcxr.svg#iconfont') format('svg');
}
.iconfont{font-family:iconfont!important;font-size:28px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}

.keyboardMain{

  	width:100%;
	overflow: hidden;
	position: fixed;
	bottom: 0;
    left: 0;
	z-index: 1111;
	background-color: #f7f7f7;
	-webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
}
.keyboardActive {
    -webkit-transform: translate(0)!important;
    transform: translate(0)!important;
}
.keyboardItem{
	float: left;
	width: 2.5rem;
	text-align: center;
	height: .91rem;
	line-height: .91rem;
	position: relative;
	color: #222;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-pack: center; 
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: .42rem;
}
.keyboardItem:after{
	content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    height: 100%;
    border-right: 1px solid #d9d9d9;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.keyboardItem:before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.keyboardHide{
	font-size: .26rem;
	background-color: #f7f7f7;
    color: #686868;
}
.keyboardIcon{
	font-size: .5rem;
	color: #686868;
	background-color: #f7f7f7;
}
.keyboardTitle{
	overflow: hidden;
    padding: .2rem 0 .12rem;
    color: #222;
    margin-bottom: 1px;
    font-size: .24rem;
    text-align: center;
    background-color: #fff;
}
.keyboardContent{
	background-color: #fff;
    margin-top: .3rem;
    position: relative;
    -moz-user-select: -moz-none;
    -moz-user-select: none;
     -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
     user-select:none; 
    -webkit-touch-callout:none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
.keyboardTitle span{
    font-size: .26rem;
    color: #ff2424;
    line-height: 1;
    margin-right: .06rem;
}
.keyboardPassword{
	margin: 0 .8rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    background-color: #fff;
}
.keyboardPassword li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: .855rem;
}
.keyboardPassword li i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #000;
}
.keyboardPassword li:not(:last-child):after {
    content: "";
    width: 1px;
    height: 50%;
    position: absolute;
    right: 0;
    top: 25%;
    background-color: #d9d9d9;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
}
.keyboardHead {
    height: .8rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #1f2324;
    font-size: .3rem;
    position: relative;
}
.keyboardHead:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.keyboardError {
    padding: 2px .8rem;
    color: red;
    overflow: hidden;
    height: .5rem;
    line-height: .5rem;
    font-size: .24rem;
    text-align: left;
}
</style>