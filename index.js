/**
 * TafgeetJS module.
 * @module TafgeetJS
 * @description Converts currency digits into written Arabic words
 * @author Mohammed Mahgoub <mmahgoub@gmail.com>
 */

function Tafgeet(digit, options) {
  this.computedOptions = {
    // first we put the defaults
    currency: "SDG",
    startWith: "فقط",
    endWith: "لا غير",
    // then overwrite with user's options
    ...(options || {})
  }

  
  //Split fractions
  var splitted = digit.toString().split(".");
  this.fraction = 0;
  if (splitted.length > 1) {
    var fraction;
    if(splitted[1].length > 1){
      fraction = parseInt(splitted[1]);
      if (fraction >= 1 && fraction <= 99) {
        this.fraction =  splitted[1].length === 1 ? fraction * 10 : fraction;
      } else {
        //trim it
        var trimmed = Array.from(splitted[1]);
        this.fraction = "";
        for (var index = 0; index < this.currencies[this.computedOptions.currency].decimals; index++) {
          this.fraction += trimmed[index];
        }
      }
    }else{
      this.fraction = parseInt(splitted[1]);
    }    
  }
  this.digit = splitted[0];
}

Tafgeet.prototype.parse = function () {
  var serialized = [];
  var tmp = [];
  var inc = 1;
  var count = this.length();
  var column = this.getColumnIndex();
  if (count >= 16) {
    console.error("Number out of range!");
    return;
  }
  //Sperate the number into columns
  Array.from(this.digit.toString()).reverse().forEach(function (d, i) {
    tmp.push(d);
    if (inc == 3) {
      serialized.unshift(tmp);
      tmp = [];
      inc = 0;
    }
    if (inc == 0 && count - (i + 1) < 3 && count - (i + 1) != 0) {
      serialized.unshift(tmp);
    }
    inc++;
  });

  // Generate concatenation array
  var concats = []
  for (i = this.getColumnIndex(); i < this.columns.length; i++) {
    concats[i] = " و";
  }

  //We do not need some "و"s check last column if 000 drill down until otherwise
  if (this.digit > 999) {
    if (parseInt(Array.from(serialized[serialized.length - 1]).join("")) == 0) {
      concats[parseInt(concats.length - 1)] = ""
      for (i = serialized.length - 1; i >= 1; i--) {
        if (parseInt(Array.from(serialized[i]).join("")) == 0) {
          concats[i] = ""
        } else {
          break;
        }
      }
    }
  }

  var str = "";
  if(this.computedOptions.startWith) {
    str += this.computedOptions.startWith + " ";
  }

  if (this.length() >= 1 && this.length() <= 3) {
    str += this.read(this.digit);
  } else {
    for (i = 0; i < serialized.length; i++) {
      var joinedNumber = parseInt(serialized[i].reverse().join(""));
      if (joinedNumber == 0) {
        column++;
        continue;
      }
      if (column == null || column + 1 > this.columns.length) {
        str += this.read(joinedNumber);
      } else {
        str += this.addSuffixPrefix(serialized[i], column) + concats[column];
      }
      column++;
    }
  }

  if (this.computedOptions.currency != "") {
    if (this.digit >= 3 && this.digit <= 10) {
      str += " " + this.currencies[this.computedOptions.currency].plural;
    } else {
      str += " " + this.currencies[this.computedOptions.currency].singular;
    }
    if (this.fraction != 0) {
      if (this.digit >= 3 && this.digit <= 10) {
        str +=
          " و" +
          this.read(this.fraction) +
          " " +
          this.currencies[this.computedOptions.currency].fractions;
      } else {
        str +=
          " و" +
          this.read(this.fraction) +
          " " +
          this.currencies[this.computedOptions.currency].fraction;
      }
    }
  }
  
  if(this.computedOptions.endtWith) {
    str += " " + this.computedOptions.endtWith;
  }
  return str;
};

Tafgeet.prototype.addSuffixPrefix = function (arr, column) {
  if (arr.length == 1) {
    if (parseInt(arr[0]) == 1) {
      return this[this.columns[column]].singular;
    }
    if (parseInt(arr[0]) == 2) {
      return this[this.columns[column]].binary;
    }
    if (parseInt(arr[0]) > 2 && parseInt(arr[0]) <= 9) {
      return (
        this.readOnes(parseInt(arr[0])) +
        " " +
        this[this.columns[column]].plural
      );
    }
  } else {
    var joinedNumber = parseInt(arr.join(""));
    if (joinedNumber > 1) {
      return this.read(joinedNumber) + " " + this[this.columns[column]].singular;
    } else {
      return this[this.columns[column]].singular;
    }
  }
};

Tafgeet.prototype.read = function (d) {
  var str = "";
  var len = Array.from(d.toString()).length;
  if (len == 1) {
    str += this.readOnes(d);
  } else if (len == 2) {
    str += this.readTens(d);
  } else if (len == 3) {
    str += this.readHundreds(d);
  }
  return str;
};

Tafgeet.prototype.readOnes = function (d) {
  if (d == 0) return;
  return this.ones["_" + d.toString()];
};

