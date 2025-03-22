import { dialogModuleNextCycles } from "./js/dialogModuleNextCycles.js"
import { dialogWarningMove } from "./js/dialogWarningMove.js"
import { AudioControl } from "./js/AudioControl.js"
import { PomodoroTimer } from "./js/PomodoroTimer.js"

const Pomodoro = new PomodoroTimer()
const dialogModuleNext = new dialogModuleNextCycles("dialogNextCycles", PomodoroTimer)
const dialogMoveWarning = new dialogWarningMove("dialogWarning", PomodoroTimer)
const Audio = new AudioControl()
console.log(Audio)