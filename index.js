require('./scss/index.scss');
// require("url-loader!./img/title.png");


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