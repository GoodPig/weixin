// page/recorder/index.js
var util = require('../../util/util.js')
const PLAY = "播放音频"
const REPEAT = "重播音频"
const PAUSE = "暂停播放"

const PLAY_RECORD = "开始录音"
const STOP_RECORD = "停止录音"
const PLAY_VOICE = "回放录音"
const STOP_VOICE = "停止回放"
const SAVE_VOICE = "保存录音"

var playTimeInterval
var recordTimeInterval

Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00',
    play: PLAY,
    repeat: REPEAT,
    record: PLAY_RECORD,
    playRecord: PLAY_VOICE,
    stopRecord: STOP_RECORD,
    playVoice: PLAY_VOICE,
    stopVoice: STOP_VOICE,
    saveVoice: SAVE_VOICE,
    audioInfo: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      controls: false,
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },

  },
  audioPause: function() {
    this.audioCtx.pause()
  },
  audioToggle: function(btnName, defaultName) {
    let otherBtnName = btnName === "play" ? "repeat" : "play"
    if (this.data[btnName] === defaultName) {
      this.audioCtx.play()
      this.setData({
        [btnName]: PAUSE,
        [otherBtnName]: otherBtnName.toUpperCase() === "PLAY" ? PLAY : REPEAT
      });
      return false
    }
    this.setData({
      [btnName]: defaultName
    });
    this.audioPause()
  },
  audioPlay: function() {
    this.audioToggle('play', PLAY)
  },
  audioRepeat: function() {
    this.audioCtx.seek(0)
    this.audioToggle('repeat', REPEAT)
  },
  defaultPause: function() {
    this.setData({
      play: PLAY,
      repeat: REPEAT
    })
  },
  onHide: function() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  startRecord: function() {
    this.setData({
      recording: true
    })

    var that = this
    recordTimeInterval = setInterval(function() {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)
    wx.startRecord({
      success: function(res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete: function() {
        that.setData({
          recording: false
        })
        clearInterval(recordTimeInterval)
      }
    })
  },
  stopRecord: function() {
    wx.stopRecord()
  },
  stopRecordUnexpectedly: function() {
    var that = this
    wx.stopRecord({
      success: function() {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },
  playVoice: function() {
    var that = this
    playTimeInterval = setInterval(function() {
      var playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime
      })
    }, 1000)
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function() {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        })
      }
    })
  },
  pauseVoice: function() {
    clearInterval(playTimeInterval)
    wx.pauseVoice()
    this.setData({
      playing: false
    })
  },
  stopVoice: function() {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
    wx.stopVoice()
  },
  saveVoice: function() {
    wx.saveFile({
      success: function(res) {
        var tempFilePath = res.tempFilePath
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function(res) {
            var savedFilePath = res.savedFilePath
          }
        })
      }
    })
  },
  clear: function() {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})