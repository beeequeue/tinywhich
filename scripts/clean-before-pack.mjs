import { readFileSync, writeFileSync } from "node:fs"

const badFields = ["nano-staged", "simple-git-hooks", "scripts", "devDependencies"]

const pkgJson = JSON.parse(readFileSync("./package.json", "utf8"))
for (const field of badFields) {
  delete pkgJson[field]
}

writeFileSync("./package.json", `${JSON.stringify(pkgJson, null, 2)}\n`)

// README

const readmeLines = readFileSync("./README.md", "utf8").split("\n")
writeFileSync(
  "./README.md",
  readmeLines
    .splice(
      0,
      readmeLines.findIndex((line) => line.includes(" Installation")),
    )
    .join("\n"),
)
