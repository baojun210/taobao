function createBannerImg(){
	for(var i=0;i<5;i++){
		$(".banner").append("<a><img src='./img/banner-"+(i+1)+".jpg' /></a>");
		index = i;
	};
};
createBannerImg();
function createBannerDots(){
	for(var i=0;i<5;i++){
		$(".banner1").find(".dots").append("<a class='dot'></a>");
	};
};
createBannerDots();
// banner 初始化
var	$index = $(".dot"),
	_index;
$(".banner a:eq(0)").find("img").css("display","block");
$(".dots .dot:eq("+ a+ ")").addClass("current").siblings().removeClass("current");
var a = 0;
$(".dots .dot:eq("+ a +")").addClass("current");
// 点点切换
$(".dots .dot").mouseover(function(){
	for( var i = 0;i<$index.length;i++){
		$(this).addClass("current").siblings().removeClass("current");
		var _index = $(this).index();
	}
	$(".banner a:eq("+ _index + ")").find("img").fadeIn(500).parent().siblings().find("img").fadeOut(500);
	$(".dots .dot:eq("+ _index + ")").addClass("current").siblings().removeClass("current");
	a =_index;
});
// 向右切换
$(".banner1 .banner-r").click(function(){
	clearInterval(time);
	a >=4 ? a = 0 : ++a;
	$(".banner a:eq("+ a +")").find("img").fadeIn(500).parent().siblings().find("img").fadeOut(500);
	$(".dots .dot:eq("+ a + ")").addClass("current").siblings().removeClass("current");
});
// 向左切换
$(".banner1 .banner-l").click(function(){
	clearInterval(time);
	a <= 0 ? a = 4 : a--;
	$(".banner a:eq("+ a +")").find("img").fadeIn(500).parent().siblings().find("img").fadeOut(500);
	$(".dots .dot:eq("+ a + ")").addClass("current").siblings().removeClass("current");
});
// 定时轮播
var timer = function(){
	a++;
	a ==5 ? $(".dots .dot:eq(0)").mouseover() : $(".dots .dot:eq("+ a +")").mouseover();
}
	time = setInterval(timer,2000);
$(".banner").mouseover(function(){
	clearInterval(time);
}).mouseleave(function(){
	time = setInterval(timer,2000);
});
// go top
$(window).scroll(function(){
	scrollY > 100 ? $(".fixed").css("display","block") : $(".fixed").css("display","none");
});
$(".fixed").click(function(){
	$("body").animate({scrollTop:"0px"},500);
});

var title = ["科技", "生活", "设计", "娱乐", "农业", "公益"];
$.ajax({
	url:"http://www.ikindness.cn/api/test/getFund"
}).done(function(data){
	console.log(data);
	$(".fullNav").floor({
		data : data.data
	});
});

$.fn.extend({
	floor : function(data){
		var data = data.data;
		for(j = 0;j<6;j++){
			$firstDiv = $("<div class='first'></div>");
			$firstDiv.append("<div class='floor-info'><a href=''>"+
								"<span class='num'>"+(j+1)+"F</span >"+
								"<span class='name'>"+title[j+1]+"</span>"+
								"<span class='icon'>▶</span>"+
								"</a></div>");
			$firstUl = $("<ul class='nav-list'></ul>");
			for(i = 0+8*j;i<8+8*j;i++){	
				var _data = data
				if(i == 0+8*j){
					$firstUl.append("<li> <img class='main-img' src='"+_data[i].image+"' /> <a class='first-link' href=''> <div class='info'>"+
								"<div class='name'>"+_data[i].name+"</div><div class='money'> <span>已筹金额￥</span> <span class='J_money'>"+_data[i].sum+"</span>"+
								"</div><span class='link'><span class='text'>查看项目></span></span></div></a></li>");	
				}else{
					var a="";
					for(var k = 0;k < _data[i].label.length;k++){
						a+=("<span class='tag-link'>"+_data[i].label[k]+"</span>");
					}
					$firstUl.append("<li class='nav-item'><a class='link' href=''><span class='project-area'><img src='"+_data[i].image+"' /></span>"+
						"<span class='project-text'>" + _data[i].name + "</span><div class='hidden'></div></a><span class='tag-con'>"+
						a+"</span></span><span class='bar'><i class='full'></i>"+
	      				"</span><span class='project'><span class='other-info'><span class='every-info info-deal'><em class='info-num'>"+_data[i].rate+"</em>"+
	      				"<em class='info-name'>达成率</em></span><span class='every-info info-dollar'><em class='info-num'>"+_data[i].sum+"</em>"+
	      				"<em class='info-name'>已筹金额</em></span><span class='every-info info-support'><em class='info-num'>"+_data[i].amount+"</em>"+
	      				"<em class='info-name'>支持人数</em></span></span></span></li>");
				}	

			}
			$firstDiv.append($firstUl);
			$firstDiv.appendTo(".fullNav");
		}
	}
})