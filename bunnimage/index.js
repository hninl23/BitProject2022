const bunnForm = document.getElementById('bunnForm');
// we are getting every attribute from this bunn function

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault()
    //this prevents the page from reloading to keep all the input and whatever results
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    //referencing the output by using the output id (display user's input)
    output.textContent = username + "❤"
  });
  // What is an event listener?
  //we are listening for submit and whenever someone submit we capture the event and do smthg
  //.value -> getting value of the text box