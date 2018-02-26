var	html5src = sessionStorage.getItem("src");
var style='background: #000;opacity: 0.75;color:#fff;text-align:center;';
var tipsShowTime = 2;
var tipsStyle = "width:80%;text-align:center;";
if(html5src==null || html5src == ""){
	html5src = "0000100001|6000003060";
}
var ua = (function() {
	var clientUserAgent = navigator.userAgent.toLowerCase();
	if (clientUserAgent.match(/MicroMessenger/i) == 'micromessenger') {
		return "micromessenger";
	}
	if (clientUserAgent.indexOf('android') != -1) {
		return "android";
	}
	if (/iPhone|iPad|iPod/i.test(clientUserAgent)) {
		return "ios";
	}
	return "windows";
})();
if(ua == "windows"){
	//重写touch
	(function($){$.fn.tap=function(arg){$(this).click(arg);};
	$.fn.onTem=$.fn.on;$.fn.on=function(event,callback){event=event=="tap"?"click":event;return $(this).onTem(event,callback);};
	$.fn.bindTem=$.fn.bind;$.fn.bind=function(event,callback){event=event=="tap"?"click":event;return $(this).bindTem(event,callback);};
	$.fn.offTem=$.fn.off;$.fn.off=function(event,callback){event=event=="tap"?"click":event;return $(this).offTem(event,callback);};
	$.fn.unbindTem=$.fn.unbind;$.fn.unbind=function(event,callback){event=event=="tap"?"click":event;return $(this).unbindTem(event,callback);};
	this.log=console.log||window.alert;this.tos=function(o){if(o.toSource){o.toSource();}else{alert(o);}};})($);
	window.alertln = window.alert;
}
$(function(){
	init_retina();
	showScroll();
    //set_evercoooike();
});
function play_code_name(lottery,playCode){
	var playNameArr = {
		"FC_SSQ":{
			'SSQ_DS':'双色球单式','SSQ_FS':'双色球复式','SSQ_DT':'双色球胆拖'
		},
		"FC_3D":{
			'D3_ZXDS':'福彩3D直选单式','D3_ZXFS':'福彩3D直选复式','D3_ZXHZ':'福彩3D直选和值','D3_ZUX3DS':'福彩3D组三单式','D3_ZUX3FS':'福彩3D组三复式',
			'D3_ZUX3HZ':'福彩3D组三和值','D3_ZUX6DS':'福彩3D组六单式','D3_ZUX6FS':'福彩3D组六复式','D3_ZUX6HZ':'福彩3D组六和值'
		}
	};
	return (lottery != "" && playCode != "" && playNameArr[lottery][playCode] != undefined)?playNameArr[lottery][playCode]:"";
}
function play_code_name1(lottery,playCode){
	var playNameArr = {
			"FC_SSQ":{
				'40010001':'双色球单式','40010002':'双色球复式','40010003':'双色球胆拖'
			},
			"FC_3D":{
				'40020101':'福彩3D直选单式','40020102':'福彩3D直选复式','40020201':'福彩3D组三单式','40020202':'福彩3D组三复式','40020301':'福彩3D组六单式','40020302':'福彩3D组六复式'
			}
		};
		return (lottery != "" && playCode != "" && playNameArr[lottery][playCode] != undefined)?playNameArr[lottery][playCode]:"";
	}
