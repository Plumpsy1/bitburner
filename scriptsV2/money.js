export async function main(ns) {
    const host = ns.getHostname();
    let hackTime = ns.getHackTime(host);
    let growTime = ns.getGrowTime(host);
    let weakenTime = ns.getWeakenTime(host);

    while (true) {

      if (ns.getServerSecurityLevel(host) > ns.getServerMinSecurityLevel(host)) {
        let script = "scriptsV2/weaken.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,host);
        await ns.sleep(weakenTime)
      }
  
      else if (ns.getServerMoneyAvailable(host) < ns.getServerMaxMoney(host)) {
        let script = "scriptsV2/grow.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,host);
        await ns.sleep(growTime);
      }
  
      else {
        let script = "scriptsV2/hack.js";
        let threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        await ns.exec(script,host,threads,host);
        await ns.sleep(hackTime);
      }

    }

}
  
  