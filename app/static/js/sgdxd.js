var sg = {
	relevanceGgl: false,
	orderId: "",
	pictureId: "",
	init: function() {
		if (this.act === "index") {
			sg.share("1");
			if (screen.height > 667) {
				var sunBad = parseInt($(window).height())-parseInt($(".contents").height());
				if (sunBad > 20) {
					$(".sg_ban06").css("height",sunBad+"px").show();
					$(".contents").css("height","100%");
				};
			};
	        sg.preloadimages([''+ sg.imgUrl +'/sgdxd/ticket_01.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_02.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_03.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_04.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_05.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_06.jpg', ''+ sg.imgUrl +'/sgdxd/ticket_07.jpg']).done(function(images){
		        $(".item_box").LightBox({
		            controls : false //上一张、下一张是否显示，默认是显示true
		        });
	        });
			$(".jl_lf").unbind("click").bind("click", function() {
				$(".gz").show();
			});
			$(".yjjx li").unbind("click").bind("click", function() {
				if (!$(this).hasClass(".gz_active")) {
					$(this).addClass("gz_active").siblings().removeClass("gz_active");
					$(".tk_gz").eq($(this).index()).show().siblings(".tk_gz").hide();
				};
			});
			$(".gz_gb").unbind("click").bind("click", function() {
				$(".gz").hide();
			});
			sg.getUserInfo();
		} else if (this.act === "game") {
			sg.share("2");
			if (screen.height > 667) {
				var sunBad = parseInt($(window).height())-parseInt($(".container").height());
				if (sunBad > 20) {
					$(".sg_ban06").css("height",sunBad+"px").show();
					$(".container").css("height","100%");
				};
			};
	        sg.preloadimages([''+ sg.imgUrl +'/sgdxd/scene_1.jpg', ''+ sg.imgUrl +'/sgdxd/scene_2.jpg', ''+ sg.imgUrl +'/sgdxd/scene_3.jpg']).done(function(images){
				sg.gameStart();
	        });
			$(".click_box").hide().find(".item").removeClass("on");
			$(".word_count").html("0");
			$(".tkchb .pass_again_btn").unbind("click").bind("click", function() {
				window.location.href="index.php?act=sgdxd";
			});
		};
	},
	getUserInfo: function() {
		var url = "/client/index";
		var param = {};
		param.transactionType = "10020935";
		param.tt = Math.random();
		$.ajax({
			url: url,
			data: param,
			dataType: "json",
			async: false,
			success: function(res) {
				if (res.timeOut === "0004") {
					layer.open({
						content: "活动于2018年2月15日正式开始，欢迎参与！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"]
					});
					return false;
				} else if (res.timeOut === "0005") {
					layer.open({
						content: "本活动已圆满结束，请继续关注中福彩微信，更多精彩活动敬请期待！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"]
					});
					return false;
				} else if (res.resCode === "300000") {
					layer.open({
						content: res.message,
						shadeClose: false,
						style: tipsStyle,
						btn: ["关闭"]
					});
					return false;
				} else if (res.timeOut === "0000") {
					if (res.resCode === "0") {
						$(".play_count").html(res.playCount);
						if (res.relevanceGgl === "1") {
							if (parseInt(res.playCount) > 0) {
								$(".sg_start").unbind("click").bind("click", function() {
									window.location.href = "index.php?act=sgdxd_game";
									return false;
								});
							} else {
								$(".sg_start").unbind("click").bind("click", function() {
									layer.open({
										content: "您今天的参与机会已用完，请明天继续参与！",
										style: tipsStyle,
										shadeClose: false,
										btn: ["确定"]
									});
									return false;
								});
							};
						} else {
							$(".sg_start").unbind("click").bind("click", function() {
								layer.open({
									content: "参与游戏请进行账号授权",
									style: tipsStyle,
									shadeClose: false,
									btn: ["去授权","拒绝"],
									yes:function(){
										window.location.href = "index.php?act=wkact";
									}
								});
								return false;
							});
						};
					} else {
						layer.open({
							content: "网络超时,请重试!",
							style: tipsStyle,
							shadeClose: false,
							btn: ["确定"]
						});
						$(".sg_start").unbind("click").bind("click", function() {
							layer.open({
								content: "网络超时,请重试!",
								style: tipsStyle,
								shadeClose: false,
								btn: ["确定"]
							});
						});
					};
				}
			},
			error: function() {
				layer.open({
					content: "网络超时,请重试!",
					style: tipsStyle,
					shadeClose: false,
					btn: ["确定"]
				});
			}
		});
	},
	gameStart: function() {
		var param = {};
		param.transactionType = "10020936";
		param.tt = Math.random();
		var url = "../port/client_json.php";
		$.ajax({
			url: url,
			data: param,
			dataType: "json",
			async: false,
			success: function(res) {
				if (res.resCode === "0004") {
					layer.open({
						content: "活动于2018年2月15日正式开始，欢迎参与！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"],
						success: function() {
							window.location.href = "index.php?act=sgdxd";
						}
					});
					return false;
				} else if (res.resCode === "0005") {
					layer.open({
						content: "本活动已圆满结束，请继续关注中福彩微信，更多精彩活动敬请期待！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"],
						success: function() {
							window.location.href = "index.php?act=sgdxd";
						}
					});
					return false;
				} else if (res.resCode === "0") {
					_gameTimeNum = 6000;
					_gameTime = setInterval(sg.gameTime, 10);
					if (res.pictureId && res.dogId) {
						$(".zgp_img").attr("src", "" + sg.imgUrl + "/sgdxd/scene_" + res.pictureId + ".jpg");
						$(".dog_count").html(res.dogCount);
						sg.orderId = res.orderId;
						sg.pictureId = res.pictureId;
						if ($(".click_box_" + res.pictureId + " .item").length === res.dogId.length) {
							$(".click_box_" + res.pictureId + "").show();
							$.each(res.dogId, function(i) {
								console.log(res.dogId[i])
								$(".click_box_" + res.pictureId + " .item").eq(i).attr("data-id", res.dogId[i])
							})
							$(".click_box_" + res.pictureId + " .item").unbind("click").bind("click", function() {
								if(!$(this).hasClass("on")){
									$(this).addClass("on");
									sg.lookForTicket(sg.orderId, sg.pictureId, $(this).attr("data-id"));
								};
							});
						};
					};
				} else if (res.resCode === "300002") {
					layer.open({
						content: "您今天的参与机会已用完，请明天继续参与！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				} else if (res.resCode === "300000") {
					layer.open({
						content: res.message,
						shadeClose: false,
						style: tipsStyle,
						btn: ["关闭"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				} else if (res.resCode === "208485") {
					layer.open({
						content: "参与游戏请进行账号授权",
						style: tipsStyle,
						shadeClose: false,
						btn: ["去授权","拒绝"],
						yes:function(){
							window.location.href = "index.php?act=wkact";
						},
						no:function(){
							window.location.href = "index.php?act=sgdxd";
						}
					});
					return false;
				} else {
					layer.open({
						content: "网络超时,请重试!",
						shadeClose: false,
						style: tipsStyle,
						btn: ["关闭"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				};
			},
			error: function() {
				layer.open({
					content: "网络超时,请重试!",
					shadeClose: false,
					style: tipsStyle,
					btn: ["关闭"]
				});
				return false;
			}
		});
	},
	lookForTicket: function(orderId, pictureId, dogId) {
		var param = {};
		param.transactionType = "10020937";
		param.tt = Math.random();
		param.orderId = orderId;
		param.pictureId = pictureId;
		param.dogId = dogId;
		var url = "../port/client_json.php";
		$.ajax({
			url: url,
			data: param,
			dataType: "json",
			async: false,
			success: function(res) {
				if (res.resCode === "0004") {
					layer.open({
						content: "活动于2018年2月15日正式开始，欢迎参与！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				} else if (res.resCode === "0005") {
					layer.open({
						content: "本活动已圆满结束，请继续关注中福彩微信，更多精彩活动敬请期待！",
						style: tipsStyle,
						shadeClose: false,
						btn: ["确定"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				} else if (res.resCode === "0") {
					$(".word_count").html(res.wordCount);
					if (parseInt(res.wordCount) == parseInt($(".dog_count").html())) {
						sg.game_over();
						if (res.prizeFlag === "0") {
							var time1 = setTimeout(function(){
								$(".tk_bg").show();
								clearTimeout(time1);
							},1500)
						} else if (res.prizeFlag === "1") {
							$(".money_sum").attr("src", "" + sg.imgUrl + "/sgdxd/" + res.prizeMoney + ".png");
							var time2 = setTimeout(function(){
								$(".tk_bg2").show();
								clearTimeout(time2);
							},1500)
						};
					};
				} else if (res.resCode === "300000") {
					layer.open({
						content: res.message,
						shadeClose: false,
						style: tipsStyle,
						btn: ["关闭"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				} else {
					layer.open({
						content: "网络超时,请重试!",
						shadeClose: false,
						style: tipsStyle,
						btn: ["关闭"],
						yes: function() {
							window.location.href = "index.php?act=sgdxd"
						}
					});
					return false;
				};
			},
			error: function() {
				layer.open({
					content: "网络超时,请重试!",
					shadeClose: false,
					style: tipsStyle,
					btn: ["关闭"],
					yes: function() {
						window.location.href = "index.php?act=sgdxd"
					}
				});
				return false;
			}
		});
	},
	gameTime: function() {
		_gameTimeNum--;
		if (_gameTimeNum <= 0) {
			$(".time_down").html("&nbsp;00'00''");
			sg.game_over();
			$(".tk_bg1").show();
		} else {
			$(".time_down").html(creatTimeText(_gameTimeNum));
		};
		function creatTimeText(n) {
			var text = (100000 + n + '').substr(-4, 4);
			text = '&nbsp;' + text.substr(0, 2) + "'" + text.substr(2) + "''";
			return text;
		};
	},
	game_over: function() {
		clearInterval(_gameTime);
	},
	preloadimages: function (arr){   
        var newimages=[], loadedimages=0
        var postaction=function(){}  //此处增加了一个postaction函数
        var arr=(typeof arr!="object")? [arr] : arr
        function imageloadpost(){
            loadedimages++
            if (loadedimages==arr.length){
                postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
            }
        }
        for (var i=0; i<arr.length; i++){
            newimages[i]=new Image()
            newimages[i].src=arr[i]
            newimages[i].onload=function(){
                imageloadpost()
            }
            newimages[i].onerror=function(){
                imageloadpost()
            }
        }
        return { //此处返回一个空白对象的done方法
            done:function(f){
                postaction=f || postaction
            }
        }
    },
	share: function(flg) {
		var friendcontent, desc;

		if(flg === "1"){
			desc = "福彩刮刮乐邀您寻戊戌狗票赢神秘奖励";
			friendcontent = "福彩刮刮乐邀您寻戊戌狗票赢神秘奖励。—搜“狗”大行动";
		}else if(flg === "2"){
			desc = "顽皮的“狗”们藏了起来，你找到了吗？";
			friendcontent = "顽皮的“狗”们藏了起来，你找到了吗？—搜“狗”大行动";
		}
		var shareData = {
			title: "搜“狗”大行动",
			desc: desc,
			friendcontent: friendcontent,
			imgUrl: ''+ sg.imgUrl +'/sgdxd/share.jpg',
			link: document.domain+'/h5/hd/index.php?act=sgdxd',
		};
		var wxCallbacks = {
			ready: function() {},
			cancel: function(resp) {},
			fail: function(resp) {},
			success: function(resp) {},
			all: function(resp) {}
		};
		WeixinApi.ready(function(Api) {
			Api.shareToFriend(shareData, wxCallbacks);
			Api.shareToTimeline(shareData, wxCallbacks);
			Api.shareToQQ(shareData, wxCallbacks);
			Api.shareToWeibo(shareData, wxCallbacks);
			Api.showOptionMenu();
		});
	}

}