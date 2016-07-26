module.exports = function() {
//config
var Vue=require('vue')
var request = require('superagent');
Vue.config.delimiters = ['${', '}']
new Vue({
		el: "body",
		data: {
			ques:'',
			myques:[],
		},
		methods:{
			ask: function(){		
				var text = this.ques.trim()
				if (text) {
					this.myques.push({ text: text})
					this.ques = ''
				}
				this.$nextTick(function(){
                    this.$els.content.scrollTop = this.$els.content.scrollHeight;
                });
			}
		}
	})
}