// pages/index/Component/LoadingAction/LoadingAction.js
Page({
  data: {
    hidden: true
  },
  loadingChange: function() {
    this.setData({
      hidden: true
    })
  },
  loadingTap: function() {
    this.setData({
      hidden: false
    })

    var that = this
    setTimeout(function() {
      that.setData({
        hidden: true
      })
    }, 1500)
  },

  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})