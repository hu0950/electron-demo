const { ipcRenderer } = require('electron')
const Timer = require('timer.js')
const WORK_TIMER = 3

function startWork() {
  let workTimer = new Timer({
    ontick: (ms) => {
      updateTimer(ms)
    },
    onend: () => {
      notification()
    }
  })
  workTimer.start(WORK_TIMER)
}

function updateTimer(ms) {
  let timerContainer = document.getElementById('timer-container')
  let s = (ms / 1000).toFixed(0)
  let ss = s % 60
  let mm = (s / 60).toFixed(0)
  timerContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
}

async function notification() {
  let res = await ipcRenderer.invoke('message-tip')

  if (res === 'rest') {
    setTimeout(() => {
      alert('开始休息')
    }, 1 * 1000)
  } else if (res === 'work') {
    startWork()
  }
}

startWork()
