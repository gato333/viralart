# ViralArt
a Node.JS/React/Redux app that represents art in a 3d graphical interface (d3.js), showing relationships between art programatically. Posed as an alternantive way to view and navigate art that is currently utilized by social media platforms (tumblr, instgram, pintrest) and art catalogus (artsy.net, wikiart.org)

# How to Run
1. Pull down repo from Github
2. in the terminal run:
	```
	npm install
	```

	to download all the dependencies
3. copy emailed creds.json into root directory
4. makes sure postgres is installed locally and that it is running
5. in the terminal run:  (need to implement command)
	```
	node data/init.js
	```
	to spin up local postgres database and tables for this app
6. Next we need to compile the ES7 code, copy the public folder into the build folder and run the compiled server. All these commandas can be executed with, in the terminal:
	```
	npm run start
	```
	for debugging purposes run the command ``` npm run watch ```
	in another terminal window, this will recompile on detection of any file change.
8. go to url `localhost:6660` in a web browers you'll see a home page explainging the api calls on this mini backend server


#### to push local db to heroku dbe
heroku pg:push LOCAL_DB_NAME DATABASE_URL --app viralart

#### to convert artsy json files to db artist, artworks and relations
babel-node data/init.js

#### to run ES7 code
babel-node src_file_path

#### to compile ES7 code
babel src_file_path --out-dir es7code/

#### to save local artsy extracted json files to our local db
node data/downloadArtsyData.js 'artsy-url-collection-to-parse'

#### to put all artworks in db thru clarifai predict api, save results to db
babel-node data/analyzeAllArtwork.js

#### to connect matching artists and artworks already in db
babel-node data/addRelationsToExisting.js


## To do
- transition to 3d obj mapping from the 2d tests
- transition away from mapping to a sphere surface to more node like data mapping

### To do: done
- perfect color map incorporating satruation aswell as lightness for mapping, we are doing only hue and lightness right now
- fix wrapping of color map 
- update clarifai script to favor brighter coloers that arnt white or black
- color test, to change clarifai script
- debugged server side rendering messing with html ( need to pass url to server side router )
- implement color change on hover for tool tip 
- implement tool tip
- test out flat color mapping 
- implement the orbital controls
- implemented color gradiant for rainbow spectrum
- created Three.js/React tooltip for active artwork display
- test our sphere in space, with mouse related rotation
- make db generation script data/init.js
- fix deployment to heroku, its throwing some errors that we were seeing locally when we were getting stuck with webpack 
- make 3d sphere, and mouse actions for moving it 
- fill out object for data manipulation, circular redux objs
- import three.js instead of d3
- create initial store obj and pass it down to client (server-side rendering)
- import d3, specifically to work with react
- host on heroku
- implmented compile of sass|sass to css, serving to app.js
- sort out the react app.js stuff to serve
- get webpack to run, and server.js serving correctly
- data scrap artsy, to json
- parse json and add information to our own local db
- fill in empty data holes for artists
- connect artist and artwork in local db
- pass artwork images thru clarifai api, save results to db