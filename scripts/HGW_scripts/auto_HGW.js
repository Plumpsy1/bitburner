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
      await ns.sleep(10000)
      const host = list_servers(ns).filter(s => ns.hasRootAccess(s));
      const hLen = host.length;
      const hackedHosts = []
      for (let i = 0; i < hLen; i++) {
          if (!hackedHosts.includes(host[i])) {
            if (!ns.scriptRunning("scripts/HGW_scripts/HGW.js",host[i])){
              ns.scp("scripts/HGW_scripts/grow.js", host[i]);
              ns.scp("scripts/HGW_scripts/hack.js", host[i]);
              ns.scp("scripts/HGW_scripts/weaken.js", host[i]);
              ns.scp("scripts/HGW_scripts/HGW.js", host[i]);
        
              ns.exec("scripts/HGW_scripts/HGW.js",host[i]);
              hackedHosts.push(host[i])
            }
          }
      }
      await (ns.sleep(60000))
  }
}


