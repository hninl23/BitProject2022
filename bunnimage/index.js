const bunnForm = document.getElementById('bunnForm');
// we are getting every attribute from this bunn function

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    //this prevents the page from reloading to keep all the input and whatever results
    console.log(payload);
    const username = document.getElementById("username").value;
    const output = document.getElementById("output");
    //referencing the output by using the output id (display user's input)
    if (username == "") {
        output.textContent = "Thanks!";
        // alert("No name error.")
        // return;

        console.log("Posting your Image...");
        const resp = await fetch(
            "https://bitproject-hnin.azurewebsites.net/api/bunnimage-upload?code=dxERkCI5r4pvYYnbTWlA6uzrPIFVYSOAfwaxgQV10GOyAzFuK1z64Q==",
        {
            method: "POST",
            headers: {
                codename: username,
            },
            body: payload,
        }
    );

    // let fileInput = document.getElementById("image");
    // const file = fileInput.files[0];

    // var payload = new FormData(bunnForm);
    // payload.append("file", file)

    // console.log(payload);
    var data = await resp.text();
    console.log(data);
    output.textContent = "Your image has been stored successfully!";
    }else {
        alert("No name error.");
    }
});
    
    //shoving things in the suitcase and it will be sent to the endpoint
    // const endpoint = "https://bitproject-hnin.azurewebsites.net/api/bunnimage-upload?code=dxERkCI5r4pvYYnbTWlA6uzrPIFVYSOAfwaxgQV10GOyAzFuK1z64Q=="
    // const options = {
    //     "method": "POST",
    //     "body": payload,
    //     headers:{
    //         "codename": username,
    //         "Content-Type": "multipart/form-data"
    //     }
    // }
    // const resp = await fetch(endpoint, options);
    // const data = await resp.text();
    // output.textContent = "Your image has been stored successfully!"
    //output.textContent = "Thanks!"
 
  // What is an event listener?
  //we are listening for submit and whenever someone submit we capture the event and do smthg
  //.value -> getting value of the text box
  const downloadButton = document.getElementById("button1") //getting button function from html
//when we click download the code fires
  downloadButton.addEventListener("click", async function(event) {
        console.log("clicked button");
    var username = document.getElementById("downloadusername").value; //values in html and store in here
    console.log("attempting to get your image...");

    const url = "https://bitproject-hnin.azurewebsites.net/api/bunnimage-download?code=MniVeFJKwVszl1bDjPdlEPsE6PRjJvO922qTZgJveoieAzFuKUAKeg=="
    const resp = await fetch(url, {
        method:"GET",
        headers:{
            username: username,
        },
    });
    const data = await resp.json(); //turn whatever we got from the api request into a json

    console.log("image has been received");
    console.log(data);

    window.open(data.dwonloadUri, "_self")
  });
  
