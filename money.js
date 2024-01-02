export async function main(ns) {

  const host = ns.args[0]

  while (true) {
    if (ns.getServerSecurityLevel(host) > ns.getServerMinSecurityLevel(host)) {
      await ns.weaken(host);
    }

    else if (ns.getServerMoneyAvailable(host) < ns.getServerMaxMoney(host)) {
      await ns.grow(host);
    }

    else {
      await ns.hack(host);
    }

  }
}
