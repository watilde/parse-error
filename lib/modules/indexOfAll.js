module.exports = function (str, val){
  var out = new Array();
  var index = 0;
  while(str.indexOf(val, index) !== -1) {
    index = str.indexOf(val, index);
    out.push(index);
    index++;
  };
  return out;
};
