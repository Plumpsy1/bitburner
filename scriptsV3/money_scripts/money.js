export async function main(ns) {
  const host = ns.getHostname();
  const target = ns.getPortHandle(1)
  const hackTime = (ns.getHackTime(target)+20)
  const growTime = (ns.getGrowTime(target)+20)
  const weakenTime = (ns.getWeakenTime(target)+20)

  while (true) {
    while (!NetscriptPort.empty(1)) {
      if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        const script = "scriptsV2/weaken.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          await ns.exec(script,host,threads,target);
          await ns.sleep(weakenTime)
        }
      }
    
      else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        const script = "scriptsV2/grow.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          await ns.exec(script,host,threads,target);
          await ns.sleep(growTime)
        }
      }
    
      else {
        const script = "scriptsV2/hack.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          await ns.exec(script,host,threads,target);
          await ns.sleep(hackTime)
        }
      }  
    }
    await ns.sleep(1)
  }
}
  
  