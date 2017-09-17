//Sequence rules:
//  Normal cuttings:
//    Close 5° (1/4) before start
//    Open  5° (1/4) after end
//  5° (1/4) cuttings:
//    Close 2.5° (1/8) before start
//    Open  2.5° (1/8) after end

var statenames={
  'sR1':{
    1:'Normal',
    2:'Pass By',
    3:'Awaiting 1st',
    4:'Awaiting 1st',
    5:'Permanant Signal',
    6:'Awaiting Units',
    7:'Awaiting Units',
    8:'Partial Dial',
    9:'Stations Delay',
    10:'Stations Delay',
    11:'Stations Delay',
    12:'Stations Delay',
    13:'Pass By',
    14:'Pass By',
    15:'Awaiting Release',
    16:'Awaiting Release',
    17:'Awaiting Release',
    18:'Stuck Sender'
  },
  'sR2':{
    1:'Normal',
    2:'District Brush',
    3:'Discrict Group',
    4:'Office Test',
    5:'Office Brush',
    6:'Office Group',
    7:'Trunk Test',
    8:'Incoming Brush',
    9:'Awaiting Registration',
    10:'Incoming Group',
    11:'Cable Discharge',
    12:'Final Brush',
    13:'Awaiting Registration',
    14:'Final Tens',
    15:'Awaiting Registration',
    16:'Final Units',
    17:'Incoming Advance',
    18:'Talk Selection District'
  },
  'sRD':{
    1:'Normal',
    2:'Awaiting Sender',
    3:'Brush Selection',
    4:'Awaiting Sender (Trip)',
    5:'Group Selection',
    6:'Awaiting Release',
    7:'Trunk Hunt',
    8:'Awaiting Sender',
    9:'Selections Beyond',
    10:'Awaiting Sender',
    11:'Talk',
    12:'Talk',
    13:'Awaiting Operator',
    14:'Operator Talk',
    15:'Distant Office-Charge',
    16:'Message Register',
    17:'Restore-Down Drive',
    18:'Return to Normal',
  }
}

/*
 * THE BCO BOOK LIES
 * THE GCO BOOK LIES
 * THE SD LIES
 * 
 * This section is full of lies, TODO figure out what is the truth
 */

