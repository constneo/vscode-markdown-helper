/**
 * Load extension from ESM.
 * @typedef {import("./types/global")}
 * @returns {Promise<API>} Return a promise of the extension.
 */
async function loader() {
  return {
    // activate: context => esm.activate(context)
    activate: async context => {
      if (context.extensionMode == 2) {
        let esm = await import("./src/extension.js")
        return esm.activate(context)
      } else {
        const esm = await import("./out.js")
        return esm.activate(context)
      }
    }
  }
}

module.exports = loader()
