const Platform = require('../enums/Platform').Platform
const axios = require('axios');
const qs = require('qs')
const cfg = require('./urls');

exports.loginURL=(type, clientID, redirect_uri, scope)=>{
    switch (type){
        case Platform.DISCORD:
            return `${cfg.DISCORD_LOGIN}?client_id=${clientID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope.join(" ")}`;
        case Platform.GOOGLE:
            let options = { redirect_uri: redirect_uri, client_id: clientID, access_type: 'offline', response_type: 'code', prompt: 'consent', scope: scope.join(" ") }
            return `${cfg.GOOGLE_LOGIN}?${qs.stringify(options)}`;
        case Platform.GITHUB:
            return `${cfg.GITHUB_LOGIN}?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}`
        default:
            return "Invalid auth type!";
    }
}

exports.getTokens=async(type, clientID, client_secret, redirect_uri, scope, code)=>{
    switch (type){
        case Platform.DISCORD:
            var data = { client_id: clientID, client_secret: client_secret, grant_type: 'authorization_code', code: code, redirect_uri: redirect_uri, scope: scope.join(" ") };
            return await doRequest({ method: 'post', url: cfg.DISCORD_TOKEN, data: qs.stringify(data) })
        case Platform.GOOGLE:
            var data = { code, client_id: clientID, client_secret: client_secret,  redirect_uri: redirect_uri, grant_type: 'authorization_code' }
            return await doRequest({ method: 'post', url: cfg.GOOGLE_TOKEN, data: qs.stringify(data) })
        case Platform.GITHUB:
            var data = { client_id: clientID, client_secret: client_secret, code: code, redirect_uri: redirect_uri }
            return await doRequest({ method: 'post', url: cfg.GITHUB_TOKEN, data: qs.stringify(data) })
        default:
            return "Invalid auth type!";
    }
}

exports.getUser=async(type, token, tokenID)=>{
    switch (type){
        case Platform.DISCORD:
            return await doRequest({ method: 'get', url: cfg.DISCORD_USER, headers: {Authorization: `Bearer ${token}`}})
        case Platform.GOOGLE:
            return await doRequest({ method: 'get', url: `${cfg.GOOGLE_USER}?alt=json&access_token=${token}`, headers: {Authorization: `Bearer ${tokenID}`}})
        case Platform.GITHUB:
            return await doRequest({ method: 'get', url: cfg.GITHUB_USER, headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}})
        default:
            return "Invalid auth type!";
    }
}

async function doRequest(config){
    try{
        const response = await axios(config);
        return response.data;
    }catch(error){
        return error.response.data;
    }
}