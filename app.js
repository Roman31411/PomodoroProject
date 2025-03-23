import { dialogModuleNextCycles } from "./js/dialogModuleNextCycles.js"
import { dialogWarningMove } from "./js/dialogWarningMove.js"
import { AudioControl } from "./js/AudioControl.js"
import { PomodoroTimer } from "./js/PomodoroTimer.js"

const Audio = new AudioControl()
const Pomodoro = new PomodoroTimer(Audio)
const dialogModuleNext = new dialogModuleNextCycles("dialogNextCycles", Pomodoro)
const dialogMoveWarning = new dialogWarningMove("dialogWarning", Pomodoro)

Pomodoro.dialogModuleNext = dialogModuleNext
Pomodoro.dialogMoveWarning = dialogMoveWarning

console.log(Audio)