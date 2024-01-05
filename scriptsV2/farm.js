/** @param {NS} ns */
export async function main(ns) {
    
    while(true){

        const serverActive = [];
        const servers100 = ["server0","server1","server2","server3","server4","server5","server6","server7","server8","server9"];
        const servers200 = [];

        const sALen = serverActive.length;
        const s100Len = serverActive.length;
        const s200Len = serverActive.length;

        const hackingLevel = ns.getHackingLevel();
        const playerMoney = ns.getServerMoneyAvailable("home");

        if(hackingLevel > 100){
            for (let i = 0; i < s100Len; i++){
                if(!ns.serverExists(servers100[i])){
                    ns.purchaseServer(servers100[i],16)
                    ns.run("scriptsV2/fr_money.js",1,servers100[i], "phantasy")
                }
                else if (ns.serverExists(servers100[i]), !serverActive.includes(servers100[i])){
                    serverActive.push(servers100[i])
                    ns.tprint(`Made new server and made/recorded ${servers100[i]}`)
                }
            }
        }
        await ns.sleep(10000)
    }
}