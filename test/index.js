var Chai = require('chai');
var HSocket = require('../lib/');

var expect = Chai.expect;

var validateHostString = function(desc, hoststr, intendedParsed){
    return it(desc, function(done){
        var parsed = HSocket.parseHostStr(hoststr);
        for(var i in intendedParsed){
            expect(parsed[i]).to.equal(intendedParsed[i]);
        }
        done();
    })
}

describe('HSocket', function() {
    describe('#parseHostStr', function() {
        it('should throw error if hoststring includes protocol', function(done){
            var fn = function(){
                return HSocket.parseHostStr("mysql://dev.va.nqui.sh:9999/test");
            };
            expect(fn).to.throw();
            done();
        });
        
        // Meta: Parse known valid hoststrings
        var validHostStrings = [
            [
              "should parse host:port/db", 
              "dev.va.nqui.sh:9998/test",
              {
                host: 'dev.va.nqui.sh',
                port: 9998,
                db: 'test'
              }
            ],
            [
              "should parse host/test",
              "dev.va.nqui.sh/test",
              {
                host: 'dev.va.nqui.sh',
                port: 9999,
                db: 'test'
              }
            ],
            [
              "should parse host",
              "localhost",
              {
                host: 'localhost',
                port: 9999,
                db: 'test'
              }
            ],
            [
              "should parse null", 
              null, 
              {
                host: 'localhost',
                port: 9999,
                db: 'test'
              }
            ],
            [
              "should parse undefined", 
              undefined, 
              {
                host: 'localhost',
                port: 9999,
                db: 'test'
              }
            ],
            [
              "should parse emptystring ''", 
              '', 
              {
                host: 'localhost',
                port: 9999,
                db: 'test'
              }
            ]
        ];
        for(var i in validHostStrings){
            validateHostString(validHostStrings[i][0], validHostStrings[i][1], validHostStrings[i][2]);
        }
    })
})