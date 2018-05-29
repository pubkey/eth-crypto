export function removeTrailing0x(str) {
    if (str.startsWith('0x')) return str.substring(2);else return str;
}

export function addTrailing0x(str) {
    if (!str.startsWith('0x')) return '0x' + str;else return str;
}