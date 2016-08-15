module.exports = function() {
//config
var Vue=require('vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];

new Vue({
		el: "#wrap",
		components:{app:app}
	})
}
