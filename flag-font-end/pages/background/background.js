var app = getApp();
Page({
  data: {

  },
  onLoad: function(options) {
    //调用登录接口，获取 code
    var that = this;
    wx.login({
      success: function(res) {
        // console.log(res);
        if (res.code) {
          wx.request({
            url: 'http://flagtestj.zhengsj.top/user/login',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              // console.log(res);
              //异步从后端获取sessionId
              // wx.setStorageSync('sessionId',res.data.data.sessionId)
              //设置全局变量
              app.globalData.globalSession = res.data.data.sessionId
              if (res.data.data.completed == 1) {
                wx.navigateTo({
                  url: '../identity/identity'
                })
              } else {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          })
        }
      }
    })
  }
})
