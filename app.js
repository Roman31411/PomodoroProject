import { dialogModuleNextCycles } from "./js/dialogModuleNextCycles.js"
import { dialogWarningMove } from "./js/dialogWarningMove.js"
import { AudioControl } from "./js/AudioControl.js"
import { PomodoroTimer } from "./js/PomodoroTimer.js"
import { dialogAudioControl } from "./js/dialogAudioControl.js"
import {JSONSevice} from "./js/JSONService.js"

const Audio = new AudioControl()
const Pomodoro = new PomodoroTimer(Audio)
const dialogModuleNext = new dialogModuleNextCycles("dialogNextCycles", Pomodoro)
const dialogMoveWarning = new dialogWarningMove("dialogWarning", Pomodoro)
new dialogAudioControl('controlsVolume', Audio, JSONSevice)
Pomodoro.dialogModuleNext = dialogModuleNext
Pomodoro.dialogMoveWarning = dialogMoveWarning
