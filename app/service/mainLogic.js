
function checkValues() {
    console.log('check values')
    let nbuRate = parseFloat(document.querySelector("#nbuRate").value);
    let dealRate = parseFloat(document.querySelector("#dealRate").value);
    if (!isNaN(nbuRate) && !isNaN(dealRate)) {
        var difference = Math.abs((((nbuRate - dealRate) / dealRate) * 100).toFixed(1));
        document.querySelector("#rateDifference").value = difference;

        if (Math.abs(difference) >= 5) {
            document.querySelector("#updateButton").style.display = 'block';
        } else {
            document.querySelector("#updateButton").style.display = 'none';
        }
    }
}
function calculateRateDifference() {
    console.log('run this')
    document.querySelectorAll("#nbuRate, #dealRate").forEach(input => {
        input.addEventListener("input", checkValues);
    });
}


window.onload = function () {
    let nbuRate = document.getElementById('nbuRate')
    let dealRate = document.getElementById('dealRate')
    let currentRecordId = document.getElementById('currentRecordId')


    fetchUSDExchangeRate().then(rate => {


        nbuRate.value = rate.toFixed(2)
        console.log(`The current USD exchange rate is: ${rate}`);
    });

    ZOHO.embeddedApp.on("PageLoad", function (data) {
        ZOHO.CRM.API.getRecord({
            Entity: data.Entity,
            RecordID: data.EntityId,
        }).then(function (response) {
            let recordId = response.data[0].id;
            currentRecordId.innerHTML = recordId;
            console.log("Current Record ID: ", recordId);
            ZOHO.CRM.API.getRecord({
                Entity: "Deals", approved: "both", RecordID: recordId
            })
                .then(function (data) {
                    console.log(data)
                    dealRate.value = data.data[0].Currency_rate
                    calculateRateDifference()
                    checkValues()
                })
        });
    });
    ZOHO.embeddedApp.init();



}