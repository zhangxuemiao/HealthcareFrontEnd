/**
 @Name：页面基础js
 @Author：Sylow 
 @version 1.0 2015-08-22
 */

/**
 * 返回顶部 
 */
function backTop(){
	  $('body,html').animate({
          scrollTop: 0
        },
        300);
        return false;
}

/**
 * 返回上一页面 也就是关闭当前页面。
 */
function back(){
	e$.closeWin({});
};

/**
 * 时间戳转换为日期格式
 * @param timestamp 时间戳
 * @return 2015年09月01日 这种格式
 */
function toData(timestamp){
	return new Date(parseInt(timestamp) * 1000).format("yyyy年MM月dd日 hh:mm:ss");
};

/**
 * 获取一个完整的图片路径 
 */
function getImgSrc(url){
	//如果图片地址为空 就返回默认图片地址
	if(url == undefined) {
		url = "";
	}
	if (url == "") {
		url = APP_SETTING["default_img_url"];
	} else {
		url = url.replace(APP_CONFIG["file_store_prefix"], APP_CONFIG["static_img"]);
	}
	return url;
}

/**
 * 将fs类型图片url转换为正确地址
 * @param url
 * @returns {string|*}
 */
function getImgByFs(url){
//需要知道域名、IP、以及包不包含端口信息
	if(!url){
		return null
	}
	
	if(url.indexOf('http') <= -1){ 
		if(url.indexOf('b2b2c') > -1){ 
			url = APP_CONFIG.mainIP + url
		}
		if(url.indexOf('b2b2c') <= -1){ 
			url = APP_CONFIG.domain+url
		}
	}
	
	if(url.indexOf('fs:') > -1){ 
		url = url.replace('fs:',"statics")
	}

	if(url.indexOf('localhost:8080') > -1){ 
		url = url.replace('localhost:8080',APP_CONFIG.IP)
	}
		
	if(url.indexOf('localhost') > -1){ 
		url = url.replace('localhost',APP_CONFIG.IP)
	}
	if(url.indexOf('http') > -1){ 
		return url
	}
	return APP_CONFIG.domain + '/statics/'+ url.substring(3)
}


function formatFloat(num){
	var distance = parseFloat(num);
	distance = num = num.toFixed(2);
	return distance;
}


/**
 * 将调试用的localhost图片地址转为正确地址
 * @param url
 * @returns {*}
 */
function getImgByLocalhost(url){
    if(!url){return '../images/no-pic.png'}
    if(url.indexOf('http://localhost') == -1){return url}
    return APP_CONFIG.domain + '/' + url.substring(url.indexOf('statics'));
}

/**
 * 简单ajax
 * @param {String} url 地址 , 自动包装成包含域的地址
 * @param {Json} data 发送的数据
 * @param {Function} callback 执行完的回调函数
 * @deprecated  暂时无用 废弃
 */
function SimpleAjax(url, data, callback) {
	var url = getFullUrl(url);
	var options = {
		url : url,
		data : data,
		success : callback
	};
	e$.ajax(options);
}

/**
 * 初始化js模板
 * @param {JSON} data	json数据
 * @param {Object} tplObj 模板jquery对象
 * @param {Object} viewObj 视图jquery对象
 * @param {function} callback 执行完的回调函数
 */
function initTpl(data, tplObj, viewObj, callback) {
	var tpl = tplObj.html();
	//laytpl
	laytpl(tpl).render(data, function(viewHtml) {
		viewObj.html(viewHtml);
		if (callback) {
			callback(data);
		}
	});
}
/**
 * 初始化js模板
 * @param {JSON} data	json数据
 * @param {Object} tplObj 模板jquery对象
 * @param {Object} viewObj 视图jquery对象
 * @param {function} callback 执行完的回调函数
 */
function initAppendTpl(data, tplObj, viewObj, callback) {
	var tpl = tplObj.html();
	//laytpl
	laytpl(tpl).render(data, function(viewHtml) {
		viewObj.append(viewHtml);
		if (callback) {
			callback(data);
		}
	});
}

