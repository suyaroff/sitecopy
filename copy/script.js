let myFrame,
  sourceInput,
  sourceUrlButton,
  sourceUrl,
  sourceHost,
  sourceInputHost,
  pannelHref

if (!localStorage.source_url) {
  localStorage.setItem('source_url', '')
}
sourceUrl = localStorage.source_url

if (localStorage.source_host) {
  sourceHost = localStorage.source_host
  document.cookie = 'source_host=' + sourceHost + '; path=/'
} else {
  localStorage.setItem('source_host', '')
}



function initDashboard() {
  myFrame = document.getElementById("mainFrame");
  sourceInput = document.getElementById("sourceUrl");
  sourceInputHost = document.getElementById("sourceHost");
  sourceUrlButton = document.getElementById("sourceUrlButton");
  pannelHref = document.getElementById("pannelHref");
  sourceInput.value = sourceUrl;

  if (sourceHost) {
    sourceInputHost.style.display = 'inline-block'
    sourceInputHost.value = sourceHost
  }
  // add listner to Button
  sourceUrlButton.addEventListener("click", (e) => {
    myFrame.src = sourceUrl
  });

  // add listner to input page
  sourceInput.addEventListener('change', (e) => {
    try {
      const url = new URL(e.target.value)
      sourceHost = url.protocol + '//' + url.host
      localStorage.setItem('source_host', sourceHost)
      document.cookie = 'source_host=' + sourceHost + '; path=/'
      sourceInputHost.value = sourceHost
      sourceInputHost.style.display = 'inline-block'

      sourceUrl = url.pathname
      localStorage.setItem('source_url', sourceUrl)
      sourceInput.value = sourceUrl;

    } catch (error) {
      console.log(error)
      console.log(e.target.value)
      sourceUrl = e.target.value
      localStorage.setItem('source_url', sourceUrl)
      sourceInput.value = sourceUrl;
    }
  })
}

function frameLoaded() {
  // start scan links
  let links = myFrame.contentWindow.document.getElementsByTagName("a");
  let linkSet = new Set
  let linkShowList = ''
  for (let link of links) {
    if(link.href.includes(document.location.origin)) {
      linkSet.add(link.href)
      link.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
    
  }

  for (const link of linkSet) {
    linkShowList += '<br/>' + link
  }

  pannelHref.innerHTML = linkShowList

}

window.document.addEventListener("DOMContentLoaded", (e) => {
  initDashboard();
  myFrame.addEventListener('load', () => {
    frameLoaded()
  })
});
