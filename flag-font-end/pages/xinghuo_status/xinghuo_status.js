Page({

  data: {
    
  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  onLoad:function( ){
  //     var that = this
  //     wx.request({
  //         url: '',
  //         success: function(res) {
  //             if( res.statusCode == 200  ) {
  //                 that.setData({
  //                     notice: 'res.data.notice',
  //                     status: 'res.data.status'
  //             })
  //         }
  //     }
  // })
  }
})