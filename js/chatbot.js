module.exports = function() {
//config
var Vue=require('vue')
var request = require('superagent');
Vue.config.delimiters = ['${', '}']
var vm = new Vue({
		el: "body",
		data: {
			ques:'',
			myques:[]
		},
		methods:{
			ask: function(){		
				var text = this.ques.trim()
				if (text) {
					request
						.get('http://localhost:3000/second')
						.query({ query: text })
						.end(function(err,res){
							if (err) throw err;
							var tag = res.body.tag;
							var get = res.body.content;
							vm.myques.push({ text: text, tag: tag, bot: get,largepic: false})
							vm.ques=''
							vm.$nextTick(function(){
                    		vm.$els.content.scrollTop = vm.$els.content.scrollHeight;
                			});
						})
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
}