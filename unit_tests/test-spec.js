function addFunction(a, b) {
    return a+b;
}

describe('Calculator', function () {
    it('should be able to add two numbers and return result', function () {
        // expect(addFunction(2, 3)).toBe(5);
        expect(addFunction(2.0, 3)).toBe(5);
    });
});