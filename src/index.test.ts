import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { after, afterEach, before, beforeEach, describe, it } from "node:test"

import { which } from "./index.ts"

const originalPath = process.env.Path ?? process.env.PATH

describe(`node_modules/.bin${path.delimiter}node_modules/tsdown`, () => {
  before(() => {
    fs.writeFileSync("node_modules/.bin/__test__", "", "utf8")

    // For testing if PATHEXT support is working
    if (process.platform === "win32") {
      fs.writeFileSync("node_modules/.bin/__test__.cmd", "", "utf8")
    }
  })

  after(() => {
    fs.rmSync("node_modules/.bin/__test__", { force: true })

    if (process.platform === "win32") {
      fs.rmSync("node_modules/.bin/__test__.cmd", { force: true })
    }
  })

  beforeEach(() => {
    process.env.Path = process.env.PATH = [
      path.resolve("node_modules/.bin"),
      path.resolve("node_modules/tsdown"),
    ].join(path.delimiter)
  })
  afterEach(() => {
    process.env.Path = process.env.PATH = originalPath
  })

  const existingFiles = [
    "tsdown",
    "tsdown.cmd",
    "tsdown.CMD",
    "tsdown.ps1",
    "eslint",
    "README.md",
    "esm-shims.js",
    "__test__",
  ]
  for (const fileName of existingFiles) {
    it(`finds ${fileName}`, () => {
      assert.strict.notEqual(which(fileName), null)
    })
  }

  const nonExistingFiles = ["non-existing-file", "rollup", "rollup.cmd"]
  for (const fileName of nonExistingFiles) {
    it(`does not find ${fileName}`, () => {
      assert.strict.equal(which(fileName), null)
    })
  }
})
