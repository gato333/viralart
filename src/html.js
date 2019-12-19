export default function renderHTMLwithInject(html, preloadedState) {
  return `
  <!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>ViralArt - Home</title>
	  <link rel="stylesheet" href="/styles.css">
	  <script src="https://d3js.org/d3.v5.min.js"></script>
	</head>
	<body>
	  <div id="root">${html}</div>
	  <script>
	    // WARNING: See the following for security issues around embedding JSON in HTML:
	    // http://redux.js.org/recipes/ServerRendering.html#security-considerations
	    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
	        /</g,
	        '\\u003c'
	    )}
	  </script>
	  <script src="/main.js"></script>
	</body>
	</html>
 `
}