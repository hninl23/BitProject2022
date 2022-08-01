const button= document.getElementById("button1");


//get executed when the user click 'call yikes'
button.addEventListener("click", async function () {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    const name3 = document.getElementById("name3").value;
    const name4 = document.getElementById("name4").value;
    //let allows for changes later on in the code but const stays constant

    //azure url is the azure function url for twocatz
    const AZURE_URL = "https://bitproject-hnin.azurewebsites.net/api/twocatz?code=zLwuVjNWS6U9xKoWpqvY425vxwq_xgthHuC70mNouW6IAzFuTel6lg==";
    //fetch url -> request the server and load the info on the webpage (getting the information from the twocatz api and uploading it on the webpage?)
    const fetch_url = `${AZURE_URL}&name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}`;
    //string  interpolation -> evaluate a string with 1+ placeholders and replace by corresponding values ( ` `)
    //it injects js ? anything in ${} will be evaluated as js then added to a string
    // ? = start of the query string(portion of url that assign values to the parameter)
    
    const resp = await fetch(fetch_url,{
        method: "GET",
    });

    const data = await resp.json();


    document.getElementById("image1").src = "data:image/png;base64," + data.cat1;
    document.getElementById("image2").src = "data:image/png;base64," + data.cat2;
    document.getElementById("image3").src = "data:image/png;base64," + data.cat3;
    document.getElementById("image4").src = "data:image/png;base64," + data.cat4;
});
