Page({
    data: {
        height: 20,
        focus: false
    },
    bindButtonTap: function () {
        this.setData({
            focus: true
        })
    },
    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
    },
    bindFormSubmit: function (e) {
        console.log(e.detail.value.textarea)
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },
    onLoad: function(){
        //调用登录接口，获取 code  
        wx.login({
            success: function (res) {
                var code = res.code
                console.log(code)
                if(res.code){
                    wx.request({
                        url: 'http://flagtestj.zhengsj.top/user/login',
                        data: {
                            code: res.code
                        },
                        method: 'POST',
                        success: function(res){
                            console.log(res.data)
                        }
                    })
                }
            }
        })
    }
})