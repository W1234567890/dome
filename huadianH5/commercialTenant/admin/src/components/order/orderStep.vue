<template>
	<div class="orderStepWrap">
		<div class="orderStepContain" v-if="stepData.stepd>0&&stepData.stepd<5">
			 <div class="setpList">
		      <div class="stepItem" v-for="(vo,key) in stepList">
		       	    <div class="stepName" :class="stepData.stepd>key?'nameActive':''">{{vo.name}}</div>
		       	    <div class="stepBottom">
		       	    	<div class="line" :class="stepData.stepd>key?'lineActive':''"></div>
		       	    	<div class="step" :class="stepData.stepd>key?'stepActive':''">{{key+1}}</div>
		       	    	<div class="line" :class="stepData.stepd>key+1?'lineActive':''"></div>
		       	    </div>
		       </div>
		    </div>
		    <div class="stepTip" v-if="stepData.stepd==2">买家已于 {{stepData.closeTime}} 付了款,请尽快发货</div>
		</div>
		<div class="toBack" v-if="stepData.stepd>4">
			{{stepData.mes}}
		</div>
	</div>
</template>

<script>

    export default {
        props: {
        	stepData:{
        		type:Object,
        		Default:{}
        	}
        },
        data() {
        	return{
        		stepList:[{
        			name:"未付款"
        		},{
        			name:"待发货"
        		},{
        			name:"已发货"
        		},{
        			name:"已完成"
        		}]
    	 	 
            };
        },
        created(){
        	
        },
        mounted(){
        	
        },
        methods: {
      }
    };
</script>

<style scoped>
.orderStepWrap{
	width:100%;
	height:2rem;
	background: url('http://tjweimi.oss-cn-zhangjiakou.aliyuncs.com/images/weimiApi/h51500542977078orderStepBg.png') center center no-repeat rgba(0, 0, 0, 0.5);
    background-size: 100% 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.orderStepContain{
	width:100%;
	height:2rem;
	display: flex;
    flex-direction: column;
    align-items: center;
}
.toBack{
	width:100%;
	height:2rem;
	padding:0 2%;
	color:#FFFFFF;
	display: flex;
    justify-content: flex-start;
    align-items: center;
}
.setpList{
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.stepItem{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.stepName{
	color:#FFFFFF;
	font-size:.2rem;
	margin-bottom:.1rem;
	text-align: center;
}
.stepBottom{
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
.step{
	width:.5rem;
	height:.5rem;
	border:.05rem solid #FFFFFF;
	border-radius:50%;
	text-align: center;
	color:#FFFFFF;
}
.line{
	width:.6rem;
	height:.03rem;
	background: #FFFFFF;
}
.stepItem:first-child .line:first-child{
	visibility: hidden;
}
.stepItem:last-child .line:last-child{
	visibility: hidden;
}
.nameActive{
	color:#E7580C;
}
.stepActive{
   color:#E7580C;
   border:.05rem solid #E7580C;
}
.lineActive{
   background:#E7580C;
}
.stepTip{
	color:#FFFFFF;
	text-align: center;
	font-size:.24rem;
	margin-bottom:.2rem;
}
</style>