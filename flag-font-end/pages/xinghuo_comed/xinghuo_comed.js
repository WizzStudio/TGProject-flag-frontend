var app = getApp();

Page({
  data: {
    message: '',
    disabled: true
  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  confine:function(e){
    var that = this;
    wx.request({
        url: app.globalData.globalUrl + '/department/authCode',
        header:{
            "content-type":"application/x-www-form-urlencoded",
            'Cookie':'JSESSIONID=' + app.globalData.globalSession
        },
        data:{
            authCode: e.detail.value
        },
        success:function(res){
          if(res.statusCode == 200){
            // console.log(res.data);
                if ( res.data.status == 0 ) {
                    // that.setData({
                        // message: res.data.message,
                    // });
                        wx.navigateTo({
                            url: '../xinghuo_space/xinghuo_space'
                        });
                }
                }
                if ( res.data.status == 1 ) { 
                    that.setData({
                        message: res.data.message,
                    });
                }
        },
       fail: function(err){
         that.setData({
           message: err.data.value
         });
       }
    });
  }
 
});
