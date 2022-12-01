'use strict'
const express = require ('express');
const nodeFetch = require ('node-fetch');
let router = express.Router ();
router.get ('/', (req, res) => {
    res.render ('index.html');
});
router.post ('/convert', async (req, res) => {
    const videoURL = req.body.videoID;
    let vidID = videoURL.substring (32);
    if (vidID === undefined || vidID === "" || vidID === null) {
        return res.render ('index.html', {
            success: false,
            message: 'Please enter a video ID'
        });
    }
    else {
        /* pagina del API: https://rapidapi.com/ytjar/api/youtube-mp36/ */
        const fetchRequest = await nodeFetch (`https://youtube-mp36.p.rapidapi.com/dl?id=${vidID}`, {
            'method': 'GET',
            'headers': {
                // Crear archivo .env
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        });
        const fetchResponse = await fetchRequest.json ();
        if (fetchResponse.status === 'ok') {
            console.log (fetchResponse.title)
            return res.render ('index.html', {
                success: true,
                song_title: fetchResponse.title,
                song_link: fetchResponse.link
            });
        }
        else {
            return res.render ('index.html', {
                success: false,
                message: fetchResponse.msg
            });
        }
    }
});
module.exports = router;