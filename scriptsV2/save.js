/** @param {NS} ns */
export async function main(ns) {
    const amount = ns.args[0];

    ns.scriptKill("scriptsV2/node.js","home")
    ns.run("scriptsV2/node.js",1,amount)
}