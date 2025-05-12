import { barplot, bench, run, summary } from "mitata"
import { which as tinywhich } from "tinywhich"
// @ts-expect-error: missing types
import nodewhich from "which"

barplot(() => {
  summary(() => {
    const str = "node"

    bench("tinywhich", function* () {
      yield {
        0(): string {
          return str
        },

        bench(str: string) {
          tinywhich(str)
        },
      }
    }).gc("once")

    bench("which", function* () {
      yield {
        0(): string {
          return str
        },

        bench(str: string) {
          nodewhich.sync(str)
        },
      }
    }).gc("once")

    bench("which (async)", function* () {
      yield {
        0(): string {
          return str
        },

        async bench(str: string) {
          await nodewhich(str)
        },
      }
    }).gc("once")
  })
})

await run()
process.exit(0)
