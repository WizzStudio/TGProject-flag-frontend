
function formatTime(time) {
    let currentTime = time.replace(/\-/g,'/');
    return currentTime.replace(/T/g,' ');
}
$(document).ready(function() {
		$.ajax({
			beforeSend : function(request) {
			request.setRequestHeader("Authorization", localStorage.getItem('verification'));
			},
			type:"GET",
			url:"http://flagadmin.zhengsj.top/spaceApply/pending",

			success: function(data) {
					dealData(data);
			},
			error:function(jqXHR) {
				alert("错误" + jqXHR.status);
			}
		})
});
	function dealData(obj) {
		
		var arr = obj.data;
		// console.log(arr);
		var teamName;
	
		for(let i = 0; i < arr.length; i++) {
			teamName = arr[i].teamName;
			var time = arr[i].createTime;
			let currentTime = formatTime(time);
            var dateTime = new Date(currentTime).toLocaleString('zh',{hour12:false});
			id = arr[i].id;
				var str = `
				<div class="border">
					<span class="teamname">${teamName}  ${dateTime}--------<a href="star_pending_detail.html?data=${id}"  class="please">申请入驻</a></span>
				</div>
		`;
			$("#team").append(str);
		}
	}
