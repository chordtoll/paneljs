var demomode=0;
function doOnload() {
  var ua = window.navigator.userAgent;
  console.log(ua);
  var ms_ie = ~ua.indexOf('MSIE ') || ~ua.indexOf('Trident/') || ~ua.indexOf('Edge/');
  if (ms_ie) {
    alert("Sorry, this doesn't work on IE yet");
  }
  demomode=location.search.split('demo=')[1];
  if (demomode==undefined)
    demomode=0;
  init();
  nodelist();
  hideelements();
  buildsendertable();
  builddctable();
  buildictable();
  buildfctable();
  ticktables(true);
}

function startSim() {
  running=true;
  tick();
}

function stopSim() {
  running=false;
  ticktables(true);
}

function tickSim() {
  running=false;
  tick();
  ticktables(true);
}

function builddctable() {
  var tb = document.createElement('tbody');
  tb.id='dc';
  for (var i=0; i<50; i++) {
    var tr=tb.insertRow()
    var td;
    for (cname of ['A','B']){
      var td = tr.insertCell()
      td.id='dc'+cname+(49-i);
    }
  }
  document.getElementById("dc").replaceWith(tb);
}

function buildictable() {
  var tb = document.createElement('tbody');
  tb.id='ic';
  for (var i=0; i<50; i++) {
    var tr=tb.insertRow()
    var td;
    for (cname of ['A','B']){
      var td = tr.insertCell()
      td.id='ic'+cname+(49-i);
    }
  }
  document.getElementById("ic").replaceWith(tb);
}

function buildfctable() {
  var tb = document.createElement('tbody');
  tb.id='fc';
  for (var i=0; i<50; i++) {
    var tr=tb.insertRow()
    var td;
    for (cname of ['A','B']){
      var td = tr.insertCell()
      td.id='fc'+cname+(49-i);
    }
  }
  document.getElementById("fc").replaceWith(tb);
}

function buildsendertable() {
  var tb  = document.createElement('tbody');
  tb.id='sender';
  for (var i in rloc){
    var tr = tb.insertRow();
    for (var j in rloc[i]){
      var td=tr.insertCell();
      if (rloc[i][j] in relays){
        td.id='r'+rloc[i][j];
      }
      td.appendChild(document.createTextNode(rloc[i][j]));
    }
  } 
  document.getElementById("sender").replaceWith(tb);
}

function hideelements() {
  for (i of elementhide[demomode]) {
    document.getElementById(i).style="display: none;";
  }
}

function ticktables(full=false) {
  document.getElementById('timer').innerHTML=''+timer;

  ticktable_sequences();


  ticktable_commutators();

  ticktable_sender();
  if (full) {
    ticktable_extras();
  }
}

function ticktable_sender() {
  for (r in relays) {
    var td=document.getElementById('r'+r)
    if (td) {
      if (r in rcolor[demomode]) {
        if (relays[r].timer!=0) {
          td.style='background-color:'+rcolor[demomode][r][1]+';';
        } else {
          td.style='background-color:'+rcolor[demomode][r][0]+';';
        }
      } else {
        if (relays[r].timer!=0) {
          td.style='background-color:'+rcolor[demomode]['default'][1]+';';
        } else {
          td.style='background-color:'+rcolor[demomode]['default'][0]+';';
        }
      }
    }
  }
}

function ticktable_sequences() {
  for (var seq of ['1','2','D','I','F']) {
    document.getElementById('R'+seq).innerHTML=seqState('sR'+seq);
    document.getElementById('R'+seq+'n').innerHTML=seqStatename('sR'+seq);
  }

  document.getElementById('vD').innerHTML=distState();
  document.getElementById('vI').innerHTML=incState();
  document.getElementById('vF').innerHTML=finState();
  document.getElementById('vDn').innerHTML=distStatename();
  document.getElementById('vIn').innerHTML=incStatename();
  document.getElementById('vFn').innerHTML=finStatename();
}

function ticktable_commutators() {
  for (var i=0; i<50; i++)
  {
    for (fname of ['dc','ic','fc']) {
      for (cname of ['A','B']) {
        var contacts;
        var pos;
        if (fname=='dc') {
          contacts=distContacts;
          pos=district.pos;
        }
        if (fname=='ic') {
          contacts=incContacts;
          pos=incoming.pos;
        }
        if (fname=='fc') {
          contacts=finContacts;
          pos=final.pos;
        }
        if (contacts[cname][i-25+pos])
        {
          if (i==25)
            document.getElementById(fname+cname+i).style="background-color:#800;"
          else
            document.getElementById(fname+cname+i).style="background-color:black;"
        } else {
          if (i==25)
            document.getElementById(fname+cname+i).style="background-color:#fcc;"  
          else
            document.getElementById(fname+cname+i).style="background-color:white;"
        }
      }
    }
  }
}

function ticktable_extras() {
  var tb  = document.createElement('tbody');
    tb.id="relayb";
    for(var k in relays){
      var tr = tb.insertRow();
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(relays[k].name));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(relays[k].timer));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(k+'.cA').toFixed(2))));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(k+'.cB').toFixed(2))));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(k+'.cC').toFixed(2))));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(k+'.cD').toFixed(2))));
    }
    document.getElementById("relayb").replaceWith(tb);

    var tb  = document.createElement('tbody');
    tb.id="linkb";
    for(var l of links){
      var tr = tb.insertRow();
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(l[0]));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(l[1]));
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(l[2]));
    }
    document.getElementById("linkb").replaceWith(tb);

    var tb  = document.createElement('tbody');
    tb.id="nodeb";
    for(var n in nodes){
      var tr = tb.insertRow();
      var td = tr.insertCell();
      td.innerHTML='<a onclick="traceNode(\''+n+'\');">'+n+'</a>';
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(n).toFixed(2))));
    }
    document.getElementById("nodeb").replaceWith(tb);

    var tb  = document.createElement('tbody');
    tb.id="specialnodeb";
    for(var n of ['L.3T','P1.cA','P2.cA','P3.cA','P4.cA','P5.cA','P6.cA','t1','t2','t4','t5','t0','tRA','tFT']){
      var tr = tb.insertRow();
      var td = tr.insertCell();
      td.innerHTML='<a onclick="traceNode(\''+n+'\');">'+n+'</a>';
      var td = tr.insertCell();
      td.appendChild(document.createTextNode(parseFloat(nodevoltage(n).toFixed(2))));
    }
    document.getElementById("specialnodeb").replaceWith(tb);
}