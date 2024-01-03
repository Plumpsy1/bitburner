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

export function list_servers(ns) {
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

    const servers = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let sLen = servers.length;
    for (let i = 0; i < sLen; i++) {
      let maxLevel = ns.getHackingLevel();
      let serverLevel = ns.getServerRequiredHackingLevel(servers[i]);
      let ports = ns.getServerNumPortsRequired(servers[i]);
      if (serverLevel <= maxLevel) {
        if (ports <= file) {
          ns.run("port.js",1, servers[i])
          ns.run("r_money.js",1, servers[i])
        }
        else {
          ns.tprint("You require a new program")
        }
      }
    }
    ns.tprint("No new servers found")
    await (ns.sleep(60000))
  }
}
