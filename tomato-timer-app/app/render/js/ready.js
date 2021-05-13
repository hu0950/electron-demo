const { ipcRenderer } = require('electron')
const Timer = require('timer.js')

// 时钟时间设置
const WORK_TIME = 3 // 单位：s
const REST_TIME = 5 // 单位：s

let switchButton = document.getElementById('switch-button')
let showStatusContainer = document.getElementById('status')
let pageContainer = document.getElementById('main')
let state = {}

setState({
  remainTime: 0,
  type: 0 // 0 开始工作、1 停止工作、2 开始休息、3 停止休息
})

function render () {
  let { type } = state

  if(type === 0) {
      switchButton.innerText = '开始工作'
      showStatusContainer.innerText = 'Get Ready'
      pageContainer.style.background = "#f1f1f1"
      showStatusContainer.style.color = "gray"
    } else if(type === 1) {
      switchButton.innerText = '停止工作'
      pageContainer.style.background = "#fa583c"
      showStatusContainer.innerText = 'Working'
      showStatusContainer.style.color = "#ffffff"
    } else if (type === 2){
      switchButton.innerText = '开始休息'
      pageContainer.style.background = "#f1f1f1"
      showStatusContainer.innerText = 'Break'
      showStatusContainer.style.color = "gray"
    } else {
      switchButton.innerText = '停止休息'
      pageContainer.style.background = "#3a383e"
      showStatusContainer.innerText = 'Resting'
      showStatusContainer.style.color = "#ffffff"
    }
}

function setState(_state) {
    Object.assign(state, _state)
    render()
}

function startWork() {
    setState({type: 1, remainTime: WORK_TIME })
    workTimer.start(WORK_TIME)
}

function startRest() {
    setState({type: 3, remainTime: REST_TIME})
    workTimer.start(REST_TIME)
}

const workTimer = new Timer({
    // 每秒时间更新
    ontick: (ms) => { 
      updateTime(ms)
      setState({
        remainTime: (ms/1000).toFixed(0)
      })
    },
    // 中断，时间、状态重置
    onstop: () => {
      setState({
        type: 0,
        remainTime: 0
      })
    },
    // 时间倒计时结束
    onend: () => { 
      resetTime()  
      let {type} = state
      if(type === 1) {
        setState({type: 2, remainTime: 0})
        // 确保在Mac下才能使用notification
        if(process.platform === 'darwin') {
          notification({
            title: '恭喜你完成任务', 
            body: '是否开始休息？',
            actionText: '开始休息',
            closeButtonText: '继续工作',
            onaction: startRest,
            onclose: startWork
          })
        } else {
          alert('工作结束')
        }
      } else if(type === 3) {
        setState({type: 0, remainTime: 0})
        if(process.platform === 'darwin') {
          notification({
            body: '开始新的工作吧!',
            title: '休息结束', 
            closeButtonText: '继续休息',
            actionText: '开始工作',
            onaction: startWork,
            onclose: startRest
          })
        } else {
           alert('工作结束')
        }
      }
    }
});

function resetTime() {
  let timerTextContainer = document.getElementById('timer-text')
  timerTextContainer.innerText = `00: 00`
}

function updateTime(ms) {
  let timerTextContainer = document.getElementById('timer-text')
  let s = (ms / 1000).toFixed(0)
  let ss = s % 60
  let mm = (s / 60).toFixed(0)
  timerTextContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
}

switchButton.onclick = function() {
  if (this.innerText === '开始工作') {
      startWork()
  } else if(this.innerText === '开始休息'){
      startRest()
  } else {
      workTimer.stop()
  }
}

async function notification({title, body, actionText, closeButtonText, onclose, onaction}) {
  let res = await ipcRenderer.invoke('notification', {
    title,
    body, 
    actions: [{
      text: actionText,
      type: 'button'
    }],
    closeButtonText
  })
  res.event === 'close' ? onclose() : onaction()
}

