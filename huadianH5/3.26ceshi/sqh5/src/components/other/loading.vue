<template>
    <div class="weui_loading_toast" id="loadingToast">
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" v-slide>
		    	<div class="weui_mask_transparent"></div>
		    	<div class="weui_toast">
		    		<div class="weui_loading">
		    			<div class="weui_loading_leaf" :class="'weui_loading_leaf_'+key" v-for="(v,key) in 12"></div>
		    		</div>
		    		<p class="weui_toast_content">加载中</p>
		    	</div>
	    	</div>
	    </div>
    </div>
</template>
<style lang="scss">
.weui_loading_toast{
	z-index: 100;
	.slidesClassMain{
		position: fixed;
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 1001;
	    background: rgba(0,0,0,.6);
		.slides_main{
			position: absolute;
	    	width: 100%;
	    	height: 100%;
	    	top: 0;
	    	left: 0;
		} 
		._scrollbar{
	    	visibility: hidden;
	    	._indicator{
	    		visibility: hidden;
	    	}
	    }
	}
}
	/*loading 样式*/
/*.weui_mask_transparent {
	position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0
};*/
.weui_mask_transition {
	display: none;
	position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0);
	-webkit-transition: background .3s;
	transition: background .3s
}

.weui_toast {
	position: fixed;
	z-index: 50000;
	width: 100px;
	height: 100px;
	background: rgba(40, 40, 40, .75);
	text-align: center;
	border-radius: 5px;
	color: #FFF;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto
}

.weui_icon_toast {
	margin: 22px 0 0;
	display: block
}

.weui_icon_toast:before {
	content: '\EA08';
	color: #FFF;
	font-size: 55px
}

.weui_toast_content {
	margin: 0 0 15px
}

.weui_loading_toast .weui_toast_content {
	margin-top: 64%;
	font-size: 14px
}

.weui_loading {
	position: absolute;
	width: 0;
	z-index: 1;
	left: 50%;
	top: 40%
}

.weui_loading_leaf {
	position: absolute;
	top: -1px;
	opacity: .25
}

.weui_loading_leaf:before {
	content: " ";
	position: absolute;
	width: 8.14px;
	height: 3.08px;
	background: #d1d1d5;
	box-shadow: rgba(0, 0, 0, .0980392) 0 0 1px;
	border-radius: 1px;
	-webkit-transform-origin: left 50% 0;
	transform-origin: left 50% 0
}

.weui_loading_leaf_0 {
	-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;
	animation: opacity-60-25-0-12 1.25s linear infinite
}

.weui_loading_leaf_0:before {
	-webkit-transform: rotate(0) translate(7.92px, 0);
	transform: rotate(0) translate(7.92px, 0)
}

.weui_loading_leaf_1 {
	-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;
	animation: opacity-60-25-1-12 1.25s linear infinite
}

.weui_loading_leaf_1:before {
	-webkit-transform: rotate(30deg) translate(7.92px, 0);
	transform: rotate(30deg) translate(7.92px, 0)
}

.weui_loading_leaf_2 {
	-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;
	animation: opacity-60-25-2-12 1.25s linear infinite
}

.weui_loading_leaf_2:before {
	-webkit-transform: rotate(60deg) translate(7.92px, 0);
	transform: rotate(60deg) translate(7.92px, 0)
}

.weui_loading_leaf_3 {
	-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;
	animation: opacity-60-25-3-12 1.25s linear infinite
}

.weui_loading_leaf_3:before {
	-webkit-transform: rotate(90deg) translate(7.92px, 0);
	transform: rotate(90deg) translate(7.92px, 0)
}

.weui_loading_leaf_4 {
	-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;
	animation: opacity-60-25-4-12 1.25s linear infinite
}

.weui_loading_leaf_4:before {
	-webkit-transform: rotate(120deg) translate(7.92px, 0);
	transform: rotate(120deg) translate(7.92px, 0)
}

.weui_loading_leaf_5 {
	-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;
	animation: opacity-60-25-5-12 1.25s linear infinite
}

.weui_loading_leaf_5:before {
	-webkit-transform: rotate(150deg) translate(7.92px, 0);
	transform: rotate(150deg) translate(7.92px, 0)
}

.weui_loading_leaf_6 {
	-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;
	animation: opacity-60-25-6-12 1.25s linear infinite
}

.weui_loading_leaf_6:before {
	-webkit-transform: rotate(180deg) translate(7.92px, 0);
	transform: rotate(180deg) translate(7.92px, 0)
}

.weui_loading_leaf_7 {
	-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;
	animation: opacity-60-25-7-12 1.25s linear infinite
}

.weui_loading_leaf_7:before {
	-webkit-transform: rotate(210deg) translate(7.92px, 0);
	transform: rotate(210deg) translate(7.92px, 0)
}

