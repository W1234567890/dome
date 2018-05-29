<template>
</template>

<style scoped>
.row{display: flex;}
.col{flex-grow:1;}
select{width:96%;padding:.5rem;border:1px solid #eee;margin:2%;border-radius: .3rem;font-size: 1.2rem;}
</style>

<script>
import data from "src/config/city.data-3.js"
export default {
	data:function(){
		return {
           data:data,
           pro:"",
           city:"",
           county:"",
           f:{
	           p:0,
	           c:0,
	           cc:0,
       		}
		}
	},
	mounted(){
		var pickerDependent = myApp.picker({
		    input: '#picker-dependent',
		    rotateEffect: true,
		    formatValue: (picker, values)=> {
		    		this.$emit('values',values)
		        return values[0] + " " + values[1] + " " + values[2];
		    }, 
		    cols: [
		        {
		            values: (()=>{
		            		let data = [];
		            		this.pro.filter((vo,key)=>{
		            			data.push(vo.text);
		            		})
		            		return data;
		            })(),
		            onChange: (picker, country)=> {
		            		let data = [],data1 = [];
		                if(picker.cols[1].replaceValues){
		                		this.pro.filter((vo,key)=>{
		                			if(country == vo.text){
		                				this.f.p = key;
		                				for(var i = 0;i<vo.children.length;i++){
		                					data.push(vo.children[i].text)
		                					if(vo.children[i].children){
		                						for(var b = 0;b<vo.children[i].children.length;b++){
			                						data1.push(vo.children[i].children[b].text)
			                					}
		                					}
		                				}
		                				this.$nextTick(()=>{
		                					picker.cols[1].replaceValues(data);
		                					picker.cols[2].replaceValues(data1);
		                				})
		                				return;
		                			}
			            		})
		                }
		            },
		            width: "33.3%",
		            textAlign: "right",
		        },
		        {
		        		width: "33.3%",
		            textAlign: "center",
		            values: (()=>{
		            		let data = [];
		            		this.pro[this.f.p].children.filter((vo,key)=>{
		            			data.push(vo.text);
		            		})
		            		return data;
		            })(),
		            onChange: (picker, country)=> {
		            		let data1 = [];
		                if(picker.cols[2].replaceValues){
		                		this.pro[this.f.p].children.filter((vo,key)=>{
		                			if(country == vo.text){
		                				this.f.c = key;
		                				for(var i = 0;i<vo.children.length;i++){
		                					data1.push(vo.children[i].text);
		                				}
		                				this.$nextTick(()=>{
		                					picker.cols[2].replaceValues(data1);
		                				})
		                				return;
		                			}
			            		})
		                }
		            }
		        },
		        {
		        		width: "33.3%",
		            textAlign: "left",
		            values: (()=>{
		            		let data = [];
		            		this.pro[this.f.p].children[this.f.c].children.filter((vo,key)=>{
		            			data.push(vo.text);
		            		})
		            		return data;
		            })(),
		            onChange: (picker, country)=> {
		            		this.pro[this.f.p].children[this.f.c].children.filter((vo,key)=>{
		            			if(country == vo.text){
		                			this.f.cc = key;
		                		}
		            		})
		            }
		        },
		    ]
		});
	},
	created:function(){
		this.pro=this.data;
	},
	methods:{
		
	}
}	
</script>