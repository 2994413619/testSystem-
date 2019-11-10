//题目范围
function removeLabel(e){
	var theEvent = window.event||e;
	theEvent.stopPropagation();
	$(this).parent().appendTo("#requestTypeDown");
	$(this).parent().bind('click',addLabel);
	this.style.display = "none";
}
function addLabel(){
	$(this).appendTo("#requestTypeUp");
	$(this).children("span").css("display","inline-block");
	$(this).children("span").one('click',removeLabel);
	$(this).unbind('click',addLabel);
}

//标签随机背景函数
function randombg(i){
	var bgclass = new Array("btn-primary","btn-success","btn-info","btn-warning","btn-danger");
	return bgclass[i];
}

//新建test提交
function newTestSubmit(){
	//考试范围是否为空
	if($("#requestTypeUp button").length==0){
		alert("请选择题目范围");
	}else{
		$("#newTestSubmit").submit();
	}
}

$(function(){
	//为题目范围标签添加事件
	//$("#requestTypeUp>button>span").one('click',removeLabel);
	$("#requestTypeDown>div").bind('click',addLabel);
	
	//为标签随机添加背景
	$("#requestTypeDown").children().each(function(i){
		/*if(i>4)
			i = i%5;
		$(this).addClass(randombg(i));*/
		var i = Math.ceil(Math.random()*225);
		var j = Math.ceil(Math.random()*225);
		var k = Math.ceil(Math.random()*225);
		$(this).css("background-color","rgb("+i+","+j+","+k+")");
	});
	
});