const postUrl = {
	//关注/取消关注栏目-活动吧
	/*
	 * @param：id	String	Y		关注的栏目(主题分类)ID
	 */
	activity_type_setFocus:"activity/type/setFocus",
	
	
	//微信下单（报名/参与活动）接口-活动吧
	/*
	 * @param：payPosition	String	Y		支付对象类型：actAttend(参与活动)；actEnroll（报名）
 	 * @param：addressid		String	N		收货人地址ID,支付对象为actAttend(参与活动)，必传
 	 * @param：publishId		String	N		报名活动id，payPosition为“actEnroll”时必填
 	 * @param：reciverName	String	N		报名时填写的姓名，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
 	 * @param：reciverPhone	String	N		报名时填写的手机号，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
 	 * @param：totalpay		double	Y		订单总额
 	 * @param：goodList		String	Y		订单产品集合，goodList:[{"goodsId":"322382360379129856","goodsNum":1",goodsPayPrice":50}]
 	 * @param：goodsNum		int	Y		订单产品数量
 	 * @param：realpay		double	Y		交易金额
 	 * @param：state	int		N	0	是否勾选余额支付，1是，0否
	 */
	actPay_actWxpay:"actPay/actWxpay",
	
	
	//快递公司列表-活动吧（通过）
	order_expressList:"order/expressList",
	
	
	//物流信息-活动吧
	/*
	 * @param：expressCode		String	Y		快递公司代码，示例：tiantian
	 * @param：expressNo			String	Y		运单号
	 * @param：merchantinfoId	String	Y		合作商ID
	 */
	order_logisticsInfo:"order/logisticsInfo",
	
	
	//个人资料 - 活动吧(通过)
	/*
	 * @param：createByUserID	String	Y		个人用户ID
	 */
	activity_fans_personalInfo:"activity/fans/personalInfo",
	
	
	//删除评论回复-活动吧
	/*
	 * @param：d	String	Y		评论id
	 */
	activity_comment_reply_delete:"activity/comment/reply/delete",
	
	
	//添加主题评论回复-活动吧（通过）
	/*
	 * @param：commentId			String	Y		评论ID
 	 * @param：commentUserid		String	Y		被回复的用户ID
	 * @param：replyContent		String	Y		回复内容
	 */
	activity_comment_reply_add:"activity/comment/reply/add",
	
	
	//主题评论删除-活动吧
	/*
	 * @param：id	String	Y		评论id
	 */
	activity_comment_delete:"activity/comment/delete",
	
	
	//报名/参与免费活动-活动吧（通过）
	/*
	 * @param：name			String	N		姓名（报名）
	 * @param：phone			String	N		手机号（报名）
	 * @param：publishId		String	Y		主题id
	 */
	enroll_save:"enroll/save",
	
	
	//主题是否收藏过-活动吧 （通过）
	/*
	 * @param：publishId		String	Y		主题id（活动/报名/帖子）
	 */
	activity_favorite_exists:"activity/favorite/exists",
	
	
	//是否关注过用户-活动吧（通过）
	/*
	 * @param：focusUserid	String	Y		关注的用户id
	 */
	activity_fans_exists:"activity/fans/exists",
	
	
	//轮播banner数据接口-活动吧
	/*
	 * @param：merchantinfoId	String	Y		合作商ID
	 * @param：positionCode		String	Y		位置表示：此接口固定值为：activity_scroll_banner
	 */
	recommend_get:"recommend/get",
	
	
	//支付宝下单（报名/参与活动）接口-活动吧
	/*
	 * @param：payPosition	String	Y		支付对象类型：actAttend(参与活动)；actEnroll（报名）
	 * @param：addressid		String	N		收货人地址ID,支付对象为actAttend(参与活动)，必传
	 * @param：publishId		String	N		报名活动id，payPosition为“actEnroll”时必填
	 * @param：reciverName	String	N		报名时填写的姓名，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
	 * @param：reciverPhone	String	N		报名时填写的手机号，payPosition为“actEnroll”时，假如发布报名时有设置，则必填
	 * @param：totalpay		double	Y		订单总额
	 * @param：goodList		String	Y		订单产品集合，goodList:[{"goodsId":"322382360379129856","goodsNum":1",goodsPayPrice":50}]
	 * @param：goodsNum		int	Y		订单产品数量
	 * @param：realpay		double	Y		交易金额
	 * @param：state	int		N	0	是否勾选余额支付，1是，0否
	 */
	actPay_actAlipay:"actPay/actAlipay",
	
	
	//主题详情-活动吧(通过)
	/*
	 * @param：id	String	Y		主题ID（活动、帖子、报名ID）
	 */
	activity_detail:"activity/detail",
	
	
	//订单发货-活动吧
	/*
	 * @param：id			String	Y		订单ID
	 * @param：expressCode	String	Y		快递公司代码
	 * @param：expressNo		String	Y		快递单号
	 */
	order_sendGood:"order/sendGood",
	
	
	//订单详情-活动吧（通过）
	/*
	 * @param：id	String	Y		订单ID
	 */
	order_orderDetail:"order/orderDetail",
	
	
	//订单列表-活动吧（通过）
	/*
	 * @param：pageNum	int	Y		当前页
	 * @param：pageSize	int	N	10	每页显示的条数
	 */
	order_myOrders:"order/myOrders",
	
	
	//报名列表-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID（活动、报名、帖子ID）
	 * @param：pageNum	int	Y		当前页
	 * @param：pageSize	int	N	10	每页显示的条数
	 */
	enroll_list:"enroll/list",
	
	
	//商品列表-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID（活动、报名、帖子ID）
	 */
	activity_good_actGoods:"activity/good/actGoods",
	
	
	//打赏-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID(活动、帖子、报名)
	 * @param：rewardObjId	String	Y		礼物对象ID
	 * @param：toUserid	String	Y		打赏对象ID
	 * @param：num	String	Y		打赏数量，>1
	 */
	activity_reward_addReward:"activity/reward/addReward",
	
	
	//赏金列表-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID（活动、报名、帖子ID）
	 * @param：pageNum	int	Y		当前页
	 * @param：pageSize	int	N	10	每页显示的条数
	 */
	activity_reward_detailList:"activity/reward/detailList",
	
	
	//礼物列表-活动吧（通过）
	activity_reward_list:"activity/reward/list",
	
	
	//主题收藏列表-活动吧（通过）
	activity_favorite_list:"activity/favorite/list",
	
	
	//添加主题收藏-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID(活动、帖子、报名)
	 */
	activity_favorite_add:"activity/favorite/add",
	
	
	//粉丝列表-活动吧（通过）
	/*
	 * @param：pageNum	int	Y		当前页
	 * @param：pageSize	int	N	10	每页显示条数
	 */
	activity_fans_list:"activity/fans/list",
	
	
	//添加关注-活动吧（通过）
	/*
	 * @param：focusUserid	String	Y		关注的用户Id
	 */
	activity_fans_add:"activity/fans/add",
	
	
	//主题评论点赞-活动吧（通过）
	/*
	 * @param：id	String	Y		评论ID
	 */
	activity_comment_addlikes:"activity/comment/addlikes",
	
	
	//主题评论列表-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID(报名、活动、帖子的ID)
	 * @param：pageNum	int	Y	1	当前页
	 * @param：pageSize	int	N	10	每页显示条数
	 */
	activity_comment_list:"activity/comment/list",
	
	
	//添加主题评论-活动吧（通过）
	/*
	 * @param：publishId	String	Y		主题ID(报名、活动、帖子的ID)
	 * @param：content	String	Y		评论内容
	 */
	activity_comment_add:"activity/comment/add",
	
	
	//关注栏目列表-活动吧（通过）
	activity_type_focus:"activity/type/focus",
	
	
	//发布主题分类列表-活动吧（通过）
	/*
	 * @param：publishType	String	Y		发布类型 帖子，post，帖子 activity 活动，enroll 报名
	 */
	activity_type_list:"activity/type/list",
	
	
	//主题点赞-活动吧（通过）
	/*
	 * @param：id	String	Y		主题ID
	 */
	activity_addlikes:"activity/addlikes",
	
	
	//删除主题-活动吧（通过）
	/*
	 * @param：id	String	Y		主题ID
	 */
	activity_delete:"activity/delete",
	
	
	//我的主题列表-活动吧(通过)
	/*
	 * @param：publishType	String	N		发布类型，post，帖子 activity 活动，enroll 报名。 不传默认是全部
	 * @param：pageNum	int	Y	1	当前页
	 */
	activity_myList:"activity/myList",
	
	
	//主题列表-活动吧(通过)
	/*
	 * @param：publishType	String	N		发布类型，post，帖子 activity 活动，enroll 报名。 不传默认是全部
	 * @param：createByUserID	String	N		需要查看的用户ID
	 * @param：pageNum	int	N	1	当前页，不传默认为 1
	 * @param：pageSize	int	N	10	每页条数，不传默认为10条
	 * @param：queryType	int	N		1:置顶/推荐/精选 2 热门
	 * @param：merchantinfoId	String	Y		合作商ID
	 */
	activity_list:"activity/list",
	
	
	//发布主题-活动吧（通过）
	/*
	 * @param：publishType	String	Y		发布类型 ，post（帖子） activity( 活动)，enroll (报名)，live(视频)
	 * @param：title	String	Y		主题标题（报名/帖子/活动/视频）
	 * @param：content	String	Y		主题内容（报名/帖子/活动/视频）
	 * @param：titleImg	String	N		封面图片地址
	 * @param：publishTypeId	String	Y		主题分类ID
	 * @param：address	String	N		地址（发布活动及报名时需要填写）
	 * @param：goods	String	N		商品列表，详细参考下方备注中的请求参数示例
	 * @param：tel	String	N		咨询电话（报名）
	 * @param：limitPersons	int	N	0	活动限制人数（0表示不限制）
	 * @param：startTime	date	N		活动开始时间，时间戳：如：1496904590000
	 * @param：endTime	date	N		活动结束时间，时间戳：如：1496904590000
	 * @param：summary	String	N		摘要，用于前端列表页面展示
	 * @param：contentUrl	String	N		视频地址
	 * @param：needUsername	int	N		报名设置需要填写用户姓名 0 不需要 1 需要
	 * @param：needTel	int	N		报名设置需要填写用户手机号 0 不需要 1 需要
	 * @param：costsSet	int	N	1	0免费 1收费,不传默认是收费
	 */
	activity_publish:"activity/publish",
}
import * as _ from '../api/tool'

