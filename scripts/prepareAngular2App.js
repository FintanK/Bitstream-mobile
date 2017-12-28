const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function (context) {
  console.log('Convergence is building the Angular 4 application into Cordova...');

  let basePath = "/Convergence/client/Angular4_CLI_Starter/";

  console.log(execSync(
    "ng build --output-path ../www/ --base-href .",
    {
      maxBuffer: 1024 * 1024,
      cwd: basePath
    }).toString('utf8')
  );
};
