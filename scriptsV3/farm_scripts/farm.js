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
    await ns.sleep(1000)

    const fServersFound = list_servers(ns).filter(s => s.includes("fserv"));
    const fServersFoundLength = fServersFound.length
    let ramUpgradeAmount = 32
    let price = 1720000

    while(true){

            await ns.sleep(1)

        for(var i = 0 ; ns.getServerMoneyAvailable("home") > 880000 && i <= fServersFoundLength ; i++){
            let buyServerName = `fserv`
            ns.purchaseServer(buyServerName,16)
            await ns.sleep(1)
        }

        for(i = 0; i  < fServersFoundLength && ns.getServerMoneyAvailable("home") > price && ramUpgradeAmount <= 196608; i++){
            let fServersFoundRam = ns.getServerMaxRam(fServersFound[i])
            if(fServersFoundRam < ramUpgradeAmount){
                ns.upgradePurchasedServer(fServersFound[i],ramUpgradeAmount)
            }
            await ns.sleep(1)
        }
        ramUpgradeAmount = ramUpgradeAmount*2
        price = price*2
        await ns.sleep(100)
    }
}