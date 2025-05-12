import { readFileSync, writeFileSync } from "node:fs"

const badFields = ["nano-staged", "simple-git-hooks", "scripts", "devDependencies"]

const pkgJson = JSON.parse(readFileSync("./package.json", "utf8"))
for (const field of badFields) {
  delete pkgJson[field]
}

writeFileSync("./package.json", `${JSON.stringify(pkgJson, null, 2)}\n`)
