$(function(){
	var k=false;
	//手机号验证
	$("#regist-username").blur(function(){
		var usernameText=$("#regist-username").val();
		console.log(usernameText);
		if(usernameText.length==0){
			$(".error1").show().html("手机号不能为空");
			$(".clear-input-btn1").show();
			$(".clear-input-btn1_1").hide();
		}else if((/^1[34578]\d{9}$/.test(this.value))){
			$(".error1").hide()
			$(".clear-input-btn1").hide();
			$(".clear-input-btn1_1").show();
		}else{
		$(".error1").show().html("请输入11位手机号");
		}
		$.ajax({
			type:"GET",
			url:"check_username.php",
			data:"username="+usernameText,
			dataType:"json",
		}).done(function(data){
			console.log(data)
			if(data.status===0){
				$(".error1").show().html("手机号已存在");
				$(".clear-input-btn1_1").hide();
				$(".clear-input-btn1").show();
			}else if((/^1[34578]\d{9}$/.test(this.value))){
			 	$(".clear-input-btn1_1").show();
					 k=true;
			}
		})
		
	})
	//密码验证
	$("#regist-password1").blur(function(){
		var pwd1=$("#regist-password1").val();
		if(pwd1.length==0){
			$(".error2").show().html("密码不能为空");
			$(".clear-input-btn2").show();
		}else if(!(/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/.test(this.value))){
			$(".error2").show().html("请重新输入密码");
			$(".clear-input-btn2_2").hide();
			k =false;
			return;
		}else{
			$(".clear-input-btn2_2").show();
			$(".error2").hide();
			$(".clear-input-btn2").hide();
			k =true;
		}
	});
	//二次密码
	$("#regist-password2").blur(function(){
		var pwd2=$("#regist-password2").val();
		if((pwd2!=$("#regist-password1").val()) ||(pwd2.length==0)){
			$(".error3").show().html("两次密码不一致")
			$(".clear-input-btn3").show();
			K=false;
		}else{
			$(".clear-input-btn3_3").show();
			$(".clear-input-btn3").hide();
			$(".error3").hide();
		}
	})

	//提交注册
	$("#regBtn").on("click",function(){
		if(($("#regist-password2").val()!=$("#regist-password1").val()) ||($("#regist-password2").val().length==0)){
			k=false;
		}
		
		if(!k){
			$(".warrn").slideDown();
		}else{
			var usernameText=$("#regist-username").val();
			var pwd1=$("#regist-password1").val();
			$.ajax({
				type:"post",
				url :"register_do.php",
				data:"username="+usernameText+"&password="+pwd1,
				dataType:"json"
			}).done(function(data){
				if(data.status===0){
					$("#regBtn").hide();
					$("#regist-loading").show();
					setTimeout(function(){
						location.href="login_info.html";
					},2000);
				}else{
					$(".warrn").slideDown();
				}
			})
		}
	})	
})
