var timer=0;
var running=false;
function tick() {
  inputtick();
  nodetick();
  relaytick1();
  seqtick1();
  disttick1();
  relaytick2();
  seqtick2();
  disttick2();
  decodertick();
  ticktables();
  timer++;
  if (running)
    setTimeout(tick,10);
}

nodes={};

function nodelist() {
  for (l of links){
    nodes[l[0]]={'solved':false,'v':-1};
    nodes[l[1]]={'solved':false,'v':-1};
  }
  for (r in relays){
    nodes[r+'.cA']={'solved':false,'v':-1};
    nodes[r+'.cB']={'solved':false,'v':-1};
  }
  delete nodes['48V'];
  delete nodes['GND'];
}

function nodetick() {
  nodelist();
  ds_pop_nodes();
  //console.log(ds_nodes);
  ds_union_links();
  ds_makeset(ds_nodes,"48V");
  ds_makeset(ds_nodes,"GND");
  ds_voltages['48V']=48;
  ds_voltages['GND']=0;
  //console.log(ds_nodes);
  ds_reparent_voltages();
  //console.log(ds_nodes);
  ds_reparent_resistive_links();
  ds_calculate_resistances();
  //console.log(ds_resistances);
  ds_merge_parallel();
  //console.log(ds_resistances);
  //console.log(ds_nodes);
  ds_solve_simple_rdiv();
}

function inputtick() {
  if (timer in testinput) {
    for (i of testinput[timer]) {
      if (i[2]) {
        console.log("making"+i[0]+'->'+i[1]);
        make_link(i[0],i[1])
      }
      else {
        break_link(i[0],i[1])
      }
    }
  }
}

var ds_nodes={};
var ds_voltages={};
var ds_voltages_indirect={};
var ds_parented_resistive_links=[];
var ds_resistances={};

function nodevoltage(node) {
  if (node in ds_nodes) {
    var parent=ds_find(ds_nodes,node);
    if (parent in ds_voltages)
      return ds_voltages[parent];
    if (parent in ds_voltages_indirect)
      return ds_voltages_indirect[parent];
  }
  return -1;
}

function nodevoltage_direct(node) {
  if (node in ds_nodes) {
    var parent=ds_find(ds_nodes,node);
    if (parent in ds_voltages)
      return ds_voltages[parent];
  }
  return -1; 
}

function ds_pop_nodes() {
  ds_nodes={};
  for (node in nodes) {
    ds_makeset(ds_nodes,node);
  }
}

function ds_reparent_resistive_links() {
  ds_parented_resistive_links=[];
  for (link of links) {
    if (link[2]==0)
      continue;
    var p0=ds_find(ds_nodes,link[0]);
    var p1=ds_find(ds_nodes,link[1]);
    if (p0==p1)
      continue;
    if (p0 in ds_voltages && p1 in ds_voltages)
      continue;
    ds_parented_resistive_links.push([p0,p1,link[2]]);
  }
}

function ds_reparent_resistances() {
  var ds_new_resistances={};
  for (k in ds_resistances) {
    if (!(ds_find(ds_nodes,k) in ds_new_resistances)) {
      ds_new_resistances[ds_find(ds_nodes,k)]={};
    }
    for (l in ds_resistances[k]) {
      if (!(ds_find(ds_nodes,l) in ds_new_resistances[ds_find(ds_nodes,k)])) {
        ds_new_resistances[ds_find(ds_nodes,k)][ds_find(ds_nodes,l)]=[];
      }
      ds_new_resistances[ds_find(ds_nodes,k)][ds_find(ds_nodes,l)].push(ds_resistances[k][l]);
    }
  }
  ds_resistances=ds_new_resistances;
}

function ds_solve_simple_rdiv() {
  ds_voltages_indirect={};
  for (k in ds_resistances) {
    var weighted_sum=0;
    var sum_weights=0;
    var all_direct=true;
    var r_count=0;
    for (l in ds_resistances[k]) {
      if (nodevoltage_direct(l)<0) {
        all_direct=false;
        break;
      }
      r_count++;
      var weight=1/ds_resistances[k][l];
      weighted_sum+=weight*nodevoltage_direct(l);
      sum_weights+=weight;
    }
    if (all_direct) {
      if (r_count==1)
        ds_voltages_indirect[k]=-1;
      else
        ds_voltages_indirect[k]=weighted_sum/sum_weights;
    }
  }
}

function ds_merge_parallel() {
  var ds_new_resistances={};
  for (k in ds_resistances) {
    ds_new_resistances[k]={};
    for (l in ds_resistances[k]) {
      if (ds_resistances[k][l].length==1) {
        ds_new_resistances[k][l]=ds_resistances[k][l][0];
      } else {
        var res=0;
        for (i of ds_resistances[k][l]) {
          res+=1/i;
        }
        ds_new_resistances[k][l]=1/res;
      }
    }
  }
  ds_resistances=ds_new_resistances;
}

function assert(expr) {
  if (!expr) {
    alert("assertion failed");
  }
}

function ds_calculate_resistances() {
  ds_resistances={};
  for (link of ds_parented_resistive_links) {
    if (!(link[0] in ds_resistances))
      ds_resistances[link[0]]={};
    if (!(link[1] in ds_resistances))
      ds_resistances[link[1]]={};
    if (!(link[1] in ds_resistances[link[0]]))
      ds_resistances[link[0]][link[1]]=[];
    if (!(link[0] in ds_resistances[link[1]]))
      ds_resistances[link[1]][link[0]]=[];
    ds_resistances[link[0]][link[1]].push(link[2]);
    ds_resistances[link[1]][link[0]].push(link[2]);
  }
}

