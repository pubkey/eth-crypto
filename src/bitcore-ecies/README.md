# bitcore-ecies

This folder contains a copy of [bitcore-ecies](https://github.com/bitpay/bitcore-ecies).
We use this copy instead of the dependency so we can:
- change the imports to allow a better tree-shake.
- Hard-Pin the bitcore-lib version which causes some errors on imports
