var fs = require('fs'),
	path = require('path'),
	buildify = require('buildify');

var args = [].slice.call(process.argv,2);
var folder = {};

folder.src = {
	path: '/../src/'
}

folder.dest = {
	custom: '/../custom/'
}

var core = folder.src.path + 'utils.js';
var paths = args.map(function(e) {
	return folder.src.path + e + '.js';
});


buildify()
  .load(core)
  .concat(paths)
  .save(folder.dest.custom + 'lib.js')
  .uglify()
  .save(folder.dest.custom + 'lib.min.js');
