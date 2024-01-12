/** @param {import(".").NS } ns */
export async function main(ns) {

    let reserveMoney = ns.args[0];
    let moneyAvailable =  ns.getServerMoneyAvailable("home") - reserveMoney

    var n = 1;

    ns.print('Waiting to purchase next upgrade...');

    if (
        ns.hacknet.numNodes() === 0 &&
        moneyAvailable >= ns.hacknet.purchaseNode()
    ) {
        ns.hacknet.purchaseNode();
    }

    while (ns.hacknet.numNodes() > 0) {
        // If there is not enough money, we wait for it instead of ending the loop.
        while (ns.getServerMoneyAvailable("home") >= reserveMoney) {
            for (var i = 0; i < ns.hacknet.numNodes(); i++) {
                while (
                    ns.hacknet.getLevelUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeLevel(i, n)
                ) {

                    await ns.sleep(100);
                }
                while (
                    ns.hacknet.getRamUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeRam(i, n)
                ) {

                    await ns.sleep(100);
                }
                while (
                    ns.hacknet.getCoreUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeCore(i, n)
                ) {

                    await ns.sleep(100);
                }
            } // END for (i = 0; i < ns.hacknet.numNodes(); i++)
            /*
                Buy next ns.hacknet Node if the last one is already fully upgraded.
                If for some reason the last ns.hacknet Node is fully upgraded and the
                others don't, the loop above will still attempt to upgrade them all.
            */
            if (
                ns.hacknet.getLevelUpgradeCost((ns.hacknet.numNodes() - 1), n) === Infinity &&
                ns.hacknet.getRamUpgradeCost((ns.hacknet.numNodes() - 1), n) === Infinity &&
                ns.hacknet.getCoreUpgradeCost((ns.hacknet.numNodes() - 1), n) === Infinity
            ) {
                // Only buy nodes up to 23. Past that its not really worth it.
                if (ns.hacknet.numNodes() < 23) {
                    ns.hacknet.purchaseNode();

                }
            } else if (
                /*
                Or buy the next ns.hacknet Node if the next upgrade is more expensive
                than buying a new ns.hacknet Node.
                */
                ns.hacknet.getLevelUpgradeCost((ns.hacknet.numNodes() - 1), n) > ns.hacknet.getPurchaseNodeCost() &&
                ns.hacknet.getRamUpgradeCost((ns.hacknet.numNodes() - 1), n) > ns.hacknet.getPurchaseNodeCost() &&
                ns.hacknet.getCoreUpgradeCost((ns.hacknet.numNodes() - 1), n) > ns.hacknet.getPurchaseNodeCost()
            ) {
                ns.hacknet.purchaseNode();

            }
            await ns.sleep(100);
        }
        await ns.sleep(100);
    }
};

