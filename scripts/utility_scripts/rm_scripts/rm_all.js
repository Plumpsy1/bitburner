export async function main(ns) {
  let host = "home"
  let files = ns.ls(host)
  let filesToRemove = []
  filesToRemove.push(files)
  filesToRemove = filesToRemove.filter((f) => ['js', 'ns', 'txt'])
  filesToRemove = filesToRemove.filter((f) => f.includes(ns.getScriptName()) == false)
  filesToRemove.forEach((toRm) => {
    ns.scriptKill(toRm, options.host)
    ns.tprint("All files cleared")
    ns.rm(toRm)
  })

}