function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}

console.log(myConcat(".", "1", "2", "3"));
