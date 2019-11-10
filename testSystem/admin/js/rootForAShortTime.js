function addTeacherName(){
	var userName = document.getElementById("userName").value;
	var teacherList = document.getElementById("teacherList");
	teacherList.innerHTML += userName+"\n";
}
