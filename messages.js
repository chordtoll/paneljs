function relayactuated(r) {
  //alert(r);
  if (['AL','BL','CL','THL','HL','TL','UL'].includes(r)) {
    log("Register "+r.slice(0,-1)+" latched value "+getregistervalue(r.slice(0,-1)));
    return;
  }
  if (r=='ST'){
    log("Decoder start");
    return;
  }
}

function relayreleased(r) {

}

function log(message) {
  document.getElementById('log').value+=timer+': '+message+'\n';
}

function getregistervalue(register) {
  var values=[10,1,2,4,5]
  for (n in 'Z1245') {
    if (relays[register+'Z1245'[n]].timer==0)
      values[n]=0
  }
  var number=values.reduce(function(a, b) { return a + b; }, 0);
  if (number==10)
    return 0;
  if (number==0)
    return -1;
  return number;
}