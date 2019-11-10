/*鼠标悬浮按钮更换图片*/
function changeQuery2(element){
	element.setAttribute("src","img/query2.png")
}
function changeQuery1(element){
	element.setAttribute("src","img/query1.png")
}
//控制跳转框输入数字的范围
function controlNumber(){
	var dumpNumber = Math.round(Number($("#dumpNumber").val()));
	var dumpNumberMax = Number($("#dumpNumber").attr("max"));
	if(dumpNumber<1){
		$("#dumpNumber").val(1);
	} else if(dumpNumber>dumpNumberMax){
		$("#dumpNumber").val(dumpNumberMax);
	} else {
		$("#dumpNumber").val(dumpNumber);
	}
}
//全选和全不选
function allCheck(element){
	if($(element).text()=="全选"){
		$("input[name=batchDeal]").attr("checked","true");
		$(element).text("全不选");
	} else if($(element).text()=="全不选"){
		$("input[name=batchDeal]").removeAttr("checked");
		$(element).text("全选");
	}
}
//文件名显示
function loadFile(file){
	$("#fileName").html(file.name);
}
