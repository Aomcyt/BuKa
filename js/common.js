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
	var data = window.location.search.slice(1);
	$(".header-nav-list a").eq(data-1).css("color","#FFA500");
})