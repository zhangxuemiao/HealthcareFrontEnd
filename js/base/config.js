/**
 @Name：基础配置js
 @Author：Sylow
 @version v1.0  -  2015-08-22
 */

var APP_CONFIG = {
	mainIP : 'http://127.0.0.1/',
	IP: '222.29.100.86',
	domain : 'http://127.0.0.1:8000/',
	app : 'yes',
	debug : 'no',
	file_store_prefix : 'fs:',
	customer_service: "13693629978",
	human_services: "13693629978",
	emergency_services: "13693629978"
};

/**
 * 动态加载文件  js 或者 css
 */
function loadjscssfile(filename, filetype) {
	if (filetype == "js") {
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
	} else if (filetype == "css") {
		var fileref = document.createElement('link');
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
}

/**
 * 从服务器加载配置js  对象名为：APP_SETTING 
 */
loadjscssfile(APP_CONFIG["domain"] + "/api/mobile/config/get.do", "js");