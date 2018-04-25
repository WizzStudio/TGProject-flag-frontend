var app = getApp();

Page({

  data: {

  },
  proceed: function(e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '../proceed_manage/proceed_manage?optKey=' + e.currentTarget.dataset.optkey
    })
  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/placeOrder',
      header: {
        'Cookie': 'JSESSIONID=' + app.globalData.globalSession
      },
      success: function(res) {
        that.setData({
          room: res.data.data,
          view: '查看进度'
        })
      }
    })
  }
})
