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

export async function main(ns) {
   while (true) {
    let file = 0;

    if (ns.fileExists("BruteSSH.exe")) {
      file = file++
    }

    if (ns.fileExists("FTPCrack.exe")) {
      file = file++
    }

    if (ns.fileExists("relaySMTP.exe")) {
      file = file++
    }


    if (ns.fileExists("HTTPWorm.exe")) {
      file = file++
    }

    if (ns.fileExists("SQLInject.exe")) {
      file = file++
    }

    const servers = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let sLen = servers.length;
    for (let i = 0; i < sLen; i++) {
      let maxLevel = ns.getHackingLevel();
      let serverLevel = ns.getServerRequiredHackingLevel(servers[i]);
      let ports = ns.getServerNumPortsRequired(servers[i]);
      if (serverLevel <= maxLevel) {
        if (ports <= file) {
          ns.exec("port.js",servers[i])
          ns.exec("r_money.js",servers[i])
        }
        else {
          ns.tprint("You require a new program")
        }
      }
    }
    await (ns.sleep(60000))
  }
}
