
function updateZohoRecord() {

    let nbuRate = document.getElementById('nbuRate')
    let currentRecordId = document.getElementById('currentRecordId')

    console.log('currentRecordId', currentRecordId.innerHTML)

    ZOHO.CRM.API.updateRecord({
        Entity: "Deals",
        APIData: {
            "id": currentRecordId.innerHTML,
            "Currency_rate": nbuRate.value,
        },
        Trigger: ["workflow"]
    })
        .then(function (data) {
            console.log('updated->', data)
        })

}