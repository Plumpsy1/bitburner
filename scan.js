/** @param {NS} ns */
export async function main(ns) {
  let infiniteLoopProtection = 9999; // In case you mess with this code, this should save you from getting stuck

  let minHackingLevel = 1;
  let maxHackingLevel = 255;

  let serversToScan = ["home"]; // Servers we know about, but have no yet scanned
  let discoveredServers = [];  // Servers we have scanned
  let hackableServers = [];   // Servers we can hack


  while (serversToScan.length > 0 && infiniteLoopProtection-- > 0) {  // Loop until the list of servers to scan is empty
    let serverName = serversToScan.pop(); // Get the next server to be scanned
    let serverHackingLevel = ns.getServerRequiredHackingLevel(serverName);

    // Scan all servers that are connected current server)
    for (let connectedServer of ns.scan(serverName)) {
      // If we haven't already scanned this servers, add it to the queue of servers to be scanned  
      if (!discoveredServers.includes(connectedServer)) serversToScan.push(connectedServer); //  
    }

    // Mark this server as scanned
    discoveredServers.push(serverName);

    if (serverHackingLevel > minHackingLevel && serverHackingLevel < maxHackingLevel) {
      let hackableServer = {};

      hackableServer.serverName = serverName;
      hackableServer.serverHackingLevel = serverHackingLevel;

      hackableServers.push(hackableServer);
    }
  }

  // Sort Hackable Servers by Hacking Level
  hackableServers.sort((a, b) => a.serverHackingLevel - b.serverHackingLevel);

  // Output Display
  for (let server of hackableServers) {
  if (!ns.hasRootAccess(server.serverName)) {
    ns.tprint("------------------------------------");
    ns.tprint("Server: " + server.serverName);
    ns.tprint("Hacking Level: " + server.serverHackingLevel);
    ns.tprint("------------------------------------");
    ns.tprint("Server: " + server.serverName);
    ns.tprint("Hacking Level: " + server.serverHackingLevel);
    ns.tprint("Root Access: NO")
    ns.tprint("------------------------------------");
    }

  }

}
