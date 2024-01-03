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
  while(true){
	  const servers = list_servers(ns).filter(s => !ns.hasRootAccess(s));
    let sLen = servers.length;
      for (let i = 0; i < sLen; i++){
        let maxLevel = ns.getHackingLevel();
        let serverLevel = ns.getServerRequiredHackingLevel(servers[i]);
        if(serverLevel <= maxLevel) {
          ns.tprint(`${servers[i]} is ready to hack`)
        }
      }
    await(ns.sleep(60000))    
    }
}
