var app = getApp();

Page({
  data: {
    array: ['社长/部长', '副社长/副部长', '干事'],
    index : 0,
    name: '',
    studentId: '',
    post: ''
  },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },
  input_name: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  input_number: function(e) {
    this.setData({
      studentId: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    });
  },

  formSubmit: function(e) {

    //获取个人信息并在本地缓存 同步wx.setStorageSync()  异步 wx.setStorage()
    var objData = e.detail.value;
    if (this.data.index == '0') {
        this.setData ({
            post: '社长/部长'
        });
    }
    else if (this.data.index == '1') {
        this.setData({
            post: '副社长/副部长'
        });
    }
    else if (this.data.index == '2') {
        this.setData({
            post: '干事'
        });
    }

    wx.setStorageSync("name",objData.name);
    wx.setStorageSync("studentId",objData.studentId);
    wx.setStorageSync("index",this.data.index);

    var flag = true;
    var warn = '';
    if (e.detail.value.name == null || e.detail.value.name == '' || e.detail.value.studentId == null || e.detail.value.studentId == '') {
      warn = "请填写完整您的个人信息"
    } else {
      flag = false;
      var that = this;
      //获取本地缓存sessionId
      wx.request({
        url: app.globalData.globalUrl + '/user',
        method: "PUT",
        data:{
            name : e.detail.value.name,
            studentId: e.detail.value.studentId,
            position: that.data.post
        } ,
        header: {
          'content-type': 'application/json',
          'Cookie': 'JSESSIONID=' + app.globalData.globalSession
        },
        success: function(res) {
            if(res.statusCode === 200) {
                wx.switchTab({
                    url: '../xinghuo/xinghuo'
                });
            }
        }
      })
    }
    if (flag == true) {
      wx.showModal({
        title: '警告',
        content: warn
      })
    }
  },
  onShow: function(options) {
    
    let names = wx.getStorageSync('name');
    let studentIds = wx.getStorageSync('studentId');
    let index1 = wx.getStorageSync('index') || 0;

    if( (index1 !== null || index1 !== "") ){
        this.setData({
            name : names,
            studentId : studentIds,
            index :index1
        })
    }
  },
  onUnload: function() {
    wx.switchTab({
        url: '../mine/mine'
    })
  },
  onLoad: function () {
      wx.showShareMenu({
          withShareTicket: true
      })
  }
})
