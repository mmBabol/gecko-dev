// |reftest| error:SyntaxError
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-patterns
es6id: 21.2.1
description: Braced quantifier in an Atom position (lower-bounds)
info: |
    SyntaxCharacter :: one of
        ^$\.*+?()[]{}|

    PatternCharacter ::
        SourceCharacterbut not SyntaxCharacter

    Although Annex B extends the definition of Term to include
    ExtendedPatternCharacter, it also introduces the InvalidBracedQuantifier
    pattern with a higher precedence. This makes the SyntaxError for such
    patterns consistent between Annex-B and non-Annex-B environments.
negative:
  phase: early
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";

/{2,}/;
