class TypeChecker {

  of( operand ) {

    if( operand === void 0 ) return new TC_Type(`undefined`)
    if( typeof operand === "string"   ) return new TC_Type("string");
    if( typeof operand === "symbol"   ) return new TC_Type("symbol");
    if( typeof operand === "boolean"  ) return new TC_Type("boolean");
    if( typeof operand === "function" ) return new TC_Type(`function`)
    if( typeof operand === "number" ) {
      if( operand === Infinity || operand === -Infinity ) return new TC_Type("infinity");
      if( Number.isNaN( operand )     ) return new TC_Type("nan");
      if( Number.isInteger( operand ) ) return new TC_Type("integer");
      return new TC_Type(`float`);
    }
    if( typeof operand === "object" ) {
      if( operand === null ) return new TC_Type("null");
      if( Array.isArray(operand) ) return new TC_Type(`array`);
      return new TC_Type(`object`)
    }
    throw new Error(`Unknow operand.`)

  }
}

class TC_Type{
  constructor( _type ) {
    this.type = _type;
  }

  is( str ) {
    str = str.toLowerCase();
    if( str === "number" && ["float", "integer", "nan", "infinity"].includes(this.type) ) {
      return true;
    }
    if( str === "object" && ["object", "instance", "hash"].includes(this.type) ) {
      return true;
    }
    return str.toLowerCase() === this.type.toLowerCase()
  }

  isEither( ...args ) {
    for( var i = 0; i < args.length; i++ ) {
      if( this.is( args[i] ) ) return true;
    }
    return false
  }

  isOnly(...args) {
    if( !this.isEither(...args) ) {
      throw new Error(`TypeError: Allow Only ${args.join(" or ")}`)
    }
    return true
  }
}

module.exports = new TypeChecker

