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
    const host = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let hLen = host.length;
    for (let i = 0; i < hLen; i++) {
      let maxLevel = ns.getHackingLevel();
      let serverLevel = ns.getServerRequiredHackingLevel(host[i]);
      let ports = ns.getServerNumPortsRequired(host[i]);
      var portsOpened = 0
      if (serverLevel <= maxLevel) {
      
        if (ns.fileExists("BruteSSH.exe", "home")) {
          ns.brutessh(host[i]);
          var portsOpened = 1
        }

        if (ns.fileExists("FTPCrack.exe", "home")) {
          ns.ftpcrack(host[i]);
          var portsOpened = 2
        }

        if (ns.fileExists("relaySMTP.exe", "home")) {
          ns.relaysmtp(host[i]);
          var portsOpened = 3
        }
        
        if (ns.fileExists("HTTPWorm.exe", "home")) {
          ns.httpworm(host[i]);
          var portsOpened = 4
        }

        if (ns.fileExists("SQLInject.exe", "home")) {
          ns.sqlinject(host[i]);
          var portsOpened = 5
        }
        
        if( portsOpened >= ports){
          ns.nuke(host[i]);
          ns.tprint("Nuke complete on " + host[i] + ".");
        }

        await (ns.sleep(10000))
      }
      await (ns.sleep(10000))
    }
    await (ns.sleep(10000))
  }
}
     
