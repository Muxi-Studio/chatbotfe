module.exports = function() {
//config
var Vue=require('vue');
// var map = require('./map.vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];

var vm = new Vue({
		el: "body",
		data: {
			ques:'',
			myques:[]
		},
		// components: {
		// 	app : map
		// },
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
								var tag = res.body.tag;
								var get = res.body.content;
								vm.myques.push({ text: text, tag: tag, bot: get,largepic: false});
								vm.ques=''
								vm.$nextTick(function(){
	                    		vm.$els.content.scrollTop = vm.$els.content.scrollHeight;
	                			});
							})
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
	})
	// Vue.directive('bmap', {
	// 	bind:function(){
	// 		var map = new BMap.Map();
	// 		map.centerAndZoom(); 
	// 	},
	// 	update:function(){
	// 		var map = new BMap.Map(this.el);
	// 		map.centerAndZoom(this.arg,19);
	// 	}
	// })
	// var bmap = new Vue({
	// 	el:'#bmap',
	// 	data:{
	// 		msg:"广东"
	// 	}
	// })
}