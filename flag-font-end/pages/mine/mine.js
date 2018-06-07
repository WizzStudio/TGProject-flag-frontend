//mine.js
//获取应用实例
const app = getApp();
Page({
    data: {
        name: '',
        studentId: '',
        positions: '',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onPullDownRefresh: function () {
        setTimeout(function(){
            wx.stopPullDownRefresh();
        },1000);
    },

    change_inf: function(){
        wx.navigateTo({
            url: '../identity/identity'
        })
    },
    onShow: function () {
        let name = wx.getStorageSync("name");
        let studentId = wx.getStorageSync("studentId");
        var index = wx.getStorageSync("index");
  
        if(name !== null && studentId !== null && index !== null){
            this.setData({
                name : name,
                studentId : studentId,
            })
        
        if(index == '0'){
            this.setData({
                positions: '社长/部长'
            });
        }
        if(index == '1'){
            this.setData({
                positions: '副社长/副部长'
            });
        }
        if(index == '2'){
            this.setData({
                positions: '干事'
            });
        }
        }
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = function(res) {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: function(res) {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        // console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }

});
