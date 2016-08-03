module.exports = {
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	proxy: {
		route: "/api",
		origin: "http://api.map.baidu.com/api?v=1.4"
		// origin: "http://xueer.muxixyz.com"
	},
	staticDir: "/static",
	templateDir: "/template",
}
