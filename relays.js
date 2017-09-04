var NO="NO";
var NC="NC";
var r_NONE=0;
var r_OPEN=1;
var r_CLOSE=2;
var relays={
  'L':  {'name':'L',  'ttc':2, 'coil':9999,'contacts':[['2T','3T',NC,2 ,0],['2T','1T',NO,2 ,0]]},
  'L1': {'name':'L1', 'ttc':2, 'coil':9999,'contacts':[['4T','5T',NC,2 ,0],['4T','3T',NO,2 ,0],['1T','2T',NC,2 ,0]]},
  'RA': {'name':'RA', 'ttc':25,'coil':7.4 ,'contacts':[['1' ,'2' ,NC,25,0]],'jump':2},
  'RA1':{'name':'RA1','ttc':4, 'coil':1000,'contacts':[['4T','3T',NO,2 ,0],['2T','1T',NC,4 ,2],['4B','3B',NO,2 ,0],['2B','1B',NC,4 ,2]]},
  'P6`':{'name':'P6`','ttc':2, 'coil':560 ,'contacts':[['3T','4T',NC,2 ,0],['1T','2T',NO,2 ,1],['2B','3B',NC,2 ,0],['2B','1B',NO,2 ,0]]},
  'P6': {'name':'P6', 'ttc':2, 'coil':550 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},
  'P5`':{'name':'P5`','ttc':2, 'coil':100 ,'contacts':[['4T','5T',NC,2 ,0],['4T','3T',NO,2 ,0],['2T','1T',NO,2 ,0],['2B','1B',NC,2 ,0],['4B','5B',NC,2, 0],['4B','3B',NO,2 ,0]]},
  'P5': {'name':'P5', 'ttc':2, 'coil':500 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},
  'P4`':{'name':'P4`','ttc':2, 'coil':91  ,'contacts':[['2B','3B',NC,2 ,0],['2B','1B',NO,2 ,0],['4T','3T',NC,2 ,0],['2T','1T',NO,2 ,0]]},
  'P4': {'name':'P4', 'ttc':2, 'coil':500 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},
  'P3`':{'name':'P3`','ttc':2, 'coil':85.7,'contacts':[['2T','3T',NC,2 ,0],['2T','1T',NO,2 ,0],['2B','1B',NO,2 ,0]]},
  'P3': {'name':'P3', 'ttc':2, 'coil':500 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},
  'P2`':{'name':'P2`','ttc':2, 'coil':100 ,'contacts':[['4B','5B',NC,2 ,0],['4B','3B',NO,2 ,0],['2B','1B',NC,2 ,0],['2T','1T',NO,2 ,0]]},
  'P2': {'name':'P2', 'ttc':2, 'coil':500 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},
  'P1`':{'name':'P1`','ttc':2, 'coil':85.7,'contacts':[['2T','3T',NC,2 ,0],['2T','1T',NO,2 ,0],['2B','1B',NO,2, 0]]},
  'P1': {'name':'P1', 'ttc':2, 'coil':500 ,'contacts':[['2' ,'1' ,NO,2 ,0]]},

  'AC': {'name':'AC', 'ttc':2, 'coil':750 ,'contacts':[['1T','2T',NO,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'BC': {'name':'BC', 'ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'CC': {'name':'CC', 'ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'THC':{'name':'THC','ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'HC': {'name':'HC', 'ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'TC': {'name':'TC', 'ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'UC': {'name':'UC', 'ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},
  'STC':{'name':'STC','ttc':2, 'coil':800 ,'contacts':[['1T','2T',NC,2 ,0],['3T','4T',NO,2 ,0],['5T','6T',NO,2 ,0],['1B','2B',NO,2 ,0],['3B','4B',NO,2 ,0],['5B','6B',NO,2 ,0]]},

  'AL': {'name':'AL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['2B','3B',NC,4 ,0],['2B','1B',NO,4 ,0]]},
  'BL': {'name':'BL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  'CL': {'name':'CL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  'THL':{'name':'THL','ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  'HL': {'name':'HL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  'TL': {'name':'TL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  //'UL': {'name':'UL', 'ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  //'STL':{'name':'STL','ttc':4, 'coil':90  ,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2],['1B','2B',NC,4 ,0]]},
  
  'AZ': {'name':'AZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'A1': {'name':'A1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'A2': {'name':'A2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2]]},
  'A4': {'name':'A4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'A5': {'name':'A5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['3T','2T',NO,2 ,0],['2T','1T',NO,4 ,2]]},
  
  'BZ': {'name':'BZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'B1': {'name':'B1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'B2': {'name':'B2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'B4': {'name':'B4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'B5': {'name':'B5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

  'CZ': {'name':'CZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'C1': {'name':'C1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'C2': {'name':'C2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'C4': {'name':'C4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'C5': {'name':'C5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

  'THZ':{'name':'THZ','ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'TH1':{'name':'TH1','ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'TH2':{'name':'TH2','ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'TH4':{'name':'TH4','ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'TH5':{'name':'TH5','ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

  'HZ': {'name':'HZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'H1': {'name':'H1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'H2': {'name':'H2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'H4': {'name':'H4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'H5': {'name':'H5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

  'TZ': {'name':'TZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'T1': {'name':'T1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'T2': {'name':'T2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'T4': {'name':'T4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'T5': {'name':'T5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

  'UZ': {'name':'UZ', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'U1': {'name':'U1', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'U2': {'name':'U2', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'U4': {'name':'U4', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},
  'U5': {'name':'U5', 'ttc':4, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,4 ,0]]},

};