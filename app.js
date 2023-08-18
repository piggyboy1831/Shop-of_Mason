
const API_ENDPOINT = "https://paper-api.alpaca.markets";
const HEADERS = {
    'APCA-API-KEY-ID': '',
    'APCA-API-SECRET-KEY': '',
    'Content-Type': 'application/json'
};

function getAccountDetails() {
    HEADERS['APCA-API-KEY-ID'] = document.getElementById('apiKey').value;
    HEADERS['APCA-API-SECRET-KEY'] = document.getElementById('secretKey').value;

    fetch(`${API_ENDPOINT}/v2/account`, {
        method: 'GET',
        headers: HEADERS
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('netWorth').innerText = data.equity;
        getOwnedStocks();
    })
    .catch(error => {
        console.error("Error fetching account details:", error);
    });
}

function getOwnedStocks() {
    fetch(`${API_ENDPOINT}/v2/positions`, {
        method: 'GET',
        headers: HEADERS
    })
    .then(response => response.json())
    .then(data => {
        const stocksList = document.getElementById('ownedStocksList');
        stocksList.innerHTML = '';
        data.forEach(position => {
            const listItem = document.createElement('li');
            listItem.innerText = `${position.symbol}: ${position.qty} shares`;
            stocksList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching owned stocks:", error);
    });
}

function buyStock() {
    const symbol = document.getElementById('stockSymbol').value;
    const qty = document.getElementById('stockQuantity').value;

    fetch(`${API_ENDPOINT}/v2/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            symbol: symbol,
            qty: qty,
            side: 'buy',
            type: 'market',
            time_in_force: 'gtc'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Stock purchase successful!');
        getAccountDetails();
        getOwnedStocks();
    })
    .catch(error => {
        console.error("Error buying stock:", error);
        alert('Failed to purchase stock.');
    });
}

function sellStock() {
    const symbol = document.getElementById('stockSymbol').value;
    const qty = document.getElementById('stockQuantity').value;

    fetch(`${API_ENDPOINT}/v2/orders`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            symbol: symbol,
            qty: qty,
            side: 'sell',
            type: 'market',
            time_in_force: 'gtc'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Stock sale successful!');
        getAccountDetails();
        getOwnedStocks();
    })
    .catch(error => {
        console.error("Error selling stock:", error);
        alert('Failed to sell stock.');
    });
}
