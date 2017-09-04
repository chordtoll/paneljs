function ds_makeset(set,x) {
  if (set[x]==undefined)
    set[x]={'parent':x,'rank':0};
}

function ds_find(set,x) {
  if (set[x].parent!=x)
    set[x].parent=ds_find(set,set[x].parent);
  return set[x].parent;
}

function ds_union(set,x,y) {
  var xroot=ds_find(set,x);
  var yroot=ds_find(set,y);
  if (xroot==yroot)
    return;
  if (set[xroot].rank<set[yroot].rank)
    set[xroot].parent=yroot;
  else if (set[yroot].rank<set[xroot].rank)
    set[yroot].parent=xroot;
  else {
    set[yroot].parent=xroot;    
    set[xroot].rank++;
  }
}