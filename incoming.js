var incContacts={'A':[],
'B':[]}

for (i=0;i<=122;i++) {
  incContacts['A'][i]=false;
  incContacts['B'][i]=false;
}

var incnames={0:'Normal'};
for (var br=0; br<=4; br++) {
  incnames[2+br*2+1]="Brush Trip "+br;
  incContacts['A'][2+br*2]=true;
}
incContacts['B'][13]=true;

for (var dg=0;dg<10;dg++) {
  for (var gl=0;gl<10;gl++) {
    incnames[14+dg*11+gl]="incoming Group "+dg+" Line "+gl;
  }
  incnames[14+dg*11+10]="incoming Group "+dg+" Overflow";
  incContacts['B'][14+dg*11+10]=true
}

var incoming={'pos':0,'fpos':0};

function incState(seq) {
  return incoming.pos+eighths[incoming.fpos];
}
function incStatename(seq) {
  return incnames[incoming.pos];
}

function inctick1() {
  if (coiloperated({'name':'dUP','coil':9999})) {
    incoming.fpos++;
    if (incoming.fpos==8) {
      incoming.fpos=0;
      incoming.pos++;
    }
    incoming.complete=false;
  } else {
    if (incoming.fpos>0) {
      incoming.fpos--;
    }
  }
}

function inctick2() {
  if (incoming.fpos==0) {
    if (incContacts['A'][incoming.pos]) 
      make_link('iC.bA','iC.cA');
    else
      break_link('iC.bA','iC.cA');
    if (incContacts['B'][incoming.pos]) 
      make_link('iC.bB','iC.cB');
    else
      break_link('iC.bB','iC.cB');
  }
  make_link('iC.bG','iC.cG');
}

console.log(incContacts);