
$(document).ready(function() {
		$.ajax({
			beforeSend : function(request) {
			request.setRequestHeader("Authorization", localStorage.getItem('verification'));
			},
			type:"GET",
			url:"http://flagadmin.zhengsj.top/spaceApply/pending",
			dataType:"text",
		
			success: function(data) {
				var obj = JSON.parse(data);
					dealData(obj);
			},
			error:function(jqXHR) {
				alert( jqXHR.status);
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
