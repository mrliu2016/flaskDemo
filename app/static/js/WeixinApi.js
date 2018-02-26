/**!
 * 微信内置浏览器的Javascript API，功能包括：
 *
 * 1、分享到微信朋友圈
 * 2、分享给微信好友
 * 3、分享到腾讯微博
 * 4、隐藏/显示右上角的菜单入口
 * 5、隐藏/显示底部浏览器工具栏
 * 6、获取当前的网络状态
 * 7、调起微信客户端的图片播放组件
 * 8、关闭公众平台Web页面
 *
 * @author fangzhen(http://www.zhcw.com)
 */
var oHead = document.getElementsByTagName('HEAD').item(0);

var oScript = document.createElement("script");

oScript.id = "wxjs";

oScript.type = "text/javascript";

oScript.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";

oHead.appendChild(oScript);

var WeixinApi = (function () {

    "use strict";

    /**
     * 分享到微信朋友圈
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imageUrl   图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareTimeline(data, callbacks) {
        callbacks = callbacks || {};
        wx.onMenuShareTimeline({
            title: data.friendcontent ? data.friendcontent:data.desc, // 分享标题
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callbacks.success && callbacks.success();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callbacks.cancel && callbacks.cancel();
            }
        });
    }

    /**
     * 发送给微信上的好友
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    appId      公众平台的appId（服务号可用）
     * @p-config    {String}    imageUrl   图片地址
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     * @p-config    {String}    title      分享的标题
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinSendAppMessage(data, callbacks) {
        callbacks = callbacks || {};
        wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                callbacks.success && callbacks.success();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callbacks.cancel && callbacks.cancel();
            }
        });
    }

    /**
     * 分享到腾讯微博
     * @param       {Object}    data       待分享的信息
     * @p-config    {String}    link       链接地址
     * @p-config    {String}    desc       描述
     *
     * @param       {Object}    callbacks  相关回调方法
     * @p-config    {Boolean}   async                   ready方法是否需要异步执行，默认false
     * @p-config    {Function}  ready(argv)             就绪状态
     * @p-config    {Function}  dataLoaded(data)        数据加载完成后调用，async为true时有用，也可以为空
     * @p-config    {Function}  cancel(resp)    取消
     * @p-config    {Function}  fail(resp)      失败
     * @p-config    {Function}  confirm(resp)   成功
     * @p-config    {Function}  all(resp)       无论成功失败都会执行的回调
     */
    function weixinShareQQ(data, callbacks) {
        callbacks = callbacks || {};

        wx.onMenuShareQQ({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callbacks.success && callbacks.success();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callbacks.cancel && callbacks.cancel();
            }
        });
    }

    function weixinShareWeibo(data, callbacks) {
        callbacks = callbacks || {};

        wx.onMenuShareWeibo({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callbacks.confirm && callbacks.confirm();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                callbacks.cancel && callbacks.cancel();
            }
        });
    }
    /**
     * 调起微信Native的图片播放组件。
     * 这里必须对参数进行强检测，如果参数不合法，直接会导致微信客户端crash
     *
     * @param {String} curSrc 当前播放的图片地址
     * @param {Array} srcList 图片地址列表
     */
    function imagePreview(curSrc, srcList) {
        if (!curSrc || !srcList || srcList.length == 0) {
            return;
        }
        wx.previewImage({
            current: curSrc, // 当前显示的图片链接
            urls: srcList // 需要预览的图片链接列表
        });
    }

    /**
     * 隐藏部分按钮
     */
    function hideMenuItems(menus) {
        wx.hideMenuItems({menuList: menus});
    }

    /**
     * 显示网页右上角的按钮
     */
    function showOptionMenu() {
        wx.showOptionMenu();
    }
    /**
     * 隐藏网页右上角的按钮
     */
    function hideOptionMenu() {
        wx.hideOptionMenu();
    }

    /**
     * 返回如下几种类型：
     *
     * network_type:wifi     wifi网络
     * network_type:edge     非wifi,包含3G/2G
     * network_type:fail     网络断开连接
     * network_type:wwan     2g或者3g
     *
     * 使用方法：
     * WeixinApi.getNetworkType(function(networkType){
     *
     * });
     *
     * @param callback
     */
    function getNetworkType(callback) {
        if (callback && typeof callback == 'function') {
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    callback(networkType);
                }
            });
        }
    }
    /**
     * 当页面加载完毕后执行，使用方法：
     * WeixinApi.ready(function(Api){
     *     // 从这里只用Api即是WeixinApi
     * });
     * @param readyCallback
     */
    function wxJsBridgeReady(readyCallback,data) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var wxReadyFunc = function () {
                readyCallback(Api);
            };
            var is_debug = false;
			var queryUrl = 'http://ggl.51caiyou.com/h5/port/wxapi/wxapi.php';
			var param = {};
			param.url = document.location.href.split("#")[0];
            try{
                wx.ready(function () {
                    wxReadyFunc();
                });
				$.ajax({
					type:"get",
					url:queryUrl,
					data:param,
					dataType: "jsonp",
					jsonp: "callback",
					success:function(result){
						wx.config({
							debug: is_debug,
							appId: result.appId,
							timestamp: result.timestamp,
							nonceStr: result.nonceStr,
							signature: result.signature,
							jsApiList: ['hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getNetworkType','scanQRCode'] // 必填，需要使用的JS接口列表
						});
					}
				});
            }
            catch (ex) {
                oScript.onload = oScript.onreadystatechange = function () {
                    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                        wx.ready(function () {
                            wxReadyFunc();
                        });
                        $.ajax({
							type:"get",
							url:queryUrl,
							data:param,
							dataType: "jsonp",
							jsonp: "callback",
							success:function(result){
								wx.config({
									debug: is_debug,
									appId: result.appId,
									timestamp: result.timestamp,
									nonceStr: result.nonceStr,
									signature: result.signature,
									jsApiList: ['hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getNetworkType','scanQRCode'] // 必填，需要使用的JS接口列表
								});
							}
						});
                    }
                    oScript.onload = oScript.onreadystatechange = null;
                }
            }
        }
    }
    return {
        version: "2.0",
        ready: wxJsBridgeReady,
        shareToTimeline: weixinShareTimeline,
        shareToWeibo: weixinShareWeibo,
        shareToFriend: weixinSendAppMessage,
        shareToQQ:weixinShareQQ,
        showOptionMenu: showOptionMenu,
        hideOptionMenu: hideOptionMenu,
        hideMenuItems: hideMenuItems,
        getNetworkType: getNetworkType,
        imagePreview: imagePreview,
        hook: {
            enable: function (wxData, wxCallbacks) {
                
            }
        }
    };
})();

