<template>
	<div class="content">
		<div class="boxContent" v-for="(vo,key) in getAddBoxArr" :class="vo.type+'Wrap'">
			<div v-if="vo.type=='text'">
				<div class="auto-textarea-wrapper">
				    <p class="auto-textarea-block" ref="substance"></p>
				    <textarea
				    	v-textarea:value="vo.data.value"
				      	ref="sub_input"
				      	autofocus="true"
				      	spellcheck="false"
				      	@input="restText($event,key)"
				      	placeholder="添加商品详情" 
				      	v-model="vo.data.value"
				      	class="auto-textarea-input">
				    </textarea>
				</div>
			</div>
			<div v-if="vo.type=='img'">
				<div class="dragPerBg"><img :src="vo.data.f"/></div>
			</div>
			<div v-if="vo.type=='line'">
				<div class="dragPerBg"><img  class="line" :src="vo.data.line"/></div>
			</div>
			<div v-if="vo.type=='video'">
				 <videoComment :videoArr="{vo,key}"></videoComment>
			</div>
		    <div class="acBtns" v-if="vo.type!='title'" :class="vo.type=='text'?'acTextFot':''"> 
	 	  	  <div  class="acBtnsItem" 
		 	  	  	@click="RestBox(v.rest,key)" 
		 	  	  	v-if="key > 0 || v.name != '上移'"
		 	  	  	v-for="(v,k) in btnArr">
	 	  	  	
	 	  	  	 <span class="iconfont" v-html="v.icon"></span>
	 	  	  	 <span>{{v.name}}</span>
	 	  	  	 
	 	  	  </div>
		    </div>
		</div>
	</div>
</template> 
<script>
import videoComment from '../consumption/activity/activityItem/videoComment.vue'
import { mapGetters,mapActions } from 'vuex'
export default {
	data(){
		return {
    	 	btnArr: [
	    	 	{name: '删除',rest: 'deletes',icon: "&#xe692;"},
	    	 	{name: '上移',rest: 'resttop',icon: "&#xe6cc;"},
	    	 	{name: '插入',rest: 'add',icon: "&#xe6cc;"},
    	 	]
		}
	},
	computed: {
      ...mapGetters([
          'userInfo',
          'getUserData',
          'getActivityOrder',
          'getActivityArr',
          'getAddBoxArr'
      ]),
    },
	components: {
		videoComment
	},
	methods: {
		RestBox( o, k){
			let 
			_self = this,
			func = {
				deletes(o, k){
					_self.getAddBoxArr.splice(k,1);
					_self.$store.dispatch('setAddBoxArr',_self.getAddBoxArr)
				},
				resttop(o, k){
					let data = _self.getAddBoxArr[k - 1],
						data1 = _self.getAddBoxArr[k];
					_self.getAddBoxArr.splice(k, 1, data);
					_self.getAddBoxArr.splice(k - 1, 1, data1);
					_self.$store.dispatch('setAddBoxArr',_self.getAddBoxArr)
				},
    	 		add(o, k){
					_self.$emit('RestDataArr', {o,k});
				},
			}
			func[o]( o, k);
		},
		restText( e,k){
			setTimeout(()=>{
				this.getAddBoxArr[k].data.html = e.target.previousElementSibling.innerHTML.replace(/&nbsp;/ig, "");
				let data = this.getAddBoxArr[k];
				this.getAddBoxArr.splice(k,1,data)
				this.$store.dispatch('setAddBoxArr',this.getAddBoxArr)
			},160)
		},
	    player( e){
	    	if(e.errer){
	    		if(typeof e.key == "number")
	    		this.$emit('deleteIndex',e.key);
	    	}
	    }
	}
}
</script>
<style>
.car_br{
	height: .4rem;
}
</style>
<style lang="scss" scoped>
	
	.boxContent{
		position: relative;
		background: #ffffff;
		padding-bottom: .2rem;
	    .auto-textarea-wrapper{
	  	 	position: relative;
	  	 	border:1px solid #EAEAEA;
   	        border-radius: .06rem;
   	        padding: .2rem;
   	        padding-bottom: .8rem;
   	        overflow: hidden;
	   		.auto-textarea-block{
	   	        font-size: .3rem;
	   	        word-break:break-all; 
	   	        word-wrap:break-word;
	   	        visibility: hidden;
	   	        position: absolute;
	   	        left: 0;
	   	        top: 0;
	   	        padding: 0 .2rem;
	   	    }
	   	    textarea{
   	        	box-sizing: border-box;
   	        	display: block;
   	        	border: 0;
   	        	outline: none;
   	        	width: 100%;
   	        	height: .4rem;
   	        	min-height: .4rem;
   	        	font-size: .3rem;
   	        	font-family: "\5FAE\8F6F\96C5\9ED1";
    			-webkit-font-smoothing: antialiased;
		   	} 
		   	textarea::-webkit-scrollbar{
			  width: 2px;
			  height: 2px;
			}
			textarea::-webkit-scrollbar-track-piece{
			  background-color: rgba(0,0,0,0);
			  -webkit-border-radius: .2rem;
			}
			textarea::-webkit-scrollbar-thumb:vertical{
			  height: auto;
			  background-color: rgba(0,0,0,0);
			  -webkit-border-radius: .2rem;
			}
			textarea::-webkit-scrollbar-thumb:horizontal{
			  width: 26px;
			  background-color: rgba(0,0,0,0);
			  -webkit-border-radius: .2rem;
			}
	   	    .video-js{
			  /*height: 1rem;*/
		    }
	    }
	}
	.dragPerBg{
		box-sizing: border-box;
		border:1px solid #EAEAEA;
		border-radius: .06rem;
		img{
			vertical-align:bottom;
		}
	}
	
	.textWrap{
		
	}
	.lineWrap{
		width:100%;
	}
   .acBtns{
        position:absolute;
        bottom:.2rem;
	    right:0;
	    z-index: 0;
        line-height: .4rem;
        background-color: rgb(237,237,237);
        border: 1px solid rgb(223,223,223);
        box-sizing: border-box;
	    .acBtnsItem{
	 	    display:inline-block;
		    color:#999;
		    font-size:.28rem;
		    position: relative;
		    padding:.1rem;
		    .iconfont{
			    font-size:.32rem;
		    }
	    }
	    .acBtnsItem:not(:last-child):after{
	    	content: "";
	    	height: 100%;
	    	width: 1px;
	    	background-color: rgb(223,223,223);
	    	right: 0;
	    	top: 0;
	    	margin: auto;
	    	position: absolute;
	    }
   }
   .acTextFot{
   	   position:absolute;
       bottom:.2rem;
	   right:0;
       line-height: .4rem;
   }
   
 
  
	.vjs-control-bar{
		border: solid 1px red;
	}
</style>
