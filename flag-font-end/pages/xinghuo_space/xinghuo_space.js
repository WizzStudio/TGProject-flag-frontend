var app = getApp();

const util = require('../../utils/util.js')

Page({
  data: {
    messages:''
  },

  navigation1: function(){
    wx.navigateTo({
      url: '../xinghuo_book/xinghuo_book',
    });
  },
  navigation3: function(){
    wx.navigateTo({
      url: '../xinghuo/xinghuo'
    })
  },
  onLoad: function () {
      var that = this;
      wx.request({
        //获取用户提交过的申请
        url: app.globalData.globalUrl + '/councilOrder',
        header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
        success: function(res){
          console.log( res.data );
          that.setData({
            messages: res.data.data
          });
        }
      });
      // this.setData({
      //   logs: (wx.getStorageSync('logs') || []).map(log => {
      //       return util.formatTime(new Date(log));
      //   })
      // });
  }
})
