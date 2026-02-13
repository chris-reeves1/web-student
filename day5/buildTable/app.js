let customers = [];

// renderCustomers is a function that takes a list of customers and renders 
// them in the table body.
function renderCustomers(list){
    // list id data that looks like:
    //[
    //    {"name": "bob", "email": "bob@example.com"},
    //    {"name": "bert", "email": "bert@example.com"}
    //]
    const rows = list.map(c => `
        <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
        </tr>
    `).join("");
// map runs per c (customer) so its like a for loop.
// It makes a template string.
// c.name and c.email must match the data properties in the json file.
// c becomes { name..... email...}
// then becomes a string that looks like:
    // <tr>
    //    <td>bert</td>
     //   <td>email.com</td>
      //  </tr>
// eventually a list of stings is outputted by map function. 
// looks like:
// [
//   "/n <tr><>tdbert...</td><td>email.com</td></tr>/n",
//   "/n <tr><>tdbob...</td><td>email.com</td></tr>/n""
// ]
// .join fucntion iterates and joins each eleemet in the liost, looks like (html):
// <tr><>tdbert...</td><td>email.com</td></tr><tr><>tdbob...</td><td>email.com</td></tr>
// above string -  this is what rows is now equal to.   
    $("#customerTable").html(`
            <tr><th>Name</th><th>Email</th></tr>
            ${rows}
            `);
        } // overwrites the customtable. 
        
        
        
// $.getjson is a jqury fucntion that loads the data from the url.
// it is shorthand for $.ajax({ url: "data/customers.json", dataType: "json" }).
$.getJSON("data/customers.json")
    .done(function (data) {        
        customers = data;
        renderCustomers(customers)
        $("#statusMessage").text(`showing ${customers.length} of ${customers.length}`);  
    })
    .fail(function () {
        $("#statusMessage").text("error loading data");
    });