function play_code_bet_no(lottery,playCode){
	var betNoArr = {
		"FC_SSQ":{
			'SSQ_DS':'40010001','SSQ_FS':'40010002','SSQ_DT':'40010003'
		},
		"FC_3D":{
			'D3_ZXDS':'40020101','D3_ZXFS':'40020102','D3_ZUX3DS':'40020201','D3_ZUX3FS':'40020202',
			'D3_ZUX6DS':'40020301','D3_ZUX6FS':'40020302'
		}
	};
	return (lottery != "" && playCode != "" && betNoArr[lottery][playCode] != undefined)?betNoArr[lottery][playCode]:"";
}
$.format_money = function($cell) {  
	var reg = /[\$,%]/g;  
	var key = parseFloat( String($cell).replace(reg, '')).toFixed(2); // toFixed小数点后两位  
	return isNaN(key) ? 0.00 : key;  
};
$.int = function(number) {
	return parseInt(number, 10);
};
$.float = function(float) {
	return parseFloat(float, 10);
};
$._unique = function(array) {
	var uniqueArr = new Array();
	if($.isArray(array) && array.length > 0) {
		for(var n=0;n<array.length;n++) {
			if($.inArray(array[n], uniqueArr) == false) {
				uniqueArr.push(array[n]);
			}
		}
	}
	return uniqueArr;
};
$.inArray = function(value, array){
	var inOf = false;
	if(array && array.length && typeof(array) == "object") {
		for(var i=0; i<array.length; i++){
			if(value == array[i]){
				inOf = true;
			}
		}
	}
	return inOf;
};
String.prototype.repeat = function(n){
    return new Array(n + 1).join(this);
};
$.delArray = function(value, array){
	
};
$.merge = function( first, second ) {
	var i = first.length, j = 0;
	if ( typeof second.length === "number" ) {
		for ( var l = second.length; j < l; j++ ) {
			first[ i++ ] = second[ j ];
		}
	} else {
		while ( second[j] !== undefined ) {
			first[ i++ ] = second[ j++ ];
		}
	}
	first.length = i;
	return first;
};

//生成随机号码
function random_num(startNum, endNum, numLen){
	var len = (numLen !== '' && numLen > 0)?numLen:2;
	var randomNum = $.int(Math.random()*($.int(endNum)-$.int(startNum)+1)+$.int(startNum));
	if(randomNum.toString().length < len) {
		randomNum = ("0").repeat(len-randomNum.toString().length)+''+randomNum;
	}
	return randomNum;
}
function random_bet_code(nums, lottery){
	var numArr = [];
	if(lottery !== ""){
		var randomMap = {"FC_SSQ":{"red":[1,33],"blue":[1,16]}};
		switch(lottery) {
			case "FC_SSQ":
			while(numArr.length < 6){
				var tempNums1 = random_num(randomMap[lottery]["red"][0],randomMap[lottery]["red"][1],2);
				if(!$.inArray(tempNums1,numArr)){
					numArr.push(tempNums1);
				}
			}
			numArr.sort();
			var tempNums2 = random_num(randomMap[lottery]["blue"][0],randomMap[lottery]["blue"][1],2);
			numArr.push(tempNums2);
			break;
		}
	}
	
	return numArr;
}

