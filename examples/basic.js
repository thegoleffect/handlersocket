var hs = require('handlersocket');

var hsocket = hs.connect('mysql://dev.va.nqui.sh:9999/test');

hsocket.find({id: 1}, {limit: 10, offset: 0}, function(err, docs){
    if (err) {
        throw err;
    }
    
    docs.forEach(function(doc){
        console.log(doc);
    })
})

hsocket.insert({col: "test value"}, function(err){
    
});