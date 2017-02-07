const CC = Components.classes;
const CI = Components.interfaces;

const sessionStore   = CC["@mozilla.org/browser/sessionstore;1"]
                         .getService(CI.nsISessionStore);

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      moresessions: {
        async forgetClosedTab(windowId,sessionId) {
          let aWindow = context.extension.windowManager.get(windowId).window;
          let closedTabData = JSON.parse(sessionStore.getClosedTabData(aWindow));

          let closedTabIndex = closedTabData.findIndex( (aClosedTab) => { 
            return aClosedTab.closedId == parseInt(sessionId)
          });

          sessionStore.forgetClosedTab(aWindow, closedTabIndex);
        }
      }
    };
  }
}