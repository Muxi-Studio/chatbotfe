module.exports = function() {
//config
var Vue=require('vue');
// var map = require('./map.vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];

var vm = new Vue({
		el: "body",
		directives: { focus: focus },
		data: {
			ques:'',
			myques:[]
		},
		// components: {
		// 	app : map
		// },
		methods:{
			ask: function (){
						var text = this.ques.trim()
						request
							.get('/second')
							.end(function(err,res){
								if (err && err.status === 404) {
									var tag = unk;
									var get = "";
								}else if (err) {
									throw err
								}else{
									var tag = res.body.tag;
									var get = res.body.content;
								};
								vm.myques.push({ text: text, tag: tag, bot: get,largepic: false});
								vm.ques=''
								vm.$nextTick(function(){
	                    		vm.$els.content.scrollTop = vm.$els.content.scrollHeight;
	                			});
							})
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