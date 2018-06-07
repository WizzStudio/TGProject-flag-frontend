var app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    messages: [],
  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  navigation1: function(){
    wx.navigateTo({
      url: '../xinghuo_book/xinghuo_book',
    });
  },
  onShow: function () {
      var that = this;
      wx.request({
        //获取用户提交过的申请
        url: app.globalData.globalUrl + '/councilOrder/status',
        method: 'GET',
        header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession },
        success: function(res){
        if( res.statusCode == 200 ) {

            // var objData =  res.data.data;
            var objData = [{
                "feedback": null,
                "activityName": "啦啦",
                "endTime": "2017-09-01T09:45:00.000+0000",
                "startTime": "2017-09-01T09:43:00.000+0000",
                "state": 2
            }, {
                "feedback": null,
                "activityName": "啦啦",
                "endTime": "2017-09-01T09:45:00.000+0000",
                "startTime": "2017-09-01T09:43:00.000+0000",
                "state": 1
                }, {
                    "feedback": null,
                    "activityName": "啦啦",
                    "endTime": "2017-09-01T09:45:00.000+0000",
                    "startTime": "2017-09-01T09:43:00.000+0000",
                    "state": 5}];
            var obj = [];
            for(let i = 0; i< objData.length;  i++ ){
                let dateTime = objData[i].startTime.substring(0, 10) ;
                let dayTime = objData[i].startTime.substring(11, 16) + '~' + objData[i].endTime.substring(11, 16) ;
            let Time =  dateTime +' '+ dayTime;
            let activityName = objData[i].activityName;
            if (objData[i].state == 2  ){
                obj[i] = '同学，你好! '+ ' \n ' +'不好意思，在' + Time + '\ \n你申请的活动：' + activityName + '  未通过审核！'
            }
            else if (objData[i].state == 5) {
                obj[i] = '同学，你好！\n在' + Time + ' \n你申请的活动：' + activityName + '  已通过审核！'
            }
            else  {
                obj[i] = '同学，你好 ! \n 在' + Time + ' \n 你申请的活动：' + activityName + '  正在审核中！'
            }   
            }
            
            that.setData({
                messages: obj
            });

        }
        }
      });
  }
})
