/** @param {NS} ns */
export async function main(ns) {
    while(true){
        
        if(!ns.scriptRunning("scripts/HGW_scripts/auto_HGW.js","home")){
            ns.run("scripts/HGW_scripts/auto_HGW.js")
        }
        if(!ns.scriptRunning("scripts/worker_scripts/node.js","home")){
            ns.run("scripts/worker_scripts/node.js")
        }
        if(!ns.scriptRunning("scripts/worker_scripts/root.js","home")){
            ns.run("scripts/worker_scripts/root.js")
        }
        if(!ns.scriptRunning("scripts/worker_scripts/farm.js","home")){
           ns.run("scripts/worker_scripts/farm.js")
        }
        if(!ns.scriptRunning("scripts/HGW_scripts/target.js","home")){
            ns.run("scripts/HGW_scripts/target.js")
        }
        //if(!ns.scriptRunning("scripts/worker_scripts/gang.js","home")){
        //    ns.run("scripts/worker_scripts/gang.js")
        //}
        
        await(ns.sleep(60000))    
    }
}