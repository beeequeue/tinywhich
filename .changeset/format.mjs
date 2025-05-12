import baseFunctions from "@changesets/changelog-github"

const mdLinkRegex = /\[(.+?)]\(.+?\)/g

export default {
  getDependencyReleaseLine: baseFunctions.getDependencyReleaseLine,
  getReleaseLine: async (...options) => {
    const line = await baseFunctions.getReleaseLine(...options)

    return line.replaceAll(mdLinkRegex, "$1")
  },
}
