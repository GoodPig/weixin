//app.js
App({
  onLaunch: function() {
    // when the cxapp init,it will be operate only once.
    this.getUserInfo()
  },
  onShow: function() {
    // when the cxapp start or form back end move to front end , it will be operate.
  },
  onHide: function() {
    // when the cxapp move to back end , it will be operate.
  },
  onError: function(msg) {
    // when the cxapp have a mistake or failed using wx's api, it will be operate.
    console.log(msg)
  },
  getUserInfo: function() {
    // you can definde some function by yourself . you can use it by 'this' 
    let that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.getUserInfo({
            success: function(res){
              that.userInfo.nickName = res.userInfo.nickName
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      error: function(msg) {
        console.log(msg)
      }
    });
  },
  userInfo: {}
})