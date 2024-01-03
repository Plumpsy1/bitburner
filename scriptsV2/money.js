export async function main(ns) {

    const target = ns.args[0]
    const host = ns.getHostname();

    while (true) {
      if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        let script = "scriptsV2\weaken.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,target);
      }
  
      else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        let script = "scriptsV2\grow.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,target);
      }
  
      else {
        let script = "scriptsV2\hack.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,target);
      }
    }
  }
  