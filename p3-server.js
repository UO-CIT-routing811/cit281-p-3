// Project 3
// Teresa Tseng

const { coinCount } = require("./p3-module");
const fs = require("fs");
const fastify = require("fastify")();
const { get } = require("http");

// Part 8
fastify.get('/', function (request, reply) {
    console.log("home handler")

    fs.readFile(__dirname + "/index.html", "utf8", function(err, contents){
        if (err) {
            console.log(err)
            reply
            .code(500)
            .send(err);
        }
        else {
            console.log("sending")
            reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(contents);
        }
    })
});

fastify.get("/value", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>");
});


// Part 9
fastify.get('/coin', (request, reply) => {
    const { denom = 0, count = 0 } = request.query;
    const coinValue = coinCount({
        denom: parseInt(denom),
        count: parseInt(count)});   
   let reponse = request.params;
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

// Part 10

fastify.get('/coins', (request, reply) => {
    
    let coinValue = 0;
    const coins = [
        {denom: 25, count: 2},
        {denom: 1, count: 7},
    ];
    const { option } = request.query;
    switch (option) {
         case "1": coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
         case "2": coinValue = coinCount(...coins);
            break;
         case "3": coinValue = coinCount(coins);
            break;
        default:
            return 0;    
 }
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

