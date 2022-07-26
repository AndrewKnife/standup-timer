// import 'src/index.css' This is bad
// Refused to apply style from '' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
// File paths of standup-timer are not included if not made to web_accessible_resources

// Use <all_urls> to inject to all pages

const createModal = () => {
    const newDiv = document.createElement("div");
    const newDivInner = document.createElement("div");
    newDivInner.classList.add('timer-modal-inner')
    newDiv.classList.add('timer-modal')
    const closeButton = document.createElement("div");
    closeButton.classList.add('timer-close-button')
    closeButton.innerHTML = 'T';
    closeButton.addEventListener('click', () => {
        if(!newDiv.classList.contains('active')){
            newDiv.classList.add('active')
        }else {
            newDiv.classList.remove('active')
        }
    });
    // newDiv.innerHTML = '<object data="timer.html" >'
    newDiv.appendChild(newDivInner);
    fetch(chrome.runtime.getURL('/timer.html')).then(r => r.text()).then(html => {
        newDivInner.innerHTML = html;
        newDiv.appendChild(closeButton);
        import('/src/timer.js')
    });
    document.body.appendChild(newDiv);
}

createModal()
