<template>
<div class="toCommentMain">
	<div class=" slidesClassMain" ref='slidesClassMain' v-show="isShow" :style=[opacity]>
		<div class="slides_main" ref="slides_main" v-scrollt>
			<div id="toComment">
				<div class="toCt_bg" @click="hide"></div>
				<div class="toComment" ref="toComment">
					<div class="flex toCt_btn">
						 <div class="toCt_send" disabled="true" :class="send?'toCt_Active':''" :disabled="send" @click="addComment">
						 	<span>发送</span>
						 </div>
						 <div class="toCt_hide" disabled="true" @click="hide">
						 	<span>取消</span>
						 </div>
					</div>
			    	 <div class="replyWrap">
					     <textarea class="replyTextArea" @blur="bottom('blur')" @focus="bottom('focus')" maxlength="200" v-model="reply_value" :placeholder="'回复'+reply_place" @input="replyItems()">
					      </textarea>
				     </div>
			    </div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
		    reply_value:null,
		    reply_place:"楼主",
			replyFloor:0, //0代表楼主,1代表外层评论者，2代表内层回复者
			floorIndex:null, //楼层编号
			inlineIndex:null, //楼层内回复的编号
			send:false,
			arr: {},
			isShow:true,
			opacity: {
				'opacity': 0,
				"display" : 'none'
			},
			domRect: null,
			
			dataArr: null,
	  }
	},
	watch: {
		getToComment( e){
			this.animateRepay( e);
			if(!this.isnull(e.data)){
				this.dataArr = e;
				this.reply_place = e.data.createByName || "楼主";
			}else{
				this.reply_place = "楼主";
			}
		}
	},
	mounted() {
		if(this.$refs.toComment){
			this.domRect = this.$refs.toComment.getBoundingClientRect();
			this.init();
			this.isShow = false;
		}
		let that = this;
		let winHeight = window.innerHeight;
		window.addEventListener('resize',function(){
		   var thisHeight=this.innerHeight;
		   var scrollTop=document.querySelectorAll('body').scrollTop;
		   var btns = that.$refs.toComment;
		   	if(!btns){
		   		return;
		   	}
		    if(winHeight - thisHeight >50){
		         //当软键盘弹出，在这里面操作
		        that.shareGoods("input",res=>{that.other_translates( that.$refs.toComment,res||-that.$refs.toComment.clientHeight);})
		    }else{
		    	//当软键盘收起，在此处操作
		    	that.shareGoods("input",res=>{that.other_translates( that.$refs.toComment,res||-1);})
		    }
		});
	},
	computed: {
      ...mapGetters([
          'getToComment'
      ]),
    },
	methods: {
		init(){
			this.other_translates(this.$refs.toComment, this.domRect.height);
		},
		hide(){
			this.$store.dispatch("setToComment",{
		    	isShow: false,
		    })
		},
		animateRepay( e){
			if(!this.isShow){
				this.isShow = e.isShow;
				this.opacity = {
					"opacity" : 1,
					"display" : 'block'
				}
			}
			if(this.$refs.toComment){
				this.other_hide( e.isShow,this.domRect.height,()=>{
					if(!e.isShow){
						this.isShow = e.isShow;
						this.opacity = {
							"opacity" : 1,
							"display" : 'none'
						}
						this.reply_value = null;
						this.dataArr = null;
					}
				})
			}
			
		},
		other_hide( bool,domRect,callback){
			let init = 0,start = 0,lineto,during = 15;
			!bool ? lineto = domRect : (lineto = -domRect,init = domRect);
            let run = ()=>{
            	start++;
            	this.y = this.QuadEaseInOut(start,init,lineto,during);
            	this.other_translates( this.$refs.toComment,this.y);
            	if(start < during){
            		requestAnimationFrame(run);
            	}else{
            		callback();
            	}
            }
            run();
            this.isother = !bool;
		},
		
		other_translates( dom,y){
			if(!dom || !y){
				return;
			}
			dom.style.webkitTransform = 'translate(' + [0, y + 'px'].join(',') + ')';
            dom.style.transform = 'translate3d(' + [0, y + 'px', 0].join(',') + ')';
		},
		QuadEaseInOut(t, b, c, d) { 
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		    return -c / 2 * ((--t) * (t-2) - 1) + b;
		},
		replyItems(){
			if(this.reply_value&&this.reply_value.trim()){
				this.send=true;
			}else{
				this.send=false;
			}
		},
		addComment(){
			if(this.reply_value == "" || this.reply_value == undefined){
				this.hide();
				return;
			}
			if(!this.isnull(this.dataArr) && !this.isnull(this.dataArr.data)){
				let x = !this.isnull(this.dataArr.x) ? this.dataArr.x.commentId : this.dataArr.data.id,
					userId = !this.isnull(this.dataArr.x) ? this.dataArr.x.createByUserID : this.dataArr.data.createByUserID;
					this.activityCommonReplyAdd({
						commentId: x,
						commentUserid: userId,
						replyContent: this.reply_value,
					},res=>{
						this.rest();
					})
			}else{
				this.activityCommentAdd({
					publishId:this.$router.currentRoute.query.id,
					content: this.reply_value,
				},res=>{
					this.rest();
				})
			}
		},
		rest(){
			this.activityCommentList({
		    	publishId: this.$router.currentRoute.query.id,
		    	pageNum: 1,
		    	pageSize: 10,
		   },(res)=>{
		    	this.$store.dispatch("setActivityCommentList",res.data)
		    	this.hide();
		    })
		},
		bottom( m){
			/*let ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
			}else if(/android|midp|rv:1.2.3.4|ucweb|windows ce|windows mobile/.test(ua)){
				switch (m){
					case "focus":
						this.shareGoods("input",res=>{this.other_translates( this.$refs.toComment,res||-this.$refs.toComment.clientHeight);})
						break;
					case "blur":
						this.shareGoods("input",res=>{this.other_translates( this.$refs.toComment,res||0);})
						break;
					default:
						break;
				}
				
			}else{
			}*/
		},
	}
}
</script>

<style lang="scss">
@import "~src/assets/css/function.scss";
.toCt_bg{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 1001;
}
.toCommentMain{
	z-index: 111;
	.slidesClassMain{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 1001;
		background-color: rgba(0,0,0,.4);
		.slides_main{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.toComment{
				width:100%;
				background:#FFFFFF;
				position: fixed;
				bottom:0;
				z-index: 1002;
				.replyWrap{
					width: 100%;
					padding: 0 .2rem;
					position: relative;
					margin-top:.05rem;
					margin-bottom: .1rem;
					.replyTextArea{
						width:100%;
						font-size:.28rem;
						line-height:.36rem;
						min-height: 3rem;
						outline:0 none;
					   	padding: .2rem;
					    box-sizing: border-box;
					    border:1px solid #EAEAEA;
						border-radius:.05rem;
					}
				}
				.toCt_btn{
					padding: .1rem .2rem;
					border-top: .02rem solid #E8E8E8;
					.toCt_send,.toCt_hide{
						width: 50%;
						span{
							display: inline-block;
							padding: .1rem .25rem;
							font-size: .28rem;
							border-radius: .06rem;
							border: 1px solid #E8E8E8;
							box-sizing: border-box;
						}
					}
					.toCt_Active{
						span{
							background:#F06767;
							color:#FFFFFF;
							border-color: transparent;
						}
					}
					.toCt_send{
						
					}
					.toCt_hide{
						span{
							float: right;
						}
					}
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