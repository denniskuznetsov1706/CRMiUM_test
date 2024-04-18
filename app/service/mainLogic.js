
function checkValues() {
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
                    checkValues()
                })
        });
    });


    ZOHO.embeddedApp.init();

    setInterval(() => {
        ZOHO.CRM.API.getRecord({
            Entity: "Deals", approved: "both", RecordID: currentRecordId.innerHTML
        })
            .then(function (data) {
                if (data.data[0].Currency_rate && data.data[0].Currency_rate != dealRate.value) {
                    dealRate.value = data.data[0].Currency_rate
                    checkValues()
                }
            })

    }, 3000)


}