function ds_reparent_voltages() {
  var ds_new_voltages={};
  for (node in ds_voltages) {
    ds_new_voltages[ds_find(ds_nodes,node)]=ds_voltages[node];
  }
  ds_voltages=ds_new_voltages;
}

function pop_ds_voltage_strong(link) {
  if (link[0]=='48V') {
    ds_voltages[link[1]]=48;
    return true;
  }
  if (link[0]=='GND') {
    ds_voltages[link[1]]=0;
    return true;
  }
  if (link[1]=='48V') {
    ds_voltages[link[0]]=48;
    return true;
  }
  if (link[1]=='GND') {
    ds_voltages[link[0]]=0;
    return true;
  }
  return false;
}

function traceNode(node) {
  console.log("Tracing node "+node+":");
  for (n in ds_nodes) {
    if (ds_find(ds_nodes,n)==ds_find(ds_nodes,node)) {
      console.log('\t'+n);
    }
  }
}

function ds_union_links() {
  ds_voltages={};
  for (link of links) {
    if (link[2]==0) {
      if (pop_ds_voltage_strong(link))
        continue;
      ds_union(ds_nodes,link[0],link[1]);
    }
  }
}

function coiloperated(relay) {

  if (relay.name=='dDC')
    return true;

  var nv1=nodevoltage(relay.name+".cA");
  var nv2=nodevoltage(relay.name+".cB");
  var c1;
  var c2=false;
  var c3=false;
  if (nv1<0 || nv2<0)
    c1=false;
  else
    c1=nv1!=nv2;
  if ('coil2' in relay) {
    var nv3=nodevoltage(relay.name+".cC");
    var nv4=nodevoltage(relay.name+".cD");
    if (nv3<0 || nv4<0)
      c2=false;
    else
      c2=nv3!=nv4;
  }
  if ('coil3' in relay) {
    var nv5=nodevoltage(relay.name+".cE");
    var nv6=nodevoltage(relay.name+".cF");
    if (nv5<0 || nv6<0)
      c3=false;
    else
      c3=nv5!=nv6;
  }


  return c1|c2|c3;
}

function make_link(c0,c1) {
  for (var l of links) {
    if (l[0]==c0 && l[1]==c1 && l[2]==0)
      return;
    if (l[0]==c1 && l[1]==c0 && l[2]==0)
      return;
  }
  links.push([c0,c1,0]);
}

function break_link(c0,c1) {
  for (var l in links) {
    if (links[l][0]==c0 && links[l][1]==c1 && links[l][2]==0) {
      links.splice(l,1);
      return;
    }
    if (links[l][0]==c1 && links[l][1]==c0 && links[l][2]==0) {
      links.splice(l,1);
      return;
    }
  }
}

function make_contact(relay,c0,c1) {
  c0=relay+'.'+c0;
  c1=relay+'.'+c1;
  make_link(c0,c1);
}

function break_contact(relay,c0,c1) {
  c0=relay+'.'+c0;
  c1=relay+'.'+c1;
  break_link(c0,c1);
}

function init() {
  for (var r in relays) {
    relays[r].complete=false;
    relays[r].timer=0;
    links.push([relays[r].name+'.cA',relays[r].name+'.cB',relays[r].coil])
    if ('coil2' in relays[r]) {
      links.push([relays[r].name+'.cC',relays[r].name+'.cD',relays[r].coil])
    }
  }
  for (var s in sequences) {
    sequences[s].complete=false;
    sequences[s].pos=1;
    sequences[s].fpos=0;
    links.push([sequences[s].name+'.cA',sequences[s].name+'cB',sequences[s].coil])
  }
  sequences['sRD'].pos=2;
  init_seq();
}

function relaytick1() {
  for (var k in relays) {
    if (coiloperated(relays[k])) {
      if (relays[k].timer<relays[k].ttc) {
        relays[k].timer++;
        if ('jump' in relays[k]) {
          if (relays[k].timer>=relays[k].jump) {
            relays[k].timer=relays[k].ttc;
          }
        }
        relays[k].complete=false;
      }
    } else {
      if (relays[k].timer>0)
      {
        relays[k].timer--;
        relays[k].complete=false;
      }
    }
  }
}

function relaytick2() {
  for (var k in relays) {
    if (relays[k].timer==0 && relays[k].complete)
      continue;
    if (relays[k].timer==relays[k].ttc && relays[k].complete)
      continue;
    if (relays[k].timer==relays[k].ttc)
      relayactuated(k)
    if (relays[k].timer==0)
      relayreleased(k)
    for (var con of relays[k].contacts) {
      if (con[2]==NO && relays[k].timer>=con[3])
        make_contact(relays[k].name,con[0],con[1]);
      if (con[2]==NC && relays[k].timer<=con[4])
        make_contact(relays[k].name,con[0],con[1]);
      if (con[2]==NO && relays[k].timer<=con[4])
        break_contact(relays[k].name,con[0],con[1]);
      if (con[2]==NC && relays[k].timer>=con[3])
        break_contact(relays[k].name,con[0],con[1]);
    }
    relays[k].complete=true;
  }
}