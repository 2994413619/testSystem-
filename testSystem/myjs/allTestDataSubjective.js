/*
 * 三个页面：
 * allTestDataSubjective.html
 * allTestDataGapFilling.html
 * allTestDataStudentData.html
 */

/*
 * 改为改卷状态——onclick
 * 触发事件元素：<button class="btn btn-primary" onclick="starSetScore(this)" forId="tomid2">打分</button>
 * 改变节点：<td id="tomid2">10</td>
 */
function starSetScore(element){
	var forId = element.getAttribute("forId");
	var oldScore = $("#"+forId).text();
	$("#"+forId).html("<input type='number' min='0' class='form-control' onblur='setScore(this)' value='"+oldScore+"'>");
	$("#"+forId).children("input").focus();
}
//保存学生分数——onblur
function setScore(element){
	//获得value
	var newScore = Number.parseFloat($(element).val());
	//并转换为整数
	newScore = Math.round(newScore);
	//值小于零，重新输入
	if(newScore < 0){
		alert("分数不合法,请重新打分");
		$(element).val(0);
		return false;
	}
	//值大于1000，重新输入
	if(newScore > 1000){
		alert("分数不合法,请重新打分");
		$(element).val(0);
		return false;
	}
	//判断数是不是NaN
	if(isNaN(newScore)){
		newScore = 0;
	}
	
	//提交数据到服务器，改变学生分数
	/*—————————————————————————————————————————————————————————————————————*/
	
	
	
	
	
	/*————————————————————————————————————————————————————————————————————*/
	
	//转为查看状态
	$(element).parent().text(newScore);
}
