# Technologies
Description:
A weather app that sends reminders every morning through text so you don’t have to go in the weather app to check every morning. I will use the OpenWeather API, the Twilio API, and a few Azure Function (Time Trigger, HTTP trigger?) to do so. Now, you will never miss a rainy day!


### Azure Services
Time Trigger function
  -I am thinking of using the time trigger function to let the user set a specific timer that they want their    notification (preferably earlier before they even wake up so the notification will be there as they wake up)


### APIs

GoogleMap API
  -Might use this API to get the current location of the user in order to accurately display the weather condition depending on where they live.
Twilio API
  -I am using twilio to send users reminder at a set time so they don’t have to ever forget the umbrella when it is expected to rain
OpenWeatherMap API
  -I am going to scrape the daily weather conditions and transfer those data to the twilio app so the user will receive a daily text reminder early in the morning with weather for that specific day 
  -This API allows to call for a city name which the user can set up beforehand and also allows to return a  description of the day so we can get a reminder with that returns daily weather condition with a quick and easy to read description
  -There is also a “main” description that describes the day’s general weather condition
  -Through this API you can even set triggers to get the reminder  set triggers to track weather conditions

### Packages/Libraries/Databases
Node Fetch
  -Since we will be receiving information from the weather API, we need node fetch to get the data from the API and translate into something that twilio can use
Node-Cron
  -https://www.twilio.com/docs/sms/tutorials/appointment-reminders-node-express?code-sample=code-create-a-new-appointment&code-language=Node.js&code-sdk-version=default
  -Twilio function to also to check if there are appointments coming up to send out reminder (but most likely will sue azure time trigger function)
HTTP trigger (Azure)
Time Trigger (Azure)
  -https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-scheduled-function
  -To allow for user to set a certain remainder (every 24 hours) they will get a reminder
Querystring npm package
  -We are using the query npm package to parse through the data that we are receiving 


### Front-end Languages

Twilio
  -To connect with the user through text
HTML, Java
  -HTML will help my project have w website for it to run 
  -I want to have an interface for the user to go on and have their mood analyzed to return a song (I am not sure   if I will need a web page since it is going to be a text reminder)
Java Script
  -Since my website might have option of choosing buttons, I want to use JS to bring buttons in the HTML website alive 


### Flowchart
![Figma Screenshot](https://user-images.githubusercontent.com/100245412/182463437-fe13bf86-c6a7-41c9-a6ab-81b6f98e2d22.png)


