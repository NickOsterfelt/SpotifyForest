# SpotifyForest

SpotifyForest is the second Capstone Project made for my Springboard Software Engineering course.

This project was created for my Springboard Software Developement Career Track course, serving as my second and final Capstone Project.

The goal of Spotify Forest is to create a social network where users can easily join groups to view other user's top listened to tracks and artists. Today, using apps such as Spotify and Apple Music has made it so easy to find new music that the community aspect of sharing songs between one another has been greatly lost. Hopefully through Spotify Forest, this hugely important part of music will be restored.

## The Frontend
#### Major Requirements
- Node.js (with npm)
- React with Create React app
- Axios
- react-bootstrap
- react-router
- Bootstrap
- fontawesome
- (complete list is in package.json)

#### To run the frontend:
 - Create or ensure that you have a Spotify Account.
 - In the frontend folder:
  - Install dependancies
  	- `npm i` (should take a long time)
  - Compile the project and start the frontend server
 	 - `npm start`
  - if you have not done so, setup and start the backend server
 	 - (instructions found below)

### User flow:
1. User logs in through spotify portal.
2. User is displayed their profile in left sidebar, current groups they are a part of in the middle section, and other user profile on left side bar
3. User can join groups based on searching by group name, groups that have matching artists, and groups that have matching tracks.
(pictures coming soon...)


## The Backend
#### Major Requirements
- Node.js (with npm)
- Express.js
- Postgresql installed
- Spotify Developer account and Application keys
- (complete list is in package.json)

#### To run the app:
 - In the backend folder: 
 - Install dependancies
 	  - `npm i` (this will take a long time)
 - Get spotify application credentials
    - Create a spotify developer account [here](https://developer.spotify.com/).
    - Create a new application in the Spotify Developer Dashboard
 - Rename example_config.js to config.js and change variables to match your Spotify Application credentials.
 - Create a new Postgresql database 
    - `createdb music`
 - Setup database postgres and seed sample data
    - `psql music < tables.sql`
    - `psql music < seed.sql` 
 - Start the backend server
    - `npm start`
 - If you have not done so already, follow instructions to get the frontend server up and running
 	  - (instructions found avove)

#### Database Schema Design:

![schema](https://github.com/NickOsterfelt/SpotifyForest-backend/blob/master/db.JPG?raw=true)
--created with db designer.net

