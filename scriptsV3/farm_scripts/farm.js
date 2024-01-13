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
  
/** @param {NS} ns */
export async function main(ns) {
    const activeServers = []
    const activeServersLength = activeServers.length
    const fServersFound = list_servers(ns).filter(s => s.includes("fserv"));
    const fServersFoundLength = fServersFound.length

    while(true){

        for(var i = 0 ; i  < fServersFoundLength; i++){
            if(!activeServers.includes(fServersFound[i])){
                activeServers.push(fServersFound[i])
            }
        }

        for(var i = 0 ; ns.getServerMoneyAvailable("home")> 880000; i++){
            let buyServerName = `fserv${fServersFoundLength+i}`
            ns.purchaseServer(buyServerName,16)
            activeServers.push(buyServerName)
        }

        for(var i = 0 , ramUpgradeAmount = 32, price = 1720000; i  < activeServersLength && ns.getServerMoneyAvailable("home")>price && ramUpgradeAmount > 1024; i++ , ramUpgradeAmount*2, price*2){
            const activeServersRam = getServerMaxRam(activeServers[i])
            if(activeServersRam < ramUpgradeAmount){
                ns.upgradePurchasedServer(activeServers[i],ramUpgradeAmount)
            }
        }
        await ns.sleep(100)
    }
}