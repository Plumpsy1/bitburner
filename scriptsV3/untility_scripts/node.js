/** @param {NS} ns **/
export async function main(ns) {


    while(true){
        for (var i = 0; i < ns.Hacknet.numNodes() && i < 19;i++) {

            if(ns.getServerMoneyAvailable("home") >= (ns.hacknet.getPurchaseNodeCost(i+1, 1)) ){
                ns.hacknet.purchaseNode(i+1, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getLevelUpgradeCost(i, 1)) ){
                ns.hacknet.upgradeLevel(i, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getRamUpgradeCost(i, 1)) ){
                ns.hacknet.upgradeRam(i, 1)
            }
            if( ns.getServerMoneyAvailable("home") >= (ns.hacknet.getCoreUpgradeCost(i, 1)) ){
                ns.hacknet.upgradeCore(i, 1)
            }
            await ns.sleep(100)
        }
    }
}