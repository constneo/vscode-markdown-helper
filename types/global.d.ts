import * as vscode from "vscode"

declare global {
  interface API {
    /**
     * Activates this extension and returns its public API.
     * @callback
     * @returns A promise that will resolve when this extension has been activated. {@link Extension.activate}.
     */
    activate: (context: vscode.ExtensionContext) => void

    // deactivate: () => void
  }

  interface Configuration {
    enable: boolean
    welcome: boolean
    templates: string
    tags: Array<string>
  }
}
