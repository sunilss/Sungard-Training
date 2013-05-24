function SalaryCalculator(){
	var _basic, 
		_hra, 
		_da, 
		_tax,
		_salary,
		_callbacks = {};

	this.basic = function(){
		if (arguments.length == 0) return _basic;
		_basic = arguments[0];
		triggerModelChanged('basic');
	};
	this.hra = function(){
		if (arguments.length == 0) return _hra;
		_hra = arguments[0];
		triggerModelChanged('hra');
	};
	this.da = function(){
		if (arguments.length == 0) return _da;
		_da = arguments[0];
		triggerModelChanged('da');
	};
	this.tax = function(){
		if (arguments.length == 0) return _tax;
		_tax = arguments[0];
		triggerModelChanged('tax');
	};
	this.salary = function(){
		return _salary;
	}
	this.calculate = function(){
		var net = _basic + _hra + _da;
		var taxableIncome = net * (_tax/100);
		_salary = net - taxableIncome;
		triggerModelChanged('salary');
	};
	this.addOnModelChanged = function(attr,callback){
		if (!_callbacks[attr]) _callbacks[attr] = [];
		_callbacks[attr].push(callback);
	}
	function triggerModelChanged(attr){
		if (!_callbacks[attr]) return;
		_callbacks[attr].forEach(function(cb){cb();});
	}
}