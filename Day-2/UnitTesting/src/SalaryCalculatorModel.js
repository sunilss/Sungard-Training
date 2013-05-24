function SalaryCalculator(){
	var _basic, _hra, _da, _tax;
	this.basic = function(){
		if (arguments.length == 0) return _basic;
		_basic = arguments[0];
	};
	this.hra = function(){
		if (arguments.length == 0) return _hra;
		_hra = arguments[0];
	};
	this.da = function(){
		if (arguments.length == 0) return _da;
		_da = arguments[0];
	};
	this.tax = function(){
		if (arguments.length == 0) return _tax;
		_tax = arguments[0];
	};
	this.calculate = function(){
		var net = _basic + _hra + _da;
		var taxableIncome = net * (_tax/100);
		var gross = net - taxableIncome;
		return gross;
	}
}