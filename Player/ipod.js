// Create your global variables below:
var tracklist = ["Let's Go Up", "Shield", "Not Alone", "Concrete Evidence", "Freedom", "Brave", "A Root out of Dry Ground", "Lawgiver", "Disciples", "A Tender Plant"];
var volLevels = [];
const DEFAULT_COLOR = 'rgb(95, 147, 154)'
var volumeLvl = 2
var secondsElapsed = 0
var playOnce = 1

//Retrieve element nodes from DOM
var switchBtn = document.getElementById('switch-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var volumeUpBtn = document.getElementById('volume-up');
var volumeDownBtn = document.getElementById('volume-down');
var timeLine = document.getElementById("player-time")
var timeElapsed = document.getElementById("time-elapsed")
var timeTotal = document.getElementById("time-total")

function init() {
	for(let i = 0; i < 6; i++){
		volLevels.push(document.getElementById(`vl${i}`))
	}
	volLevels[0].className = "volume-level-on"
	volLevels[1].className = "volume-level-on"
	volLevels[2].className = "volume-level-on"
	volLevels[3].className = "volume-level-off"
	volLevels[4].className = "volume-level-off"
	volLevels[5].className = "volume-level-off"
};

function volUp() {
	if(volumeLvl <= 4){
		volumeLvl += 1
		volLevels[volumeLvl].className = "volume-level-on"
	}
}

function volDown() {
	if(volumeLvl >= 0){
		volLevels[volumeLvl].className = "volume-level-off"
		volumeLvl -= 1
	}
}

function switchPlay() {
		if(switchBtn.innerHTML == "play_arrow"){
			switchBtn.innerHTML = "pause"
			if(playOnce == 1){
				var play = setInterval(function(){
					playOnce = 0
					if(switchBtn.innerHTML == "pause"){
						if(timeLine.value < 180){
							secondsElapsed = Number(timeLine.value);					
							timeLine.value = Number(secondsElapsed) + 1;
							secondsElapsed += Number(1);
							timeElapsed.innerHTML = `${secondsToMs(timeLine.value)}`
						} else{
							timeLine.value = 0
							nextSong()
						}
					}
				}, 1000)	
			}
		}else{
			switchBtn.innerHTML = "play_arrow"
		}

}

function nextSong() {
	timeLine.value = 0
	timeElapsed.innerHTML = `${secondsToMs(timeLine.value)}`
	var currSong = tracklist.indexOf(document.getElementById("player-song-name").innerHTML)
	if(currSong == 9){
		document.getElementById("player-song-name").innerHTML = tracklist[0]
	}else{
		document.getElementById("player-song-name").innerHTML = tracklist[currSong+1]
	}
}

function prevSong() {
	timeLine.value = 0
	timeElapsed.innerHTML = `${secondsToMs(timeLine.value)}`
	var currSong = tracklist.indexOf(document.getElementById("player-song-name").innerHTML)
	if(currSong == 0){
		document.getElementById("player-song-name").innerHTML = tracklist[9]
	}else{
		document.getElementById("player-song-name").innerHTML = tracklist[currSong-1]
	}
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);
    console.log(`00${sec}`);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

switchBtn.addEventListener('click', switchPlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeUpBtn.addEventListener('click', volUp);
volumeDownBtn.addEventListener('click', volDown);



init();