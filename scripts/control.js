async function run(ns, scripts, sLen) {

    for (let i = 0; i < sLen; i++){

        if (!ns.scriptRunning(scripts[i],"home")){
            
            ns.run(scripts[i],1,"home")

        }

    }

}

/** @param {NS} ns */
export async function main(ns) {

    while(true){

        const scripts = [
        "scripts/HGW_scripts/auto_HGW.js",
        "scripts/worker_scripts/root.js",
        "scripts/worker_scripts/node.js",
        "scripts/worker_scripts/farm.js",
        "scripts/worker_scripts/target.js"
        ]

        const sLen = scripts.length;       

        run(ns,scripts, sLen)
        
        await ns.sleep(60000)

    }

}