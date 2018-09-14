<!--
  !!!
  REMOVE EVERYTHING WRITTEN IN UPPERCASE BEFORE YOU CLICK SUBMIT
  !!!
-->

<!-- IMPORTANT:
  If you have a common question which cannot be solved with a PR,
  DO NOT CREATE AN ISSUE!
  You can go here these to ask for help:
  - https://ethereum.stackexchange.com/
  - https://www.reddit.com/r/ethdev/
  - https://gitter.im/ethereum/web3.js
-->

<!-- DID YOU KNOW?
  Over 50% of our bug-issues are not bugs.
  When you reproduce the bug in our bug-template
  you do not have to wait for the maintainers answer
  and very likely solve your problem in the next 15 minutes.
  https://github.com/pubkey/eth-crypto/blob/master/test/bug-template.test.js
-->

## Case
<!-- IS IT A BUG OR A REQUEST FOR A NEW FEATURE OR SOMETHING ELSE? -->

## Issue
<!-- DESCRIBE WHY YOU OPEN THIS ISSUE -->

## Info <!-- ONLY NEEDED FOR BUGS -->
  - Environment: (Node.js/browser/electron/etc..)
  - Adapter: (IndexedDB/Localstorage/LevelDB/etc..)
  - Stack: (Typescript, Babel, Angular, React, etc..)

## Code

```js
const messageHash = EthCrypto.hash.keccak256(message);
const signature = EthCrypto.sign(testData.privateKey, messageHash);
  /* ... */
```

<!--
  IF YOU HAVE A BUG, WRITE CODE HERE TO REPRODUCE IT.
  BUGS WONT BE TOUCHED BY THE MAINTAINER UNTIL THERE IS SOME CODE!

  OPTIMALLY YOU SHOULD ADD A PULL-REQUEST WHICH REPRODUCES THE BUG
  BY MODIFYING THIS FILE: https://github.com/pubkey/eth-crypto/blob/master/test/bug-template.test.js
-->
