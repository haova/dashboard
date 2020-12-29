function getPos(i, d, s){
  return [
    Math.cos(i/d * 2 * Math.PI) * s,
    Math.sin(i/d * 2 * Math.PI) * s,
  ]
}

function init(){
  const canvas = document.getElementById('clock');
  const ctx = canvas.getContext('2d');

  const screensize = 400;
  const size = screensize * 0.8;
  const radius = size/2;
  canvas.width = canvas.height = screensize;

  ctx.translate(screensize/2, screensize/2);

  ctx.font = radius * 0.15 + "px arial";

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  function drawClock() {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    var ang;
    var num;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.05);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.04);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
  }

  setInterval(drawClock, 1000);
}

window.addEventListener('load', init);