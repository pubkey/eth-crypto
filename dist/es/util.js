export function removeLeading0x(str) {
  if (str.startsWith('0x')) return str.substring(2);else return str;
}
export function addLeading0x(str) {
  if (!str.startsWith('0x')) return '0x' + str;else return str;
}
export function uint8ArrayToHex(arr) {
  return Buffer.from(arr).toString('hex');
}
export function hexToUnit8Array(str) {
  return new Uint8Array(Buffer.from(str, 'hex'));
}