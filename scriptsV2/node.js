/** @param {NS} ns **/
export async function main(ns) {
    let saveAmount = 0

    while(true){
        for (var i = 0; i < ns.hacknet.numNodes() && i < 19;i++) {

            if(ns.getServerMoneyAvailable("home") >= (ns.hacknet.getPurchaseNodeCost(i+1, 1)+saveAmount) ){
                ns.hacknet.purchaseNode(i+1, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getLevelUpgradeCost(i, 1)+saveAmount) ){
                ns.hacknet.upgradeLevel(i, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getRamUpgradeCost(i, 1)+saveAmount) ){
                ns.hacknet.upgradeRam(i, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getCoreUpgradeCost(i, 1)+saveAmount) ){
                ns.hacknet.upgradeCore(i, 1)
            }
            await ns.sleep(100)
        }
    }
}
