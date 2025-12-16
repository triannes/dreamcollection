const selectedSong = document.getElementById("selected-song");

const progressContainer = document.createElement("div");
progressContainer.id = "shared-progress-container";

const progressBar = document.createElement("div");
progressBar.id = "shared-progress-bar";
progressContainer.appendChild(progressBar);
selectedSong.appendChild(progressContainer);

function pauseStar(audio, starImg, caption, sparkInterval) {
  audio.pause();
  audio.currentTime = 0; 
  starImg.classList.remove("spin");
  caption.classList.remove("show");
  clearInterval(sparkInterval);
  return null;
}

function showSelectedSong(title) {
  selectedSong.textContent = title;
  selectedSong.classList.add("show");
  selectedSong.appendChild(progressContainer); 
}

function hideSelectedSong() {
  selectedSong.classList.remove("show");
  progressBar.style.width = "0%";
}

const stars = [
  { id: "star1", audioId: "audiostar1", title: "Wonder Girls - Rewind" },
  { id: "star2", audioId: "audiostar2", title: "Mild High Club - Homage" },
  { id: "star3", audioId: "audiostar3", title: "Pianissimo - Reticella" },
  { id: "star4", audioId: "audiostar4", title: "Mulasaki Ima 紫今 - Meloism メロイズム" },
];

let sparkIntervals = {};
let currentAudio = null; 

stars.forEach((star) => {
  const wrapper = document.getElementById(star.id);
  const audio = document.getElementById(star.audioId);
  const starImg = wrapper.querySelector("img");
  const caption = wrapper.querySelector(".caption");

  sparkIntervals[star.id] = null;

  wrapper.addEventListener("click", () => {
    if (audio.paused) {
      stars.forEach((otherStar) => {
        if (otherStar.id !== star.id) {
          const otherWrapper = document.getElementById(otherStar.id);
          const otherAudio = document.getElementById(otherStar.audioId);
          const otherStarImg = otherWrapper.querySelector("img");
          const otherCaption = otherWrapper.querySelector(".caption");
          sparkIntervals[otherStar.id] = pauseStar(otherAudio, otherStarImg, otherCaption, sparkIntervals[otherStar.id]);
        }
      });

      audio.play();
      starImg.classList.add("spin");
      caption.classList.add("show");
      showSelectedSong(star.title);
      currentAudio = audio;

    } else {
      sparkIntervals[star.id] = pauseStar(audio, starImg, caption, sparkIntervals[star.id]);
      hideSelectedSong();
      currentAudio = null;
    }
  });

  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + "%";
  });

  audio.addEventListener("ended", () => {
    progressBar.style.width = "0%";
    starImg.classList.remove("spin");
    caption.classList.remove("show");
    hideSelectedSong();
    currentAudio = null;
  });
});

progressContainer.addEventListener("click", (e) => {
  if (!currentAudio) return;
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  currentAudio.currentTime = (clickX / width) * currentAudio.duration;
});