/**
 * 获取一个完整的url 例如:http://192.168.1.116:8080/api/mobile/goods!listByTag.do
 * @param {Object} url 域后的路径  必须是绝对路径
 */
function getFullUrl(url) {
	var domain = APP_CONFIG.domain;
	if (domain == undefined || domain == '') {
		domain = 'http://127.0.0.1:8080';
	}
	return domain + url;
}

function getFullTaskUrl(url) {
	var domain = APP_CONFIG.mainIP;
	if (domain == undefined || domain == '') {
		domain = 'http://127.0.0.1:8080';
	}
	return domain + url;
}

/**
 * 根据unix获取一个普通yyyy-MM-DD HH:mm:ss格式时间
 * @param unix
 * @returns {string}
 * add _by: Andste 2016-10-8 16:50:09
 */
function getTimeByUnix(unix){
	var date = new Date(unix * 1000);
    var h = date.getHours(),
        m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

	return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' + date.getDate() + ' ' + h + ':' + m + ':' + s;
}

Date.prototype.format = function(format) {
   var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
   };
   if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}

//  设置状态栏以及头部高度
function setStatusBar(){
	var statusBarAppearance = api.statusBarAppearance
	if(statusBarAppearance){
		api.setStatusBarStyle({
			style: 'dark'
		});
		$('.search').css({paddingTop: 30})
		$('header').css({paddingTop: 30})
		$('.go_title .fallback').css({top: 13})
        var dpi = window.devicePixelRatio
        var width = window.screen.width
        var height = window.screen.height

        //  alert('d: ' + dpi + ' | ' + 'w: ' + width + ' | ' + 'h: ' + height)
	}
}

//  弹出全局搜索框
//  弹出全局搜索框
function openSearch(curPage){
	var url = '';
	url = curPage == 'home' ? './goods/goods_list.html' : './goods_list.html'
	api.setStatusBarStyle({
		style: 'dark'
	});
	var UISearchBar = api.require('UISearchBar');
	UISearchBar.open({
		placeholder: '请输入搜索关键字',
		historyCount: 10,
		showRecordBtn: false,
		texts: {
			cancelText: '取消',
			clearText: '清除搜索记录'
		},
		styles: {
			navBar: {
				bgColor: '#FFFFFF',
				borderColor: '#ccc'
			},
			searchBox: {
				bgImg: '',
				color: '#000',
				height: 44
			},
			cancel: {
				bg: 'rgba(0,0,0,0)',
				color: '#D2691E',
				size: 16
			},
			list: {
				color: '#696969',
				bgColor: '#FFFFFF',
				borderColor: '#eee',
				size: 16
			},
			clear: {
				color: '#000000',
				borderColor: '#ccc',
				size: 16
			}
		}
	}, function(ret, err) {
		if (ret) {
//			alert(ret.text);
			e$.openWin({
				name : 'goods_list',
				url : url,
				reload : true,
				pageParam : {
					keyword: ret.text
				}
			});
		} else {
			alert('出现错误，请重试！')
		}
	});
}

//  弹出全局搜索框
function openStoreSearch(curPage){
	var url = '';
	url = curPage == 'store-list' ? './store/store-list.html' : './store-list.html'
	api.setStatusBarStyle({
		style: 'dark'
	});
	var UISearchBar = api.require('UISearchBar');
	UISearchBar.open({
		placeholder: '请输入搜索关键字',
		historyCount: 10,
		showRecordBtn: false,
		texts: {
			cancelText: '取消',
			clearText: '清除搜索记录'
		},
		styles: {
			navBar: {
				bgColor: '#FFFFFF',
				borderColor: '#ccc'
			},
			searchBox: {
				bgImg: '',
				color: '#000',
				height: 44
			},
			cancel: {
				bg: 'rgba(0,0,0,0)',
				color: '#D2691E',
				size: 16
			},
			list: {
				color: '#696969',
				bgColor: '#FFFFFF',
				borderColor: '#eee',
				size: 16
			},
			clear: {
				color: '#000000',
				borderColor: '#ccc',
				size: 16
			}
		}
	}, function(ret, err) {
		if (ret) {
			e$.openWin({
				name : 'store-list',
//				url : url,
				url: './store-list.html',
				reload : true,
				pageParam : {
					keyword: ret.text
				}
			});
		} else {
			alert('出现错误，请重试！')
		}
	});
}

