//index.js
var app = getApp()
Page({
  data: {

  },
  detail: function(e){
    console.log(e);
  },
  book: function(e) {
          wx.navigateTo({
          url: '../book_room/book_room?pid='+ e.currentTarget.dataset.pid,
        })
  },
  onPullDownRefresh:function(){
      wx.showModal({
        title: '提示',
        content: '刷新',
        success:function(res){
          if(res.confirm){
            console.log('确定')
          }
        }
      })
  },
  onLoad: function(){
    // console.log(app.globalData.globalSession);
    var that = this
    wx.request({
      header:{
        'Cookie':'JSESSIONID=' + app.globalData.globalSession
      },
      url: app.globalData.globalUrl + '/place',
      success:function(res){
        that.setData({
          room: res.data.data,
          yuyue: '预约'
        })
      }
    })

  }

})
