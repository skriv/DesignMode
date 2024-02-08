const tabStates = {};

chrome.action.onClicked.addListener((tab) => {
    console.log('Action clicked, tab URL:', tab.url);
    
    // Ensure we're not attempting to execute on restricted pages
    if (!tab.url.startsWith('chrome://')) {
      const currentState = tabStates[tab.id] || false;
      const newState = !currentState;
      tabStates[tab.id] = newState;
  
      console.log('Toggling design mode for tab:', tab.id, 'New state:', newState);
  
      // Execute script on the page to toggle document.designMode
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: toggleDesignMode,
      }).catch(error => console.error('Failed to execute script:', error));
  
      // Update the extension icon based on the new state
      chrome.action.setIcon({
        path: newState ? "images/icon_on.png" : "images/icon_off.png",
        tabId: tab.id,
      }).catch(error => console.error('Failed to set icon:', error));
    } else {
      console.warn('Cannot execute script on chrome:// URLs');
    }
  });
  
  function toggleDesignMode() {
    document.designMode = document.designMode === "on" ? "off" : "on";
    console.log('Document designMode toggled to:', document.designMode);
  }