function combination(arr, num){
    var r=[];
    (function f(t,a,n){
        if (n==0) return r.push(t);
        for (var i=0,l=a.length; i<=l-n; i++){
            f(t.concat(a[i]), a.slice(i+1), n-1);
        }
    })([],arr,num);
    return r;
}
function combination_2w(doubleArrays){ //二维数组组合
    var len=doubleArrays.length;
    if(len>=2){
        var len1=doubleArrays[0].length;
        var len2=doubleArrays[1].length;
        var newlen=len1*len2;
        var temp=new Array(newlen);
        var index=0;
        for(var i=0;i<len1;i++){
            for(var j=0;j<len2;j++){
                temp[index]=doubleArrays[0][i]+","+
                    doubleArrays[1][j];
                index++;
            }
        }
        var newArray=new Array(len-1);
        for(var i=2;i<len;i++){
            newArray[i-1]= doubleArrays[i];
        }
        newArray[0]=temp;
        return combination_2w(newArray);
    }else{
        return doubleArrays[0];
    }
}
function request_url() {
    var url = window.location.href;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split("?");
        strs = str[1].split("&");
        for (var i = 0; i < strs.length; i++) {
            if(i < strs.length-1){
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }else{
            	var s = decodeURI(strs[i].split("=")[1]);
            	var ss = s.split("#");
            	theRequest[strs[i].split("=")[0]] =ss[0];
            }
        }
    }
    return theRequest;
}
function show_username(value) {
	var showInfo = '';
	if(value.userName !== undefined && value.userName !=='' && value.userName !== null) {
		if(!isNaN(value.userName)){
		 	showInfo = value.userName.substring(0,3)+ '*******'+ value.userName.substring(10,11);
		} else if(value.userName.substring(0,4).toUpperCase() == '*ZCS'){
			showInfo = value.userName.substring(4,7)+ '*******'+ value.userName.substring(14,15);
		} else {
			showInfo = value.userName;
		}
	} else if(value.accountName !== undefined && value.accountName !=='' && value.accountName !== null) {
		if(!isNaN(value.accountName)){
		 	showInfo = value.accountName.substring(0,3)+ '*******'+ value.accountName.substring(10,11);
		} else if(value.accountName.substring(0,4).toUpperCase() == '*ZCS'){
			showInfo = value.accountName.substring(4,7)+ '*******'+ value.accountName.substring(14,15);
		} else {
			showInfo = value.accountName;
		}
	} else if(value.cell !== undefined && value.cell !=='' &&value.cell !== null){
			showInfo = value.cell.substring(0,3)+ '*******'+ value.cell.substring(10,11);
	}
	return showInfo;
}
function query_string(strName){
	var strHref = document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for(var i = 0; i < arrTmp.length; i++ ) {
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
	}
	return "";
}
function date_time(enDash) { //enDash连字符
	var NowTime = new Date();
	if(enDash == "") {
		enDash = "-";
	}
	alert(NowTime);
	return NowTime.getFullYear()+""+enDash+""+(NowTime.getMonth()+1)+""+enDash+""+NowTime.getDate()+" "+NowTime.getHours()+":"+NowTime.getMinutes()+":"+NowTime.getSeconds();
}
function format_nums(num,type){
	n = num;
	if(num/100000000 > 1){
		n = (num/100000000).toFixed(1)+'亿';
	}else if(num/10000>=10 && num>=100000){
		n = (num/10000).toFixed(0)+'万';
	}
	if(type != ''&& type == 1){
		if(num/100000000 > 1){
			n = (num/100000000).toFixed(2)+'亿';
		}else if(num/10000>0 && num>10000000){
			n = (num/10000000).toFixed(2)+'千万';
		}else if(num/10000>0 && num>10000){
			n = (num/10000).toFixed(2)+'万';
		}
	}
	return n;
}
function clear_session(){
	sessionStorage.removeItem("jsessionid");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("accountName");
}
function client_login(userInfoStr) {	
	if(userInfoStr != "") {
		userInfoObj = eval("("+userInfoStr+")");
		$.each(userInfoObj,function(k,v){
			sessionStorage.setItem(k,v);
		});
	} else {
		var queryString = request_url();
		if(queryString["from"] == "client") {
			clear_session();
		}
	}
}
//随机获取号码处理 2014.12.25 fangzhen
function random_code(maxNum,minNum){
	 var data = new Array();  //选中了的球的集合
	 var dataB = new Array();//根据球的数量生成相应的球【该球集合编号从1开始】
	 var order = arguments[2]?arguments[2]:'1'; //是否排序 1 是 2否
	 for(var i=0;i<maxNum;i++){
		 dataB[i]=i+1;
	 }
	data = get_array(dataB,minNum); //获得选中的球的集合
	if(order == 1) {
		for(var m=0;m<data.length;m++){  //排序
			for(var k =m+1;k<data.length;k++){
				if(data[m]>data[k]){
					var t = data[k];
					data[k] = data[m];
					data[m] = t;
				}
			}
		}
	}
	
	for(var m=0;m<data.length;m++){
		if(data[m]<10){
			data[m]="0"+data[m];
		}
	}//格式化选中球的集合
	return data;
}
function random_code_s(maxNum,minNum){
	 var data = new Array();  //选中了的球的集合
	 var dataB = new Array();//根据球的数量生成相应的球【该球集合编号从1开始】
	 var order = arguments[2]?arguments[2]:'1'; //是否排序 1 是 2否
	 for(var i=0;i<=maxNum;i++){
		 dataB[i]=i;
	 }
	data = get_array(dataB,minNum); //获得选中的球的集合
	if(order == 1) {
		for(var m=0;m<data.length;m++){  //排序
			for(var k =m+1;k<data.length;k++){
				if(data[m]>data[k]){
					var t = data[k];
					data[k] = data[m];
					data[m] = t;
				}
			}
		}
	}
	return data;
}
function get_array(arr, num) {
   var return_array = new Array();
   for (var i = 0; i<num; i++) {
       if (arr.length>0) {
           var arrIndex = Math.floor(Math.random()*arr.length);
           return_array[i] = arr[arrIndex];
           arr.splice(arrIndex, 1);
       } else {
           break;
       }
   }
   return return_array;
}
function add_cookie(name,value,expiresHours){
	var cookieString=name+"="+escape(value);
	//判断是否设置过期时间
	if(expiresHours>0){
		var date=new Date();
		date.setTime(date.getTime+expiresHours*3600*1000);
		cookieString=cookieString+"; expires="+date.toGMTString();
	}
	document.cookie=cookieString;
}
function get_cookie(name){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		if(arr[0]==name)return arr[1];
	}
	return "";
}
function delete_cookie(name){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	document.cookie=name+"=v; expires="+date.toGMTString();
} 
//ios桥接函数
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady',
			function() {
				callback(WebViewJavascriptBridge);
			}, false);
	}
}
function show_play_code(playCode){
	var playArr = {'SSQ_DS':'双色球单式','SSQ_FS':'双色球复式','SSQ_DT':'双色球胆拖','D3_ZXDS':'福彩3D直选单式','D3_ZXFS':'福彩3D直选复式','D3_ZXHZ':'福彩3D直选和值','D3_ZUX3DS':'福彩3D组三单式','D3_ZUX3FS':'福彩3D组三复式','D3_ZUX3HZ':'福彩3D组三和值','D3_ZUX6DS':'福彩3D组六单式','D3_ZUX6FS':'福彩3D组六复式','D3_ZUX6HZ':'福彩3D组六和值'};
	return (playCode != '' && playArr[playCode] != undefined)?playArr[playCode]:'';
}
var locationInfo = {
	//定位
	get_location:function() {
		//检查浏览器是否支持地理位置获取
	if (navigator.geolocation) {
			//若支持地理位置获取,成功调用showPosition(),失败调用showError
			// alert("正在努力获取位置...");
			var config = {enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 };
			navigator.geolocation.getCurrentPosition(this.show_position, this.show_error, config);
		}
	},
	/**
	* 获取地址位置成功
	*/
	show_position:function (position) {
		//获得经度纬度
		var x = position.coords.latitude;
		var y = position.coords.longitude;
		//配置Baidu Geocoding API
		var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b" +
		"&callback=renderReverse" +
		"&location=" + x + "," + y +
		"&output=json" +
		"&pois=0";
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: url,
			success: function (json) {
				if (json == null || typeof (json) == "undefined") {
					return;
				}
				if (json.status != "0") {
					return;
				}
				locationInfo.set_address(json.result.addressComponent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("[x:" + x + ",y:" + y + "]地址位置获取失败,请手动选择地址");
			}
		});
	},
	/**
	* 获取地址位置失败[暂不处理]
	*/
	show_error:function(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
			alert("定位失败,用户拒绝请求地理定位");
			//x.innerHTML = "User denied the request for Geolocation.[用户拒绝请求地理定位]"
			break;
			case error.POSITION_UNAVAILABLE:
			alert("定位失败,位置信息是不可用");
			//x.innerHTML = "Location information is unavailable.[位置信息是不可用]"
			break;
			case error.TIMEOUT:
			alert("定位失败,请求获取用户位置超时");
			//x.innerHTML = "The request to get user location timed out.[请求获取用户位置超时]"
			break;
			case error.UNKNOWN_ERROR:
			alert("定位失败,定位系统失效");
			//x.innerHTML = "An unknown error occurred.[未知错误]"
			break;
		}
	},
	/**
	* 设置地址
	*/
	set_address:function(json) {
		var position = document.getElementById("txtPosition");
		//省
		var province = json.province;
		//市
		var city = json.city;
		//区
		var district = json.district;
		province = province.replace('市', '');
		position.innerHTML = province + "," + city + "," + district;
		position.style.color = 'black';
	}
};
//线条控制
function init_retina() {
	if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
		var e = document.createElement("div");
		e.style.border = ".5px solid transparent";
		document.body.appendChild(e);
		if (e.offsetHeight == 1) {
			$("body *").addClass("hairlines");
		}
		document.body.removeChild(e);
	}
}
//时间格式化
function format_date(time){
	var timeStr='';
	var now=$.now();
	now = now.split(' ');
	time = time.split(' ');
	var nowDay=now[0].split('-');
	var timeDay=time[0].split('-');
	if(time[0]==now[0]){
		timeStr = time[1].substr(0,5);
	}else if(nowDay[0]==timeDay[0]){
		if(nowDay[1]==timeDay[1]){
			if(nowDay[2]==timeDay[2]){
				timeStr = time[1].substr(0,5);
			}else{
				timeStr=time[0].substr(5,5);
			}
		}else{
			timeStr=time[0].substr(5,5);
		}
	}else{
		timeStr=time[0].substr(5,5);
	}
	return timeStr;
}
function showScroll(){//回到顶部
	var scrollValue=$(window).scrollTop();
	if(scrollValue>0){
		$('div[class=back_top]').show();
	}
	$(window).scroll( function() { 
		scrollValue=$(window).scrollTop();
		scrollValue > 100 ? $('div[class=back_top]').show():$('div[class=back_top]').hide();
		$("body").unbind("touchend").bind("touchend",function(){
			setTimeout(function(){
				$('div[class=back_top]').hide();
			},3000);
		});
	});
}
function storage_set_item(key,value){
	if(window.localStorage){
		localStorage.setItem(key,value);
	}
}
function storage_get_item(key) {
	if(window.localStorage){
		var storage = window.localStorage;
		if(storage.getItem(key)) {
			return storage.getItem(key);
		}
		return "";
	}
}
function storage_remove_item(key) {
	if(window.localStorage){
		localStorage.removeItem(key);
	}
}
function middle_nav_show(style) {
	$("ul[id^='random_area_']").addClass("none0");
	if(style == "show"){
		$(".ts").addClass("cdz");
		$(".xlcd").addClass("cdznr");
		$(".hzz").addClass("hzz0");
	} else {
		$(".ts").removeClass("cdz");
		$(".xlcd").removeClass("cdznr");
		$(".hzz").removeClass("hzz0");
	}
}
//判断字符串字符长度
function autoAddEllipsis(pStr, pLen) {
    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;
    if ("1" == _cutFlag) {
        return _cutStringn + "...";
    } else {
        return _cutStringn;
    }
} 
function cutString(pStr, pLen) {
	// 原字符串长度
    var _strLen = pStr.length;
    var _tmpCode;
    var _cutString;
    // 默认情况下，返回的字符串是原字符串的一部分
    var _cutFlag = "1";
    var _lenCount = 0;
    var _ret = false;
    if (_strLen <= pLen/2) {
        _cutString = pStr;
        _ret = true;
    }
    if (!_ret) {
        for (var i = 0; i < _strLen ; i++ ) {
            if (isFull(pStr.charAt(i))) {
                _lenCount += 2;
            } else {
                _lenCount += 1;
            }
            if (_lenCount > pLen) {
                _cutString = pStr.substring(0, i);
                _ret = true;
                break;
            } else if (_lenCount == pLen) {
                _cutString = pStr.substring(0, i + 1);
                _ret = true;
                break;
            }
        }
    }
    if (!_ret) {
        _cutString = pStr;
        _ret = true;
    }
    if (_cutString.length == _strLen) {
        _cutFlag = "0";
    }
    return {"cutstring":_cutString, "cutflag":_cutFlag};
} 
function isFull (pChar) {
	  for (var i = 0; i < pChar.length ; i++ ) {    
	    if ((pChar.charCodeAt(i) > 128)) {
	        return true;
	    } else {
	        return false;
	    }
	}
}
//时间格式化
function format_date(time){
	var timeStr='';
	var now=$.now();
	now = now.split(' ');
	time = time.split(' ');
	var nowDay=now[0].split('-');
	var timeDay=time[0].split('-');
	if(time[0]==now[0]){
		timeStr = time[1].substr(0,5);
	}else if(nowDay[0]==timeDay[0]){
		if(nowDay[1]==timeDay[1]){
			if(nowDay[2]==timeDay[2]){
				timeStr = time[1].substr(0,5);
			}else if(parseInt(nowDay[2])-parseInt(timeDay[2])==1){
				timeStr = '昨天';
			}else{
				timeStr = timeDay[0]+"年"+timeDay[1]+"月"+timeDay[2]+"日";
			}
		}else{
			timeStr = timeDay[0]+"年"+timeDay[1]+"月"+timeDay[2]+"日";
		}
	}else{
		timeStr = timeDay[0]+"年"+timeDay[1]+"月"+timeDay[2]+"日";
	}
	return timeStr;
}
//验证手机号
function checkMobile(id) {
	var mobile = $('#'+id).val();
	if(!mobile || !(/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9][0-9]{8}$/.test(mobile))){
		layer.open({
			style:style,
		    content: '请输入手机号码',
		    time:tipsShowTime
		});
		return false;
	}else{
		return true;
	}
}
//验证用户名
function cmcCheckTureName(name){
	var pattern=/^([\u4e00-\u9fa5]+\.)*[\u4e00-\u9fa5]+$/;	
	if(!(name.indexOf("0x")>=0||!pattern.test(name))) return true;
	return false;	
}
//验证身份证号码格式
function cmcIsIdCardNo(idcard,id)
{
	var Errors=new Array( 
	true, 
	false
	); 
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
	var idcard,Y,JYM,JYM1; 
	var S,M,M1; 
	var idcard_array = new Array(); 
	idcard_array = idcard.split(""); 
	if(area[parseInt(idcard.substr(0,2))]==null) return Errors[1]; 
	switch(idcard.length){ 
	case 15: 
	if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; 
	} else { 
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; 
	} 
	if(idcard=="111111111111111"){
		return Errors[1];
		break;
	}
	if(ereg.test(idcard)) return Errors[0]; 
	else return Errors[1]; 
	break; 
	case 18: 
	if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
	ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
	} else { 
	ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
	} 
	if(ereg.test(idcard)){ 
	S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 
	+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 
	+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 
	+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 
	+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 
	+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
	+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 
	+ parseInt(idcard_array[7]) * 1 
	+ parseInt(idcard_array[8]) * 6 
	+ parseInt(idcard_array[9]) * 3 ; 
	Y = S % 11; 
	M = "F"; 
	M1 = "F";
	JYM = "10X98765432"; 
	JYM1 = "10x98765432"; 
	M = JYM.substr(Y,1); 
	M1 = JYM1.substr(Y,1); 
	if(M == idcard_array[17]||M1 == idcard_array[17]) return Errors[0]; 
	else return Errors[1]; 
	} 
	else return Errors[1]; 
	break; 
	default: 
	return Errors[1]; 
	break; 
	}
}
//真实姓名
function checkRealName(id) {
	var realname = $('#'+id).val();

	if(realname.length < 2 || realname.length > 20 || !cmcCheckTureName(realname)){
		layer.open({
			style:style,
		    content: '请输入收货人姓名',
		    time:tipsShowTime
		});
		return false;
	}else{
		return true;
	}
}

