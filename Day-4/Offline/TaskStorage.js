function TaskStorage(){
	var storage = window.localStorage;
	window.addEventListener("storage",function(evt){
		console.log(evt);
	});
	function addTaskToStorage(taskName){
		var taskId = new Date().getTime().toString();
		var newTask = {
			taskId : taskId,
			taskName : taskName,
			isCompleted : false
		};
		storage.setItem(taskId,window.JSON.stringify(newTask));
		return newTask;
	}
	function removeTaskFromStorage(taskId){
		storage.removeItem(taskId);
	}
	function getAllTasksFromStorage(){
		var tasks = [];
		for(var i=0;i<storage.length;i++){
			var taskId = storage.key(i);
			var taskAsString = storage.getItem(taskId);
			var task = window.JSON.parse(taskAsString);
			tasks.push(task);
		}
		return tasks;
	}
	function toggleCompletion(taskId){
		var task = window.JSON.parse(storage.getItem(taskId));
		task.isCompleted = !task.isCompleted;
		storage.setItem(taskId,window.JSON.stringify(task));
	}
	return {
		addTask : addTaskToStorage,
		removeTask : removeTaskFromStorage,
		getAll : getAllTasksFromStorage,
		toggleCompletion : toggleCompletion
	};

}
