export function encode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  if (input.length === 0) {
    return '';
  }
  let result = '';
  let count = 1;
  for (let i = 1; i <= input.length; i++) {
    if (i < input.length && input[i] === input[i - 1]) {
      count++;
    } else {
      result += input[i - 1] + count;
      count = 1;
    }
  }
  return result;
}

export function decode(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  if (input.length === 0) {
    return '';
  }
  let result = '';
  let i = 0;
  while (i < input.length) {
    const char = input[i];
    i++;
    let numStr = '';
    while (i < input.length && input[i] >= '0' && input[i] <= '9') {
      numStr += input[i];
      i++;
    }
    if (numStr === '') {
      throw new Error(`malformed encoded string: missing count for character '${char}' at position ${i - 1}`);
    }
    if (numStr.length > 1 && numStr[0] === '0') {
      throw new Error(`malformed encoded string: invalid count ${numStr} for character '${char}'`);
    }
    const count = parseInt(numStr, 10);
    if (count <= 0) {
      throw new Error(`malformed encoded string: invalid count ${count} for character '${char}'`);
    }
    result += char.repeat(count);
  }
  return result;
}
