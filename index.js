const Platform = require('./enums/AuthType').AuthType
const auth = require("./utils/AuthUtil");

class NodeAuth{
    constructor(type, clientID, clientSecret, redirect_uri, scope) {
        this.type = type;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.redirect_uri = redirect_uri;
        this.scope = scope;
    }
    getLoginURL(){
        return auth.loginURL(this.type, this.clientID, this.redirect_uri, this.scope);
    }
    getAccessToken(code){
        return auth.getTokens(this.type, this.clientID, this.clientSecret, this.redirect_uri, this.scope, code)
    }
    getUser(token, tokenID=null){
        return auth.getUser(this.type, token, tokenID)
    }
}
function Type(){
    return AuthType;
}
module.exports = { NodeAuth, Platform }