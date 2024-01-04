/** @param {NS} ns */
export async function main(ns) {
    while(true){
        if(!ns.scriptRunning("scriptsV2/a_money.js","home")){
            ns.run("scriptsV2/a_money.js")
        }
        if(!ns.scriptRunning("scriptsV2/node.js","home")){
            ns.run("scriptsV2/node.js",1,0)
        }
        if(!ns.scriptRunning("scriptsV2/root.js","home")){
            ns.run("scriptsV2/root.js")
        }
        await(ns.sleep(60000))    
    }
}