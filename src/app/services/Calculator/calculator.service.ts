import { Injectable } from '@angular/core';
import { LoggerService } from '../Logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private loggerService: LoggerService) {}

  add(n1: number, n2: number) {
    this.loggerService.log(`Adding ${n1} and ${n2}`);
    return n1 + n2;
  }

  subtract(n1: number, n2: number) {
    this.loggerService.log(`Subtracting ${n1} and ${n2}`);
    return n1 - n2;
  }
}
