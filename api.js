const CC = Components.classes;
const CI = Components.interfaces;

const sessionStore   = CC["@mozilla.org/browser/sessionstore;1"]
                         .getService(CI.nsISessionStore);

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      moresessions: {
        /**
         * Attempts to forget a recently closed tab, identified by `sessionId`
         * from the given window.
         *
         * @param {Integer} windowId The identifier of the window to which the
         *                  tab to be forgotten belongs.
         * @param {Integer} sessionId The sessionId (closedId) of the tab to be
         *                  forgotten.
         */
        async forgetClosedTab(windowId,sessionId) {
          let aWindow = context.extension.windowManager.get(windowId).window;
          let closedTabData = JSON.parse(sessionStore.getClosedTabData(aWindow));

          let closedTabIndex = closedTabData.findIndex( (aClosedTab) => { 
            return aClosedTab.closedId == parseInt(sessionId)
          });

          sessionStore.forgetClosedTab(aWindow, closedTabIndex);
        },

        /**
         * Attempts to forget a recently closed window.
         *
         * @param {Integer} sessionId The sessionId (closedId) of the window to
         *                  be forgotten.
         */
        async forgetClosedWindow(sessionId) {
          let closedWindowData = JSON.parse(sessionStore.getClosedWindowData());

          let closedWindowIndex = closedWindowData.findIndex( (aClosedWindow) => { 
            return aClosedWindow.closedId == parseInt(sessionId)
          });

          sessionStore.forgetClosedWindow(closedWindowIndex);
        }
      }
    };
  }
}