// const { ipcRenderer } = require('electron')
// const Timer = require('timer.js')
// const WORK_TIMER = 5

// console.log(2342342342)
// function startWork() {
//   let workTimer = new Timer({
//     ontick: (ms) => {
//       console.log('ms---------', ms)
//       updateTimer(ms)
//     },
//     onend: () => {
//       notification()
//     }
//   })
//   workTimer.start(WORK_TIMER)
// }

// function updateTimer() {
//   let timerContainer = document.getElementById('timer-container')
//   let s = (ms / 1000).toFixed(0)
//   let ss = s % 60
//   let mm = (s / 60).toFixed(0)
//   timerContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
// }

// async function notification() {
//   let res = await ipcRenderer.invoke('message-tip')
  
//   if (res === 'rest') {
//     setTimeout(() => {
//       alert('休息')
//     }, 0)
//   } else if (res === 'work') {
//     startWork()
//   }
// }

// startWork()


const {ipcRenderer} = require('electron')
const Timer = require('timer.js')

function startWork() {
    let workTimer = new Timer({
        ontick: (ms) => {
            updateTime(ms)
        },
        onend: () => {
            notification()
        }
    })
    workTimer.start(10)
}

function updateTime(ms) {
    let timerContainer = document.getElementById('timer-container')
    let s = (ms / 1000).toFixed(0)
    let ss = s % 60
    let mm = (s / 60).toFixed(0)
    timerContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
}

async function notification() {
    let res = await ipcRenderer.invoke('work-notification')
    if(res === 'rest') {
        setTimeout(() => {
            alert('休息')
        }, 5 * 1000)
    } else if(res === 'work') {
        startWork()
    }
}

startWork()


