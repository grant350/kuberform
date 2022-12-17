const MY_BEVERAGE = {
  delicious: true,
  sour: false
};

describe('fill me in core test', ()=> {
  test('is delicious', ()=> {
    expect(MY_BEVERAGE.delicious).toBeTruthy();
  });

  test('is not sour', ()=> {
    expect(MY_BEVERAGE.sour).toBeFalsy();
  });
});
