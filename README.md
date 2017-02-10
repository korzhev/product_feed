# product_feed

### Install
`npm i`

### Run
`npm start`

or you can run server: `npm run server` 

and frontend separately: `npm run frontend`

go to [http://localhost:8000](http://localhost:8000)

### Notes
* be patient when requesting, csv files in example are huge, parsing will take a while(1-20 seconds)
* there aren't preloaders :cold_sweat: wait for alert please
* product_id response is limited to 10 items to make DOM render fast
* you can change product_id response limit at `server\api_server.js:11`
* if you having problems with running frontend from fast command: you need webpack2 + webpack-dev-server
* tested on linux with node 7.4 + npm4 and latest chrome
* server runs on port: 3000 
* webpack-dev-server proxies requests from http://localhost:8000/api to http://localhost:3000

### TODO
- [ ] it is possible to add preloader for ajax
- [ ] it is possible to add prod and dev webpack config
- [ ] it is possible to use immutable.js for redux
- [ ] it is possible to add router for express
- [ ] it is possible to add pagination for product_id
- [ ] etc.

###Task
UI:
User can add new product feeds (with fields like shopname, delimiter etc).
     - array of feed settings is saved in redux state (shopname,url)
     - new feed settings are sent to the server
     - server parses the feed with those settings and return list of ids
     - Opening concrete id shows price
User can navigate between already added feeds, see the list of products, see the price for the concrete product. 

Please store all state in Redux. Think about error handling.

NodeJS part:

- build a node.js server to parse productfeeds from shops, store the
parsed values and return them as JSON

- feeds adding from the frontend

- the server should answer to GET-requests in the form:

/?shop=$shopname&product_id=$product_id with JSON in the form {$product_id;$price}
/?shop=$shopname with JSON in the form [$product_id,....]

- data should be fetched inside the server and stored internally

- documentation how to install & run the server (e.g. README.md)

Example product feeds to fetch & parse:
- http://www.apodiscounter.de/partnerprogramme/krn.csv (shopname:
"apodiscounter")
- http://preisexporte.apobyte.de/www.eurapon.de/preissuchmaschine/preissuchmaschine.csv
(shopname: "eurapon")

example (for host "localhost" & port "9000"):
- call to http://localhost:9000?shop=europon&product_id=00000106 should
return { 00000106:7.09 }
