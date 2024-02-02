var _ns;
export async function main(ns) {
	var seenList = [];
	_ns = ns;
	ScanServer("home", seenList, 0, "");
}

function ScanServer(serverName, seenList, indent, prefix) {
	if (seenList.includes(serverName)) return;
	seenList.push(serverName);
	
	var serverList = _ns.scan(serverName);
	serverList = serverList.filter(function (item) { return seenList.indexOf(item) === -1; });
	serverList = serverList.sort(ChildCountCompare);

	for (var i = 0; i < serverList.length; i++) {
		var newServer = serverList[i];
		if (seenList.includes(newServer)) continue;
		if (i != serverList.length - 1) {
			PrintServerInfo(newServer, indent, prefix + "├─")
			ScanServer(newServer, seenList, indent + 1, prefix + "│    ");
		}
		else {
			PrintServerInfo(newServer, indent, prefix + "└─")
			ScanServer(newServer, seenList, indent + 1, prefix + "     ");
		}
	}
}

function ChildCountCompare(a, b) {
	var ax = ChildCount(a);
	var bx = ChildCount(b);
	return ChildCount(a) > ChildCount(b) ? 1 : -1;
}

function ChildCount(serverName) {
	var count = 0;
	var serverList = _ns.scan(serverName);
	for (var i = 1; i < serverList.length; i++) {
		count += ChildCount(serverList[i]) + 1;
	}
	return count;
}

function PrintServerInfo(serverName, indent, prefix) {
	var indentString = prefix;
	var hacked = (_ns.hasRootAccess(serverName)) ? "██" : "[]";
	var serverHackingLevel = _ns.getServerRequiredHackingLevel(serverName);
	var canHackIndicator = "";
	if (_ns.getHackingLevel() >= serverHackingLevel && !_ns.hasRootAccess(serverName))
		canHackIndicator = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
	_ns.tprint(indentString + hacked + serverName + " (" + serverHackingLevel + ")" + canHackIndicator);
}