module.exports = function() {
//config
var Vue=require('vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];
var app = require('./app.vue');

new Vue({
		el: "#wrap",
		components:{app:app}
	})
}
