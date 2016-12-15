//抽离头尾函数
function loadHtml(url, targetId){
		$.ajax({
			url: url,
			async: false,
			success: function(data) {
				$("#"+targetId).html(data);
			}
		})
	}
$(function(){
	$(".header-nav-list li").click(function(){
			console.log(1111)
			$(this).children("a").css("color","#FFA500").parents(".header-nav-list li").siblings().children("a").css("color","#666666");
		})
	
})