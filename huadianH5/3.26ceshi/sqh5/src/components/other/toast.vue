<template>
	<div class="toast">
		<div class=" slidesClassMain" ref='slidesClassMain'>
			<div class="slides_main" v-slide>
		        <!--<div class="mask"></div>-->
		        <div class="toast-wrap">
		            <div>
		                <i class="icon iconfont cbai success" v-show="success">&#xe657;</i>
		                <i class="icon iconfont cbai fail" v-show="fail">&#xe656;</i>
		            </div>
		            <div class="text">
		                {{toastMsg}}
		            </div>
		        </div>
	        </div>
	    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {

        }
    },
    computed: mapState({
        success: state => state.com.showSuccess,
        fail: state => state.com.showFail,
        toastMsg: state => state.com.toastMsg
    })
}
</script>

<style lang="scss">
@import 'src/assets/css/function';
.toast {
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
		    .toast-wrap {
		        position: fixed;
		        width: px2rem(280px);
		        height: px2rem(280px);
		        left: 50%;
		        top: 50%;
		        transform: translate(-50%, -50%);
		        border-radius: px2rem(15px);
		        background: rgba(0,0,0,0.7);
		        display: flex;
		        justify-content: center;
		        align-items: center;
		        flex-direction: column;
		        z-index: 1002;
		        .icon {
		            font-size: px2rem(80px);
		        }
		        .text {
		            font-size: 14px;
		            color: #fff;
		            margin-top: px2rem(20px);
		            text-align: center;
		            padding: 0 .1rem;
		        }
		        .cbai{
		        	color: #FFF;
		        }
		        .fail,.success{
		        	height: .74rem;
		        	width: .74rem;
		        	text-align: center;
		        	line-height: .7rem;
		        	display: inline-block;
		        }
		        .fail{
		        	font-size: .74rem;
		        }
		        .success{
		        	font-size: .66rem;
		        }
		    }
	    }
	    ._scrollbar{
	    	visibility: hidden;
	    	._indicator{
	    		visibility: hidden;
	    	}
	    }
    }
}
</style>