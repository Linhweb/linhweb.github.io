
// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var playList=$('.playlist');
var heading=$('header h2');
var cdThumb = $('.cd-thumb');
var audio=$('#audio');
var playBtn=$('.btn-toggle-play');
var progress=$('#progress');
var nextBtn=$('.btn-next');
var prevBtn=$('.btn-prev');
var randomBtn=$('.btn-random');
var repeatBtn=$('.btn-repeat');

const app = {
  currentIndex:0,
  songs: [
    {
      name: "Thế giới ảo tình yêu thật",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://nhacchuong123.com/nhac-chuong/am-thanh/nhac-chuong-the-gioi-ao-tinh-yeu-that-remix-tiktok.mp3",
      image:"yumkhiemton.jpg"
    },
    {
      name: "Chàng trai của em remix",
      singer: "Raftaar x Fortnite",
      path: "https://nhacchuong123.com/nhac-chuong/abcde/chang-trai-cua-em-remix-duy-van-pham.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path:
        "https://nhacchuong123.com/nhac-chuong/abc/Nhac-Chuong-Ket-Duyen-Remix.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
        name: "Chàng trai của em remix",
        singer: "Raftaar x Fortnite",
        path: "https://nhacchuong123.com/nhac-chuong/abcde/chang-trai-cua-em-remix-duy-van-pham.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://nhacchuong123.com/nhac-chuong/am-thanh/nhac-chuong-the-gioi-ao-tinh-yeu-that-remix-tiktok.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
          "https://nhacchuong123.com/nhac-chuong/abc/Nhac-Chuong-Ket-Duyen-Remix.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
  ],
  
  render:function(){
    var _this = this;
    var htmls=this.songs.map(function(song,index){
        return`
            <div class="song ${index===_this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
    })
    playList.innerHTML = htmls.join('\n');
  },

  defineProperties:function(){
    Object.defineProperty(this, 'currentSong', {
      get:function(){
        return this.songs[this.currentIndex];
      }
    })
  },

  haddleEvent: function(){
      var _this = this;
      // xử lý phóng to / thu nhỏ cd
      var cdWidth=$('.cd').offsetWidth;
        document.onscroll=function(){
            var scrollY = window.scrollY || document.documentElement.scrollTop;
            var newCdWidth= cdWidth - scrollY;
            $('.cd').style.width = newCdWidth>0? newCdWidth+'px':0;
            $('.cd').style.opacity = newCdWidth/cdWidth;
        }

        //xử lý khi click play
        playBtn.onclick=function(){
            if($('.player').classList.contains('playing')){
              $('.player').classList.remove('playing')
              audio.pause();
              cdThumbAnimate.pause()
            }else{
              $('.player').classList.add('playing')
              audio.play();
              cdThumbAnimate.play();
            }
        }

         // tiến độ bài hát thay đổi
         audio.ontimeupdate = function(){
          progress.value=isNaN(audio.currentTime/audio.duration*100)?0:audio.currentTime/audio.duration*100;
        }
        
         //khi tua bài hát
         progress.oninput = function(e){
          audio.currentTime=e.target.value*audio.duration/100;
      }
        //xử lý cd quay
        var cdThumbAnimate = cdThumb.animate([
          {transform:'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity
        })
        cdThumbAnimate.pause();

        //next bài
        nextBtn.onclick=function(){
          if(randomBtn.classList.contains('active')){
            _this.randomSong();
          }else{
            _this.nextSong();
          }
          audio.play();
          $('.player').classList.add('playing')
          _this.render();
          _this.scrollToActiveSong();
        }

        //prev bài
        prevBtn.onclick=function(){
          if(randomBtn.classList.contains('active')){
            _this.randomSong();
          }else{
            _this.prevSong();
          }
          audio.play();
          $('.player').classList.add('playing')
          _this.render();
          _this.scrollToActiveSong();
        }

          //random
        randomBtn.onclick=function(){
            if(randomBtn.classList.contains('active')){
              randomBtn.classList.remove('active');
            }else{
              randomBtn.classList.add('active');
            }
        }

        //khi audio kết thúc
        audio.onended=function(){
          if(repeatBtn.classList.contains('active')){
            audio.play();
          }else{
            nextBtn.click();
          }
        }

        //repeat lại bài hát
        repeatBtn.onclick = function(){
          if(repeatBtn.classList.contains('active')){
            repeatBtn.classList.remove('active');
          }else{
            repeatBtn.classList.add('active');
          }
        }

        //bấm vô bài hát thì nó hát
        playList.onclick=function(e){
          if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
            if(e.target.closest('.song:not(.active)')){
                _this.currentIndex = Number.parseInt(e.target.closest('.song:not(.active)').getAttribute('data-index'));
                _this.loadCurrentSong();
                _this.render();
                $('.player').classList.add('playing');
                audio.play();
                
            }
            if(e.target.closest('.option')){

            }
          }
      }
  },

   //kéo tới active song
   scrollToActiveSong() {
    setTimeout(() => {
        $('.song.active').scrollIntoView({
            behavior: 'smooth', block: 'end', inline: 'nearest'
        })
    }, 200)
},

  loadCurrentSong: function(){
    
    heading.innerText=this.currentSong.name;
    cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`;
    audio.src=this.currentSong.path
  },

  nextSong: function(){
    this.currentIndex++;
    if(this.currentIndex>=this.songs.length){
      this.currentIndex=0;
    }
    this.loadCurrentSong()
  },

  prevSong: function(){
    this.currentIndex--;
    if(this.currentIndex<0){
      this.currentIndex=this.songs.length-1;
    }
    this.loadCurrentSong()
  },

  randomSong: function(){
      var newIndex;
      do{
        newIndex=Math.floor(Math.random()*this.songs.length);
      }while(newIndex===this.currentIndex);
      this.currentIndex=newIndex;
      this.loadCurrentSong();
  },
  start:function(){
    //định nghĩa các thuộc tính cho obj
    this.defineProperties();

    //lắng nghe , xử lý sự kiện(dom events)
    this.haddleEvent();

    //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    //render playlist
    this.render();
  }
}
app.start();
