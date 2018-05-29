<template>
	<div class="prompt">
		<div class="prompt_main_dg"></div>
		<div class="prompt_main">
			<div class="prompt_main_title">提示</div>
			<div class="prompt_main_content">{{prompts.placeholder || '请输入内容'}}:</div>
			<div class="prompt_main_input_main">
				<div class="prompt_main_input">
					<input type="text" name="" id="" value="" :placeholder="prompts.placeholder || '请输入内容'" v-model="prompts.content"/>
				</div>
			</div>
			<div class="prompt_main_btn">
				<div v-for="(vo,key) in prompts.Array || ['确定','取消']" @click="hide(!!!key)">
					{{vo}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
      	
      }
    },
    computed: {
	    ...mapState({
	    	prompts: state => {
	    		return state.com.prompt;
	    	},
	    })
	},
    methods: {
		hide( bool){
			this.prompts.callback && this.prompts.callback(bool,this.prompts.content);
			this.prompts.show = false;
			this.prompts.content = null;
   		},
	},
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/function.scss";
.prompt{
	.prompt_main_dg{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		margin: auto;
		background-color: rgba(0,0,0,.1);
		z-index: 1113;
	}
	.prompt_main{
		/*height: 3.73rem;*/
		border-radius: .2rem;
		overflow: hidden;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1113;
		color:$B_H1;
		margin: auto .8rem;
	    display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.prompt_main_input_main{
			background-color: $B_H6;
			padding: $P_LRTB;
			width: 100%;
			.prompt_main_input{
				padding: $P_LRTB;
				background-color: $B_B;
				border-radius: .01rem;
				border: .02rem solid $B_H4;
				width: 100%;
				font-size: $CF32;
				input{
					width: 100%;
					box-sizing: border-box;
					border-style: none;
					border: 0;
					outline: none;
				}
			}
		}
		
		.prompt_main_title{
			width: 100%;
			padding: $P_TB 0;
			background-color: $B_H6;
			border-radius: .2rem .2rem 0 0;
		}
		.prompt_main_title,.prompt_main_content{
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			background-color: $B_H6;
			width: 100%;
			font-size: $CF32;
		}
		.prompt_main_btn{
			display: flex;
			display: -webkit-flex;
			border-top: .02rem solid $B_H4;
			box-sizing: border-box;
			color: $B_F1;
			border-radius: 0 0 .2rem .2rem;
			overflow: hidden;
			width: 100%;
			font-size: $CF32;
			div{
				flex: 1;
				justify-content: center;
				align-items: center;
				display: inline-flex;
				padding: .25rem 0;
				background-color: $B_H6;
			}
			div:not(:last-child){
				border-right: .02rem solid $B_H4;
				box-sizing: border-box;
			}
		}
	}
}
</style>