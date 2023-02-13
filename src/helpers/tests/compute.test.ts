import multiply from '../compute';

// unit testing
describe('compute helper', () => {
  test('should multiply two arguments', () => {
    const result = multiply(3, 3);
    expect(result).toBe(9);
  });
});
