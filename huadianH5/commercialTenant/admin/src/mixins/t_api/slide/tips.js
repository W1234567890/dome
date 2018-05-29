import slide from './slides.js'
import routes from '@/route'
import store from '@/store'
export default {
    computed: {
        this () { 
        	return {
        		topDomMain:null,
        		topDomTime:null,
        		topDomContent:null,
        		bottomDomMain:null,
        		bottomDomContent:null,
        		topDomText: '',
        		tipsTime:'',
        		bottomDomText:'',
        	}
        }
    },
    watch: {
    	dom(){
    		console.info(this.dom)
    	}
	},
    methods: {
    	tipsInit(){
    		this.topDomText = '';
    		this.tipsTime = '2012/11/11 11:20';
    		this.createTipsDom = {
    			topDom:()=>{
    				this.topDomMain = '';
		       		this.topDomMain = document.createElement('div');
					this.topDomMain.className = 'tipsTopDom alignCenterVertical word-break';
					this.topDomMain.style.color = '#3C3C3C';
					this.topDomMain.style.fontSize = '.28rem';
					this.topDomMain.style.textAlign = 'center';
					this.topDomMain.style.position = 'absolute';
					this.topDomMain.style.top = '-1rem';
					this.topDomMain.style.left = '0';
					this.topDomMain.style.right = '0';
					this.topDomMain.style.margin = 'auto';
					this.topDomMain.style.height = '1rem';
					this.topDomMain.style.width = '100%';
					
					
					this.topDomTime = '';
					this.topDomTime = document.createElement('div');
					this.topDomTime.innerText = this.tipsTime || '';
					this.topDomTime.className = 'tipsTopDomTime';
					
					this.topDomContent = '';
					this.topDomContent = document.createElement('div');
					this.topDomContent.innerText = this.topDomText || '';
					this.topDomContent.className = 'tipsTopDomContent';
					
					this.topDomMain.appendChild(this.topDomContent);
					this.topDomMain.appendChild(this.topDomTime);
					
					this.dom.appendChild(this.topDomMain)
					
					/*this.topDom.dragPerMain.appendChild(this.t_api.businCt);*/
    			},
    			bottomDom:()=>{
    				this.bottomDomMain = '';
		       		this.bottomDomMain = document.createElement('div');
					this.bottomDomMain.className = 'tipsBottomDom alignCenterVertical word-break';
					this.bottomDomMain.style.color = '#3C3C3C';
					this.bottomDomMain.style.fontSize = '.28rem';
					this.bottomDomMain.style.textAlign = 'center';
					this.bottomDomMain.style.position = 'absolute';
					this.bottomDomMain.style.bottom = '-.6rem';
					this.bottomDomMain.style.left = '0';
					this.bottomDomMain.style.right = '0';
					this.bottomDomMain.style.margin = 'auto';
					this.bottomDomMain.style.height = '.6rem';
					this.bottomDomMain.style.width = '100%';
					
					
					this.bottomDomContent = '';
					this.bottomDomContent = document.createElement('div');
					this.bottomDomContent.innerText = this.topDomText || '';
					this.bottomDomContent.className = 'tipsTopDomContent';
					
					this.bottomDomMain.appendChild(this.bottomDomContent);
					this.dom.appendChild(this.bottomDomMain)
    			}
    		}
    		this.editTipsDom = {
    			topDom:( content, time)=>{
    				try{
    					if(this.topDomContent && this.topDomTime){
    						this.topDomTime.innerHTML =  this.getTime(this.$store.state.user.time) || this.getTime(new Date() / 1000);
							this.topDomContent.innerHTML = content || this.topDomContent.innerText ;
    					}
    				}catch(err){
    					console.info(err)
    				}
    			},
    			bottomDom:( content, time)=>{
    				if(this.bottomDomContent){
    					if(!store.state.com.isMaxPage){
    						this.bottomDomContent.innerHTML = content || this.bottomDomContent.innerText ;
    					}else{
    						this.bottomDomContent.innerHTML = "";
    					}
						
					}
    			}
    		}
	    	this.$nextTick(()=>{
	    		if(this.isTopCallback){
	    			let Interval = setInterval(()=>{
		    			if(this.dom){
		    				clearInterval(Interval);
		    				this.createTipsDom.topDom();
		    			}
		    		})
	    		}
	    	})
	    	this.$nextTick(()=>{
	    		if(this.isBottomCallback){
	    			let Interval = setInterval(()=>{
		    			if(this.dom){
		    				clearInterval(Interval);
		    				this.createTipsDom.bottomDom();
		    			}
		    		})
	    		}
	    	})
    	},
    	getTime(nS) {
			if(nS != 0 && nS) {
				let date = new Date(nS * 1000),
					Y = date.getFullYear() + '/',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/',
					D = (date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()) + ' ',
					h = (date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours()) + ':',
					m = (date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + '',
					s = date.getSeconds(),
					data = Y + M + D + h + m;
					console.info()
				return data;
			} else {
				return null;
			}
		},
    },
    create:{
    	init(){
    		
    	}
    },
    mounted() {
		this.tipsInit();
	}
};