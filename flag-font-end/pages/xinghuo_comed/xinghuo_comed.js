var app = getApp();

Page({
  data: {
    message: '请先进行身份验证',
    disabled: true
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
            console.log(res.data);
            that.setData({
               message: res.data.message,
               disabled: false
           });
        }
       },
       fail: function(err){
         console.log(err.data);
         that.setData({
           message: err.data.value
         });
       }
    });
  },
  navigation: function(){
      wx.navigateTo({
          url: '../xinghuo_space/xinghuo_space'
      });
  }
});
