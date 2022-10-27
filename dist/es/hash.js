import { utils as ethersUtils } from 'ethers';
export function keccak256(params) {
  var types = [];
  var values = [];
  if (!Array.isArray(params)) {
    types.push('string');
    values.push(params);
  } else {
    params.forEach(function (p) {
      types.push(p.type);
      values.push(p.value);
    });
  }
  return ethersUtils.solidityKeccak256(types, values);
}
export var SIGN_PREFIX = '\x19Ethereum Signed Message:\n32';