Tafgeet.prototype.readTens = function (d) {
  if (Array.from(d.toString())[1] === "0") {
    return this.tens["_" + d.toString()];
  }
  if (d > 10 && d < 20) {
    return this.teens["_" + d.toString()];
  }
  if (d > 19 && d < 100 && Array.from(d.toString())[1] !== "0") {
    return (
      this.readOnes(Array.from(d.toString())[1]) +
      " و" +
      this.tens["_" + Array.from(d.toString())[0] + "0"]
    );
  }
};

Tafgeet.prototype.readHundreds = function (d) {
  var str = "";
  str += this.hundreds["_" + Array.from(d.toString())[0] + "00"];

  if (
    Array.from(d.toString())[1] === "0" &&
    Array.from(d.toString())[2] !== "0"
  ) {
    str += " و" + this.readOnes(Array.from(d.toString())[2]);
  }

  if (Array.from(d.toString())[1] !== "0") {
    str +=
      " و" +
      this.readTens(
        (Array.from(d.toString())[1] + Array.from(d.toString())[2]).toString()
      );
  }
  return str;
};

Tafgeet.prototype.length = function () {
  return Array.from(this.digit.toString()).length;
};

Tafgeet.prototype.getColumnIndex = function () {
  var column = null;
  if (this.length() > 12) {
    column = 0;
  } else if (this.length() <= 12 && this.length() > 9) {
    column = 1;
  } else if (this.length() <= 9 && this.length() > 6) {
    column = 2;
  } else if (this.length() <= 6 && this.length() >= 4) {
    column = 3;
  }
  return column;
};

Tafgeet.prototype.ones = {
  _1: "واحد",
  _2: "ٱثنين",
  _3: "ثلاثة",
  _4: "أربعة",
  _5: "خمسة",
  _6: "ستة",
  _7: "سبعة",
  _8: "ثمانية",
  _9: "تسعة"
};

Tafgeet.prototype.teens = {
  _11: "أحد عشر",
  _12: "أثني عشر",
  _13: "ثلاثة عشر",
  _14: "أربعة عشر",
  _15: "خمسة عشر",
  _16: "ستة عشر",
  _17: "سبعة عشر",
  _18: "ثمانية عشر",
  _19: "تسعة عشر"
};

Tafgeet.prototype.tens = {
  _10: "عشرة",
  _20: "عشرون",
  _30: "ثلاثون",
  _40: "أربعون",
  _50: "خمسون",
  _60: "ستون",
  _70: "سبعون",
  _80: "ثمانون",
  _90: "تسعون"
};
Tafgeet.prototype.hundreds = {
  _100: "مائة",
  _200: "مائتين",
  _300: "ثلاثمائة",
  _400: "أربعمائة",
  _500: "خمسمائة",
  _600: "ستمائة",
  _700: "سبعمائة",
  _800: "ثمانمائة",
  _900: "تسعمائة"
};
Tafgeet.prototype.thousands = {
  singular: "ألف",
  binary: "ألفين",
  plural: "ألآف"
};
Tafgeet.prototype.milions = {
  singular: "مليون",
  binary: "مليونين",
  plural: "ملايين"
};
Tafgeet.prototype.bilions = {
  singular: "مليار",
  binary: "مليارين",
  plural: "مليارات"
};
Tafgeet.prototype.trilions = {
  singular: "ترليون",
  binary: "ترليونين",
  plural: "ترليونات"
};
Tafgeet.prototype.columns = ["trilions", "bilions", "milions", "thousands"];

Tafgeet.prototype.currencies = {
  SDG: {
    singular: "جنيه سوداني",
    plural: "جنيهات سودانية",
    fraction: "قرش",
    fractions: "قروش",
    decimals: 2
  },
  SAR: {
    singular: "ريال سعودي",
    plural: "ريالات سعودية",
    fraction: "هللة",
    fractions: "هللات",
    decimals: 2
  },
  QAR: {
    singular: "ريال قطري",
    plural: "ريالات قطرية",
    fraction: "درهم",
    fractions: "دراهم",
    decimals: 2
  },
  AED: {
    singular: "درهم أماراتي",
    plural: "دراهم أماراتية",
    fraction: "فلس",
    fractions: "فلوس",
    decimals: 2
  },
  EGP: {
    singular: "جنيه مصري",
    plural: "جنيهات مصرية",
    fraction: "قرش",
    fractions: "قروش",
    decimals: 2
  },
  USD: {
    singular: "دولار أمريكي",
    plural: "دولارات أمريكية",
    fraction: "سنت",
    fractions: "سنتات",
    decimals: 2
  },
  AUD: {
    singular: "دولار أسترالي",
    plural: "دولارات أسترالية",
    fraction: "سنت",
    fractions: "سنتات",
    decimals: 2
  },
  TND: {
    singular: "دينار تونسي",
    plural: "دنانير تونسية",
    fraction: "مليم",
    fractions: "مليمات",
    decimals: 3
  },
  TRY: {
    singular: "ليرة تركية",
    plural: "ليرات تركية",
    fraction: "قرش",
    fractions: "قروش",
    decimals: 2
  }
};

module.exports = Tafgeet;