//  弹出全局搜索框
function openScarcitySearch(curPage){
	var url = '';
	url = curPage == 'store-list' ? './store/store-list.html' : './store-list.html'
	api.setStatusBarStyle({
		style: 'dark'
	});
	var UISearchBar = api.require('UISearchBar');
	UISearchBar.open({
		placeholder: '请输入搜索关键字',
		historyCount: 10,
		showRecordBtn: false,
		texts: {
			cancelText: '取消',
			clearText: '清除搜索记录'
		},
		styles: {
			navBar: {
				bgColor: '#FFFFFF',
				borderColor: '#ccc'
			},
			searchBox: {
				bgImg: '',
				color: '#000',
				height: 44
			},
			cancel: {
				bg: 'rgba(0,0,0,0)',
				color: '#D2691E',
				size: 16
			},
			list: {
				color: '#696969',
				bgColor: '#FFFFFF',
				borderColor: '#eee',
				size: 16
			},
			clear: {
				color: '#000000',
				borderColor: '#ccc',
				size: 16
			}
		}
	}, function(ret, err) {
		if (ret) {
			e$.openWin({
				name : 'scarcitydrug_list',
				url: './scarcitydrug_list.html',
				reload : true,
				pageParam : {
					appro_name: ret.text
				}
			});
		} else {
			alert('出现错误，请重试！')
		}
	});
}

function openDoctorSearch(curPage){
	var url = '';
	url = curPage == 'doctor-list' ? './doctor/doctor-list.html' : './doctor-list.html'
	api.setStatusBarStyle({
		style: 'dark'
	});
	var UISearchBar = api.require('UISearchBar');
	UISearchBar.open({
		placeholder: '请输入搜索关键字',
		historyCount: 10,
		showRecordBtn: false,
		texts: {
			cancelText: '取消',
			clearText: '清除搜索记录'
		},
		styles: {
			navBar: {
				bgColor: '#FFFFFF',
				borderColor: '#ccc'
			},
			searchBox: {
				bgImg: '',
				color: '#000',
				height: 44
			},
			cancel: {
				bg: 'rgba(0,0,0,0)',
				color: '#D2691E',
				size: 16
			},
			list: {
				color: '#696969',
				bgColor: '#FFFFFF',
				borderColor: '#eee',
				size: 16
			},
			clear: {
				color: '#000000',
				borderColor: '#ccc',
				size: 16
			}
		}
	}, function(ret, err) {
		if (ret) {
			e$.openWin({
				name : 'doctor_list',
				url: './doctor-list.html',
				reload : true,
				pageParam : {
					real_name: ret.text
				}
			});
		} else {
			alert('出现错误，请重试！')
		}
	});
}


//  弹出全局搜索框
function openHospitalSearch(curPage){
	var url = '';
	url = curPage == 'hospital-list' ? './store/hospital-list.html' : './hospital-list.html'
	api.setStatusBarStyle({
		style: 'dark'
	});
	var UISearchBar = api.require('UISearchBar');
	UISearchBar.open({
		placeholder: '请输入搜索关键字',
		historyCount: 10,
		showRecordBtn: false,
		texts: {
			cancelText: '取消',
			clearText: '清除搜索记录'
		},
		styles: {
			navBar: {
				bgColor: '#FFFFFF',
				borderColor: '#ccc'
			},
			searchBox: {
				bgImg: '',
				color: '#000',
				height: 44
			},
			cancel: {
				bg: 'rgba(0,0,0,0)',
				color: '#D2691E',
				size: 16
			},
			list: {
				color: '#696969',
				bgColor: '#FFFFFF',
				borderColor: '#eee',
				size: 16
			},
			clear: {
				color: '#000000',
				borderColor: '#ccc',
				size: 16
			}
		}
	}, function(ret, err) {
		if (ret) {
			e$.openWin({
				name : 'hospital-list',
				url: './hospital-list.html',
				reload : true,
				pageParam : {
					hospital: ret.text
				}
			});
		} else {
			alert('出现错误，请重试！')
		}
	});
}

