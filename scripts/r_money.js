/** @param {NS} ns */
export async function main(ns) {
  const host = ns.args[0]
  const script = "scripts/money.js"

  if (!ns.serverExists(host)) {
    ns.tprint(`Server '${host}' does not exist. Aborting.`);
    return;
  }

  const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
  ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads`);
  await ns.scp(script, host);
  ns.exec(script, host, threads, host);
}
