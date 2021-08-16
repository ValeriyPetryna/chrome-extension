// background.js

// link to the input data
const DATA_URL = 'https://firebasestorage.googleapis.com/v0/b/extension-betting.appspot.com/o/strings.txt?alt=media&token=fafd9feb-5077-4bae-b24b-96d9c8f74396';

function validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
}

async function getFile() {
    const headers = new Headers();
    // Set the HTTP Authorization header
    headers.append('Access-Control-Allow-Origin', `*`);

    const options = {
        headers,
        method: 'GET'
    }

    let response = await fetch(DATA_URL, options).then(response => response.text()).then(data => data);

    return response;
}

async function updateInfo() {
    try {
        const file = await getFile();
        chrome.storage.local.set({ file: file });
    } catch (err) {
        console.log(err);
    }
}

chrome.runtime.onInstalled.addListener(updateInfo);