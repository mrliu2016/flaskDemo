(function(a) {
	a.fn.LightBox = function(options) {
		var defaults = {
			controls: true //上一张、下一张是否显示，默认是显示true
		}
		var opts = a.extend(defaults, options);
		var lb_wrap = '<div class="lb_wrap"><div class="lightbox_bg"></div><div class="lightbox"><img src="" class="lg_img"></div></div>';
		a("body").append(lb_wrap);
		//controls
		if (opts.controls) {
			a(".lightbox").append('<p class="prev"></p><p class="next"></p>');
		}

		function imgobj(obj1, obj2) {
			//imgObj.height是通过img对象获取的图片的实际高度
			obj1[0].addEventListener('load', function() {
				var margintop = $(window).height() - ($(obj1).height());
				// console.log($(obj1).height())
				obj2.css("margin-top", margintop / 2);
			})
		}
		this.each(function() {
			var obj = a(this);
			var numpic = obj.find(".item").length;
			var num = 0;
			//点击赋值并显示
			obj.find(".item").click(function() {
				$(".sg_start").css("z-index","0");
				// console.log(this)
				var src = a(this).attr("data-rel");
				a(".lg_img").attr("src", src);
				imgobj(a(".lg_img"), a(".lightbox"));
				a(".lb_wrap").fadeIn();
				a(".lg_img").fadeIn();
				a(".prev").fadeIn().siblings(".next").fadeIn();
				num = a(this).parent().index(); //获取当前图片的父元素的索引并赋给num为后边点击上一张、下一张服务		
			});
			//上一张
			a(".prev").click(function() {
				if (num == 0) {
					num = numpic;
				}
				var src = obj.find(".item").eq(num - 1).attr("data-rel");
				a(".lg_img").attr("src", src);
				imgobj(a(".lg_img"), a(".lightbox"));

				num--;
			});
			//下一张
			a(".next").click(function() {
				if (num == numpic - 1) {
					num = -1;
				}
				// console.log(num)
				if (num >= 7) {
					num = 0
				}
				var src = obj.find(".item").eq(num + 1).attr("data-rel");
				a(".lg_img").attr("src", src);
				imgobj(a(".lg_img"), a(".lightbox"));
				num++;
			});
			//点击除了上一张、下一张之外的其他地方隐藏
			a(".lb_wrap").click(function(e) {
				$(".sg_start").css("z-index","1");
				var e = e || window.event;
				var elem = e.target || e.srcElement;
				while (elem) {
					if (elem.className && elem.className.indexOf('prev') > -1) {
						return;
					}
					if (elem.className && elem.className.indexOf('next') > -1) {
						return;
					}
					elem = elem.parentNode;
				}
				a(this).find("img").attr("src", "").hide(); //隐藏后，再将默认的图片赋给lightbox中图片的src
				a(this).find(".prev").hide().siblings(".next").hide();
				a(this).fadeOut();
			});
		})
	}
})(jQuery);