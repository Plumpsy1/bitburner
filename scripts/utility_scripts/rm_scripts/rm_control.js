export async function main(ns) {
  ns.run("scripts/utility_scripts/rm_scripts/rm_all.js",1,"home")
  while(ns.scriptRunning("scripts/utility_scripts/rm_scripts/rm_all.js","home")){
    await ns.sleep(10000)
  }
  ns.rm("scripts/utility_scripts/rm_scripts/rm_all.js","home")
  ns.rm("scripts/utility_scripts/rm_scripts/rm_control.js","home")
}