/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
  }

  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
  }

  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
  }

  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
  }

  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
  }

  ns.nuke(target);

  ns.tprint("Nuke complete on " + target + ".");
  ns.exec("r_money.js", target)
}
