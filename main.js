window.onload = main

function rToX(rad, radius){
  return -Math.sin(Math.PI * 2 - rad) * radius
}

function rToY(rad, radius){
  return -Math.cos(Math.PI * 2 - rad) * radius
}

function main(){

// ALIAS
const {
  Application,
  Graphics,
  Container
} = PIXI

// INIT CANVAS
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const PADDING = Math.min(WIDTH, HEIGHT) /12
const RADIUS = Math.min(WIDTH, HEIGHT)/2 - PADDING
const DF_LINE = [1, 0xffffff, 1]
const BOLD_LINE = [3, 0xffffff, 1]
const BOLDER_LINE = [5, 0xffffff, 1]
const UNIT_LONG = 10

const app = new Application({ 
  width: WIDTH,
  height: HEIGHT,
  antialias: true
})

const clock = new Container()
clock.position.set(WIDTH/2, HEIGHT/2)
app.stage.addChild(clock)

/* const clock_circle = new Graphics()
clock_circle.lineStyle.apply(clock_circle, DF_LINE)
.drawCircle(0, 0, RADIUS)
clock.addChild(clock_circle)*/

for (let i = 0 ; i < 12; i++){
  let hour_unit = new Graphics()
  hour_unit.lineStyle.apply(hour_unit, BOLD_LINE)
  .moveTo(0, -UNIT_LONG/2)
  .lineTo(0, UNIT_LONG/2)
  hour_unit.position.set(rToX(Math.PI * 2 * i/12, RADIUS), rToY(Math.PI * 2 * i/12, RADIUS))
  hour_unit.rotation = Math.PI * 2 * i/12
  clock.addChild(hour_unit)
}

for (let i = 0 ; i < 60; i++){
  let min_unit = new Graphics()
  min_unit.lineStyle.apply(min_unit, DF_LINE)
  .moveTo(0, -UNIT_LONG/4)
  .lineTo(0, UNIT_LONG/4)
  min_unit.position.set(rToX(Math.PI * 2 * i/60, RADIUS), rToY(Math.PI * 2 * i/60, RADIUS))
  min_unit.rotation = Math.PI * 2 * i/60
  clock.addChild(min_unit)
}

const hour_tick = new Graphics()
hour_tick.lineStyle.apply(hour_tick, BOLDER_LINE)
.moveTo(0, RADIUS/12)
.lineTo(0, -RADIUS/2)
clock.addChild(hour_tick)

const min_tick = new Graphics()
min_tick.lineStyle.apply(min_tick, BOLD_LINE)
.moveTo(0, RADIUS/8)
.lineTo(0, -RADIUS/ 6 * 5)
clock.addChild(min_tick)

const sec_tick = new Graphics()
sec_tick.lineStyle.apply(sec_tick, DF_LINE)
.moveTo(0, RADIUS/6)
.lineTo(0, -RADIUS)
clock.addChild(sec_tick)

setInterval(() => {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  const ms = now.getMilliseconds()

  hour_tick.rotation = (h + m/60 + s/3600)/12 * Math.PI * 2
  min_tick.rotation = (m/60 + s/3600) * Math.PI * 2
  sec_tick.rotation = (s/60 + ms/60000) * Math.PI * 2
}, 1000/60)

document.body.appendChild(app.view)

}