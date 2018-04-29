// localStorage.setItem('verification','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjowLCJleHAiOjE1MjY4MDM1MjAsInVzZXJJZCI6MX0.DxB_HW2bpoiuXHr3Gc8lfupOLxO7x2tPWwgrJvBfZ6I');
$(document).ready(function() {
		$.ajax({
			beforeSend : function(request) {
			request.setRequestHeader("Authorization", localStorage.getItem('verification'));
			},
			type:"GET",
			url:"http://flagadmin.zhengsj.top/spaceApply/pending",
			dataType:"text",
		//	jsonp:"callback",
		
			success: function(data) {
				var obj = JSON.parse(data);
					dealData(obj);
			},
			error:function(jqXHR) {
				alert("·¢Éú´íÎó£º" + jqXHR.status);
			}
		})
})


	function dealData(obj) {
		
		var arr = obj.data;
		console.log(arr);
		var teamName;
	
		for(let i = 0; i < arr.length; i++) {
			teamName = arr[i].teamName;
				var str = `
				<div class="border">
				<p class="teamname">${teamName}-------<a href="入驻申请详情页.html" class="please">申请入驻</a></p>
			</div>
		`;
			$("#team").append(str);
		}
	}
