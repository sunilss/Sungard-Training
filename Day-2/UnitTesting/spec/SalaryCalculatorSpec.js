describe("SalaryCalculator", function() {

  it("should be able to calculate the salary", function() {
    var calculator = new SalaryCalculator();
    calculator.basic(10000);
    calculator.hra(3000);
    calculator.da(2000);
    calculator.tax(10);
    var salary = calculator.calculate();
    expect(salary).toEqual(1350);
  });

  
});