//index.js
Page({
  data:{
    nickName:'',
    message:''
  },
  onReady: function(options) {
    let app = getApp()
    const nickName = app.userInfo.nickName
    this.setData({
      nickName: nickName,
      message: "Hello, " + nickName
    })
  }
})
