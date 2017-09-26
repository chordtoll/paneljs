    function doOnload() {
      var ua = window.navigator.userAgent;
      console.log(ua);
      var ms_ie = ~ua.indexOf('MSIE ') || ~ua.indexOf('Trident/') || ~ua.indexOf('Edge/');
      if (ms_ie) {
        alert("Sorry, this doesn't work on IE yet");
      }
      init();
      nodelist();
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
            td.style="background-color:#fcc;"
            if (relays[rloc[i][j]].timer!=0){
              td.style="background-color:red;"
            }
          }
          td.appendChild(document.createTextNode(rloc[i][j]));
        }
      } 
      document.getElementById("sender").replaceWith(tb);
    }

    function ticktables(full=false) {
      document.getElementById('timer').innerHTML=''+timer;

      document.getElementById('R1').innerHTML=seqState('sR1');
      document.getElementById('R2').innerHTML=seqState('sR2');
      document.getElementById('RD').innerHTML=seqState('sRD');
      document.getElementById('RI').innerHTML=seqState('sRI');
      document.getElementById('RF').innerHTML=seqState('sRF');
      document.getElementById('vD').innerHTML=distState();
      document.getElementById('vI').innerHTML=incState();
      document.getElementById('vF').innerHTML=finState();
      document.getElementById('R1n').innerHTML=seqStatename('sR1');
      document.getElementById('R2n').innerHTML=seqStatename('sR2');
      document.getElementById('RDn').innerHTML=seqStatename('sRD');
      document.getElementById('RIn').innerHTML=seqStatename('sRI');
      document.getElementById('RFn').innerHTML=seqStatename('sRF');
      document.getElementById('vDn').innerHTML=distStatename();
      document.getElementById('vIn').innerHTML=incStatename();
      document.getElementById('vFn').innerHTML=finStatename();


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

      for (r in relays) {
        var td=document.getElementById('r'+r)
        if (td) {
          if (relays[r].timer!=0) {
            td.style="background-color:red;"
          } else {
            td.style="background-color:#fcc;"
          }
        }
      }
      if (full) {
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
    }