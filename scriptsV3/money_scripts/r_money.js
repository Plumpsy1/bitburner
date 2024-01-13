/** @param {NS} ns */
export async function main(ns) {
    const host = ns.args[0];
  
    if (!ns.scriptRunning("scriptsV3/money_scripts/money.js",host)){
      ns.scp("scriptsV3/money_scripts/grow.js", host);
      ns.scp("scriptsV3/money_scripts/hack.js", host);
      ns.scp("scriptsV3/money_scripts/weaken.js", host);
      ns.scp("scriptsV3/money_scripts/money.js", host);

      ns.exec("scriptsV3/money_scripts/money.js",host);
    }
  }
  