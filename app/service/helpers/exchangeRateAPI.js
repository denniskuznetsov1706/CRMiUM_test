
function fetchUSDExchangeRate() {
    return fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then(response => response.json())
        .then(data => {
            const usdRate = data.find(currency => currency.cc === 'USD');
            if (usdRate) {
                return usdRate.rate;
            } else {
                throw new Error('USD exchange rate not found.');
            }
        })
        .catch(error => console.error('Error fetching the API:', error));
}

