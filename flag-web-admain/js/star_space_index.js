window.onload = function() { 
	function noOrYesForReview() {
		let inNoReviewApplicationQuantity = {
			roomOne :1,
			roomTwo :2,
			roomThree: 3,
			settleRoom: 4,
		};

	 let inYesReview = {
	 	 placeName : '会务室申请', 
		 applicationTeam: "为之工作室",
		 applicationTime: "2018-02-05", 
		 applicationStatus:"二级同意",
	 };
	 
		let noReviewTable = `
						<thead>
	            <tr class="head">
	              <th>地点名称</th>
	              <th>申请数量</th>
	              <th>详细信息</th></tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>会务室1</td>
	              <td>${inNoReviewApplicationQuantity.roomOne}</td>
	              <td><a href="会务室详情页.html">查看</a></td></tr>
	            <tr>
	              <td>会务室2</td>
	              <td>${inNoReviewApplicationQuantity.roomTwo}</td>
	              <td><a href="会务室详情页.html">查看</a></td></tr>
	            <tr>
	              <td>会务室3</td>
	              <td>${inNoReviewApplicationQuantity.roomThree}</td>
	              <td><a href="会务室详情页.html">查看</a></td></tr>
	            <tr>
	              <td>星火众创空间入驻申请</td>
	              <td>${inNoReviewApplicationQuantity.settleRoom}</td>
	              <td><a href="入驻申请页.html">查看</a></td></tr>
	          </tbody>
	          `;
	   let yesRivewTable = `
	   				<thead>
	            <tr class="head">
	              <th>地点名称</th>
	              <th>申请团队</th>
	              <th>申请时间</th>
	              <th>审核状态</th>
	              <th>详细信息</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>${inYesReview.placeName}</td>
	              <td>${inYesReview.applicationTeam}</td>
	              <td>${inYesReview.applicationTime}</td>
	              <td>${inYesReview.applicationStatus}</td>
	              <td><a href="会务室申请详情页.html">查看</a></td>
	           </tr>
	           <tr>
	              <td>入驻申请</td>
	              <td>EPI</td>
	              <td>2018-23-09</td>
	              <td>二级同意</td>
	              <td><a href="入驻申请详情页.html">查看</a></td>
	           </tr>
	         </tbody>
	   `;
	   var noReviewElement = document.getElementById("noReview");
	   var yesReviewElement = document.getElementById("yesReview");
	   var elementTable = document.getElementById("table");	
	   noReviewElement.onclick = function() {
	   		yesReviewElement.style.background = "#EC971F";
	   		this.style.background = "red";
	   		this.selected = "true";
	   		yesReviewElement.selected = "false";
	  		elementTable.innerHTML = noReviewTable;
	   }
	   yesReviewElement.onclick = function() {
	   		noReviewElement.style.background = "#EC971F";
	   		this.style.background = "red";
	   		this.selected = "true";
	   		noReviewElement.selected = "false";
	  		elementTable.innerHTML = yesRivewTable;
	 	 }
	}

noOrYesForReview();
}