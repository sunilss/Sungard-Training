(function(){
	var storage = new TaskStorage();
	function addTask(){
		var txtTask = document.getElementById("txtTask");
		var taskName = txtTask.value;
		var newTask = storage.addTask(taskName);
		addTaskToUi(newTask);

	}

	function addTaskToUi(task){
		var newTaskItem = document.createElement("li");
		newTaskItem.addEventListener("click",onTaskItemClick);
		newTaskItem.setAttribute("data-task-id",task.taskId);
		newTaskItem.innerText = task.taskName;
		if (task.isCompleted){
			newTaskItem.classList.add("completed");
		}
		var taskList = document.getElementById("ulTaskList");
		taskList.appendChild(newTaskItem);
	}

	function addTaskToStorage(taskName){
		var taskId = new Date().getTime().toString();
		storage.setItem(taskId,taskName);
		return taskId;
	}
	function initialize(){
		document.getElementById("btnAddTask").addEventListener('click',addTask);
		document.getElementById("btnRemoveCompletedTasks").addEventListener('click',removeCompletedTasks);
		//load initial tasks from storage
		var tasks = storage.getAll();
		for(var i =0;i<tasks.length;i++){
			var task= tasks[i];
			addTaskToUi(task);
		}
		
	}
	function onTaskItemClick(){
		if (this.classList.contains("completed")){
			this.classList.remove("completed");
		} else {
			this.classList.add("completed");
		}
		storage.toggleCompletion(this.getAttribute("data-task-id"));
	}

	

	function removeCompletedTasks(){
		var taskList = document.getElementById("ulTaskList");
		var allTaskItems = document.querySelectorAll("#ulTaskList > li");
		for(var i=allTaskItems.length-1;i>=0;i--){
			var taskItem = allTaskItems[i];
			if (taskItem.classList.contains("completed")){
				storage.removeTask(taskItem.getAttribute("data-task-id"));
				taskList.removeChild(taskItem);
			}
		}
	}
	document.addEventListener("DOMContentLoaded",initialize);
})();
