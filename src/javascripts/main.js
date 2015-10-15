// import CSSPlugin from 'CSSPlugin';
import 'CSSPlugin';
import 'EasePack';
import TimelineLite from 'TimelineLite';

const fixConsole = function() {
  if(typeof console === undefined) {
    console = {
      log: ()=> {},
      debug: ()=> {}
    };
  }
};

window.addEventListener('load', ()=>{
  fixConsole();

  const ww = window.bannerConfig.width;
  const hh = window.bannerConfig.height;

  const bannerEl = document.getElementById('banner');
  const animationEl = document.getElementById('animation');

  if( ww && hh ) {
    bannerEl.style.width = ww + "px";
    bannerEl.style.height = hh + "px";
  }

  const gulpEl = animationEl.querySelector('.gulp-logo');
  const tl = new TimelineLite({onComplete:()=> { tl.play(0); }});
  tl.to(gulpEl, 1, {scale:1.2, ease:Linear.easeNone});
  tl.to(gulpEl, 1, {scale:1, ease:Linear.easeNone});
});
