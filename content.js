let ytmusicPlayerBar

let waitForPlayerBarInterval = setInterval(() => {

    if (document.querySelector("ytmusic-player-bar")) {
        ytmusicPlayerBar = document.querySelector("ytmusic-player-bar")
        clearInterval(waitForPlayerBarInterval)
        getInfo()
    }

}, 1000)


function getInfo() {

    setInterval(async() => {

        if (ytmusicPlayerBar.querySelector(".title").innerText) {

            let info = {
                song: "Title: " + ytmusicPlayerBar.querySelector(".title").innerText,
                artist: "Artist: " +  ytmusicPlayerBar.querySelectorAll("a")[0].innerText,
                albumName: "Album: " + ytmusicPlayerBar.querySelectorAll("a")[1].innerText,
                albumCover: ytmusicPlayerBar.querySelector(".image").src,
                time: ytmusicPlayerBar.querySelector(".time-info").innerText
            }
            console.log(info)
            chrome.runtime.sendMessage(info);
            
            const res = await fetch("http://localhost:3000/api/playing_song", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }else{
                console.error("Unable to post", res.status)
            }

        } else {
            console.log("Nothing is playing.")
        }

    }, 1000)

}
