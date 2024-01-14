/** @param {NS} ns */
export async function main(ns) {
    while(true){
        
        if(!ns.scriptRunning("scriptsV3/money_scripts/a_money.js","home")){
            ns.run("scriptsV3/money_scripts/a_money.js")
        }
        if(!ns.scriptRunning("scriptsV3/node.js","home")){
            ns.run("scriptsV3/node.js",1,0)
        }
        if(!ns.scriptRunning("scriptsV3/untility_scripts/root.js","home")){
            ns.run("scriptsV3/untility_scripts/root.js")
        }
        if(!ns.scriptRunning("scriptsV3/farm_scripts/farm.js","home")){
           ns.run("scriptsV3/farm_scripts/farm.js")
        }
        if(!ns.scriptRunning("scriptsV3/money_scripts/target.js","home")){
            ns.run("scriptsV3/money_scripts/target.js")
        }

        await(ns.sleep(60000))    
    }
}