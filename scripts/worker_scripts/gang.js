/** @param {NS} ns */
export async function main(ns) {

    while (true){
        const canRecruit =   ns.gang.canRecruitMember()
        const members = ns.gang.getMemberNames()
            
        if (canRecruit == true){
            ns.gang.recruitMember("Silly Boi" + membersLen)
            members.push("Silly Boi" + membersLen)
        }    

        await ns.sleep(10000)
    }

}
