decodertable={
  232: {'DB':2,'DG':5,'OB':0,'OG':0,'SO':1},
  365: {'DB':2,'DG':0,'OB':1,'OG':5,'SO':0},
  722: {'DB':1,'DG':4,'OB':0,'OG':0,'SO':1},
  832: {'DB':3,'DG':4,'OB':0,'OG':0,'SO':1},
  844: {'DB':1,'DG':7,'OB':0,'OG':0,'SO':1},
  PCI: {'DB':3,'DG':0,'OB':0,'OG':0,'SO':1},
  311: {'DB':1,'DG':9,'OB':0,'OG':0,'SO':1},
}

var dTimer=0;
var dOfficeCode;

function decoder_makedb(db) {
  if (db==1 || db==3) 
    make_link('dDB1','GND');
  if (db==2 || db==4) 
    make_link('dDB2','GND');
  if (db==3 || db==4)
    make_link('dDB3','GND');
}

function decoder_makedg(dg) {
  if (dg==1 || dg==3 || dg==6 || dg==8) 
    make_link('dDG1','GND');
  if (dg==2 || dg==3 || dg==7 || dg==8) 
    make_link('dDG2','GND');
  if (dg==4 || dg==9)
    make_link('dDG4','GND');
  if (dg==5 || dg==6 || dg==7 || dg==8 || dg==9)
    make_link('dDG5','GND');

}

function decoderstart() {
  dTimer=10;
  dOfficeCode=100*getregistervalue('A')+10*getregistervalue('B')+getregistervalue('C');
  log("DEC: Office code "+dOfficeCode);
  log("DEC: District brush "+decodertable[dOfficeCode].DB);
  decoder_makedb(decodertable[dOfficeCode].DB);
  log("DEC: District group "+decodertable[dOfficeCode].DG);
  decoder_makedg(decodertable[dOfficeCode].DG);
  if (decodertable[dOfficeCode].SO) {
    make_link('dSO','GND');
    log("DEC: Skip Office");
  } else {
    log("DEC: Office brush "+decodertable[dOfficeCode].OB);
    log("DEC: Office group "+decodertable[dOfficeCode].OG);
  }
}

function decodertick() {
}

//      232   365   722   832   844   PCI   311
//OB :  0     1     0     0     0     0     0
//SD :  01    01    01    01    01    --    01
//OG :  0     5     0     0     0     0     0
//SO :  T     F     T     T     T     T     T
//CL :  0     0     0     0     3     12    3
//CR :  345   135   235   35    34    3     34
//DB :  2     2     1     13    1     13    1
//TS :  0     0     0     0     0     0     --
//DG :  5     0     4     4     7     0     9
//TW :  T     F     F     F     F     F     F