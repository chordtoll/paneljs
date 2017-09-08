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
  }
}

var sequences={
  'sR1':{'name':'sR1','coil':218},
  'sR2':{'name':'sR2','coil':218},
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