/** @param {NS} ns */
export async function main(ns) {
    while(true){
        
        if(!ns.scriptRunning("scriptsV3/money_scripts/a_money.js","home")){
            ns.run("scriptsV3/money_scripts/a_money.js")
        }
        if(!ns.scriptRunning("scriptsV3/node.js","home")){
            ns.run("scriptsV3/node.js",1,0)
        }
        if(!ns.scriptRunning("scriptsV3/root.js","home")){
            ns.run("scriptsV3/root.js")
        }
        if(!ns.scriptRunning("scriptsV3/farm.js","home")){
            ns.run("scriptsV3/farm.js")
        }
        if(!ns.scriptRunning("scriptsV3/target.js","home")){
            ns.run("scriptsV3/target.js")
        }

        await(ns.sleep(60000))    
    }
}