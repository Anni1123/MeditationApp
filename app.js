const app = () => {
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video');
    const sound=document.querySelectorAll('.sound-picker button');
    const timedisplay=document.querySelector('.time-display');
    const outlinelength=outline.getTotalLength();
    const time=document.querySelectorAll('.time-select button');

    let fakeduration=600;
    outline.style.strokeDasharray=outlinelength;
    outline.style.strokeDashoffset=outlinelength;
    play.addEventListener("click",()=>{
        checkPlaying(song);
    });
    const checkPlaying = song => {
        if (song.paused) {
          song.play();
          video.play();
          play.src = "./svg/pause.svg";
        } else {
          song.pause();
          video.pause();
          play.src = "./svg/play.svg";
        }
      };
      time.forEach(Option=>{
          Option.addEventListener("click",function(){
              fakeduration=this.getAttribute("data-time");
              timedisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(
                fakeduration % 60
              )}`;
            });
          });

          sound.forEach(sound =>
            {
                sound.addEventListener('click',function(){
                    song.src = this.getAttribute("data-sound");
                    video.src = this.getAttribute("data-video");
                    checkPlaying(song);
                })
            })
      song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlinelength - (currentTime / fakeduration) * outlinelength;
        outline.style.strokeDashoffset = progress;
        console.log(progress);
        timedisplay.textContent = `${minutes}:${seconds}`;
        if (currentTime >= fakeduration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
          }
      };
};

app();