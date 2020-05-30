# New York Times Scraper

## All The News That's Fit to Scrape

This was the third to last individual project for the University of Denver FullStack Coding Bootcamp.

This app uses Node JS through Heroku Deployment to scrape news stories and content from the New York Times US Section. Users can then make notes about articles or save those articles for later. Those notes and saved articles show up in the user's saved articles section. 

## Starting the app locally

For a local version, I recommend using Visual Studio Code. Navigate over to my GitHub repo at https://github.com/justin1732/Homework14Times , click clone, and be sure to type in the following below:
git clone
Navigate over to the terminal and open up the area around server.js in the terminal. Then type:
npm install
After all dependencies are loaded, then type:
node server.js

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.
## Starting the app remotely:

For remote viewing, my app is on Heroku at:
https://justintuckernytimesscraperapp.herokuapp.com/

## Using this application

The first thing a user will need to do is scrape the New York Times for articles. Click on the "Scrape" button and then scroll down. New articles should appear below. You can then save that article (which will move it to the saved section) or make notes on the article as you want. Finally, see your notes on saved articles by going to the "Saved" section by clicking on "Saved".

## Technologies Used

This application follows MERN deployment principles with MVP file and folder structuring. This application relies upon Node JS connected through Heroku as the setup. Handlebars through CORS renders and shows elements intercepted and scraped from the New York Times. Cheerio handles the requests from the Times and updates Mongo Mongoose to communicate with mLab MongoDB for database use in production with Express for the engine. Other dependencies include Path for assistance in routing, some JQuery and a lot of Axios for rendering, and Bootstrap, React Bootstrap, ReactStrap and some @material-ui for assistance in rendering and other elements.

## Contact Information
I am available to be contacted at justteach17@gmail.com and my website is justin1732.github.io 


