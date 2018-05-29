<template>
	<div>
		<div class="videoCt">
			<input type="hidden" :value="setVideoArr = videoArr" />
			<!--<video ref="videos" controls="controls" preload="auto">
			  <source :src="videoArr.substance" type="video/ogg" />
			  <source :src="videoArr.substance" type="video/mp4" />
			</video>-->
			<div class="video">
				<video-player  ref="videoPlayer"
		                :options="playerOptions"
		                preload="auto"
		                title="or listen state change"
		                @play="onPlayerPlay($event)"
		                @pause="onPlayerPause($event)"
		                @ended="onPlayerEnded($event)"
		                @loadeddata="onPlayerLoadeddata($event)"
		                @waiting="onPlayerWaiting($event)"
		                @playing="onPlayerPlaying($event)"
		                @timeupdate="onPlayerTimeupdate($event)"
		                @canplay="onPlayerCanplay($event)"
		                @canplaythrough="onPlayerCanplaythrough($event)"
		 
		                @statechanged="playerStateChanged($event)"
		                @ready="playerReadied">
		 		 </video-player>
			</div>
		</div>
	</div>
</template> 
<script>
	
import { mapGetters,mapActions } from 'vuex'
import { videoPlayer } from 'vue-video-player'
export default {
	props:{
		videoArr:{
			type:Object/Array,
			default:{}/[]
		}
	},
	data(){
		return {
			playerOptions: {
	          start: 60,
	          playsinline: false,
	          muted: true,
	          language: 'en',
	          playbackRates: [0.7, 1.0, 1.5, 2.0],
	          preload: 'auto',
	          sources: [{
	            type: "video/mp4",
	            src: ""
	          }],
	        },
	        item:null
		}
	},
	components: {
	    videoPlayer
	},
	computed: {
		...mapGetters([
          'userInfo',
          'getUserData',
          'getActivityOrder',
          'getActivityArr',
          'getAddBoxArr'
      	]),
		setVideoArr: {
		    get: function ( player) {
		    },
		    set: function (vo) {
		    	this.playerOptions.sources[0].src =vo.vo.data.src;
		    	this.item = vo.key;
		    }
		},
		player() {
	        return this.$refs.videoPlayer.player
	 },
	},
	
	methods: {
	    onPlayerPlay(player) {
	       // console.log('player play!', player)
	    },
	    onPlayerPause(player) {
	       // console.log('player pause!', player)
	    },
	    playerStateChanged(playerCurrentState) {
	       // console.log('player current update state', playerCurrentState)
	    },
	    playerReadied(player) {
	    	setTimeout(()=>{
	    		if(player.error() && player.error().code == 4){
		    		/*this.toastMsg("请检查视频地址是否有效");*/
		    		this.GoogleTranslate(player.error().message,(message)=>{
		    			this.toastMsg(message)
						this.getAddBoxArr.splice(this.item,1);
						this.$store.dispatch('setAddBoxArr',this.getAddBoxArr)
		    		})
		    	}
	    	},160)
	    },
	    playerError(player){
	    	console.info(player)
	    },
        onPlayerEnded(player) {
	       // console.log('player pause!', player)
	    },
        onPlayerLoadeddata(player) {
	       // console.log('player pause!', player)
	    },
        onPlayerWaiting(player) {
	       // console.log('player pause!', player)
	    },
        onPlayerPlaying(player) {
	       // console.log('player pause!', player)
	    },
        onPlayerTimeupdate(player) {
	      //  console.log('player pause!', player)
	    },
        onPlayerCanplay(player) {
	      //  console.log('player pause!', player)
	    },
        onPlayerCanplaythrough(player) {
	       // console.log('player pause!', player)
	    },
	}
}
</script>
<style lang="scss">
	.videoCt{
		width: 100%;
		padding: .2rem;
		overflow: hidden;
		video{
			width:100%;
		}
		.video-js{
			height: 3rem;
		}
		.vjs-control-bar{
		}
	}
</style>
