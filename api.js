const CC = Components.classes;
const CI = Components.interfaces;

const sessionStore   = CC["@mozilla.org/browser/sessionstore;1"]
                         .getService(CI.nsISessionStore);
const windowMediator = CC["@mozilla.org/appshell/window-mediator;1"]
                         .getService(CI.nsIWindowMediator);

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      moresessions: {
        async forgetClosedTab(windowId, tabIndex) {
          sessionStore.forgetClosedTab(
            context.extension.windowManager.get(windowId).window, tabIndex);
        }
      }
    };
  }
}