function countDown(){
	var elem  = arguments[0],
		count = arguments[1] ? (arguments[1] > 0 ? arguments[1] : arguments[1]) : 60;
	if(!elem){return false}
	var ele     = elem[0],
		tagName = ele.tagName,
		width = ele.clientWidth,
		paddingL = parseInt(elem.css('padding-left')),
		paddingR = parseInt(elem.css('padding-right'));
	var type = tagName == 'INPUT';
	elem.css({width: width-paddingL-paddingR})
	var timer = setInterval(function(){
		if(count == 1){_countTo0();return}
		count--;
		type ? ele.value = "已发送("+ count +"秒)" : ele.innerHTML = "已发送(" + count + "秒)";
		ele.disabled = true;
	}, 1000)

	function _countTo0(){
		clearTimeout(timer);
		type ? ele.value = "重新发送" : ele.innerHTML = "重新发送";
		ele.disabled = false;
	}
}

function noDataToast(){
	api.toast({
		msg: '再怎么也没有啦╮(╯_╰)╭',
		duration: 800,
		location: 'bottom'
	});
}

function autoRefreshTip(){
	api.toast({
		msg: '数据自动刷新',
		duration: 800,
		location: 'bottom'
	});
}

//两次退出
var first = null;
function exitAPP(){
//	alert("退出应用监听事件！");
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err){
        if (!first) {
            first = new Date().getTime();
            api.toast({
                msg: '再按一次退出',
                duration:1500,
                location: 'bottom'
            });
            setTimeout(function() {
                first = null;
            }, 1000);
        } else {
            if (new Date().getTime() - first < 1000) {
                api.closeWidget({
                    silent:true
                });
            }
        }
    });
}

function isNetConn(){
	var url = getFullUrl('/api/mobile/member/info.do');
	var options = {
		url : url,
		timeout: 4000,
        dataType: 'json',
		success : function(data) {
//			alert("网络连接正常！");
		},
		error:function(data){
			e$.closeLoad();
			api.alert({  
				title: '网络异常',  
				msg: '服务器连接失败，请检查网络设置！',  
				buttons:[ '确定']  
			},function(ret,err){  
				if(ret.buttonIndex == 1){  
					//api.alert({msg: '点击了确定'});  
				}  
			}); 
		}
	};
	e$.ajax(options);
}

function temp(){
    //安卓应用
//  var sysType = api.systemType
	var isAndroid = (/android/gi).test(navigator.appVersion);
	alert("isAndroid->"+isAndroid);
	if (isAndroid) {
	//绑定安卓的后退按钮事件 两秒内后退按钮点击两次 关闭应用
	    var backSecond = 0;
	    api.addEventListener({
	        name: 'keyback'
	    }, function(ret, err) {
	        var curSecond = new Date().getSeconds();
	        if (Math.abs(curSecond - backSecond) > 2) {
	            backSecond = curSecond;
	            api.toast({
	                msg: '连续按两次关闭系统',
	                duration: 2000,
	                location: 'bottom'
	            });
	        } else {
	        	api.closeWidget({
	        		id: 'A6918489928546', //这里改成自己的应用ID
	        		retData: {name:'closeWidget'},
	        		silent:true
	        		});
	        }
	    });
	}
}

$(function () {
    $('.fallback').on('tap', function () {
        e$.closeWin();
    })
    $('.goback').on('tap', function () {
        e$.closeWin();
    })
    $('#goindex').on('tap', function () {
        var options = {
			url : 'widget://html/index.html',
			name : 'goindex',
			reload : true,
			scrollToTop : true,
		};
		e$.openWin(options);
    })

})