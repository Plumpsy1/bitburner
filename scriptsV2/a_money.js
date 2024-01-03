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
    const target = list_servers(ns).filter(s => ns.hasRootAccess(s));
    let tLen = target.length;
    for (let i = 0; i < tLen; i++) {
      let serversMaxRam = ns.getServerMaxRam(target[i]);
      let serversCurRam = ns.getServerUsedRam(target[i])
      if ((serversMaxRam-serversCurRam)>2.4) {
        ns.run("scriptsV2/r_money.js", 1, target[i])
      }
    }
    await (ns.sleep(10000))
  }
}
