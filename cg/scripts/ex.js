$(function() {
	$.ajax({
		url: "ex.json", //json文件位置
		type: "GET", //请求方式为get
		dataType: "json", //返回数据格式为json
		success: function(data) { //请求成功完成后要执行的方法
			Draw($('#cvs'), data);
		}
	});
});

function Draw(cvs, data) {
	console.log(data);

	var Group_List      = data.GroupList;
	
	var EX_INTRANET     = Group_List[0];
	var EX_MAIL_GATEWAY = Group_List[1];
	var EX_ARR          = Group_List[2];
	var EX_EDGE         = Group_List[2];

	cvs.addLayer({
	    type: 'image',
	    source: $('#img-itsm-bg')[0],
	    x: 0, y: 0,
	    index: -1,
	    width: 1920,
	    height: 1080,
	    fromCenter: false
	})


















	cvs.drawLayers();

}


