$(function(){
	textareaHeight1 = 29;
	textareaHeight2 = 20;
	//动态修改textarea的rows
	$("textarea")[0].setAttribute("rows","1");
	textareaHeight1 = $("textarea")[0].scrollHeight;
	$("textarea")[0].setAttribute("rows","2");
	textareaHeight2 =$("textarea")[0].scrollHeight - textareaHeight1;
	
	textareaHeight1 -= textareaHeight2;
	
	$("textarea").each(function(index){
		var leng = Math.ceil((this.scrollHeight - textareaHeight1)/textareaHeight2);
		this.setAttribute("rows",leng);
	});
});

//动态修改textarea的rows
function changeRows(element){
	var leng = Math.ceil((element.scrollHeight - textareaHeight1)/textareaHeight2);
	element.setAttribute("rows",leng);
}