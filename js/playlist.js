// let's select all required tags or elements
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');
const availableVideos = document.querySelector('.availableVideos')

const ulTag = document.querySelector(".playlist-ul");
AllLessons.innerHTML = `${allVideos.length} Lessons - 2021 Chemistry Revision`


let musicIndex = 1;
window.addEventListener('load',()=>{
   loadMusic(musicIndex);
   playingNow();
})
function playMusic(){
   mainVideo.play();
   playlist.classList.add('active')
}
function loadMusic(indexNumb){
   mainVideo.src = `https://cdn.codelms.workers.dev/1:/class/Chem%202021/Video%20${indexNumb}.mp4`;
   // media/${allVideos[indexNumb - 1].src}.mp4
   videoTitle.innerHTML = `${indexNumb}. 2021 Chemistry Revision - ${allVideos[indexNumb - 1].name} ${indexNumb}`;
   availableVideos.innerHTML = `${allVideos.length} Lessons available.`;
}
// media/${allVideos[i].src}.mp4
for(let i = 0; i < allVideos.length; i++){
   let liTag = `<li li-index="${i + 1}">
      <div class="row">
         <div class="vid_logo"></div>
         <span>${i + 1}. ${allVideos[i].name} ${allVideos[i].id}</span>
      </div>
      <video preload="none" class="vid_${allVideos[i].id}" src="https://cdn.codelms.workers.dev/1:/class/Chem%202021/Video%20${allVideos[i].id}.mp4" style="display: none;" title="${allVideos[i].name} ${allVideos[i].id}"></video>
      <span id="vid_${allVideos[i].id}" class="duration"></span>
   </li>`;
   playlist.insertAdjacentHTML('beforeend',liTag); 

   let liVideoDuration = ulTag.querySelector(`#vid_${allVideos[i].id}`)
   let liVideoTag = ulTag.querySelector(`.vid_${allVideos[i].id}`);
   

   liVideoTag.addEventListener("loadeddata", ()=>{
      let videoDuration = liVideoTag.duration;
      let totalMin = Math.floor(videoDuration / 60);
      let totalSec = Math.floor(videoDuration % 60);
      // if totalSec is less then 10 then add 0 at the beginging
      let totalHour = Math.floor(totalMin / 60);
      let reminderOfHour = Math.floor(((totalMin / 60) - totalHour) * 60);
      totalSec < 10 ? totalSec = "0"+ totalSec : totalSec
      liVideoDuration.innerText = `${totalHour}:${reminderOfHour}:${totalSec}`;
      // adding t duration attribe which we'll use below
      liVideoDuration.setAttribute("t-duration", `${totalHour}:${reminderOfHour}:${totalSec}`);
   })  
}
// work on play particular song on click
const allLiTags = playlist.querySelectorAll('li');
function playingNow(){
   for(let j = 0; j<allVideos.length; j++){
      if(allLiTags[j].classList.contains('playing')){
         allLiTags[j].classList.remove("playing")
      }
      if(allLiTags[j].getAttribute('li-index')==musicIndex){
         allLiTags[j].classList.add('playing')
      }
      // adding onclick attribute in all li tags
      allLiTags[j].setAttribute("onclick", "clicked(this)")
   }
}

function clicked(element){
   // getting li index of particular clicked li tag
   let getIndex = element.getAttribute("li-index");
   musicIndex = getIndex;
   loadMusic(musicIndex);
   playMusic();
   playingNow();
}