const test = require(`ava`);
const type = require(`./`)

test(`null`, t => {
  t.true( type.of(null).is("null") )
})

test(`string`, t => {
  t.true( type.of( "hoge" ).is("string") );
})

test(`undefined`, t => {
  t.true( type.of( void 0 ).is("undefined") );
})

test(`integer`, t => {
  const a = 1;
  t.true( type.of(a).is(`number`) )

  t.true( type.of(a).is(`integer`) )
  t.false( type.of(a).is(`float`) )
  t.false( type.of(a).is(`NaN`))
  t.false( type.of(a).is(`Infinity`) )
})

test(`float`, t => {
  const a = 1.5;
  t.true( type.of(a).is(`number`) )

  t.false( type.of(a).is(`integer`) )
  t.true( type.of(a).is(`float`) )
  t.false( type.of(a).is(`NaN`))
  t.false( type.of(a).is(`Infinity`) )
})

test(`NaN`, t => {
  const a = NaN;
  t.true( type.of(a).is(`number`) )

  t.false( type.of(a).is(`integer`) )
  t.false( type.of(a).is(`float`) )
  t.true( type.of(a).is(`NaN`))
  t.false( type.of(a).is(`Infinity`) )
})

test(`Infinity`, t => {
  const a = Infinity;
  t.true( type.of(a).is(`number`) )

  t.false( type.of(a).is(`integer`) )
  t.false( type.of(a).is(`float`) )
  t.false( type.of(a).is(`NaN`))
  t.true( type.of(a).is(`Infinity`) )
})

test(`boolean`, t => {
  t.true( type.of(true).is(`boolean`))
  t.false( type.of(true).is(`object`))
})

test(`symbol`, t => {
  t.true( type.of( Symbol() ).is(`symbol`))
  t.false( type.of( Symbol() ).is(`object`))
})

test(`object`, t => {
  t.true( type.of( { hoge: "fuga" } ).is(`object`))
  t.false( type.of( { hoge: "fuga" } ).is(`function`))
})

test("isEither", t => {
  t.true( type.of("1.1").isEither("string", "float") )
  t.true( type.of(1.1).isEither("string", "float") )
  t.false( type.of(1).isEither("string", "float") )
})
