cNONE=['#fff','#fff'];
cGRAY=['#ddd','#ccc'];
cRED=['#fcc','#f00'];
cCYAN=['#cff','#0ff'];
cBLUE=['#cdf','#68f'];
cGREEN=['#cfc','#0f0'];
cTEAL=['#cfe','#0fc'];
var rcolor = {
  0:{'default':cRED},
  1:{'default':cGRAY,
  'L':cGREEN,
  'L1':cGREEN,
  'RA':cGREEN,
  'RA1':cGREEN,},
  2:{'default':cGRAY,
  'L':cGREEN,
     'RA1':cGREEN,}
};

var elementhide = {
  0:[],
  1:['seqtab','comtab','frtab','extra'],
  2:['seqtab','comtab','frtab','extra'],
};

for (var i of '123456') {
  for (var d of [1,2]) {
  rcolor[d]['P'+i]=cRED;
  rcolor[d]['P'+i+'`']=cRED;
}
}
for (var i of ['A','B','C','TH','H','T','U','ST']) {
  for (var j of ['Z','1','2','4','5']) {
    rcolor[2][i+j]=cCYAN;
  }
  rcolor[2][i+'L']=cTEAL;
  rcolor[2][i+'C']=cBLUE;
}