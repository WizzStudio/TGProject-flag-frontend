var app = getApp()

Page({
  data: {
    positions: ['社长/部长', '副社长/副部长', '干事'],
    position: 0,
    did: 0,
    name: '',
    studentId: '',
    post: '',
    disabled: true
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
      position : e.detail.value
    })
  },
  bindPickerChange_department: function(e) {
    this.setData({
      did : e.detail.value
    })
  },
  //1.0版本 目前并没有进行表单验证 迭代时再补
  formSubmit: function(e) {
    console.log(e.detail.value);
    //获取个人信息并在本地缓存 同步wx.setStorageSync()  异步 wx.setStorage()
    var objData = e.detail.value;
    wx.setStorageSync("name",objData.name);
    wx.setStorageSync("studentId",objData.studentId);
    wx.setStorageSync("position",objData.position);
    wx.setStorageSync("did",objData.did);

    var flag = true;
    var warn = '';
    if (e.detail.value.name == null || e.detail.value.name == '' || e.detail.value.studentId == null || e.detail.value.studentId == '') {
      warn = "请填写完整您的个人信息"
    } else {
      flag = false;
      var that = this
      //获取本地缓存sessionId
      wx.request({
        url: app.globalData.globalUrl + '/user',
        method: "PUT",
        data: e.detail.value,
        header: {
          'content-type': 'application/json',
          'Cookie': 'JSESSIONID=' + app.globalData.globalSession
        },
        success: function(res) {
          that.setData({
            disabled: false
          })
          wx.setStorageSync("disabled", that.data.disabled);
          wx.switchTab({
            url: '../index/index'
          })
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
  formReset: function(e) {
    this.setData({
      name: '',
      studentId: '',
      position: 0,
      did: 0
    });
  },
  onLoad: function(options) {
    // console.log(this.data.name);
    var name = wx.getStorageSync("name");
    var studenId = wx.getStorageSync("studenId");
    var did = wx.getStorageSync("did");
    var position = wx.getStorageSync("position");
    var disabled = wx.getStorageSync("disabled");
    console.log(name);
      this.setData({
        name : name,
        studenId : studenId,
        did : did,
        position : position,
        disabled : disabled
      });

    var that = this;
    wx.request({
      url: 'http://flagtestj.zhengsj.top/department',
      success: function(res) {
        that.setData({
          department: res.data.data
        })
      }
    })
  }
  // onShow: function(options) {
  //     var name = wx.getStorageSync("name");
  //     var studenId = wx.getStorageSync("studenId");
  //     var did = wx.getStorageSync("did");
  //     var position = wx.getStorageSync("position");
  //     if(name && studenId && did && position){
  //       this.data.name = name;
  //       this.data.studenId = studenId;
  //       this.data.did = did;
  //       this.data.position = position;
  //     }



})
