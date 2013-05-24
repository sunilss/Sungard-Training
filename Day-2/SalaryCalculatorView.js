function SalaryCalculatorView(model,templateId){
	var _model = model, _templateId = templateId;
	
	var findNode = (function(type,id){
			return Array.prototype.filter.call(this.root.getElementsByTagName(type),
				function(node){ return node.id==id})[0];
		}).bind(this);

	this.initialize = function(){
		this.root = document.createElement("div");
		this.root.innerHTML = document.getElementById(_templateId).innerHTML;
		findNode('input','btnCalculate').addEventListener('click',function(e){
				calculateSalary();
		});
		function calculateSalary(){
			_model.calculate();
		}
		function refreshSalary(){
			findNode("span","spanResult").innerHTML = _model.salary();
		}
		this.root.addEventListener('change',function(e){
			if (e.srcElement.id == "txtBasic") _model.basic(parseFloat(e.srcElement.value));
			if (e.srcElement.id == "txtHra") _model.hra(parseFloat(e.srcElement.value));
			if (e.srcElement.id == "txtDa") _model.da(parseFloat(e.srcElement.value));
			if (e.srcElement.id == "txtTax") _model.tax(parseFloat(e.srcElement.value));
		});
		function updateAttributes(){
			console.log("updateAttributes triggerd",this);
			findNode("input","txtBasic").value =_model.basic();
			findNode("input","txtHra").value =_model.hra();
			findNode("input","txtDa").value =_model.da();
			findNode("input","txtTax").value =_model.tax();
			
		}
		_model.addOnModelChanged('salary',refreshSalary.bind(this));
		_model.addOnModelChanged('basic',updateAttributes.bind(this));
		_model.addOnModelChanged('hra',updateAttributes.bind(this));
		_model.addOnModelChanged('da',updateAttributes.bind(this));
		_model.addOnModelChanged('tax',updateAttributes.bind(this));
	};

	
}