const isnull =[null,undefined,"",NaN];
const publish_type = ["post"];
//const productSerialNumber = "326407336442855424";

const isUser = true;

export default {
	methods:{
		productSerialNumber(){
			var isnull =[null,undefined,"",NaN];
			_.shareGoods( "product",res=>{
				res = res && res.replace(/"/g,"");
				locache.set("product",res);
			});
			//return (isnull.indexOf( locache.get("product")) <= -1) ? locache.get("product") : this.$router.currentRoute.query.pdSNum;
			return (isnull.indexOf( locache.get("product")) <= -1) ? locache.get("product") : this.pdSNum;
		},
		login( res,callback,bool){
			let url = "/login/login";
			let data = Object.assign(res, {
				phone: "15012887379",
				password: "123456",
				merchantinfoId: 1,
			});
			this.server(data, url, res=>{
				this.$store.dispatch("setXToken",res.data)
			}, bool);
		},
		/*publishType	String	N		发布类型，post，帖子
		createByUserID	String	N		需要查看的商户ID
		pageNum	int	N	1	当前页，不传默认为 1
		pageSize	int	N	10	每页条数，不传默认为10条
		queryType	int	N		1:置顶/推荐 2 热门
		productSerialNumber	String	Y		商户ID*/
		activityList1( res,callback,bool){
			let url = 'http://192.168.1.142:8090/a/rest/activity/list';
			this.server(res, url, callback, bool);
		},
		activityMyList1(res,callback,Reset,bool){
			let data = Object.assign(res, {
				prot: 'setActivityMyList',
				url: 'http://192.168.1.142:8090/a/rest/activity/myList',
			});
			this.introduce(data,callback,Reset,bool);
		},
		loginRefresh( res,callback,Reset,bool){
			let url = "";
			res = Object.assign(res, {
				prot: "setloginRefresh",
				url: "login/refresh",
			});
			this.ptrander(res, callback, Reset, bool);
		},
		//删除主题-活动吧（通过）
		activityDelete1( res,callback,bool){
			let url = "http://192.168.1.142:8090/a/rest/activity/delete";
			this.server(res, url, callback, bool);
		},
		//活动吧首页接口
		activityHomeIndex( res,callback,Reset,bool){
			let url = "";
			res = Object.assign(res, {
				modelCode: "activity_bar_home",
				prot: "setActivityHomeIndex",
				url: "activity/homeIndex",
			});
			this.ptrander(res, callback, Reset, bool);
		},
		//帖子分类列表
		activityTypeList1( res,callback,bool){
			let url = 'activity/type/list';
			let data = Object.assign(res, {
				publishType: "post",
				productSerialNumber: this.productSerialNumber(),
				isShowHomep: "1",
			});
			this.server(res, url, callback, bool);
		},
		//关注/取消分类(通过)
		activityTypeSetFocus( res,callback,bool){
			let url = 'activity/type/setFocus';
			let data = Object.assign(res, {
				productSerialNumber: this.productSerialNumber(),
			});
			this.server(res, url, callback, bool);
		},
		activityTypeDetail( res,callback,bool){
			let url = '/activity/type/detail';
			let data = Object.assign(res, {
				productSerialNumber: this.productSerialNumber(),
			});
			this.server(res, url, callback, bool);
		},
		//我的主题列表-活动吧(通过)
		activityMyList(res,callback,Reset,bool){
			let data = Object.assign(res, {
					url: 'activity/myList',
					prot: 'setActivityMyList',
			});
			this.introduce(data,callback,Reset,bool);
		},
		//主题列表-活动吧
		activityList(res,callback,Reset,bool){
			let data = Object.assign(res, {
					url: 'activity/list',
					prot: 'setActivityList',
					productSerialNumber: this.productSerialNumber(),
			});
			this.introduce(data,callback,Reset,bool);
		},
		//主题列表-活动吧
		activityTypeList(res,callback,Reset,bool){
			let data = Object.assign(res, {
				url: 'activity/type/list',
				prot: 'setActivityTypeList',
			});
			this.introduce(data,callback,Reset,bool);
		},
		//修改App用户基本信息接口-用户模块（通过）
		userModifyUser( res,callback,bool){
			let url = "user/modifyUser";
			this.server(res, url, callback, bool);
		},
		//主题评论列表-活动吧
		activityCommentList( res,callback,bool){
			let url = "activity/comment/list";
			this.server(res, url, callback, bool);
		},
		//添加主题评论-活动吧
		activityCommentAdd(res,callback,bool){
			let url = "activity/comment/add";
			this.server(res, url, callback, bool);
		},
		//主题评论点赞-活动吧
		ctivityCommentAddlikes( res,callback,bool){
			let url = "activity/comment/addlikes";
			this.server(res, url, callback, bool);
		},
		//轮播banner数据接口-活动吧
		recommendGet( res,callback,bool){
			let url = "recommend/get";
			this.server(res, url, callback, bool);
		},
		//主题是否收藏过-活动吧 （通过）
		activityFavoriteExists( res,callback,bool){
			let url = "activity/favorite/exists";
			this.server(res, url, callback, bool);
		},
		//关注栏目列表-活动吧（通过）
		activityTypeFocus( res,callback,bool){
			let url = "activity/type/focus";
			this.server(res, url, callback, bool);
		},
		//礼物列表-活动吧
		activityRewardList( res,callback,bool){
			let url = "activity/reward/list";
			this.server(res, url, callback, bool);
		},
		//赏金列表-活动吧
		activityRewardDetailList( res,callback,bool){
			let url = "activity/reward/detailList";
			this.server(res, url, callback, bool);
		},
		//打赏-活动吧
		activityRewardAddReward( res,callback,bool){
			let url = "activity/reward/addReward";
			this.server(res, url, callback, bool);
		},
		//商品列表-活动吧
		activityGoodActGoods( res,callback,bool){
			let url = "activity/good/actGoods";
			this.server(res, url, callback, bool);
		},
		//报名列表-活动吧
		enrollList( res,callback,bool){
			let url = "enroll/list";
			this.server(res, url, callback, bool);
		},
		//订单列表-活动吧
		orderMyOrders( res,callback,bool){
			let url = "order/myOrders";
			this.server(res, url, callback, bool);
		},
		//订单详情-活动吧
		orderOrderDetail( res,callback,bool){
			let url = "order/orderDetail";
			this.server(res, url, callback, bool);
		},
		//订单发货-活动吧
		orderSendGood( res,callback,bool){
			let url = "order/sendGood";
			this.server(res, url, callback, bool);
		},
		//主题详情-活动吧
		activityDetail( res,callback,bool){
			/*let url = (isUser ? "http://192.168.1.142:8088" : "http://192.168.1.142:8090") + "/a/rest/activity/detail";*/
			let url = "activity/detail";
			this.server(res, url, callback, bool);
		},
		
		//支付宝下单（报名/参与活动）接口-活动吧
		actPayActAlipay( res,callback,bool){
			let url = "actPay/actAlipay";
			this.server(res, url, callback, bool);
		},
		//添加微信/支付宝接口-提现模块
		cashAddThirdCard( res,callback,bool){
			let url = "activity/detail";
			this.server(res, url, callback, bool);
		},
		
		//发布主题-活动吧
		activityPublish(res,callback,bool){
			let url = "activity/publish";
			this.server(res, url, callback, bool);
		},
		//主题点赞-活动吧
		activityAddlikes(res,callback,bool){
			let url = "activity/addlikes";
			this.server(res, url, callback, bool);
		},
		//添加主题评论回复-活动吧
		activityCommonReplyAdd(res,callback,bool){
			let url = "activity/comment/reply/add";
			this.server(res, url, callback, bool);
		},
		//enroll/save
	    activityEnrollSave(res,callback,bool){
			let url = "enroll/save";
			this.server(res, url, callback, bool);
		},
		//主题收藏列表-活动吧（通过）
		activitFavoriteCancel( res,callback,bool){
			let url = "activity/favorite/list";
			this.server(res, url, callback, bool);
		},
		activityFavoriteAdd( res,callback,bool){
			let url = "activity/favorite/add";
			this.server(res, url, callback, bool);
		},
		//主题收藏-活动吧
		activityFansCancel( res,callback,bool){
			let url = "activity/fans/add";
			this.server(res, url, callback, bool);
		},
		//是否关注过用户-活动吧（通过）
	    activityFansExists( res,callback,bool){
			let url = "activity/fans/exists";
			this.server(res, url, callback, bool);
		},
		//添加主题收藏-活动吧（通过）
		activitFavoriteCancel( res,callback,bool){
			let url = "activity/favorite/add";
			this.server(res, url, callback, bool);
		},
		//微信下单（报名/参与活动）接口-活动吧
		actPayActWxpay(res,callback,bool){
			let url = "actPay/actWxpay";
			this.server(res, url, callback, bool);
		},
		//个人资料 - 活动吧(通过)
		activityFansPersonalInfo( res,callback,bool){
			let url = "activity/fans/personalInfo";
			this.server(res, url, callback, bool);
		},
		//删除主题-活动吧（通过）
		activityDelete( res,callback,bool){
			let url = "activity/delete";
			this.server(res, url, callback, bool);
		},
		
		
		server(	res, url, c, bool){
			let data = Object.assign(res, {
				productSerialNumber: this.productSerialNumber(),
			});
			this.getByUrl({data,url}, res=>{
				this.ajax({
					url : res.url,
					data : res.data,
					success:( res)=>{
						//console.log(res);
						if(!res){
							return;
						}
						let istrue = res && res.meta && res.meta.code == 10000;
						if(istrue){
							c && c (res, istrue);
						}
					}
				},bool,true);
			});
		},
		ptrander(res, c, Reset ,bool){
			let url = res && (res.url || ''),	
				prot = res && (res.prot || null),
				datas = [], type = 0, page = 0,
				data = Object.assign(res, {
					productSerialNumber: this.productSerialNumber(),
				});
				if(Reset){
					datas = Reset.data || [];
					page = Reset.page || 1;
				}
				this.getByUrl({data,url}, res=>{
					this.ajax({
			        	url : res.url,
						data : res.data,
			        	success:(res)=>{
			        		if(res && res.meta && res.meta.code == 10000){
			        			if(!Reset){
			        					datas = res.data;
			        					prot && this.$store.dispatch(prot, datas);
			        					c && c(true,datas)	
			        					return;
			        			}else{
			        				if(!Reset.page){
			        					datas.list = res.data.list;
			        				}else{
			        					datas.list = datas.list.concat(res.data.list);
			        				}
			        				datas.pageNum = res.data.pageNum;
			        				prot && this.$store.dispatch(prot, datas);
				        			c && c(true,datas);
			        			}
			        		}else{
			        			c && c(false,datas)
			        		}
			        	}
			       },bool,true)
				});
		},
		introduce(res, c, Reset ,bool){
			let url = res && (res.url || ''),	
				prot = res && (res.prot || null),
				MaxType = publish_type.length - 1,
				datas = [], type = 0, page = 0;
				
			if(Reset){
				datas = Reset.data || [];
				type = Reset.type || 0;
				page = Reset.page || 1;
			}
			
			let introduce = ()=>{
				let data = Object.assign(res, {
				   	'publishType' : publish_type[type],
				   	productSerialNumber: this.productSerialNumber(),
				})
				this.getByUrl({data,url}, res=>{
					this.ajax({
			        	url : res.url,
						data : res.data,
			        	success:(res)=>{
			        		if(res && res.meta && res.meta.code == 10000){
			        			if(!Reset){
			        				datas.push(res.data);
			        				if(type == MaxType){
			        					prot && this.$store.dispatch(prot, datas);
			        					c && c(true,datas)	
			        					return;
			        				}
			        				
		        					type++;
			        				introduce();
			        			}else{
			        				if(!Reset.page){
			        					datas[type].list = res.data.list;
			        				}else{
			        					if(Reset.page - 1 != res.data.pageNum){
			        						datas[type].list = datas[type].list.concat(res.data.list);
			        					}
			        				}
			        				datas[type].pageNum = res.data.pageNum;
			        				prot && this.$store.dispatch(prot, datas);
				        			c && c(true,datas);
			        			}
			        		}else{
			        			c && c(false,datas)
			        		}
			        	}
			       },bool,true)
				});
			};
			introduce();
		},
		
   	},
}