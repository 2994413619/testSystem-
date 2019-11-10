$(function(){
	//倒计时
	//设置交卷时间
	var submitTime = new Date();
	var h = submitTime.getHours();
	var m = submitTime.getMinutes();
	var s = submitTime.getSeconds();
	var ye = submitTime.getFullYear();
	var mo = submitTime.getMonth();
	var da = submitTime.getDate();
	submitTime.setFullYear(ye,mo,da);
	submitTime.setHours(h+2,m,s);
	
	
	setInterval(function(){
		//获取现在的时间
		var nowDate = new Date();
		var minuteDown = Math.floor((submitTime - nowDate)/1000/60);
		var secondDown = Math.floor((submitTime - nowDate)/1000%60);
		$("#countDown").text(minuteDown+":"+secondDown);
	},990);
});
