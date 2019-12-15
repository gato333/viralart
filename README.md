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
6. Next we need to compile the ES7 code, run in the terminal:
	```
	npm run webpack
	```
	for debugging purposes use command ``` npm run webpack-watch ```
	which will recompile on detection of any file change.
7. Once that successfully compiles the files into something the browser can understand, in the terminal we run: ``` npm start ```
8. go to url `localhost:6660` in a web browers you'll see a home page explainging the api calls on this mini backend server



#### to run ES7 code
babel-node src_file_path

#### to compile ES7 code
babel src_file_path --out-dir es7code/

#### to save local artsy extracted json files to our local db
node data/fetchArtsyData.js 'artsy-url-collection-to-parse'

#### to save local artsy extracted json files to our local db
babel-node data/saveArtsyArtToDB.js

#### to put all artworks in db thru clarifai predict api, save results to db
babel-node data/consumeClarifaiOnArtwork.js

#### to connect matching artists and artworks already in db
babel-node data/addArtistArtworkConnection.js


## To do
- make react enviornment to house d3.js
- then we can start manipulating the charts d3.js
- host on heroku
- make db generation script data/init.js

### To do: done
- implmented compile of sass|sass to css, serving to app.js
- sort out the react app.js stuff to serve
- get webpack to run, and server.js serving correctly
- data scrap artsy, to json
- parse json and add information to our own local db
- fill in empty data holes for artists
- connect artist and artwork in local db
- pass artwork images thru clarifai api, save results to db