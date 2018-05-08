var Nestable = function() {

	$.ajax({
		url: "exchange-fakedata.json", //json文件位置
		type: "GET", //请求方式为get
		dataType: "json", //返回数据格式为json
		success: function(data) { //请求成功完成后要执行的方法
			sessionStorage.setItem('infoDATA', JSON.stringify(data));
			nestableFn(data);
		}
	});

	var nestableFn = function(data) {
		//标题
		$('.nestable_title').text(data.TopographyName);

		//切割数据
		var Datas = data.GroupList;
		//内网数据
		var IntranetData = Datas.splice(0, 4)
		IntranetData.sort(SortBy('OrderBy', true, parseInt));
		console.log("内网数据: ", IntranetData);
		//DNS数据
		var DNSData = Datas.splice(0, 1)
		DNSData[0].ServerList.sort(SortBy('OrderBy', true, parseInt));
		console.log("DNS数据: ", DNSData);

		//ARR数据
		var ARRData = Datas.splice(0, 1);
		ARRData[0].ServerList.sort(SortBy('OrderBy', true, parseInt));
		console.log("ARR数据: ", ARRData);
		//EDGE数据
		var EDGEData = Datas.splice(0, 1);
		EDGEData[0].ServerList.sort(SortBy('OrderBy', true, parseInt));
		console.log("EDGE数据: ", EDGEData);

		var createOl = '';

		creatTree(IntranetData);
		creatTree(DNSData);
		creatTree(ARRData);
		creatTree(EDGEData);

		function creatTree(json) {
			createOl +='<ol class="dd-list">';
			$.each(json, function(index, layer) {
				
				//分类服务器组数
				var dataId = layer.GroupName + index;
				createOl += '<li class="dd-item  dd_item_nestable"  data-id="' + dataId + '"><div class="dd-handle">' + layer.GroupName + '</div>';
				if(layer.ServerList.length) {
					//每组服务器台数
					createOl += '<ol class="dd-list">';
					$.each(layer.ServerList, function(a, jataA) {
						var dataId = jataA.ServerName + index;
						createOl += '<li class="dd-item " data-id="' + dataId + '"><div class="dd-handle">\
										<span>' + jataA.ServerName + '</span>\
										<span> <img style="position: relative;top: -1px;"  src="'+GetStateIcon(jataA.ServerState, "imgs/")+'" height="15" /></span>\
									</div>';
						//每台服务器内存
						createOl += '<ol class="dd-list"><li class="dd-item" data-id=""><div class="dd-handle">\
										RAM:<span style="margin-right:5px; margin-left:5px;">'+(Math.round((jataA.UsedRAMMB / 1024) * 10) / 10) + "/" + (Math.round((jataA.TotalRAMMB / 1024) * 10) / 10)+'GB</span>\
										<span style="margin-right:5px;">'+Math.round((Math.round((jataA.UsedRAMMB / 1024) * 10) / 10) / (Math.round((jataA.TotalRAMMB / 1024) * 10) / 10) * 100) + '%</span>\
										<span> <img style="position: relative;top: -1px;"  src="'+GetStateIcon(jataA.RAMState, "imgs/")+'" height="15" /></span>\
									</div>';

						createOl += '</li>';
						createOl += '<li class="dd-item" data-id=""><div class="dd-handle">磁盘</div>';
						if(jataA.DiskList.length) {
							//每台服务器磁盘
							createOl += '<ol class="dd-list">';
							$.each(jataA.DiskList,function(b,jataB){
								var dataId = jataB.ServerName + index;
								createOl +='<li class="dd-item" data-id="'+dataId+'"><div class="dd-handle">\
									<span style="margin-right:5px;">' + jataB.Symbol+'</span>\
									<span style="margin-right:5px;">'+(Math.round((jataB.UsedMB / 1024) * 10) / 10) + "/" + (Math.round((jataB.TotalMB / 1024) * 10) / 10)+'GB</span>\
									<span>'+Math.round((Math.round((jataB.UsedMB / 1024) * 10) / 10) / (Math.round((jataB.TotalMB / 1024) * 10) / 10) * 100) + '%</span>\
									<span> <img style="position: relative;top: -1px;"  src="'+GetStateIcon(jataB.DiskState, "imgs/")+'" height="15" /></span>\
								</div>';
							});
							createOl += '</li></ol>';
						}

						createOl += '<li class="dd-item" data-id=""><div class="dd-handle">检查点</div>';
						if(jataA.CheckPointList.length) {
							//每台服务器检查点
							createOl += '<ol class="dd-list">';
							$.each(jataA.CheckPointList,function(c,jataC){
							var dataId = jataC.ServerName + index;
							createOl +='<li class="dd-item" data-id="'+dataId+'"><div class="dd-handle">\
											<span> <img style="position: relative;top: -2px;" src="imgs/'+ jataC.IconRefFlag +'.png" height="15" style=""/></span>\
											<span>'+jataC.CheckPointDisplayName+'</span>\
											<span> <img style="position: relative;top: -1px;" src="'+GetStateIcon(jataC.CheckPointState, "imgs/")+'" height="15" /></span>\
										</div>';
							
							});
							createOl += '</li></ol>';
						}

						createOl += '</ol>';

					})
					createOl += '</li></ol>';
				}
			});

			createOl += '</li></ol>';

		}

		function SortBy(filed, asc, primer) {
			asc = (asc) ? 1 : -1;
			return function(a, b) {
				a = a[filed];
				b = b[filed];
				if(typeof(primer) != 'undefined') {
					a = primer(a);
					b = primer(b);
				}
				if(a < b) {
					return asc * -1;
				}
				if(a > b) {
					return asc * 1;
				}
				return 1;
			}
		};

		function GetStateIcon(state, prefix) {
			var suffix = "";
			if(state - 1 == 0)
				suffix = "info.png";
			else if(state - 1 == 1)
				suffix = "warning.png";
			else
				suffix = "error.png";
			return prefix + suffix;
		}
		
		function GetStateColor(state) {
			var clr = "#F00";
			if(state - 1 == 0)
				clr = "#1afa29";
			else if(state - 1 == 1)
				clr = "#FF0";
			return clr;
		}

		$('#nestable_list').html(createOl);

		$('.dd_item_nestable').nestable();
		$('.dd_item_nestable').nestable('collapseAll');
	}

}();