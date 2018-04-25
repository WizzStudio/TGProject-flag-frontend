var app = getApp();
var timedate = (new Date()).toLocaleString().split(' ')
timedate[0] = timedate[0].replace(/\//g,'-')
Page({
  data: {
    index: 0,
    notice:'',
    room:[],
    dateTime: timedate[0],
    dayTime: '09:00',
    dayTime1: '09:00'
  },

  get_room: function(e){
    this.setData({
      index: e.detail.value
    });
  },
  change_date_Time: function(e){
    this.setData({
      dateTime: e.detail.value
    });
  },
  change_time_endTime: function(e){
    this.setData({
      dayTime1: e.detail.value
    })
  },
  change_time_startTime: function (e) {
    this.setData({
      dayTime: e.detail.value
    })
  },
  formSubmit:function(e){
    console.log(e.detail.value);
    var that = this;
    wx.request({
    url: app.globalData.globalUrl + '/councilOrder',
    header: {
      'content-type':'application/x-www-form-urlencoded',
      'Cookie':'JSESSIONID=' + app.globalData.globalSession
    },
    data: {
      teamName: e.detail.value.teamName,
      activityName: e.detail.value.activityName,
      activityForm: e.detail.value.activityForm,
      cid: this.data.room[this.data.index].optVal,
      peopleSchoolIn: e.detail.value.peopleSchoolIn,
      peopleSchoolOut: e.detail.value.peopleSchoolOut,
      securityAdmin: e.detail.value.securityAdmin,
      securityMeasure: e.detail.value.securityMeasure,
      phone: e.detail.value.phone,
      equipment: e.detail.value.equipment,
      startTime: e.detail.value.date_Time + ' ' + e.detail.value.time_startTime + ':00',
      endTime: e.detail.value.date_Time + ' ' + e.detail.value.time_endTime + ':00'
    },
    success: function(res){
      if(res.statusCode == 200){
        wx.showModal({
          title:'温馨提示',
          content:'申请已成功提交',
          showCancel: false,
          success: function(){
            wx.navigateTo({
              url: '../xinghuo/xinghuo'
            });
          }
        });
      }
      }
    });
  },
  onLoad: function (options) {
     var that = this;
     wx.request({
         url: app.globalData.globalUrl +  '/council',
         header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession  },
         success: function(res) {
            // console.log( res.data.data );
             that.setData({
                // notice: res.data.message,
                room: res.data.data,
                status: res.data.status,
             });
         }
     });
     wx.request({
       url: app.globalData.globalUrl + '/message/council',
       header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession  },
       success: function(res) {
         // console.log(res.data);
          that.setData({
            notice: res.data.data
          })
       }
     })
  }

})
