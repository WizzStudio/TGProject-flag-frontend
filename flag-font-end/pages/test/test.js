var app = getApp();
Page({
    data: {
        date: '请设置',
        time: '请设置',
        time1: '请设置',
        pretime: ''

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
    }


});

