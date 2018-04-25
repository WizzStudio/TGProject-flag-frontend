var app = getApp();

Page({
  data: {
    name:'我要入驻',
    tips: '',
    status: ''
  },
  navigationto_coming: function(){
      var status = this.data.status; // 获取当前页面的data
      if(status == 1){
      wx.navigateTo({
          url: '../xinghuo_coming/xinghuo_coming',
      });
    }
      if(status == 0){
      wx.request({
        url: app.globalData.globalUrl + '/space/apply',
        header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
        success: function (res) {
          console.log(res.data);
          if(res.data.status == 0){
            wx.showModal({
              title: '提示',
              //此时内容提示应该为res.data.message 不能为null 后面改
              content: '无'
            });
          }
          else if(res.data.status == 1){
            wx.showModal({
              title: '提示',
              content: 'res.data.data.feedback'
            });
          }
          else {
            wx.showModal({
              title: '提示',
              content: 'res.data.data.feedback'
            });
          }
        }
    });
  }
},
  navigationto_comed:function(){
      wx.navigateTo({
          url: '../xinghuo_comed/xinghuo_comed',
      });
  },
  navigation:function(){
      wx.switchTab({
          url: '../index/index',
      });
  },
  onLoad: function(){
        var that = this;
        wx.request({
            //判断用户是否存在未删除的入驻申请
            url: app.globalData.globalUrl + '/space/apply/existence',
            header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
            success: function(res){
              console.log(res.data);
              that.setData({
                // tips: res.data.message,
                status: res.data.status
              });
              if(res.data.status == 0)
                    that.setData({
                      name:'申请状态'
                    });
            }
      });
        wx.request({
            //获取后台老师上传的数据
            url: app.globalData.globalUrl + '/message/starSpace',
            header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
            success: function( res ){
              console.log(res.data);
              that.setData({
                tips: res.data.data
              });
            }
        });
  }
});
