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
      const host = list_servers(ns).filter(s => ns.hasRootAccess(s));
      const hLen = host.length;
      const hackedHosts = ["n00dles","server0","server1","server2","server3","server4","server5","server6","server7","server8","server9"]
      for (let i = 0; i < hLen; i++) {
          if (!hackedHosts.includes(host[i])) {
              ns.run("scriptsV2/r_money.js", 1, host[i])
              hackedHosts.push(host[i])
          }
      }
      await (ns.sleep(60000))
  }
}


