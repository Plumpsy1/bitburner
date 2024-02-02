/** @param {NS} ns */
export async function main(ns) {
    ns.clearPort(2)
    ns.writePort(2, "train")
    while (true){
        const canRecruit =   ns.gang.canRecruitMember()
        const members = ns.gang.getMemberNames()
        const membersLen = members.length()

            
        while (canRecruit == true){
            ns.gang.recruitMember("Silly Boi" + number)
            members.push("Silly Boi" + number)
        }    

        
        

    }

}