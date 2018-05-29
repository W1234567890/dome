<template>
    <div class="weui_loading_toast" id="loadingToast">
    	<div class="weui_mask_transparent"></div>
    	<div class="weui_toast">
    		<div class="weui_loading">
    			<div class="weui_loading_leaf" :class="'weui_loading_leaf_'+key" v-for="(v,key) in 12"></div>
    		</div>
    		<p class="weui_toast_content">加载中</p>
    	</div>
    </div>
</template>