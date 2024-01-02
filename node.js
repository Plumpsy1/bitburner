const MoneyFormat = '$0.0a';
const TimeFormat = '00:00:00';

/** @param {import(".").NS } ns */
export async function main(ns) {

    /*
    ns.hacknet-auto.script for Bitburner v0.47.2
    Winners don't use copyright
    
    Latest version of this script should be at
        https://github.com/iuriguilherme/netscripts.d
    Bitburner should be at https://github.com/danielyxie/bitburner
    
    This script requires 5.70 GB of RAM to run for 1 thread(s)
    
    This script will buy a ns.hacknet Node, fully upgrade it and then buy the next
    one in an infinite loop. If the cost of the next upgrade is higher than 
    buying a new ns.hacknet Node, then a new one will be bought before the last one
    is upgraded. There is an option to set the budget limit.
*/

    // We will not buy anything if there's less money than this ammount
    var reserveMoney = 2000;
    // Number of times to upgrade (shouldn't have to change this)
    var n = 1;

    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    ns.tail();

    ns.print('Waiting to purchase next upgrade...');

    // Buy first ns.hacknetNode if there are none
    if (
        ns.hacknet.numNodes() === 0 &&
        ns.getServerMoneyAvailable("home") >= reserveMoney
    ) {
        ns.hacknet.purchaseNode();
        displayDashBoard(ns);
    }

    // If there are no ns.hacknet Nodes, we can't do anything, so the script ends.
    while (ns.hacknet.numNodes() > 0) {
        // If there is not enough money, we wait for it instead of ending the loop.
        while (ns.getServerMoneyAvailable("home") >= reserveMoney) {
            for (var i = 0; i < ns.hacknet.numNodes(); i++) {
                while (
                    ns.hacknet.getLevelUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeLevel(i, n)
                ) {
                    displayDashBoard(ns);
                    await ns.sleep(100);
                }
                while (
                    ns.hacknet.getRamUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeRam(i, n)
                ) {
                    displayDashBoard(ns);
                    await ns.sleep(100);
                }
                while (
                    ns.hacknet.getCoreUpgradeCost(i, n) < Infinity &&
                    ns.hacknet.upgradeCore(i, n)
                ) {
                    displayDashBoard(ns);
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

                    displayDashBoard(ns);
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

                displayDashBoard(ns);
            }
            await ns.sleep(100);
        }
        await ns.sleep(100);
    }
};

/** @param {import(".").NS } ns */
function displayDashBoard(ns) {

    ns.clearLog();
    let nodes = Array(ns.hacknet.numNodes()).fill(0);
    let maxNodes = ns.hacknet.numNodes() < 23 ? 23 : Infinity
    ns.print(`Nodes: ${nodes.length} of ${maxNodes}`);
    ns.print(`Total Production: ${nodes.length === 0 ? "$0 /s" : ns.nFormat(nodes.map((v, i) => ns.hacknet.getNodeStats(i).production).reduce((a, b) => a + b), MoneyFormat)} /s`)
    ns.print(`Total Produced: ${nodes.length === 0 ? "$0" : ns.nFormat(nodes.map((v, i) => ns.hacknet.getNodeStats(i).totalProduction).reduce((a, b) => a + b), MoneyFormat)}`)
    ns.print(table(
        ["Node", "Produced", "Uptime", "Production", "Lv", "RAM", "Cores"],
        nodes.map((v, i) => ns.hacknet.getNodeStats(i).name),
        nodes.map((v, i) => ns.nFormat(ns.hacknet.getNodeStats(i).totalProduction, MoneyFormat)),
        nodes.map((v, i) => ns.nFormat(ns.hacknet.getNodeStats(i).timeOnline, TimeFormat)),
        nodes.map((v, i) => `${ns.nFormat(ns.hacknet.getNodeStats(i).production, MoneyFormat)} /s`),
        nodes.map((v, i) => `${ns.hacknet.getNodeStats(i).level}`),
        nodes.map((v, i) => `${ns.hacknet.getNodeStats(i).ram}`),
        nodes.map((v, i) => `${ns.hacknet.getNodeStats(i).cores}`),
    ));
}

const MaxReducer = (a, b) => a > b ? a : b;

/**
 * Create a Table display of the provided data
 * @param {string[]} headers Column Headers
 * @param  {...string[]} columns Column data
 */
function table(headers, ...columns) {
    // Calculate Column Widths
    let widths = [];
    // for (let i = 0; i < columns.length; i++) {
    //     widths[i] = columns[i].concat([headers[i]]).map(s => s.length).reduce(MaxReducer);
    // }
    columns.forEach((c, i) => {
        widths[i] = c.concat([headers[i]]).map(s => s.length).reduce(MaxReducer);
    });

    let output = "\n";

    // Write Headers
    headers.forEach((h, i) => {
        output += ` ${h.padEnd(widths[i], " ")} |`;
    });

    output += "\n";

    // Write Separator
    headers.forEach((h, i) => {
        output += `${"".padEnd(widths[i] + 2, "=")}|`;
    });

    output += "\n";

    let rows = columns[0].length;
    for (let row = 0; row < rows; row++) {
        columns.forEach((c, i) => {
            if (c[row] == "-") {
                output += ` ${"".padEnd(widths[i], "-")} |`;
            } else {
                output += ` ${c[row].padEnd(widths[i], " ")} |`;
            }
        });

        output += "\n";
    }

    return output;
}
