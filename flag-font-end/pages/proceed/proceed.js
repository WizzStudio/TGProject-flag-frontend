var app = getApp();

Page({

  data: {

  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
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
          if(res.statusCode == 200 ) {
            //   console.log("200");
              that.setData({
                  room: res.data.data,
                  view: '查看进度'
              })
          }
      }
    })
  }
})
