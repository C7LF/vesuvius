const fetch = require('node-fetch')

const ENDPOINTS = require('../config/endpoints')

const w2gHeaders = new fetch.Headers();
w2gHeaders.append("Content-Type", "application/x-www-form-urlencoded");
w2gHeaders.append("Cookie", "w2glang=en; w2g_session_id=98fc5083ae93be1727027aeb9062276f");

const w2gBodyParams = url => {
    return new URLSearchParams({
        "share": url,
        "api_key": process.env.W2G_KEY
    })
}

const requestOptions = url => {
    const reqOps = {
        method: 'POST',
        headers: w2gHeaders,
        body: w2gBodyParams(url),
        redirect: 'follow'
    }
    return reqOps
}

module.exports.createRoom = createRoom = async url => {
    const response = await fetch(ENDPOINTS.W2G, requestOptions(url))
    const body = await response.json()
    return body
}