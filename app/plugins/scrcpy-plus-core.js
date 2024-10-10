const { exec } = require("child_process");
const os = require('os');

const execute = (cmd) => {
  const isWindows = os.type() == "Windows_NT" ? true : false;
  return new Promise((resolve, reject) => {
    exec(
      (isWindows ? ('cd '+process.env.scrcpyPath+ '&') : ('')) + cmd, // CD to PreInstalled SCRCPY On Windows
      (error, stdout, stderr) => {
        if (error || stderr) reject(error || stderr);
        resolve(stdout);
      }
    );
  })
}


export default defineNuxtPlugin(() => {
  return {
    provide: { execute }
  }
})