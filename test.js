const { NodeAuth, Type} = require('./index')

let client = new NodeAuth(
    Type().DISCORD,
    "698198797703970827",
    "SNQBlIDjOSdwy1l3iWt7MTAp7KspmjVF",
    "http://localhost:8080/callback/discord",
    ["email"]
);
client.getAccessToken("72b5398902b2d6eb79ad").then((e)=>{
    //console.log(e)
})
client.getUser("H9I1KsyID8kroWYm9jT9rG8CyhORb2").then((e)=>{
    console.log(e)
})