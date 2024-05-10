chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById('song').textContent = message.song;
    document.getElementById('artist').textContent = message.artist;
    document.getElementById('albumName').textContent = message.albumName;
    document.getElementById('albumCover').src = message.albumCover;
    document.getElementById('time').textContent = message.time;
});