Page({  
  
  /** 
   * 页面的初始数据 
   */  
  data: {  
      
  },  
  //确认发布  
  goDetail:function(e){  
    setTimeout(()=>{  
      var subValue = e.detail.value.textarea  
      console.log(subValue)  
      if (subValue == null || subValue == "") {  
        console.log("不能为空")  
        this.setData(  
          { popErrorMsg: "发布的留言内容不能为空" }  
        );   
        this.ohShitfadeOut();   
        return;        
      }  
       
    },100)  
     
  },  
//定时器提示框3秒消失  
  ohShitfadeOut() {  
    var fadeOutTimeout = setTimeout(() => {  
      this.setData({ popErrorMsg: '' });  
      clearTimeout(fadeOutTimeout);  
    }, 3000);  
  },  
  
})  