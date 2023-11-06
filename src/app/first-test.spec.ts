describe('first test', () => {
  let testVariable: any;

  beforeEach(() => {
    testVariable = {};
  });

  it('should return true if a is true', () => {
    // Arrange
    testVariable.a = false;

    // Act
    testVariable.a = true;

    // Assert
    expect(testVariable.a).toBe(true);
  });
});
