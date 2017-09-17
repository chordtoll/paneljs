var finContacts={'A':[],
'B':[]}

for (i=0;i<=122;i++) {
  finContacts['A'][i]=false;
  finContacts['B'][i]=false;
}

var finnames={0:'Normal'};
for (var br=0; br<=4; br++) {
  finnames[2+br*2+1]="Brush Trip "+br;
  finContacts['A'][2+br*2]=true;
}
finContacts['B'][13]=true;

for (var dg=0;dg<10;dg++) {
  for (var gl=0;gl<10;gl++) {
    finnames[14+dg*11+gl]="final Group "+dg+" Line "+gl;
  }
  finnames[14+dg*11+10]="final Group "+dg+" Overflow";
  finContacts['B'][14+dg*11+10]=true
}

var final={'pos':0,'fpos':0};

function finState(seq) {
  return final.pos+eighths[final.fpos];
}
function finStatename(seq) {
  return finnames[final.pos];
}

function fintick1() {
  if (coiloperated({'name':'fUP','coil':9999})) {
    final.fpos++;
    if (final.fpos==8) {
      final.fpos=0;
      final.pos++;
    }
    final.complete=false;
  } else {
    if (final.fpos>0) {
      final.fpos--;
    }
  }
}

function fintick2() {
  if (final.fpos==0) {
    if (finContacts['A'][final.pos]) 
      make_link('fC.bA','fC.cA');
    else
      break_link('fC.bA','fC.cA');
    if (finContacts['B'][final.pos]) 
      make_link('fC.bB','fC.cB');
    else
      break_link('fC.bB','fC.cB');
  }
  make_link('fC.bG','fC.cG');
}

console.log(finContacts);