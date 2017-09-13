/*var testinput={
  0  :[['tDP','GND',true ]],
  10 :[['tDP','GND',false]],
  20 :[['tDP','GND',true ]],    //1
  30 :[['tDP','GND',false]],
  40 :[['tDP','GND',true ]],    //2
  50 :[['tDP','GND',false]],
  60 :[['tDP','GND',true ]],    //3
  70 :[['tDP','GND',false]],
  80 :[['tDP','GND',true ]],    //4
  90 :[['tDP','GND',false]],
  100:[['tDP','GND',true ]],    //5
  110:[['tDP','GND',false]],
  120:[['tDP','GND',true ]],    //6
  130:[['tDP','GND',false]],
  140:[['tDP','GND',true ]],    //7

  200:[['tDP','GND',false]],
  210:[['tDP','GND',true ]],    //1
  220:[['tDP','GND',false]],
  230:[['tDP','GND',true ]],    //2

  300:[['tDP','GND',false]],
  310:[['tDP','GND',true ]],    //1
  320:[['tDP','GND',false]],
  330:[['tDP','GND',true ]],    //2
};*/

function dial(time,digits) {
  inputs={time:[['tDP','GND',true]]};
  time+=5;
  for (digit of digits) {
    for (var i=0;i<parseInt(digit);i++) {
      inputs[time]=[['tDP','GND',false]];
      time+=5;
      inputs[time]=[['tDP','GND',true]];
      time+=5;
    }
    time+=10;
  }
  return inputs;
}

testinput=dial(0,'2225678');
console.log(testinput);