/** @param {NS} ns */
export async function main(ns) {
    const host = ns.args[0];
    const target = ns.args[1];
  
    ns.scp("scriptsV2/grow.js", host);
    ns.scp("scriptsV2/hack.js", host);
    ns.scp("scriptsV2/weaken.js", host);
    ns.scp("scriptsV2/fmoney.js", host);

    ns.exec("scriptsV2/fmoney.js",host,target);
  }
  