var NO="NO";
var NC="NC";
var r_NONE=0;
var r_OPEN=1;
var r_CLOSE=2;
var relays={
  'L':  {'name':'L',  'ttc':1, 'coil':9999,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0]]},
  'L1': {'name':'L1', 'ttc':1, 'coil':9999,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['1T','2T',NC,1 ,0]]},
  'RA': {'name':'RA', 'ttc':10,'coil':7.4 ,'contacts':[['1' ,'2' ,NC,10,0]],'jump':1},
  'RA1':{'name':'RA1','ttc':2, 'coil':1000,'contacts':[['4T','3T',NO,1 ,0],['2T','1T',NC,2 ,1],['4B','3B',NO,1 ,0],['2B','1B',NC,2 ,1]]},
  'P6`':{'name':'P6`','ttc':1, 'coil':560 ,'contacts':[['3T','4T',NC,1 ,0],['1T','2T',NO,1 ,1],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},
  'P6': {'name':'P6', 'ttc':1, 'coil':550 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},
  'P5`':{'name':'P5`','ttc':1, 'coil':100 ,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NC,1 ,0],['4B','5B',NC,1, 0],['4B','3B',NO,1 ,0]]},
  'P5': {'name':'P5', 'ttc':1, 'coil':500 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},
  'P4`':{'name':'P4`','ttc':1, 'coil':91  ,'contacts':[['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0],['4T','3T',NC,1 ,0],['2T','1T',NO,1 ,0]]},
  'P4': {'name':'P4', 'ttc':1, 'coil':500 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},
  'P3`':{'name':'P3`','ttc':1, 'coil':85.7,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NO,1 ,0]]},
  'P3': {'name':'P3', 'ttc':1, 'coil':500 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},
  'P2`':{'name':'P2`','ttc':1, 'coil':100 ,'contacts':[['4B','5B',NC,1 ,0],['4B','3B',NO,1 ,0],['2B','1B',NC,1 ,0],['2T','1T',NO,1 ,0]]},
  'P2': {'name':'P2', 'ttc':1, 'coil':500 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},
  'P1`':{'name':'P1`','ttc':1, 'coil':85.7,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NO,1 ,0]]},
  'P1': {'name':'P1', 'ttc':1, 'coil':500 ,'contacts':[['2' ,'1' ,NO,1 ,0]]},

  'AC': {'name':'AC', 'ttc':1, 'coil':750 ,'contacts':[['1T','2T',NO,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'BC': {'name':'BC', 'ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'CC': {'name':'CC', 'ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'THC':{'name':'THC','ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'HC': {'name':'HC', 'ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'TC': {'name':'TC', 'ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'UC': {'name':'UC', 'ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},
  'STC':{'name':'STC','ttc':1, 'coil':800 ,'contacts':[['1T','2T',NC,1 ,0],['3T','4T',NO,1 ,0],['5T','6T',NO,1 ,0],['1B','2B',NO,1 ,0],['3B','4B',NO,1 ,0],['5B','6B',NO,1 ,0]]},

  'AL': {'name':'AL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['2B','3B',NC,2 ,0],['2B','1B',NO,2 ,0]]},
  'BL': {'name':'BL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  'CL': {'name':'CL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  'THL':{'name':'THL','ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  'HL': {'name':'HL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  'TL': {'name':'TL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  'UL': {'name':'UL', 'ttc':2, 'coil':90  ,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['3B','2B',NC,2 ,0]]},
  'STL':{'name':'STL','ttc':2, 'coil':90  ,'contacts':[['3T','4T',NC,1 ,0],['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1],['1B','2B',NC,2 ,0]]},
  
  'AZ': {'name':'AZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'A1': {'name':'A1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'A2': {'name':'A2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1]]},
  'A4': {'name':'A4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'A5': {'name':'A5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['3T','2T',NO,1 ,0],['2T','1T',NO,2 ,1]]},
  
  'BZ': {'name':'BZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'B1': {'name':'B1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'B2': {'name':'B2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'B4': {'name':'B4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'B5': {'name':'B5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'CZ': {'name':'CZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'C1': {'name':'C1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'C2': {'name':'C2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'C4': {'name':'C4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'C5': {'name':'C5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'THZ':{'name':'THZ','ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'TH1':{'name':'TH1','ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'TH2':{'name':'TH2','ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'TH4':{'name':'TH4','ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'TH5':{'name':'TH5','ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'HZ': {'name':'HZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'H1': {'name':'H1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'H2': {'name':'H2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'H4': {'name':'H4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'H5': {'name':'H5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'TZ': {'name':'TZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'T1': {'name':'T1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'T2': {'name':'T2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'T4': {'name':'T4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'T5': {'name':'T5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'UZ': {'name':'UZ', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'U1': {'name':'U1', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'U2': {'name':'U2', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'U4': {'name':'U4', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},
  'U5': {'name':'U5', 'ttc':2, 'coil':800 ,'coil2':1200,'contacts':[['1T','2T',NO,2 ,0]]},

  'ST': {'name':'ST', 'ttc':1, 'coil':3000,'contacts':[]},

  'RL': {'name':'RL', 'ttc':2, 'coil':1000,'coil2':2000,'contacts':[['4T','3T',NO,2 ,0],['2T','1T',NO,2 ,0],['3B','2B',NO,1 ,0],['2B','1B',NO,2 ,1]]},
  'RL1':{'name':'RL1','ttc':2, 'coil':3000,             'contacts':[['3T','4T',NO,1 ,0],['2T','1T',NC,2 ,1],['2B','3B',NC,2 ,0],['2B','1B',NO,2 ,0]]},

  'DB1':{'name':'DB1','ttc':1, 'coil':1000,'coil2':2000,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2T','1T',NO,1 ,0],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},
  'DB2':{'name':'DB2','ttc':1, 'coil':1000,'coil2':2000,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2T','1T',NO,1 ,0],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},
  'DB3':{'name':'DB3','ttc':1, 'coil':1000,'coil2':2000,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2T','1T',NO,1 ,0],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},

  'DG1':{'name':'DG1','ttc':1, 'coil':1000,'coil2':3000,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NO,1 ,0]]},
  'DG2':{'name':'DG2','ttc':1, 'coil':1000,'coil2':2000,'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2T','1T',NO,1 ,0],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},
  'DG4':{'name':'DG4','ttc':1, 'coil':1000,'coil2':3000,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NO,1 ,0]]},
  'DG5':{'name':'DG5','ttc':1, 'coil':1000,'coil2':3000,'contacts':[['2T','3T',NC,1 ,0],['2T','1T',NO,1 ,0],['2B','1B',NO,1 ,0]]},

  'SO': {'name':'SO', 'ttc':2, 'coil':1000,'coil2':1000,'contacts':[['4T','3T',NO,2 ,0],['2T','1T',NO,2 ,0],['2B','3B',NO,1 ,0],['2B','1B',NO,2 ,1]]},

  'dL': {'name':'dL', 'ttc':1, 'coil':1200,             'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['2B','3B',NC,1 ,0],['2B','1B',NO,1 ,0]]},

  '9`' :{'name':'9`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '8`' :{'name':'8`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '7`' :{'name':'7`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '6`' :{'name':'6`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '5`' :{'name':'5`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '4`' :{'name':'4`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '3`' :{'name':'3`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '2`' :{'name':'2`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '1`' :{'name':'1`' ,'ttc':1, 'coil':500 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},

  '9'  :{'name':'9'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '8'  :{'name':'8'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '7'  :{'name':'7'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '6'  :{'name':'6'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '5'  :{'name':'5'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '4'  :{'name':'4'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '3'  :{'name':'3'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '2'  :{'name':'2'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '1'  :{'name':'1'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  '0'  :{'name':'0'  ,'ttc':1, 'coil':245 ,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},

  'B0' :{'name':'B0', 'ttc':1, 'coil':1000,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},
  'F0' :{'name':'F0', 'ttc':1, 'coil':1000,             'contacts':[['AT','2T',NC,1 ,0],['AT','1T',NO,1 ,0]]},

  'F03':{'name':'F03','ttc':1, 'coil':4000,             'contacts':[['1T','2T',NO,1 ,0],['4T','3T',NO,1 ,0]]},
  'F02':{'name':'F02','ttc':1, 'coil':850 ,             'contacts':[['1T','2T',NC,1 ,0]]},
  'F01':{'name':'F01','ttc':1, 'coil':1450,             'contacts':[['4T','5T',NC,1 ,0],['4T','3T',NO,1 ,0],['1B','2B',NO,1 ,0],['2T','1T',NO,1 ,0]]},
  
  'STP':{'name':'STP','ttc':1, 'coil':125 ,             'contacts':[['1T','AT',NO,1 ,0]]},

  'IS' :{'name':'IS' ,'ttc':2, 'coil':1920,             'contacts':[['2T','3T',NC,2 ,0],['2T','1T',NO,2 ,0],['6T','5T',NO,1 ,0],['6T','4T',NC,2 ,1],['2B','3B',NC,2 ,0],['2B','1B',NO,2 ,0]]},
  'IA' :{'name':'IA' ,'ttc':1, 'coil':2100,             'contacts':[['2B','3B',NC,1 ,0]]},
};