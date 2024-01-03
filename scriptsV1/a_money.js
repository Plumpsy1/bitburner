function scan(ns, parent, server, list) {
  const children = ns.scan(server);
  for (let child of children) {
    if (parent == child) {
      continue;
    }
    list.push(child);

    scan(ns, server, child, list);
  }
}

function list_servers(ns) {
  const list = [];
  scan(ns, '', 'home', list);
  return list;
}

/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let file = 0;

    if (ns.fileExists("BruteSSH.exe")) {
      file = 1
    }

    if (ns.fileExists("FTPCrack.exe")) {
      file = 2
    }

    if (ns.fileExists("relaySMTP.exe")) {
      file = 3
    }


    if (ns.fileExists("HTTPWorm.exe")) {
      file = 4
    }

    if (ns.fileExists("SQLInject.exe")) {
      file = 5
    }

    const serversRoot = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let sRootLen = serversRoot.length;
    for (let i = 0; i < sRootLen; i++) {
      let maxLevel = ns.getHackingLevel();
      let serverLevel = ns.getServerRequiredHackingLevel(serversRoot[i]);
      let ports = ns.getServerNumPortsRequired(serversRoot[i]);
      if (serverLevel <= maxLevel) {
        if (ports <= file) {
          ns.run("scripts/port.js",1, serversRoot[i])
        }
        else if (serversRoot[i]!= "darkweb"){
          ns.tprint("You require a new program")
        }
      }
    }

    const serversRam = list_servers(ns).filter(s => ns.hasRootAccess(s));
    let sRamLen = serversRam.length;
    for (let i = 0; i < sRamLen; i++) {
      let serversMaxRam = ns.getServerMaxRam(serversRam[i]);
      let serversCurRam = ns.getServerUsedRam(serversRam[i])
      if ((serversMaxRam-serversCurRam)>2.4) {
        ns.run("scripts/r_money.js", 1, serversRam[i])
      }
    }
    await (ns.sleep(10000))
  }
}
