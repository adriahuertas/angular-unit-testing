import { CalculatorService } from './calculator.service';

describe('Calculator Service', () => {
  it('should add two numbers', () => {
    const calculator = new CalculatorService();

    const result = calculator.add(2, 5);

    expect(result).toBe(7);
  });

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService();

    const result = calculator.subtract(5, 2);

    expect(result).toBe(3);
  });
});