.weui_loading_leaf_8 {
	-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;
	animation: opacity-60-25-8-12 1.25s linear infinite
}

.weui_loading_leaf_8:before {
	-webkit-transform: rotate(240deg) translate(7.92px, 0);
	transform: rotate(240deg) translate(7.92px, 0)
}

.weui_loading_leaf_9 {
	-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;
	animation: opacity-60-25-9-12 1.25s linear infinite
}

.weui_loading_leaf_9:before {
	-webkit-transform: rotate(270deg) translate(7.92px, 0);
	transform: rotate(270deg) translate(7.92px, 0)
}

.weui_loading_leaf_10 {
	-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;
	animation: opacity-60-25-10-12 1.25s linear infinite
}

.weui_loading_leaf_10:before {
	-webkit-transform: rotate(300deg) translate(7.92px, 0);
	transform: rotate(300deg) translate(7.92px, 0)
}

.weui_loading_leaf_11 {
	-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;
	animation: opacity-60-25-11-12 1.25s linear infinite
}

.weui_loading_leaf_11:before {
	-webkit-transform: rotate(330deg) translate(7.92px, 0);
	transform: rotate(330deg) translate(7.92px, 0)
}

@-webkit-keyframes opacity-60-25-0-12 {
	0% {
		opacity: .25
	}
	0.01% {
		opacity: .25
	}
	0.02% {
		opacity: 1
	}
	60.01% {
		opacity: .25
	}
	100% {
		opacity: .25
	}
}

@-webkit-keyframes opacity-60-25-1-12 {
	0% {
		opacity: .25
	}
	8.34333% {
		opacity: .25
	}
	8.35333% {
		opacity: 1
	}
	68.3433% {
		opacity: .25
	}
	100% {
		opacity: .25
	}
}

@-webkit-keyframes opacity-60-25-2-12 {
	0% {
		opacity: .25
	}
	16.6767% {
		opacity: .25
	}
	16.6867% {
		opacity: 1
	}
	76.6767% {
		opacity: .25
	}
	100% {
		opacity: .25
	}
}

@-webkit-keyframes opacity-60-25-3-12 {
	0% {
		opacity: .25
	}
	25.01% {
		opacity: .25
	}
	25.02% {
		opacity: 1
	}
	85.01% {
		opacity: .25
	}
	100% {
		opacity: .25
	}
}

@-webkit-keyframes opacity-60-25-4-12 {
	0% {
		opacity: .25
	}
	33.3433% {
		opacity: .25
	}
	33.3533% {
		opacity: 1
	}
	93.3433% {
		opacity: .25
	}
	100% {
		opacity: .25
	}
}

@-webkit-keyframes opacity-60-25-5-12 {
	0% {
		opacity: .270958333333333
	}
	41.6767% {
		opacity: .25
	}
	41.6867% {
		opacity: 1
	}
	1.67667% {
		opacity: .25
	}
	100% {
		opacity: .270958333333333
	}
}

@-webkit-keyframes opacity-60-25-6-12 {
	0% {
		opacity: .375125
	}
	50.01% {
		opacity: .25
	}
	50.02% {
		opacity: 1
	}
	10.01% {
		opacity: .25
	}
	100% {
		opacity: .375125
	}
}

@-webkit-keyframes opacity-60-25-7-12 {
	0% {
		opacity: .479291666666667
	}
	58.3433% {
		opacity: .25
	}
	58.3533% {
		opacity: 1
	}
	18.3433% {
		opacity: .25
	}
	100% {
		opacity: .479291666666667
	}
}

@-webkit-keyframes opacity-60-25-8-12 {
	0% {
		opacity: .583458333333333
	}
	66.6767% {
		opacity: .25
	}
	66.6867% {
		opacity: 1
	}
	26.6767% {
		opacity: .25
	}
	100% {
		opacity: .583458333333333
	}
}

@-webkit-keyframes opacity-60-25-9-12 {
	0% {
		opacity: .687625
	}
	75.01% {
		opacity: .25
	}
	75.02% {
		opacity: 1
	}
	35.01% {
		opacity: .25
	}
	100% {
		opacity: .687625
	}
}

@-webkit-keyframes opacity-60-25-10-12 {
	0% {
		opacity: .791791666666667
	}
	83.3433% {
		opacity: .25
	}
	83.3533% {
		opacity: 1
	}
	43.3433% {
		opacity: .25
	}
	100% {
		opacity: .791791666666667
	}
}

@-webkit-keyframes opacity-60-25-11-12 {
	0% {
		opacity: .895958333333333
	}
	91.6767% {
		opacity: .25
	}
	91.6867% {
		opacity: 1
	}
	51.6767% {
		opacity: .25
	}
	100% {
		opacity: .895958333333333
	}
}
</style>