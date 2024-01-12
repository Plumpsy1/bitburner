/** @param {NS} ns */
export async function main(ns) {
    const host = ns.args[0];
  
    if (!ns.scriptRunning("scriptsV2/money.js",host)){
      ns.scp("scriptsV2/grow.js", host);
      ns.scp("scriptsV2/hack.js", host);
      ns.scp("scriptsV2/weaken.js", host);
      ns.scp("scriptsV2/money.js", host);

      ns.exec("scriptsV2/money.js",host);
    }
  }
  