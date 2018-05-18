var assert = require('assert');
var Tafgeet = require('../index');

var text = new Tafgeet('1');

describe('Reading numbers from 1 - 999', function() {
    it('should read 1', function() {
        assert.equal("واحد", text.read(1));
    });
    it('should read 2', function() {
        assert.equal("ٱثنين", text.read(2));
    });
    it('should read 10', function() {
        assert.equal("عشرة", text.read(10));
    });
    it('should read 11', function() {
        assert.equal("أحد عشر", text.read(11));
    });
    it('should read 12', function() {
        assert.equal("أثني عشر", text.read(12));
    });
    it('should read 20', function() {
        assert.equal("عشرون", text.read(20));
    });
    it('should read 21', function() {
        assert.equal("واحد وعشرون", text.read(21));
    });
    it('should read 99', function() {
        assert.equal("تسعة وتسعون", text.read(99));
    });
    it('should read 100', function() {
        assert.equal("مائة", text.read(100));
    });
    it('should read 120', function() {
        assert.equal("مائة وعشرون", text.read(120));
    });
    it('should read 191', function() {
        assert.equal("مائة وواحد وتسعون", text.read(191));
    });
    it('should read 989', function() {
        assert.equal("تسعمائة وتسعة وثمانون", text.read(989));
    });
});
describe('Reading full amounts without a currecy specified', function() {
    it('should read 7,564,654', function() {
        assert.equal("فقط سبعة ملايين وخمسمائة وأربعة وستون ألف وستمائة وأربعة وخمسون لا غير", new Tafgeet('7564654', '').parse());
    });
    it('should read 12', function() {
        assert.equal("فقط أثني عشر لا غير", new Tafgeet('12', '').parse());
    });
    it('should read 74', function() {
        assert.equal("فقط أربعة وسبعون لا غير", new Tafgeet('74', '').parse());
    });
    it('should read 234', function() {
        assert.equal("فقط مائتين وأربعة وثلاثون لا غير", new Tafgeet('234', '').parse());
    });
});
describe('Reading full amounts', function() {
    it('should read SDG 1', function() {
        assert.equal("فقط واحد جنيه سوداني لا غير", new Tafgeet('1').parse());
    });
    it('should read SDG 1.20', function() {
        assert.equal("فقط واحد جنيه سوداني وعشرون قرش لا غير", new Tafgeet('1.20').parse());
    });
    it('should read TND 1.200', function() {
        assert.equal("فقط واحد دينار تونسي ومائتين مليم لا غير", new Tafgeet('1.200', 'TND').parse());
    });
    it('should read SDG 1.20 even if there are three decimal places', function() {
        assert.equal("فقط واحد جنيه سوداني وعشرون قرش لا غير", new Tafgeet('1.200', 'SDG').parse());
    });
    it('should read SDG 1,000', function() {
        assert.equal("فقط ألف جنيه سوداني لا غير", new Tafgeet('1000').parse());
    });
    it('should read SDG 1,345', function() {
        assert.equal("فقط ألف وثلاثمائة وخمسة وأربعون جنيه سوداني لا غير", new Tafgeet('1345').parse());
    });
    it('should read SDG 2,455', function() {
        assert.equal("فقط ألفين وأربعمائة وخمسة وخمسون جنيه سوداني لا غير", new Tafgeet('2455').parse());
    });
    it('should read SDG 10,000', function() {
        assert.equal("فقط عشرة ألف جنيه سوداني لا غير", new Tafgeet('10000').parse());
    });
    it('should read SDG 12,444', function() {
        assert.equal("فقط أثني عشر ألف وأربعمائة وأربعة وأربعون جنيه سوداني لا غير", new Tafgeet('12444').parse());
    });
    it('should read SDG 100,000', function() {
        assert.equal("فقط مائة ألف جنيه سوداني لا غير", new Tafgeet('100000').parse());
    });
    it('should read SDG 101,000', function() {
        assert.equal("فقط مائة وواحد ألف جنيه سوداني لا غير", new Tafgeet('101000').parse());
    });
    it('should read SDG 102,000', function() {
        assert.equal("فقط مائة وٱثنين ألف جنيه سوداني لا غير", new Tafgeet('102000').parse());
    });
    it('should read SDG 1,000,000.66', function() {
        assert.equal("فقط مليون جنيه سوداني وستة وستون قرش لا غير", new Tafgeet('1000000.66').parse());
    });
    it('should read TND 1,000,000.660', function() {
        assert.equal("فقط مليون دينار تونسي وستمائة وستون مليم لا غير", new Tafgeet('1000000.660', 'TND').parse());
    });
    it('should read SDG 100,000', function() {
        assert.equal("فقط مائة ألف جنيه سوداني لا غير", new Tafgeet('100000').parse());
    });
    it('should read SDG 1,000,001,000', function() {
        assert.equal("فقط مليار وألف جنيه سوداني لا غير", new Tafgeet('1000001000').parse());
    });
    it('should read SDG 10,010,001,000', function() {
        assert.equal("فقط عشرة مليار وعشرة مليون وألف جنيه سوداني لا غير", new Tafgeet('10010001000').parse());
    });
    it('should read SDG 1,001,000,001,000', function() {
        assert.equal("فقط ترليون ومليار وألف جنيه سوداني لا غير", new Tafgeet('1001000001000').parse());
    });
    it('should read SDG 1,000,000,000,001', function() {
        assert.equal("فقط ترليون وواحد جنيه سوداني لا غير", new Tafgeet('1000000000001').parse());
    });
    it('should read SDG 1,000,100,000,001', function() {
        assert.equal("فقط ترليون ومائة مليون وواحد جنيه سوداني لا غير", new Tafgeet('1000100000001').parse());
    });
    it('should read SDG 10,000,000', function() {
        assert.equal("فقط عشرة مليون جنيه سوداني لا غير", new Tafgeet('10000000').parse());
    });
    it('should read SDG 10,000,001', function() {
        assert.equal("فقط عشرة مليون وواحد جنيه سوداني لا غير", new Tafgeet('10000001').parse());
    });
    it('should read TND 1,001', function() {
        assert.equal("فقط ألف وواحد دينار تونسي لا غير", new Tafgeet('1001','TND').parse());
    });
    it('should read TND 556,563.999', function() {
        assert.equal("فقط خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون دينار تونسي وتسعمائة وتسعة وتسعون مليم لا غير", new Tafgeet('556563.999','TND').parse());
    });
    it('should read SDG 10,001', function() {
        assert.equal("فقط عشرة ألف وواحد جنيه سوداني لا غير", new Tafgeet('10001').parse());
    });
    it('should read SDG 556,563.20', function() {
        assert.equal("فقط خمسمائة وستة وخمسون ألف وخمسمائة وثلاثة وستون جنيه سوداني وعشرون قرش لا غير", new Tafgeet('556563.20').parse());
    });
    it('should read SDG 100,100', function() {
        assert.equal("فقط مائة ألف ومائة جنيه سوداني لا غير", new Tafgeet('100100').parse());
    });
    it('should read SDG 55,000,051,000', function() {
        assert.equal("فقط خمسة وخمسون مليار وواحد وخمسون ألف جنيه سوداني لا غير", new Tafgeet('55000051000').parse());
    });
    it('should read SDG 55,000,051,000.2', function() {
        assert.equal("فقط خمسة وخمسون مليار وواحد وخمسون ألف جنيه سوداني وٱثنين قرش لا غير", new Tafgeet('55000051000.2').parse());
    });
    it('should read SDG 55,000,051,000.1', function() {
        assert.equal("فقط خمسة وخمسون مليار وواحد وخمسون ألف جنيه سوداني وواحد قرش لا غير", new Tafgeet(55000051000.1).parse());
    });
});