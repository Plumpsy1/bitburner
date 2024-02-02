/** @param {NS} ns */
export async function main(ns) {
      while(true){
      if(ns.hasRootAccess("rho-construction") && (ns.getHackingLevel() > 999)){
        ns.clearPort(1)
        ns.writePort(1,"rho-construction")
      }
        
      else if(ns.hasRootAccess("phantasy")){
        ns.clearPort(1)
        ns.writePort(1,"phantasy")
      }

      else if(ns.hasRootAccess("joesguns")){
        ns.clearPort(1)
        ns.writePort(1,"joesguns")
      }

      else if(ns.hasRootAccess("foodnstuff")){
        ns.clearPort(1)
        ns.writePort(1,"foodnstuff")
      }
      await ns.sleep(1)
    }
}
  