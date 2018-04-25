Page({

 
  data: {
    
  },
  onLoad:function( ){
      var that = this
      wx.request({
          url: '',
          success: function(res) {
              that.setData({
                  notice: 'res.data.notice',
                  status: 'res.data.status'
              })
          }
      })
  }

})