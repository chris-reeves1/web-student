$.getJSON("data/customers.json")
    .done(function (data) {
        console.log("loaded data", data);
        $("#statusMessage").text(`loaded ${data.length} customers`);  
    })
    .fail(function () {
        $("#statusMessage").text("error loading data");
    });
