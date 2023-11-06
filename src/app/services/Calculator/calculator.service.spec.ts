import { CalculatorService } from './calculator.service';

describe('Calculator Service', () => {
  let calculator: CalculatorService;
  let mockLoggerService: any;

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(mockLoggerService);
  });

  it('should add two numbers', () => {
    const result = calculator.add(2, 5);

    expect(result).toBe(7);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = calculator.subtract(5, 2);

    expect(result).toBe(3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
