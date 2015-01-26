##Building Instructions

Open loader.js and change `require('fs')` to `require('browserify-fs')` .

Then

```bash
$ browserify browserify_entry.js --standalone LogicSim -o ../build/logicsim-0.2.js
```

