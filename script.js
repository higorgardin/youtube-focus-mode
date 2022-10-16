function handleSettings() {
  chrome.storage.sync.get(["isEnabled"], function (result) {
    if (Boolean(result.isEnabled)) {
      document.getElementById("enableDisable").checked = true;
    } else {
      document.getElementById("enableDisable").checked = false;
    }
  });
}

function addListeners() {
  if (document && document.getElementById("enableDisable")) {
    document
      .getElementById("enableDisable")
      .addEventListener("change", (event) => {
        const isChecked = document.getElementById("enableDisable").checked;
        chrome.storage.sync.set({ isEnabled: isChecked }, function () {});
      });
  }
}

addListeners();
handleSettings();
