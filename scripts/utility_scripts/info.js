export async function main(ns) {
    var weeakenThreads = 0
    var growThreads = 0
    var hackThreads = 0
    ns.disableLog('ALL');
    ns.tail();
    while(true){
        if (ns.peek(2) != "NULL PORT DATA"){
            while (ns.peek(2) != "NULL PORT DATA"){
                weeakenThreads = weeakenThreads + ns.readPort(2)
            }
        }


        if (ns.peek(3) != "NULL PORT DATA"){
            while (ns.peek(3) != "NULL PORT DATA"){
                growThreads = growThreads + ns.readPort(3)
            }
        }    


        if (ns.peek(4) != "NULL PORT DATA"){
            while (ns.peek(4) != "NULL PORT DATA"){
                hackThreads = hackThreads + ns.readPort(4)
            }
        }

        const karma =  ns.heart.break();

        ns.clearLog();
        ns.print('Current Karma : ',karma);
        ns.print('Current hack threads : ',hackThreads);
        ns.print('Current grow threads : ',growThreads);
        ns.print('Current weaken threads : ',weeakenThreads);
        await ns.sleep(250);
    }
}