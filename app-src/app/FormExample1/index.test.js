const MY_BEV = {
  delicious: true,
  sour: false
};

describe('fill me in form example test', ()=> {
  test('is delicious', ()=> {
    expect(MY_BEV.delicious).toBeTruthy();
  });

  test('is not sour', ()=> {
    expect(MY_BEV.sour).toBeFalsy();
  });
});
