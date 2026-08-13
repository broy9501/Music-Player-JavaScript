# Neon Music Player

A **Neon Music Player** built with **HTML, CSS and JavaScript**.

---

## Features

* Play / Pause music
*  Previous and Next track
* Dynamic song information
* Dynamic album artwork
* Interactive music progress bar
* Current time and song duration
* Volume control
* Repeat functionality
*  Animated floating neon background
* Responsive design

---

## Technologies

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript**


---

The background animation is created using CSS rather than external animation libraries.

---

## Project Structure

```text
neon-music-player/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── cover1.jpg
│   ├── cover2.jpg
│   └── cover3.jpg
│
└── music/
    ├── song1.mp3
    ├── song2.mp3
    └── song3.mp3
```

---

## How It Works

JavaScript interacts with the audio element:

```javascript
const audio = document.getElementById("audio");

audio.play();
audio.pause();
```

The player UI is then updated based on the current state of the audio.

For example, the progress bar is updated as the song plays:

```javascript
audio.addEventListener("timeupdate", () => {
    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;
});
```

This allows the interface to stay synchronised with the music.

---

## JavaScript Learning

This project was specifically built to strengthen my JavaScript skills through practical development.

### DOM Manipulation

JavaScript is used to access and modify elements within the page.

```javascript
const title = document.getElementById("song-title");

title.textContent = "Midnight City";
```

### Event Handling

User interactions are handled using event listeners.

```javascript
playButton.addEventListener("click", () => {
    audio.play();
});
```

### Arrays & Objects

Songs are stored as JavaScript objects inside an array.

```javascript
const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        file: "music/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        file: "music/song2.mp3",
        cover: "images/cover2.jpg"
    }
];
```

This allows the player to dynamically load different tracks instead of hardcoding each song.

---


## Purpose

This project is part of my journey learning **JavaScript through practical projects**.

Rather than relying on frameworks or pre-built music-player libraries, I wanted to understand how the underlying JavaScript works by building the functionality myself.


---

## 📜 License

This project was created for learning and portfolio purposes.
