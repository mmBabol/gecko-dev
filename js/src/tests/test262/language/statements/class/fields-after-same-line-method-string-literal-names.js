// |reftest| skip -- class-fields is not supported
// This file was procedurally generated from the following sources:
// - src/class-fields/string-literal-names.case
// - src/class-fields/default/cls-decl-after-same-line-method.template
/*---
description: String literal names (field definitions after a method in the same line)
features: [class-fields]
flags: [generated]
includes: [propertyHelper.js]
info: |
    ClassElement:
      ...
      FieldDefinition ;

    FieldDefinition:
      ClassElementName Initializer_opt

    ClassElementName:
      PropertyName

---*/


class C {
  m() { return 42; } 'a'; "b"; 'c' = 39;
  "d" = 42;
}

var c = new C();

assert.sameValue(c.m(), 42);
assert.sameValue(Object.hasOwnProperty.call(c, "m"), false);
assert.sameValue(c.m, C.prototype.m);

verifyProperty(C.prototype, "m", {
  enumerable: false,
  configurable: true,
  writable: true,
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "a"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "a"), false);

verifyProperty(c, "a", {
  value: undefined,
  enumerable: true,
  writable: true,
  configurable: true
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "b"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "b"), false);

verifyProperty(c, "b", {
  value: undefined,
  enumerable: true,
  writable: true,
  configurable: true
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "c"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "c"), false);

verifyProperty(c, "c", {
  value: 39,
  enumerable: true,
  writable: true,
  configurable: true
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "d"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "d"), false);

verifyProperty(c, "d", {
  value: 42,
  enumerable: true,
  writable: true,
  configurable: true
});

reportCompare(0, 0);
