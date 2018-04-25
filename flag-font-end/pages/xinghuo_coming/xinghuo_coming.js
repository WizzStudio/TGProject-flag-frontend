var app = getApp();

Page({

  data: {
    profession:[
         {value: '互联网+' , checked: true},
         {value: '智能硬件'},
         {value: '其它'}
    ],
    style: [
        {value1: '个人', checked: true},
        {value1: '与人合作'}
    ]
  },
    radioChange_field: function(e){
       this.setData({
         field: e.detail.value
       });
      console.log(e.detail.value)
    },
    radioChange_opreations: function(e){
      console.log(e.detail.value)
       this.setData({
         operations: e.detail.value
       })
    },
    formSubmit: function(e){
        console.log(e.detail.value);
        wx.request({
          url : app.globalData.globalUrl + '/space/apply',
          header: {
             'content-type':'application/x-www-form-urlencoded',
             'Cookie':'JSESSIONID=' + app.globalData.globalSession
          },
          data:{
            name: e.detail.value.name,
            studentId: e.detail.value.studentId,
            phone: e.detail.value.phone,
            academy: e.detail.value.academy,
            discipline: e.detail.value.discipline,
            qq: e.detail.value.qq,
            email: e.detail.value.email,
            dormitory: e.detail.value.dormitory,
            teamName: e.detail.value.teamName,
            website: e.detail.value.website,
            field: e.detail.value.field,
            operations: e.detail.value.operations,
            name1: e.detail.value.name1,
            position1: e.detail.value.position1,
            phone1: e.detail.value.phone1,
            job1: e.detail.value.job1,
            name2: e.detail.value.name2,
            position2: e.detail.value.position2,
            phone2: e.detail.value.phone2,
            job2: e.detail.value.job2,
            name3: e.detail.value.name3,
            position3: e.detail.value.position3,
            phone3: e.detail.value.phone3,
            job3: e.detail.value.job3,
            name4: e.detail.value.name4,
            position4: e.detail.value.position4,
            phone4: e.detail.value.phone4,
            job4: e.detail.value.job4,
            discription: e.detail.value.discription,
            content: e.detail.value.content,
            plan: e.detail.value.plan,
            other: e.detail.value.other
          },
          method : 'POST',
          success : function(res){
            // console.log(res.data);
            if(res.statusCode == 200){
              wx.showModal({
                title: '温馨提示',
                content: '申请已成功提交',
                showCancel: false,
                success: function(res) {
                  wx.navigateTo({
                    url: '../xinghuo/xinghuo'
                  });
                }
              });
            }
          }
        })
    }
})
