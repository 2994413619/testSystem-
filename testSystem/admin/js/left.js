$(function() {
	$(".leftsidebar_box dd").hide();
	$(".leftsidebar_box dt").click(function() {
		//更改dt背景颜色
		//1、所有dt颜色回复原来的
		$(".leftsidebar_box dt").css({
			"background-color": "#3992d0"
		});
		//2、把选中的dt颜色加深
		$(this).css({
			"background-color": "#317eb4"
		});
		
		//更改dt右侧图标
		//1、修改所有小图标，改为向上
		$(".leftsidebar_box dt img").attr("src", "images/left/select_xl01.png");
		//2、把当前的小图标改为向下
		$(this).parent().find('img').attr("src", "images/left/select_xl.png");
		
		//更改左侧图标
		//1、区分单前选中的dt与其他dt
		$(this).addClass("selectThis");
		$("dt").each(function(){
			//2、判断是否为选中的dt——选中的图片交替，未选中的图片改为未选中状态
			//不同浏览器中background-image的url值中，有的有双引号，有的没有，以下有兼容代码
			if($(this).hasClass("selectThis")){
				var flag = $(this).css("background-image").indexOf("_current");
				if(flag == -1){
					var bgimg = $(this).css("background-image").split(".png")[0];
					var bgimg2 = $(this).css("background-image").split(".png")[1];
					$(this).css("background-image",bgimg+"_current.png"+bgimg2);
				} else {
					var bgimg = $(this).css("background-image").split("_current.png")[0];
					var bgimg2 = $(this).css("background-image").split("_current.png")[1];
					$(this).css("background-image",bgimg+".png"+bgimg2);
				}
			} else {
				var flag = $(this).css("background-image").indexOf("_current");
				if(flag != -1){
					var bgimg = $(this).css("background-image").split("_current.png")[0];
					var bgimg2 = $(this).css("background-image").split("_current.png")[1];
					$(this).css("background-image",bgimg+".png"+bgimg2);
				}
			}
		});
		//3、把当前dt和其他dt统一
		$(this).removeClass("selectThis");
		
		//二级目录显隐
		//1、把选中的dd与未选中的分开
		$(this).parent().find('dd').removeClass("menu_chioce");
		//2、收缩所有二级目录
		$(".menu_chioce").slideUp();
		//3、为当前目录添加动画
		$(this).parent().find('dd').slideToggle();
		//4、重新把所有一级目录同一管理
		$(this).parent().find('dd').addClass("menu_chioce");
	});
})