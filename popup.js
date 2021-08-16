// popup.js

// redirect link
const REDIRECT_URL = 'https://trk.gcryptex.xyz/f1T14B';

// get response data from local storage
const getData = () => {
    return new Promise(resolve => {
        chrome.storage.local.get(res => resolve(res.file))
    })
}

// add cards elements to popup page
const addElements = () => {
    getData().then(result => {
        const gamesInfo = parseData(result);

        const cardsContainerElement = document.getElementById('container');
        const fullContent = gamesInfo.map((item) => createCardFunction(item));

        cardsContainerElement.append(...fullContent)
    });
}
addElements ();

// parse initial data to array
const parseData = (data) => {
    if(data) {
        const gamesInfo = [];
        const splited = data.split('\r\n');
    
        if(splited.length) {
            splited.forEach(el => {
                const parsedData = el.split('_');

                if(parsedData.length == 3) {
                    const game = parsedData[0].split(':').pop().trim();
                    const teams = parsedData[1].split(':').pop().trim().split('-');
                    const gameDate = parsedData[2].split(':').pop().trim();
                    
                    const temp = {
                        game,
                        teams,
                        gameDate
                    }
    
                    gamesInfo.push(temp);
                } else {
                    console.log('Unexpected data lenght or format.')
                }
    
            });

            return gamesInfo;
        }
    } else {
        console.log('Unexpected input data.')
    }
}

// creates a card from input array of elements
const createCardFunction = (item) => {
    const card = document.createElement('div');
    const cardContent = createCardContent(item);

    card.innerHTML += cardContent;
    card.classList = 'card';
    card.addEventListener("click", redirect);

    return card;
}

// creates content for card element
const createCardContent = (item) => {
    return `
        <h2 class="title">${item.game}</h2>
        <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar"></div>
        </div>
        <h2 class="teams">${item.teams[0]} - ${item.teams[1]}</h2>
        <h2 class="date">${item.gameDate}</h2>
        <div class="circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="stroke" cx="60" cy="60" r="50"/>
            </svg>
        </div>
    `;
}

// redirect logic
const redirect = () => {
    window.open(REDIRECT_URL, '_blank');
}