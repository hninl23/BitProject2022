const bunnForm = document.getElementById('bunnForm');
// we are getting every attribute from this bunn function

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    //this prevents the page from reloading to keep all the input and whatever results
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    //referencing the output by using the output id (display user's input)
    if (username == "") {
        alert("No name error.")
        return;
    }

    let fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    var payload = new FormData(bunnForm);
    payload.append("file", file)

    console.log(payload);
    //shoving things in the suitcase and it will be sent to the endpoint
    const endpoint = "https://bitproject-hnin.azurewebsites.net/api/bunnimage-upload?code=dxERkCI5r4pvYYnbTWlA6uzrPIFVYSOAfwaxgQV10GOyAzFuK1z64Q=="
    const options = {
        "method": "POST",
        "body": payload,
        headers:{
            "codename": username,
            "Content-Type": "multipart/form-data"
        }
    }
    const resp = await fetch(endpoint, options);
    const data = await resp.text();
    output.textContent = "Your image has been stored successfully!"
    //output.textContent = "Thanks!"
  });
  // What is an event listener?
  //we are listening for submit and whenever someone submit we capture the event and do smthg
  //.value -> getting value of the text box
