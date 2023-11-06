import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    service = new LoggerService();
  });
  it('should not have any messages at starting', () => {
    // act
    let count = service.messages.length;

    expect(count).toBe(0);
  });

  it('should add a message when log() is called', () => {
    // act
    service.log('test message');

    // assert
    expect(service.messages.length).toBe(1);
  });

  it('should clear all messages when clear() is called', () => {
    // arrange
    service.log('test message');

    // act
    service.clear();

    // assert
    expect(service.messages.length).toBe(0);
  });
});
