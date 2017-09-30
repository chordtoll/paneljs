function render() {
  var draw = SVG('drawing').size(1600, 1600);
      //var coil=drawcoil(draw,"1CLR");
      //coil.move(0,100);
      /*var xloc=0;
      for (var com of 'LR') {
        xloc=0;
        for (var dir of 'DU') {
          for (var nml of 'OC') {
            for (var state of [0,1]) {
              var topcontacts=drawrelay(draw,'1CLL',{'PT':'11','nml':nml,'com':com,'dir':dir},['2','1'],state)
              topcontacts.text('11'+com+dir+nml+state).move(0,100);
              topcontacts.move(xloc,com=='R'?150:0);
              xloc+=100;
            }
          }
        }
      }
      xloc=0
      for (var com of 'LR') {
        for (var dir of 'DU') {
          for (var state of [0,1]) {
            var topcontacts=drawrelay(draw,'1CLL',{'PT':'XF','com':com,'dir':dir},['2','1','3'],state)
            topcontacts.text('XF'+com+dir+state).move(0,100);
            topcontacts.move(xloc,300);
            xloc+=100;
          }
        }
      }*/
      var img=draw.group();
      //var im=img.image("https://ia600800.us.archive.org/BookReader/BookReaderImages.php?zip=/27/items/bco-training-manual/BcoMain_jp2.zip&file=BcoMain_jp2/BcoMain_0035.jp2&scale=3&rotate=0");
      var im=img.image("canvas/pages/OS320A.jpg");
      im.scale(0.75,0.75);
      img.move(-340,-260);
      for (var x=0;x<1600;x+=20) {
        if (x%500==0) {
          draw.path("M"+x+" 0 v1600 M0 "+x+" h1600").fill('none').stroke({ color: '#0000f080', width: 2, linecap: 'round', linejoin: 'round' });
        }
        else if (x%100==0) {
          draw.path("M"+x+" 0 v1600 M0 "+x+" h1600").fill('none').stroke({ color: '#8000f040', width: 2, linecap: 'round', linejoin: 'round' });
        } else {
          draw.path("M"+x+" 0 v1600 M0 "+x+" h1600").fill('none').stroke({ color: '#8000f020', width: 2, linecap: 'round', linejoin: 'round' });
        }
      }
      for (r of schrelays) {
        if (r[0]=='P1' || r[0]=='P1`') {
          var relay=drawrelay(draw,r[0],r[2],r[3],r[4],1);
        } else {
          var relay=drawrelay(draw,r[0],r[2],r[3],r[4],0);
        }
        relay.move(r[1][0],r[1][1]);
      }
      for (l of schlinks) {
        draw.path(l).fill('none').stroke(lp);
      }
    }

    var lp={ color: '#ff0066', width: 2, linecap: 'round', linejoin: 'round' }

    var relaycontacts={
      '11':{
        'L':{
          'O':{
            'D':{
              0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 55 l-3 5 m6 0 l-3 -5 v15','ctloc':[78,64]},
              1:{'apath':'M20 50 H25 M30 50 L80 55','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 55 l-3 5 m6 0 l-3 -5 v15','ctloc':[78,64]}
            },
            'U':{
              0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 45 l-3 -5 m6 0 l-3 5 v-15','ctloc':[78,59]},
              1:{'apath':'M20 50 H25 M30 50 L80 45','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 45 l-3 -5 m6 0 l-3 5 v-15','ctloc':[78,59]}
            }
          },
          'C':{
            'D':{
              0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 5 m6 0 l-3 -5 v20','ctloc':[78,59]},
              1:{'apath':'M20 50 H25 M30 50 L80 45','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 5 m6 0 l-3 -5 v20','ctloc':[78,59]}
            },
            'U':{
              0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 -5 m6 0 l-3 5 v-20','ctloc':[78,64]},
              1:{'apath':'M20 50 H25 M30 50 L80 55','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 -5 m6 0 l-3 5 v-20','ctloc':[78,64]}
            }
          }
        },
        'R':{
          'O':{
            'D':{
              0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 55 l-3 5 m6 0 l-3 -5 v15','ctloc':[24,64]},
              1:{'apath':'M80 50 H75 M70 50 L20 55','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 55 l-3 5 m6 0 l-3 -5 v15','ctloc':[24,64]}
            },
            'U':{
              0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 45 l-3 -5 m6 0 l-3 5 v-15','ctloc':[24,59]},
              1:{'apath':'M80 50 H75 M70 50 L20 45','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 45 l-3 -5 m6 0 l-3 5 v-15','ctloc':[24,59]}
            }
          },
          'C':{
            'D':{
              0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 5 m6 0 l-3 -5 v20','ctloc':[24,59]},
              1:{'apath':'M80 50 H75 M70 50 L20 45','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 5 m6 0 l-3 -5 v20','ctloc':[24,59]}
            },
            'U':{
              0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 -5 m6 0 l-3 5 v-20','ctloc':[24,64]},
              1:{'apath':'M80 50 H75 M70 50 L20 55','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 -5 m6 0 l-3 5 v-20','ctloc':[24,64]}
            }
          }
        }
      },
      'XF':{
        'L':{
          'D':{
            0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 55 l-3 5 m6 0 l-3 -5 v15 M70 50 l-3 -5 m6 0 l-3 5 v-20 ','ctloc':[78,64,78,40]},
            1:{'apath':'M20 50 H25 M30 50 L80 55','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 55 l-3 5 m6 0 l-3 -5 v15 M70 50 l-3 -5 m6 0 l-3 5 v-20 ','ctloc':[78,64,78,40]}
          },
          'U':{
            0:{'apath':'M20 50 H25 M30 50 H80',   'acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 5 m6 0 l-3 -5 v20 M70 45 l-3 -5 m6 0 l-3 5 v-15 ','ctloc':[78,59,78,35]},
            1:{'apath':'M20 50 H25 M30 50 L80 45','acloc':[27.5,50],'atloc':[22,42],'cpath':'M70 50 l-3 5 m6 0 l-3 -5 v20 M70 45 l-3 -5 m6 0 l-3 5 v-15 ','ctloc':[78,59,78,35]}
          }
        },
        'R':{
          'D':{
            0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 55 l-3 5 m6 0 l-3 -5 v15 M30 50 l-3 -5 m6 0 l-3 5 v-20 ','ctloc':[22,64,22,40]},
            1:{'apath':'M80 50 H75 M70 50 L20 55','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 55 l-3 5 m6 0 l-3 -5 v15 M30 50 l-3 -5 m6 0 l-3 5 v-20 ','ctloc':[22,64,22,40]}
          },
          'U':{
            0:{'apath':'M80 50 H75 M70 50 H20',   'acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 5 m6 0 l-3 -5 v20 M30 45 l-3 -5 m6 0 l-3 5 v-15 ','ctloc':[22,59,22,35]},
            1:{'apath':'M80 50 H75 M70 50 L20 45','acloc':[72.5,50],'atloc':[78,42],'cpath':'M30 50 l-3 5 m6 0 l-3 -5 v20 M30 45 l-3 -5 m6 0 l-3 5 v-15 ','ctloc':[22,59,22,35]}
          }
        }
      }
    };
    var relaypos={
      'CO':{
        'D':{'cpos':0,'ppos':0,'rh':100},
        'U':{'cpos':0,'ppos':0,'rh':100}
      },
      '11':{
        'D':{'cpos':20,'ppos':-30,'rh':120,'rhnc':40},
        'U':{'cpos':20,'ppos':-30,'rh':120,'rhnc':40},
      },
      'XF':{
        'D':{'cpos':20,'ppos':-30,'rh':120,'rhnc':40},
        'U':{'cpos':20,'ppos':-30,'rh':120,'rhnc':40},
      }
    }

    function drawrelay(draw,name,ctype,ptype,ptext,state) {
      var relay=draw.group();
      relay.text(name).size(18).center(50,-10).stroke(lp);
      var rh;
      if (ctype!='NC') {
        var coil=drawcoil(relay,ctype);
        var cpos=relaypos[ptype.PT][ptype.dir].cpos;
        rh=relaypos[ptype.PT][ptype.dir].rh;
        coil.dy(cpos);
        } else {
          rh=relaypos[ptype.PT][ptype.dir].rhnc;
        }
        if (ptype.PT!='CO') {
          var contacts=drawcontacts(relay,ptype,ptext,state);
          var ppos=relaypos[ptype.PT][ptype.dir].ppos;
          contacts.dy(ppos);
        }
        relay.rect(100,rh).fill('none').stroke({ color:"#00000040", 'width':2 });

        return relay;
      }

      function drawcontacts(draw,type,text,state) {
        var contacts = draw.group();
        console.log(type)
        console.log(state)
        if (type.PT=='11') {
          var details=relaycontacts['11'][type.com][type.nml][type.dir][state];
          contacts.path(details.apath).fill('none').stroke(lp)
          contacts.circle(5).center(details.acloc[0],details.acloc[1]).fill('none').stroke(lp)
          contacts.text(text[0]).size(10).center(details.atloc[0],details.atloc[1])
          contacts.path(details.cpath).fill('none').stroke(lp)
          contacts.text(text[1]).size(10).center(details.ctloc[0],details.ctloc[1])
        }
        else if (type.PT='XF') {
          var details=relaycontacts['XF'][type.com][type.dir][state];
          contacts.path(details.apath).fill('none').stroke(lp)
          contacts.circle(5).center(details.acloc[0],details.acloc[1]).fill('none').stroke(lp)
          contacts.text(text[0]).size(10).center(details.atloc[0],details.atloc[1])
          contacts.path(details.cpath).fill('none').stroke(lp)
          contacts.text(text[2]).size(10).center(details.ctloc[0],details.ctloc[1])
          contacts.text(text[1]).size(10).center(details.ctloc[2],details.ctloc[3])
        }
        return contacts;
      }

      function drawcoil(draw,type) {
        var coil = draw.group();
        var path=coil.path("M40 10 h20 v80 h-20 z");
        path.fill('none')
        path.stroke(lp)
        if (type=="1CLR") {
          var path=coil.path("M20 40 H60 A5 5 0 0 1 60 50 M40 50 A5 5 0 0 0 40 60 H80");
          path.fill('none')
          path.stroke(lp)
        }
        else if (type=="1CLL") {
          var path=coil.path("M20 60 H40 M60 60 A5 5 0 0 0 60 50 H40 A5 5 0 0 1 40 40 M60 40 A5 5 0 0 0 60 30 H20");
          path.fill('none');
          path.stroke(lp);
        }
        return coil
      }