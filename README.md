# How to run
`npm install`
`npm run dev`

# How to test endpoints
I recommend using WebStorm which has support for `.http` files. In the `http` directory there's a file you can use to send requests.

Otherwise you can use any HTTP client (e.g. Postman) to send relevant requests.

# Further considerations
I had to cut some corners due to lack of time. Please be aware that:

- For better scalability I would consider a scheduler with support for Web Workers like breejs.
- For real-time communication with front-end I would use WebSockets
- There could be more tests and they could check some negative cases
