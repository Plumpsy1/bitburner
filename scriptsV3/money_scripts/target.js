/** @param {NS} ns */
export async function main(ns) {
      while(true){
      const hackingLevel = ns.getHackingLevel()

      if(hackingLevel > 0 && hackingLevel < 10 && ns.hasRootAccess("foodnstuff") && ns.peek(1) !== "foodnstuff"){
        ns.clearPort(1)
        ns.writePort(1,"foodnstuff")
      }
      if(hackingLevel > 9 && hackingLevel < 100 && ns.hasRootAccess("joesguns") && ns.peek(1) !== "joesguns"){
        ns.clearPort(1)
        ns.writePort(1,"joesguns")
      }
      if(hackingLevel > 99 && ns.hasRootAccess("phantasy") && ns.peek(1) !== "phantasy"){
        ns.clearPort(1)
        ns.writePort(1,"phantasy")
      }
      await ns.sleep(1)
    }
}
  