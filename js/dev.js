module.exports = function() {
//config
var Vue=require('vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];
new Vue({
		el: "#wrap",
		data: {
			ques:'',
			myques:[],
			index:1,
		},
		methods:{
			ask: function (){
						var text = this.ques.trim()
						this.user = text
						this.show = true
						var self=this;
						self.ques=''
						if (text) {
							request
							.get('/second')
							.end(function(err,res){
								// self.show=false
								// if (err) throw err;
								// var mapindex = self.index;
								// var tag = res.body.tag;
								// var get = res.body.content;
								// self.myques.push({ text: text, tag: tag, bot: get,index:mapindex,largepic: false});
								// if (tag == 'map') {
								// 	self.index++;
								// }
								// self.$nextTick(function(){
								// 	if (tag == 'map') {
								// 		map(get,mapindex);
								// 	}
	       //              			self.$els.content.scrollTop = self.$els.content.scrollHeight;
	       //          			});
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
			largepic: function(myque){
				myque.largepic = true;
			},
			close: function(myque){
				myque.largepic = false;
			}
		},
	})
}