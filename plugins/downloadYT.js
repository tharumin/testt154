/**
* @project_name Queen Amdi [WA Multi-device]
* @author BlackAmda <https://github.com/BlackAmda>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/BlackAmda/QueenAmdi>
* @version 4.0.0
* @file  downloadYT.js - QueenAmdi YouTube downloader

© 2022 Black Amda, ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { AMDI, Language, youtubeDL } = require('queen_amdi_core/dist/scripts')
const { songList, videoList, sendYTaudio, sendYTdocument, sendYT720, sendYT480, sendYT360, shortVID, shortAUD } = youtubeDL
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const Lang = Language.getString('downloadYT');

AMDI({ cmd: ["song", "play", "mp3"], desc: Lang.songDesc, example: Lang.songExa, type: "download", react: "🎧" }, (async (amdiWA) => {
    let { input, prefix, reply, sendButtonsMsg, sendListMsg } = amdiWA.msgLayout;

    if (!input) return reply(Lang.needYTLink, '❗')
    if (input.includes('playlist')) return reply(Lang.noPL)

    if (input.includes('shorts')) {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        const isYT = ytIdRegex.exec(input)
        if (!isYT) return reply(Lang.needYTLink, '❗')
        return await shortAUD(amdiWA, input);
    }

    if (!input.includes('https://')) {
        const findYT = async (name) => {
            const search = await yts(`${name}`)
            return search.all;
        }
        const ytVidList = await findYT(input)
        var listInfo = {}
        listInfo.title = Lang.songListTitle
        listInfo.text = Lang.songListTXT
        listInfo.buttonTXT = 'default'
        
        try {
            const sections = await songList(prefix, ytVidList);
            return await sendListMsg(listInfo, sections)
        } catch (e) {
            return await reply(Lang.noSearch)
        }
    }

    if (input.includes('https://')) {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        const isYT = ytIdRegex.exec(input)
        if (!isYT) return reply(Lang.needYTLink, '❗')

        let ytVidInfo = (await ytdl.getInfo(input)).videoDetails

        try {
            like = ytVidInfo.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } catch {
            like = '_Like count hidden_'
        }

        const ytDlTXT = `🔖 ${Lang.Title} ${ytVidInfo.title}\n\n` +
                        `👀 ${Lang.Views} ${ytVidInfo.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n\n` +
                        `💬 ${Lang.Likes} ${like}\n\n`
                        
        try {
            var thumb = ytVidInfo.thumbnails[4].url
        } catch {
            var thumb = ytVidInfo.thumbnails[2].url
        }

        const buttons = [
            {type: "url", displayText: "🎊 YouTube 🎊", url: ytVidInfo.video_url},
            {type: "click", displayText: "🎵 Audio 🎵", buttonCMD: `${prefix}ytdl audio ${ytVidInfo.video_url}`},
            {type: "click", displayText: "📁 Document 📁", buttonCMD: `${prefix}ytdl document ${ytVidInfo.video_url}`},
            {type: "click", displayText: "🎤 Voice 🎤", buttonCMD: `${prefix}ytdl voice ${ytVidInfo.video_url}`}
        ]
        return await sendButtonsMsg(buttons, {text: ytDlTXT, image: {url: thumb}, tagMsg: true, showURL: true});
    }
}));


AMDI({ cmd: ["video", "yt", "mp4"], desc: Lang.videoDesc, example: Lang.videoExa, type: "download", react: "🎞️" }, (async (amdiWA) => {
    let { input, prefix, reply, sendButtonsMsg, sendListMsg } = amdiWA.msgLayout;

    if (!input) return reply(Lang.needYTLink, '❗')
    if (input.includes('playlist')) return reply(Lang.noPL)

    if (input.includes('shorts')) {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        const isYT = ytIdRegex.exec(input)
        if (!isYT) return reply(Lang.needYTLink, '❗')
        return await shortVID(amdiWA, input);
    }

    if (!input.includes('https://')) {
        const findYT = async (name) => {
            const search = await yts(`${name}`)
            return search.all;
        }
        const ytVidList = await findYT(input)
        var listInfo = {}
        listInfo.title = Lang.videoListTitle
        listInfo.text = Lang.videoListTXT
        listInfo.buttonTXT = 'default'
        
        try {
            const sections = await videoList(prefix, ytVidList);
            return await sendListMsg(listInfo, sections)
        } catch (e) {
            return await reply(Lang.noSearch)
        }
    }

    if (input.includes('https://')) {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        const isYT = ytIdRegex.exec(input)
        if (!isYT) return reply(Lang.needYTLink, '❗')
        
        let ytVidInfo = (await ytdl.getInfo(input)).videoDetails

        try {
            like = ytVidInfo.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } catch {
            like = '_Like count hidden_'
        }

        const ytDlTXT = `🔖 ${Lang.Title} ${ytVidInfo.title}\n\n` +
                        `👀 ${Lang.Views} ${ytVidInfo.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n\n` +
                        `💬 ${Lang.Likes} ${like}\n\n`                       

        try {
            var thumb = ytVidInfo.thumbnails[4].url
        } catch {
            var thumb = ytVidInfo.thumbnails[2].url
        }

        const buttons = [
            {type: "url", displayText: "🎊 YouTube 🎊", url: ytVidInfo.video_url},
            {type: "click", displayText: "🔮 360p 🔮", buttonCMD: `${prefix}ytdl 360 ${ytVidInfo.video_url}`},
            {type: "click", displayText: "🔮 480p 🔮", buttonCMD: `${prefix}ytdl 480 ${ytVidInfo.video_url}`},
            {type: "click", displayText: "🔮 720p 🔮", buttonCMD: `${prefix}ytdl 720 ${ytVidInfo.video_url}`}
        ]
        return await sendButtonsMsg(buttons, {text: ytDlTXT, image: {url: thumb}, tagMsg: true, showURL: true});
    }
}));


AMDI({ cmd: "ytdl", cmdHideInMenu: true, type: "download" }, (async (amdiWA) => {
    let { inputObj } = amdiWA.msgLayout;

    if (inputObj[0] === "audio") {
        return await sendYTaudio(amdiWA, inputObj[1])
    }

    if (inputObj[0] === "document") {
        return await sendYTdocument(amdiWA, inputObj[1])
    }

        if (inputObj[0] === "voice") {
            return await sendYTvoice(amdiWA, inputObj[1])
    }

    if (inputObj[0] === "720") {
        return await sendYT720(amdiWA, inputObj[1])
    }

    if (inputObj[0] === "480") {
        return await sendYT480(amdiWA, inputObj[1])
    }

    if (inputObj[0] === "360") {
        return await sendYT360(amdiWA, inputObj[1])
    }
}));