//--->> Either
var curry = require('./curry'),
    Left = require('./left'),
    Right = require('./right');

module.exports = curry(function(f /* identity in mose cases */, g, e) {
     switch (e.constructor) { 
        case Left: return f(e.__value); 
        case Right: return g(e.__value); 
    } 
});