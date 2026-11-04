# run-length-encoding-utils

A tiny library for compressing and decompressing text by replacing repeated character runs with a single character followed by a decimal count.

## Usage

```js
import { encode, decode } from './src/index.js';

encode('aaabbc'); // 'a3b2c1'
decode('a3b2c1'); // 'aaabbc'
```

## Why this exists

Run-length encoding is simple enough to write inline, but the edge cases around digits in the input and malformed encoded strings are easy to get wrong. This library makes two deliberate trade-offs:

- The encoded format is `char` followed by a decimal count, with no separator. This means digits in the original text become part of the count stream, so `encode('a1a1')` produces `'a11a11'`. Decoding that string correctly requires the decoder to treat every digit after a non-digit as part of the count. The alternative — escaping digits or using a separator — would make the common case noisier and the format harder to read by eye.
- `decode` throws on malformed input rather than returning a partial result. A missing count, a zero count, or a leading zero in a count are all errors, because silently accepting them would hide data corruption.

## Edge cases

- Input to `encode` and `decode` must be a string; anything else throws a `TypeError`.
- `encode('')` and `decode('')` both return `''`.
- `decode` rejects counts with leading zeros (e.g. `'a01'`) and counts of zero (`'a0'`).
- Characters in the input are treated as single UTF-16 code units. Astral-plane characters (emoji, some CJK) are two code units and will be encoded as two runs. This is a known limitation of the simple format.