var sequences={
  'sR1':{'name':'sR1','coil':218},
  'sR2':{'name':'sR2','coil':218,'contacts':
    {
      'A4':{'normal':NC,'open':[],'close':[]},
      'B1':{'normal':NO,'open':[[4,2]],'close':[[3,6]]},
      'B2':{'normal':NO,'open':[[3,2],[5,2],[6,2]],'close':[[1,6],[4,6],[5,6]]},
      'C4':{'normal':NC,'open':[[1,2]],'close':[[18,6]]},
      'F1':{'normal':NC,'open':[],'close':[]},
      'F3':{'normal':NO,'open':[[3,4]],'close':[[1,4]]},        //Check???
      'F4':{'normal':NO,'open':[[6,2]],'close':[[2,6]]},
      'H1':{'normal':NC,'open':[[11,2]],'close':[[18,6]]},
      'H2':{'normal':NC,'open':[[10,2]],'close':[[11,6]]},
	    'I1':{'normal':NC,'open':[],'close':[]},
      'I2':{'normal':NC,'open':[[11,2]],'close':[[18,6]]},
      'I4':{'normal':NO,'open':[[6,2]],'close':[[2,6]]},
      'J3':{'normal':NO,'open':[[3,4]],'close':[[1,4]]},
	    'J4':{'normal':NO,'open':[[3,2]],'close':[[1,6]]},
      'O1':{'normal':NC,'open':[],'close':[]},
      'O3':{'normal':NO,'open':[[3,1]],'close':[[2,5]]},
      'O4':{'normal':NO,'open':[[2,2]],'close':[[1,6]]},
      'Q2':{'normal':NO,'open':[[3,1]],'close':[[2,5]]},
      'Q4':{'normal':NO,'open':[[2,2]],'close':[[1,6]]},
      'R1':{'normal':NO,'open':[[6,2]],'close':[[1,6]]},
      'V1':{'normal':NC,'open':[],'close':[]},
      //'V2':{'normal':NO,'open':[[3,2],[2,2]],'close':[[1,6],[2,6]]},
      'V2':{'normal':NO,'open':[[7,2],[2,2]],'close':[[1,6],[2,6]]},
	    'W1':{'normal':NC,'open':[[3,2]],'close':[[4,6]]},
	    'W4':{'normal':NO,'open':[[2,2],[3,2]],'close':[[1,6],[2,6]]},
      '!1':{'normal':NC,'open':[],'close':[]},
      '!2':{'normal':NO,'open':[[7,2]],'close':[[6,6]]},
    }
  },
  'sRD':{'name':'sRD','coil':218,'contacts':
    {
      'A4':{'normal':NC,'open':[],'close':[]},
      'B2':{'normal':NC,'open':[[2,2],[4,2],[6,2],[8,2]],'close':[[1,6],[3,6],[5,6],[7,6]]},
      'B3':{'normal':NO,'open':[[3,2],[5,2],[7,2],[8,2]],'close':[[2,6],[4,6],[6,6],[8,6]]},
      'C1':{'normal':NO,'open':[[18,2]],'close':[[2,6]]},
      'C4':{'normal':NO,'open':[[3,2],[5,2],[7,2]],'close':[[2,6],[4,6],[6,6]]},
      'H3':{'normal':NC,'open':[[6,2]],'close':[[7,6]]},
      'H4':{'normal':NC,'open':[],'close':[]},
      'K3':{'normal':NO,'open':[[3,1]],'close':[[2,5]]},
      'L1':{'normal':NC,'open':[[2,2],[4,2]],'close':[[1,6],[3,6]]},
      'L2':{'normal':NO,'open':[[5,1]],'close':[[4,5]]},
      'L3':{'normal':NC,'open':[[5,2]],'close':[[1,6]]},
      'L4':{'normal':NC,'open':[[5,2]],'close':[[1,6]]},
      'M1':{'normal':NC,'open':[],'close':[]},
      'M2':{'normal':NC,'open':[[5,2],[15,2]],'close':[[18,6],[6,2]]},
    }
  },
}

function make_seq(seq,contact) {
  var c0=seq+'.'+contact;
  var c1=seq+'.'+contact.substring(0,1);
  make_link(c0,c1);
}

function break_seq(seq,contact) {
  var c0=seq+'.'+contact;
  var c1=seq+'.'+contact.substring(0,1);
  break_link(c0,c1);
}

function init_seq() {
  for (s in sequences) {
    for (c in sequences[s].contacts) {
      if (sequences[s].contacts[c].normal==NC)
        make_seq(s,c);
    }
  }
}

function seqtick1() {
  for (var k in sequences) {
    if (coiloperated(sequences[k]) || sequences[k].fpos!=0) {
      sequences[k].fpos++;
      if (sequences[k].fpos==8) {
        sequences[k].fpos=0;
        sequences[k].pos++;
        if (sequences[k].pos==19){
          sequences[k].pos=1;
        }
      }
      sequences[k].complete=false;
    }
  }
}

function seqtick2() {
  for (var k in sequences) {
    if (sequences[k].complete)
      continue;
    for (var con in sequences[k].contacts) {
      for (var o of sequences[k].contacts[con].open) {
        if (o[0]==sequences[k].pos && o[1]==sequences[k].fpos) {
          break_seq(k,con);
          break;
        }
      }
      for (var c of sequences[k].contacts[con].close) {
        if (c[0]==sequences[k].pos && c[1]==sequences[k].fpos) {
          make_seq(k,con);
          break;
        }
      }
    }
    sequences[k].complete=true;
  }
}

var eighths=['',' 1/8',' 1/4',' 3/8',' 1/2',' 5/8',' 3/4',' 7/8'];

function seqState(seq) {
  return sequences[seq].pos+eighths[sequences[seq].fpos];
}
function seqStatename(seq) {
  return statenames[seq][sequences[seq].pos];
}