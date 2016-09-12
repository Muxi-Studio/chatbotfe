<template>
	<div class="top"></div>
	<div class="content" v-el:content>
		<div class="chatbot">
			<div class="img"></div>
			<div class="bubble">
				<div class="angle"></div>
				<div class="box"><p>你好，我是木小犀，我可以为你解答很多问题，也可以陪你聊天哟~<br/>
							如果你想问路，例如你要去图书馆，请问'华中师范大学图书馆在哪儿'；<br/>
							如果你想得到网址，例如你想知道信息门户的网址，请问'信息门户的网址'；<br/>
							如果你想得到照片，例如你想要图书馆的照片，请问'图书馆的照片'；<br/>
							如果你想得到资料或者通知等等，例如你想要华中师范大学的资料，请问'华中师范大学的资料'；<br/>
							如果你想和我聊天，就直接来吧。</p></div>
			</div>
		</div>
		<div v-for="myque in myques">
			<div class="user">
				<div class="img"></div>
				<div class="bubble">
					<div class="angle"></div>
					<div class="box"><p>${ myque.text }</p></div>
				</div>
			</div>
			<div class="chatbot">
				<div class="img"></div>
				<div class="bubble">
					<div class="angle"></div>
					<template v-if=" myque.tag == 'pic' ">
						<div class="box box-img"><img :src="myque.bot" v-on:click="largepic(myque)"></div>
					</template>
					<template v-if=" myque.tag == 'txt' ">
						<div class="box"><p>${ myque.bot }</p></div>
					</template>
					<template v-if=" myque.tag == 'web' "></div>
						<div class="box"><a href="${ myque.bot }">${ myque.bot }</a></div>
					</template>
					<template v-if=" myque.tag == 'map' ">
						<div id="box-${ myque.index }"></div>
					</template>
					<template v-if="myque.largepic">
						<div class="largepic">
							<div class="pic_box">
								<div class="close" v-on:click="close(myque)">X</div>
								<div class="pic_content"><img :src="myque.bot"></div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
		<user :user="user"  v-if="show" transition="expand"></user>
	</div>
	<div class="input">
		<input type="text" name="text" @focus="focus" placeholder="你想知道什么？" v-model="ques">
		<button @click="ask"></button>
	</div>
</template>
<style>
.expand-transition {
  transition: all .3s ease;
  overflow: hidden;
}
.expand-enter, .expand-leave {
  opacity: 0;
}
</style>
<script>
var request = require('superagent');
var user = require('./user.vue');
	export default {
		data (){
			return {
				ques:'',
				user:'',
				show: false,
				myques:[],
				index:1,
			}
		},
		components:{user:user},
		methods:{
			focus: function(){
				this.$els.content.scrollTop = this.$els.content.scrollHeight;
			},
			ask: function(){
				var text = this.ques.trim()
				this.user = text
				this.show = true
				var self=this;
				self.ques=''
				var url = '/' + text
				if (text) {
					request
						.post(url)
						.send({text : text})
						.end(function(err,res){
							if (err){
								console.log(err);
							}else{
								getcontent()
							}
						})
					function getcontent(){
						request
							.get(url)
							.end(function(err,res){
								if (err) throw err;
								self.show=false
								var mapindex = self.index;
								var tag = res.body.tag;
								var get = res.body.content;
								self.myques.push({ text: text, tag: tag, bot: get,index:mapindex,largepic: false});
								if (tag == 'map') {
									self.index++;
								}
								self.ques=''
								self.$nextTick(function(){
									if (tag == 'map') {
										map(get,mapindex);
									}
	                    			self.$els.content.scrollTop = self.$els.content.scrollHeight;
	                			});
							})
							function map(get,mapindex){
									var boxid = 'box-'+ mapindex;
									var mapid = 'map-'+ mapindex;
									var appendmap = document.getElementById(boxid);
									var mapcontent = document.createElement("div");
									mapcontent.setAttribute("id",mapid);
									appendmap.appendChild(mapcontent);
									var map = new BMap.Map(mapid);
									// var mappoint = '华中师范大学' +get; 
									map.centerAndZoom(get,18);
							}					
						}
				}
			},
			largepic: function(myque){
				myque.largepic = true;
			},
			close: function(myque){
				myque.largepic = false;
			}
		}
	}
</script>

