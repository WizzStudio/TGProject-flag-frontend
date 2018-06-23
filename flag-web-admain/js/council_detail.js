
window.onload = function() {
    var thisURL = document.URL.split("?")[1];
    var data = decodeURI(thisURL).split("&"); //decodeURI(url) 解码函数；
	var id = data[0].split("=")[1];
	var placeName = data[1].split("=")[1];
	$("#number").text(placeName);

	$(function () {
        $.ajax({
            beforeSend : function(request) {
                request.setRequestHeader("Authorization", localStorage.getItem('verification'));
            },
            type:"GET",
            url:"http://flagadmin.zhengsj.top/message/council",
            success: function(res,status){
                if(status === 'success'){
                    console.log(res.data);
                    document.getElementById("councilMsg").value = res.data;
                }
            }
        });
        $("#btn").click(function(){
            var values = document.getElementById("councilMsg").value;
            $.ajax({
                beforeSend : function(request) {
                    request.setRequestHeader("Authorization", localStorage.getItem('verification'));
                },
                type:"POST",
                url:"http://flagadmin.zhengsj.top/message/council",
                data: {
                  'content' : values
                },
                success: function(res,status){
                    if(status == 'success'){
                        alert("您已将信息上传成功！")
                    }
                }
            })
        })
    });

		$(document).ready(function() {
		$.ajax({
            beforeSend : function(request) {
                request.setRequestHeader("Authorization", localStorage.getItem('verification'));
            },
			type:"GET",
			url:"http://flagadmin.zhengsj.top/councilOrder/pending/" + id,
			success: function(data,status) {
            	if(status == 'success') {
                    var obj = data;
                    console.log(obj);
                    dealData(obj);
                }
			},
			error:function(jqXHR) {
				alert("发生错误：" + jqXHR.status);
			}
		})
	});
	function dealData(obj) {
		var	templateApplicationInformation = `
		 <div style="overflow:hidden;">
	       <div class="maintable table-responsive">
	          <table class="table">
	            <tbody>
	     
	            </tbody>
	          </table>
	      </div>
	    </div>
	     <div class="order">
	      	<h3> 本天已被预定的时间：</h3>
	      	<div id="time" class="time">
	      	</div>
	      </div>
	  `;
			var dataArray = obj.data;
			for(let i = 0; i < dataArray.length; i++) {
				var everyObj = dataArray[i];
				var date = everyObj.date;
				var orderItem = everyObj.orderItem;
				var completedTime = everyObj.completedTime;
			
				$("#bidHead").after(templateApplicationInformation);
				fillData(date, orderItem, completedTime, i);
			}
		}
		//将数据填充到HTML中
		function fillData(time, item, completed, num) {
            var date;
            var borrowingTime;
            var teamName;
            var eventName;
            var approvalStatus;

            date = time.substring(0,10);
            for (let i = 0; i < item.length; i++) {
                borrowingTime = new Date(item[i].startTime).toLocaleString('zh',{hour12:false}).substring(10,15) + '-' + new Date(item[i].endTime).toLocaleString('zh',{hour12:false}).substring(10,15);
                teamName = item[i].teamName;
                eventName = item[i].activityName;
                id = item[i].id;
                if (item[i].state == 0)
                    approvalStatus = "审核中";
                else if (item[i].state == 1)
                    approvalStatus = "二级已拒绝";
                else if(item[i].state == 2)
                    approvalStatus = "一级已拒绝";
                else if (item[i].state == 3)
                    approvalStatus = "二级不确定";
                else if(item[i].state == 2)
                    approvalStatus = "二级已同意";
                else if(item[i].state == 2)
                    approvalStatus = "一级已同意";
                var applicationInformation = ` 
	  	<tr> 
			 <td>${date}</td> 
			 <td>${borrowingTime}</td>
			 <td>${teamName}</td>
			 <td>${eventName}</td>
			 <td>${approvalStatus}</td>
			 <td><a href="councilpendingdetail.html?data=${id}" >查看</a></td>
	   </tr> 
	  `;
                (function (i) {
                    $("tbody:eq(1)").append(applicationInformation);
                })(num)
            }
            if (completed.length != 0) {
                $("#time:eq(0)").empty();
                for (let j = 0; j < completed.length && j<5; j++) {
                    var completeTime = new Date(completed[j].startTime).toLocaleString('zh',{hour12:false}).substring(10,15) + "-" +
                        new Date(completed[j].endTime).toLocaleString('zh',{hour12:false}).substring(10,15);
                    var str = `${completeTime}<br>`;
                    $("#time:eq(0)").append(str);
                }
            } else {
                $("#time:eq(0)").append("暂无");
            }
        }

};