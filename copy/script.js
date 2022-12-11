let myFrame, sourceInput, sourceUrlButton

if (!localStorage.source_url) {
  localStorage.setItem('source_url', '')
}

let sourceUrl = localStorage.source_url

function initDashboard() {
  myFrame = document.getElementById("mainFrame");
  sourceInput = document.getElementById("sourceUrl");
  sourceUrlButton = document.getElementById("sourceUrlButton");
  sourceInput.value = sourceUrl;

  sourceUrlButton.addEventListener("click", (e) => {
    localStorage.setItem('source_url', sourceInput.value)
  });

}


window.document.addEventListener("DOMContentLoaded", (e) => {
  initDashboard();
});
