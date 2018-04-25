var app = getApp();
var timedate = (new Date()).toLocaleString().split(' ');
timedate[0] = timedate[0].replace(/\//g,'-');
// console.log(timedate[0]);
// var dates = timedate[0].split('-');
Page({
    data: {
        dateTime: timedate[0],
        pid: ''
    },
    showsomething:function(){
    },
    change_dateTime: function(e){
        // function getTime(time) {
        //   var hour = time.getHours();
        //   var min = time.getMinutes();
        //   return hour+'-'+min;
        //  }
        this.setData({
          dateTime: e.detail.value
        });
        var that = this;
        wx.request({
          url: app.globalData.globalUrl + '/place/'+ that.data.pid +'/' + this.data.dateTime,
          header: {'Cookie':'JSESSIONID=' + app.globalData.globalSession},
          success:function(res){
            console.log(res.data);
            // getTime(res.data.date.successTime,res.data.data.timing);
            for (var i = 0; i < res.data.data.successTime.length; i++) {
              res.data.data.successTime[i].startTime = new Date(res.data.data.successTime[i].startTime).toLocaleString('zh',{hour12:false}).split(" ")[1];
              res.data.data.successTime[i].endTime = new Date( res.data.data.successTime[i].endTime).toLocaleString('zh',{hour12:false}).split(" ")[1];
            }
            for (var i = 0; i < res.data.data.timing.length; i++) {
              res.data.data.timing[i].startTime = new Date(res.data.data.timing[i].startTime).toLocaleString('zh',{hour12:false}).split(" ")[1];
              res.data.data.timing[i].endTime = new Date( res.data.data.timing[i].endTime).toLocaleString('zh',{hour12:false}).split(" ")[1];
            }
            that.setData({
              room_message: res.data
            })
          }
        })
    },
    continue: function(e){
      // console.log(e.currentTarget)
      wx.navigateTo({
        url:'../manage/manage?pid=' + e.currentTarget.dataset.pid
        })
    },
    onLoad:function(options){
      // console.log(options.pid)
      this.setData({
        pid : options.pid
      })
      var that = this
      wx.request({
        url: app.globalData.globalUrl + '/place/'+ options.pid +'/' + timedate[0],
        header: {'Cookie':'JSESSIONID=' + app.globalData.globalSession},
        success:function(res){
          // console.log(res.data);
          that.setData({
            room_message: res.data
          })
        }
      })
    }

})
