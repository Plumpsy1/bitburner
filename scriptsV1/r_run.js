/** @param {NS} ns */
export async function main(ns) {
    const script = ns.args[0]
    ns.kill(script)
    ns.run(script)
}
