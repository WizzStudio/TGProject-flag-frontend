var app = getApp()
Page({
    data: {
        date: '2016-11-08',
        time: '12:00',
        time_other:'13:00',
        index: 0,
        disabled: true,
        pid: ''
    },
    formSubmit: function(e){
        // console.log(e.detail.value)
        // console.log(e.detail.target.dataset.pid)
        wx.request({
            url: app.globalData.globalUrl + '/placeOrder/',
            data:{
                department: e.detail.value.department,
                content: e.detail.value.content,
                activity: e.detail.value.activity,
                people: e.detail.value.people,
                prop: e.detail.value.prop,
                admin: e.detail.value.admin,
                phone: e.detail.value.phone,
                pid: e.detail.target.dataset.pid,
                startTime: e.detail.value.date + ' ' + e.detail.value.startTime + ":000",
                endTime: e.detail.value.date + ' ' + e.detail.value.endTime + ":000"
            },
            header:{
                'content-type':'application/x-www-form-urlencoded',
                'Cookie':'JSESSIONID=' + app.globalData.globalSession
            },
            method:"POST",
            success:function(res){
                if(res.statusCode == 200){
                  wx.showModal({
                    title: '温馨提示',
                    content: '申请已成功提交',
                    showCancel: false,
                    success: function(res){
                      if(res.confirm){
                        wx.switchTab({
                          url: '../index/index'
                          })
                        }
                      }
                  });
                  setTimeout(function(){
                    wx.hideToast()
                  },6000);
                }
            }
        })
    },
    confine:function(e){
        var that = this
        wx.request({
            url: app.globalData.globalUrl + '/department/authCode',
            header:{
                'Cookie':'JSESSIONID=' + app.globalData.globalSession
            },
            data:{
                authCode: e.detail.value
            },
            success:function(res){
                if(res.statusCode == 200){
                  that.setData({
                    disabled : false
                  });
                  wx.showToast({
                    title: '验证成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                else {
                  wx.showToast({
                    titie: '验证失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
            }
        })
    },
    onLoad: function (options) {
        // console.log(options.pid)
        this.setData({
            pid: options.pid
        })
    },
    bindKeyInput: function(e){

},
    //  点击时间组件确定事件
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindTimeChange_other: function (e) {
        this.setData({
            time_other: e.detail.value
        })
    },
    //  点击日期组件确定事件
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    }

 })
