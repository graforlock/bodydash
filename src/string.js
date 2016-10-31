//-->>> String add-ons
var curry = require('./curry'),
    head = require('./array').head;

var string = {

    toLower: function(a)
    {
        return a.toLowerCase();
    },

    toUpper: function(a)
    {
        return a.toUpperCase();
    },

    capitalise: function(a)
    {
        return string.concat(string.toUpper(head(a)), a.slice(1));
    },

    concat: curry(function(a, b)
    {
        return a.concat(b);
    })

};

module.exports = string;
