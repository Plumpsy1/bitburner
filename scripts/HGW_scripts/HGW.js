export async function main(ns) {
  const host = ns.getHostname();
  let target = ns.peek(1)

  while (true) {
      if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        const script = "scripts/HGW_scripts/weaken.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          ns.writePort(2, threads)
          await ns.exec(script,host,threads,target);
          await ns.sleep(ns.getWeakenTime(target)+20)
          ns.writePort(2, -threads)
        }
      }
    
      else if (ns.getServerMoneyAvailable(target) < (ns.getServerMaxMoney(target)*0.95)) {
        const script = "scripts/HGW_scripts/grow.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          ns.writePort(3, threads)
          await ns.exec(script,host,threads,target);
          await ns.sleep(ns.getGrowTime(target)+20)
          ns.writePort(3, -threads)
        }
      }
    
      else {
        const script = "scripts/HGW_scripts/hack.js";
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0){
          ns.writePort(4, threads)
          await ns.exec(script,host,threads,target);
          await ns.sleep(ns.getHackTime(target)+20)
          ns.writePort(4, -threads)
        }
      }  
    await ns.sleep(1)
  }
}
  
  