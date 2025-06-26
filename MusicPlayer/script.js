const songs = [
  { title: "Calm Winds", artist: "Zen Flow", src: "music/song1.mp3" },
  { title: "Night Lights", artist: "Moonshine", src: "music/song2.mp3" },
  { title: "Morning Glow", artist: "Sunrise Beats", src: "music/song3.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist");
const playPauseBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightPlaylist(index);
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function updateProgress() {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function highlightPlaylist(index) {
  const items = document.querySelectorAll("#playlist li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

function initPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      playPauseBtn.textContent = "⏸";
    };
    playlistEl.appendChild(li);
  });
}

// Events
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Initialize
initPlaylist();
loadSong(currentSong);
