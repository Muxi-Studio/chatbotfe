<template>
	<div id="allmap"></div>
</template>

<style>
	#allmap{
		width: 100px;
		height: 100px;
	}
</style>

<script>
	require('../api/baidu.js');
	export default {
		data(){
			return {
				location:"广东"
			}
		},
		ready () {
			var map = new BMap.Map('#allmap');
			map.centerAndZoom("广东",19); 
		}	
	}
</script>