//身份证号码
function checkCard(id) {
	var crad =$('#'+id).val();

	if(!cmcIsIdCardNo(crad)) {
		layer.open({
			style:style,
		    content: '请输入身份证号',
		    time:tipsShowTime
		});
		return false;
	}else{
		return true;
	}
}
//验证邮编
function checkZipcode(id) {
	var Zipcode = $('#'+id).val();
	if(!Zipcode || !(/^[0-9][0-9]{5}$/.test(Zipcode))){
		layer.open({
			style:style,
		    content: '请输入邮政编码',
		    time:tipsShowTime
		});
		return false;
	}else{
		return true;
	}
}
/*
*客户端交互
*/
function client_js_api(type,content){
	var jsonStr = '{"type":"'+type+'","content":"'+content+'"}';
		if (ua == "android") {
			zhcwclient.zhcwclientCallBack(jsonStr);
		} else if(ua == "ios") {
			connectWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler('zhcwclientCallBack', {
				"content":jsonStr
			});
		});
	}
}
/*
*老版本调到下载页，新版本正常进入活动
*/
function ggl_client_version(){
	var queryString = request_url();
 	var src = queryString["src"];
	if(src != null && src != ""&& $.int(src.substr(src.length-4,4)) < 3000){
		window.location.href = "http://l.zhcw.com";
	}
}

/**
 * 设置僵尸cookie
 * evercookie
 */
function set_evercoooike(){
	var ec = new evercookie();
	ec.set("deviceId",'test123456');
}