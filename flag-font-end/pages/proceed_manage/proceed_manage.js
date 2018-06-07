var app = getApp();

Page({
  data: {

  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  cancle: function(e){
    // console.log(e.currentTarget);
    wx.request({
      url: app.globalData.globalUrl + '/placeOrder/' + e.currentTarget.dataset.optkey,
      method: "DELETE",
      header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
      success: function(res){
          if( res.statusCode == 200 ) {
              wx.showModal({
                  title: '提示',
                  content: '预约已取消',
                  success: function () {
                      wx.switchTab({
                          url: '../xinghuo/xinghuo'
                      })
                  }
              });
          }
  
      },
      fail: function(res){
        wx.showModal({
          title: '提示',
          content: res.data.message
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    console.log(options.optKey);
    this.setData({
      optkey: options.optKey,
    });
    var that = this;
    wx.request({
        url:  app.globalData.globalUrl + '/placeOrder/' + options.optKey,
        header : {  'Cookie':'JSESSIONID=' + app.globalData.globalSession  },
        success:function(res){
          that.setData({
            placeName: res.data.data.placeName,
            status: res.data.data.status,
            date: res.data.data.startTime.substring(0,10),
            startTime: res.data.data.startTime.substring(11,19),
            endTime: res.data.data.endTime.substring(11,19)
          });
        }
    });
  }


});
