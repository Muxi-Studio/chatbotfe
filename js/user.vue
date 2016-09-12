<template>
	<div class="user">
		<div class="img"></div>
		<div class="bubble">
			<div class="angle"></div>
			<div class="box"><p>${ user }</p></div>
		</div>
	</div>	
</template>
<script>
	export default {
		props:{
	    	user: {
	          	type: String
	      	}
  	}
	}
</script>