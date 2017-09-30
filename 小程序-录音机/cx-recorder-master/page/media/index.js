// page/recorder/index.js
var util = require('../../util/util.js')
const PLAY = "播放音频"
const REPEAT = "重播音频"
const PAUSE = "暂停播放"

Page({
  onReady: function(e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    play: PLAY,
    repeat: REPEAT,
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
  }
})