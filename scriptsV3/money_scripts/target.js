/** @param {NS} ns */
export async function main(ns) {
      while(true){
      const hackingLevel = ns.getHackingLevel()

      if(hackingLevel > 0 && hackingLevel < 10){
        if(ns.peek(1) !== "foodnstuff"){
          ns.clearPort(1)
          ns.writePort(1,"foodnstuff")
        }
      }
      if(hackingLevel > 10 && hackingLevel < 100){
        if(ns.peek(1) !== "joesguns"){
          ns.clearPort(1)
          ns.writePort(1,"joesguns")
        }
      }
      if(hackingLevel > 100){
        if(ns.peek(1) !== "phantasy"){
          ns.clearPort(1)
          ns.writePort(1,"phantasy")
        }
      }
      await ns.sleep(1)
    }
}
  