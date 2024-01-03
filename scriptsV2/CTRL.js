/** @param {NS} ns */
export async function main(ns) {
    if(!ns.scriptRunning("scriptsV2\a_money.js")){
        ns.await(ns.run("scriptsV2\a_money.js"))
    }
    if(!ns.scriptRunning("scriptsV2/node.js")){
        ns.await(ns.run("scriptsV2/node.js"))
    }
    if(!ns.scriptRunning("scriptsV2\port.js")){
        ns.await(ns.run("scriptsV2\port.js"))
    }
}