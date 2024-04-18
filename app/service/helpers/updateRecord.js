
function updateZohoRecord() {

    let nbuRate = document.getElementById('nbuRate')
    let currentRecordId = document.getElementById('currentRecordId')
    let updateButton = document.getElementById('updateButton')
    let notification = document.getElementById('notification');

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

            updateButton.style.display = 'none'
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.add('hide');
                setTimeout(function () {
                    notification.classList.remove('show', 'hide');
                }, 600);
            }, 3000);

        })

}