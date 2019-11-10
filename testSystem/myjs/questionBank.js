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
