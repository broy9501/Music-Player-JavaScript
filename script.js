var dotElements = "";
// var colors = ['red','blue','green','yellow','cyan','orange', 'purple','pink','lime','teal','magenta','brown','gray','indigo','violet','gold','silver','maroon','navy','olive'];
var colors = [
    '#E0B0FF',
    '#D580FF',
    '#CC66FF',
    '#BF40FF',
    '#AA00FF',
    '#9D00FF',
    '#8A2BE2',
    '#7F00FF',
    '#6F00FF',
    '#5B00CC',
    '#4B0082',
    '#36005C'
];


// Creating multiple dots and randomising dots location
// Creating 60 dots with random positions and colors
for (var i = 1; i <= 60; i++) {
    var topRandom = Math.floor(Math.random() * 100) + '%';
    var leftRandom = Math.floor(Math.random() * 100) + '%';

    var randomColor = colors[Math.floor(Math.random() * colors.length)];


    dotElements += '<div class="orbs orb' + i + '" style="top: ' + topRandom + '; left: ' + leftRandom + '; background-color: ' + randomColor + '"></div>';
}

// Adding them to the background container
var dotContainer = document.querySelector('.background');
if (dotContainer) {
    dotContainer.innerHTML = dotElements;
}

// Function to randomise the dots location and speed
function randomiseDots () {
    const randomDots = document.querySelectorAll('.orbs');
    randomDots.forEach(dot => {
        // When it first loads
        const randomSpeed = Math.floor(Math.random() * 4000) + 10000;
        movingSingleDot(dot, randomSpeed);

        // randomise it and random times
        setInterval(() => {
            const randomSpeed = Math.floor(Math.random() * 4000) + 10000;
            movingSingleDot(dot, randomSpeed);
        }, randomSpeed);
    })
}

// Function to move each single dot to random position with random speed
function movingSingleDot (dot, speed) {
    const transitionSpeed = speed / 1000 + 's';
    dot.style.transition = `top ${transitionSpeed} ease-in-out, left ${transitionSpeed} ease-in-out`;

    let top = Math.floor(Math.random() * 100) + '%';
    let left = Math.floor(Math.random() * 100) + '%';

    dot.style.top = top;
    dot.style.left = left;
}

randomiseDots();




// Audio functions 
function playAudio() {
    var audio = document.getElementById("audio");

    // Create playlist of songs
    var sources = audio.getElementsByTagName("source");
    const playlist = [];
    for (let i = 0; i < sources.length; i++){
        playlist.push(sources[i].src);
    }


    var audioplay = document.getElementById("play-btn");
    var audiopause = document.getElementById('pause-btn');

    var prevBtn = document.getElementById('previous-btn');
    var nextBtn = document.getElementById('next-btn');
    var repeatBtn = document.getElementById('repeat-btn');
    var likeBtn = document.getElementById('like-btn');

    var currentTimeDisplay = document.getElementById('current-time');
    var durationDisplay = document.getElementById('duration');

    var progressBar = document.getElementById("progress-bar");

    // Changing images when changing songs
    var albumCover = document.getElementById("album-cover");
    const pics = ['images/ee64fad515bf0b8a03ffb21e964eab61.jpg', 'images/images.jpg'];

    // Initial index of playlist at 0
    let currentIndexTrack = 0;
    let picIndex = 0;


    if (audioplay && audio) {
        audioplay.addEventListener("click", function() {
            // Play and pause music
            audio.play();
            audioplay.style.display = "none";
            audiopause.style.display = "inline-block";

            if (audiopause && audio) {
                audiopause.addEventListener("click", function() {
                    audio.pause();
                    audioplay.style.display = "inline-block";
                    audiopause.style.display = "none";
                });
            }

            // Set the duration timer of music
            var duration = audio.duration;
            durationDisplay.innerHTML = convertElapsedTime(duration);
            
            if (audio) {
                audio.addEventListener("timeupdate", function() {
                    var currentTime = audio.currentTime;
                    currentTimeDisplay.innerHTML = convertElapsedTime(currentTime);
                    
                    if (progressBar.max === "100" && audio.duration) {
                        progressBar.max = audio.duration;
                        durationDisplay.innerHTML = convertElapsedTime(audio.duration);
                    }

                    progressBar.value = currentTime;
                    updateBar();
                })

                audio.addEventListener("loadedmetadata", function() {
                    if (progressBar && audio.duration) {
                        progressBar.max = audio.duration; // Force the bar length to sync with duration
                        durationDisplay.innerHTML = convertElapsedTime(audio.duration);
                        updateBar();
                    }
                });

                // When ended, play next song
                audio.addEventListener("ended", () => {
                    currentIndexTrack++;
                    picIndex++;

                    if (currentIndexTrack >= playlist.length){
                        currentIndexTrack = 0;
                        picIndex = 0;
                    }
                    
                    audio.src = playlist[currentIndexTrack];
                    albumCover.src = pics[picIndex];
                    audio.load();
                    audio.play();
                });
            }

            // Volume changer
            setVolume = function() {
                audio.volume = document.getElementById("volume").value;
            }

            // Choose a part of the song to play
            seekAudioTime = function() {
                if (audio && audio.duration && progressBar) {
                    audio.currentTime = progressBar.value;
                    updateBar();
                }
            }
        
        });
    }

    // Progression bar update and syncing with duration with music
    function updateBar() {
        if (audio.duration) {
            var percentage = (progressBar.value / progressBar.max) * 100;
            progressBar.style.background = `linear-gradient(to right, purple 0%, purple ${percentage}%, #392061 ${percentage}%, #392061 100%)`;
        }
    }

    // Helper function to produce the digital duration time
    function convertElapsedTime(inputseconds){
        var seconds = Math.floor(inputseconds % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var minutes = Math.floor(inputseconds / 60);
        return minutes + ":" + seconds;
    }

    // Buttons to play previous music or next music in the playlist
    if (prevBtn && audio) {
        prevBtn.addEventListener("click", function() {
            if (audio.currentTime > 3) {
                audio.currentTime = 0;
                audio.play();
            } 
            else {
                console.log("Previous track");
                currentIndexTrack--;
                picIndex--;

                if (currentIndexTrack < 0) {
                    currentIndexTrack = playlist.length - 1;
                    picIndex = pics.length - 1;
                }

                audio.src = playlist[currentIndexTrack];
                albumCover.src = pics[picIndex];
                audio.load();
                audio.play();
            }
        });
    }

    if (nextBtn && audio) {
        nextBtn.addEventListener("click", function() {
            console.log("Next track");
            audio.currentTime = progressBar.max;
        });
    }

    // Button to repeat the same song
    if (repeatBtn && audio) {
        repeatBtn.addEventListener("click", function() {
            if (audio.loop){
                audio.loop = false;
                repeatBtn.style.color = "white";
            }
            else {
                audio.loop = true;
                repeatBtn.style.color = "red";
                if (progressBar.max === audio.duration){
                    audio.play();
                }
            }
        })
    }

    // A button to favourite a song
    if (likeBtn){
        likeBtn.addEventListener("click", function() {
            likeBtn.classList.toggle("is-liked");
        });
    }
}

playAudio();