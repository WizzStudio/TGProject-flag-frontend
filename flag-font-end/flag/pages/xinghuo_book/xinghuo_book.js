var app = getApp();
var timedate = (new Date()).toLocaleString().split(' ')
timedate[0] = timedate[0].replace(/\//g,'-')
Page({
  data: {
    index: 0,
    notice:'',
    room:[],
    dateTime: timedate[0],
    date: '请选择',
    time: '请选择',
    time1: '请选择',
    pretime: ''

  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  get_room: function(e){
    this.setData({
      index: e.detail.value
    });
  },

    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value,
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value,
            pretime: e.detail.value
        })
    },
    bindTimeChange1: function(e) {
        this.setData({
            time1: e.detail.value
        })
    },
  formSubmit:function(e){
    console.log(e.detail.value);
    var that = this;
    if (e.detail.value.activityName == null || e.detail.value.activityName == '') {
        wx.showModal({
            title: '提示',
            content: '请完善表单信息!',
        })
    }
    else 
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
      startTime: e.detail.value.date + ' ' + e.detail.value.time + ':00',
      endTime: e.detail.value.date + ' ' + e.detail.value.time1 + ':00'
    },
        method: 'POST',
    success: function(res){
      if(res.statusCode == 200){
        // console.log(res);
        wx.showModal({
          title:'温馨提示',
          content:'申请已成功提交',
          showCancel: false,
          success: function(){
            wx.switchTab({
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
            if( res.statusCode == 200 ){ 
                that.setData({
                    // notice: res.data.message,
                    room: res.data.data,
                    status: res.data.status,
                });
            }
         }
     });
     wx.request({
       url: app.globalData.globalUrl + '/message/council',
       header: { 'Cookie':'JSESSIONID=' + app.globalData.globalSession  },
       success: function(res) {
         // console.log(res.data);
         if( res.statusCode == 200 ) {
             that.setData({
                 notice: res.data.data
             })
         }
       }
     });
    wx.showShareMenu({
        withShareTicket: true
    });

  }

})
