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
      ns.tprint("constant loop")
      const host = list_servers(ns).filter(s => ns.hasRootAccess(s));
      const hLen = host.length;
      const hackedHosts = ["n00dles"]
      ns.tprint(host)
      for (let i = 0; i < hLen; i++) {
          if (!hackedHosts.includes(host[i])) {
              ns.tprint(`found new hack ${host[i]} and pushing the array`)
              ns.run("scriptsV2/r_money.js", 1, host[i])
              hackedHosts.push(host[i])
          }

      }
      ns.tprint(`these are all the values in the array ${hackedHosts}`)
      await (ns.sleep(1000000))
  }
}


