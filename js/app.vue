<template>
	<div class="top"></div>
	<div class="content" v-el:content>
		<div class="chatbot">
			<div class="img"></div>
			<div class="bubble">
				<div class="angle"></div>
				<div class="box"><p>你好，欢迎进入木犀聊天平台。在这里，我们为你解答...</p></div>
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
					<template v-if=" myque.tag == 'unk'">
						<div class="box"><p>hahahahhahah</p></div>
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
	</div>
	<div class="input">
		<input type="text" name="text" placeholder="你想知道什么？" v-model="ques">
		<button @click="ask"></button>
	</div>
</template>

<script>
var request = require('superagent');
	export default {
		data (){
			return {
				ques:'',
				myques:[],
				index:1,
			}
		},
		methods:{
			ask: function(){		
				var text = this.ques.trim()
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
								var mapindex = self.index;
								var tag = res.body.tag;
								var get = res.body.content;
								self.myques.push({ text: text, tag: tag, bot: get,index:mapindex,largepic: false});
								if (tag == 'map') {
									self.index++;
								}
								self.ques=''
								self.$nextTick(function(){
									map(get,mapindex);
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

