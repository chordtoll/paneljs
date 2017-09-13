var distContacts={'A':[],
'B':[]}

for (i=0;i<=122;i++) {
  distContacts['A'][i]=false;
  distContacts['B'][i]=false;
}

var distnames={0:'Normal'};
for (var br=0; br<=4; br++) {
  distnames[2+br*2+1]="Brush Trip "+br;
  distContacts['A'][2+br*2]=true;
}
distContacts['B'][13]=true;

for (var dg=0;dg<10;dg++) {
  for (var gl=0;gl<10;gl++) {
    distnames[14+dg*11+gl]="District Group "+dg+" Line "+gl;
  }
  distnames[14+dg*11+10]="District Group "+dg+" Overflow";
  distContacts['B'][14+dg*11+10]=true
}

var district={'pos':0,'fpos':0};

function distState(seq) {
  return district.pos+eighths[district.fpos];
}
function distStatename(seq) {
  return distnames[district.pos];
}

function disttick1() {
  if (coiloperated({'name':'dUP','coil':9999})) {
    district.fpos++;
    if (district.fpos==8) {
      district.fpos=0;
      district.pos++;
    }
    district.complete=false;
  } else {
    if (district.fpos>0) {
      district.fpos--;
    }
  }
}

function disttick2() {
  if (district.fpos==0) {
    if (distContacts['A'][district.pos]) 
      make_link('dC.bA','dC.cA');
    else
      break_link('dC.bA','dC.cA');
    if (distContacts['B'][district.pos]) 
      make_link('dC.bB','dC.cB');
    else
      break_link('dC.bB','dC.cB');
  }
  make_link('dC.bG','dC.cG');
}

console.log(distContacts);