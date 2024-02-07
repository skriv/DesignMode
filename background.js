// Инициализация состояния для каждой вкладки
const tabStates = {};

chrome.action.onClicked.addListener((tab) => {
  // Переключаем состояние для текущей вкладки
  const currentState = tabStates[tab.id] || false;
  const newState = !currentState;

  // Сохраняем новое состояние
  tabStates[tab.id] = newState;

  // Выполняем скрипт на странице для переключения document.designMode
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: toggleDesignMode,
  });

  // Обновляем иконку в зависимости от нового состояния
  chrome.action.setIcon({
    path: newState ? "images/icon_on.png" : "images/icon_off.png",
    tabId: tab.id,
  });
});

function toggleDesignMode() {
  // Переключаем document.designMode на странице
  document.designMode = document.designMode === "on" ? "off" : "on";
}

// Очистка состояния при закрытии вкладки
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
});
