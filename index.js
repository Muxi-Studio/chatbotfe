require('./scss/index.scss');

var cb = require("./js/chatbot");
cb()

var Vue=require('vue')

Vue.config.delimiters = ['${', '}']

var vm=new Vue({
	el: "body",
	data: {
		a: 1
	}
})