Page({

  data: {
    
  },

    onPullDownRefresh: function () {
        wx.showLoading();
        setTimeout(function(){
            wx.hideLoading()
        },1000)
    },
  navigationto:function(){
      wx.navigateTo({
          url: '../xinghuo/xinghuo',
      })
  },

  onLoad: function (options) {
    
  }

})