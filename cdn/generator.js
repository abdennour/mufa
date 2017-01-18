const rt = process.cwd();
const {version, name} = require(rt+'/package.json');
const shell = require('child_process').execSync;
const cmds ={
 browserify:(suffix =>`node ${rt}/node_modules/browserify/bin/cmd ${rt}/index.js -o ${rt}/cdn/${name}-${suffix}.js`) ,
 minify : (suffix => `node node_modules/uglify-js/bin/uglifyjs cdn/${name}-${suffix}.js -o cdn/${name}-${suffix}.min.js`)
};


[version, 'latest'].forEach(r =>
  Object.keys(cmds).forEach(cmd =>
    shell(cmds[cmd](r))
  )
);
