import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode } from '../src/index.js';

test('encode empty string', () => {
  assert.equal(encode(''), '');
});

test('encode single character', () => {
  assert.equal(encode('a'), 'a1');
});

test('encode run of identical characters', () => {
  assert.equal(encode('aaaa'), 'a4');
});

test('encode mixed runs', () => {
  assert.equal(encode('aaabbc'), 'a3b2c1');
});

test('encode with numbers in input', () => {
  assert.equal(encode('111'), '13');
});

test('encode does not compress digits specially', () => {
  assert.equal(encode('a1a1'), 'a111a111');
});

test('decode empty string', () => {
  assert.equal(decode(''), '');
});

test('decode single run', () => {
  assert.equal(decode('a1'), 'a');
});

test('decode multiple runs', () => {
  assert.equal(decode('a3b2c1'), 'aaabbc');
});

test('decode multi-digit count', () => {
  assert.equal(decode('a12'), 'aaaaaaaaaaaa');
});

test('decode invalid: missing count', () => {
  assert.throws(() => decode('a'), /missing count/);
});

test('decode invalid: count zero', () => {
  assert.throws(() => decode('a0'), /invalid count/);
});

test('decode invalid: negative count', () => {
  assert.throws(() => decode('a-1'), /missing count/);
});

test('decode invalid: leading zeros in count', () => {
  assert.throws(() => decode('a01'), /invalid count/);
});

test('encode non-string throws', () => {
  assert.throws(() => encode(123), TypeError);
});

test('decode non-string throws', () => {
  assert.throws(() => decode(123), TypeError);
});

test('roundtrip', () => {
  const original = 'aaabbbcccddd';
  assert.equal(decode(encode(original)), original);
});
