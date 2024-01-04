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
    const port = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let pLen = port.length;
    for (let i = 0; i < pLen; i++) {
      let maxLevel = ns.getHackingLevel();
      let serverLevel = ns.getServerRequiredHackingLevel(port[i]);
      let ports = ns.getServerNumPortsRequired(port[i]);
      if (serverLevel <= maxLevel) {
        const openPorts = 0;
        if (ns.fileExists("BruteSSH.exe", "home")) {
          ns.brutessh(port[i]);
          const openPorts = 1;
        }

        if (ns.fileExists("FTPCrack.exe", "home")) {
          ns.ftpcrack(port[i]);
          const openPorts = 2;
        }

        if (ns.fileExists("relaySMTP.exe", "home")) {
          ns.relaysmtp(port[i]);
          const openPorts = 3;
        }
        
        if (ns.fileExists("HTTPWorm.exe", "home")) {
          ns.httpworm(port[i]);
          const openPorts = 4;
        }

        if (ns.fileExists("SQLInject.exe", "home")) {
          ns.sqlinject(port[i]);
          const openPorts = 5;
        }
        
        if(openPorts >= ports){
          ns.nuke(port[i]);
          ns.tprint("Nuke complete on " + port[i] + ".");
        }

        await (ns.sleep(10000))
      }
      await (ns.sleep(1))
    }
  }
}
     
