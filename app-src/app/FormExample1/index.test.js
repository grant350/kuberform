const myBeverage = {
  delicious: true,
  sour: false,
};

describe('fill me in form example test', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});