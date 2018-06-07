$(function() {
	$.ajax({
		url: "s4b.json", //json文件位置
		type: "GET", //请求方式为get
		dataType: "json", //返回数据格式为json
		success: function(data) { //请求成功完成后要执行的方法
			draw($('#cvs'), data);
		},
		error: function (err) {
			console.log(err);
		}
	});
});

var cvsBrushStartPointX  = 168;
var cvsBrushStartPointY  = 140;
var eleWidth             = 150;
var eleHeight            = 265;
var eleHorizontalMargin  = 10;

var eleHorizontalSpacing = eleWidth / 18;
var eleVerticalSpacing   = eleHeight / 28;
var eleMarginRight       = eleHorizontalSpacing * 5;
var eleFontSize          = 12;

function draw(cvs, data) {

	var Group_List = data.GroupList;
	
	var S4B_OWA    = Group_List[0].MoList.reverse();
	var S4B_SQL    = Group_List[1].MoList.reverse();
	var S4B_FEPC   = Group_List[2].MoList.reverse();
	var S4B_EDGE   = Group_List[3].MoList.reverse();
	var S4B_ARR    = Group_List[4].MoList.reverse();

	cvs.addLayer({
	    type: 'image',
	    source: $('#img-s4b-bg')[0],
	    x: 0, y: 0,
	    index: -1,
	    width: 1920,
	    height: 1080,
	    fromCenter: false
	});

	S4B_FEPC.forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY, true);
		cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 166;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight * 1.24;
	eleWidth             = 150;
	eleHeight            = 265;
	S4B_SQL.forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY, true);
		cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 166;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight * 1.32;
	eleWidth             = 150;
	eleHeight            = 265;
	S4B_OWA.forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY, true);
		cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1633;
	cvsBrushStartPointY  = 235;
	eleWidth             = 150;
	eleHeight            = 265;
	S4B_EDGE.forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY, false);
		cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1557;
	cvsBrushStartPointY  = 600;
	eleWidth             = 150;
	eleHeight            = 265;
	S4B_ARR.forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY, false);
		cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvs.drawLayers();
}

function drawServer(cvs, ele, i, x, y, hasRope) {

	var w = eleWidth - 4.5 * eleHorizontalSpacing - eleMarginRight;
	var h = eleHeight - 2 * eleVerticalSpacing;

	cvs.addLayer({
	    // 服务器图标
	    type: 'image',
	    source: GetFeaturesIcon(ele.MOIcon),
	    x: x - eleWidth / 2,
	    y: y + eleVerticalSpacing + (w - eleMarginRight / 1.5) * 1.48 / 2,
	    width: w - eleMarginRight / 1.5,
	    height: (w - eleMarginRight / 1.5) * 1.48,
	    fromCenter: true,
	}).addLayer({
	    // 服务器状态图标
	    type: 'image',
	    source: GetStateIcon(ele.MoState),
	    x: x - eleWidth / 2,
	    y: y + eleMarginRight / 1.5,
	    width: eleMarginRight / 2,
	    height: eleMarginRight / 2
	}).addLayer({
	    // 服务器名称背板
	    type: 'rectangle',
	    fillStyle: '#3a75c5',
	    x: x - eleWidth / 2,
	    y: y + eleVerticalSpacing * 2.5 + (w - eleMarginRight / 1.5) * 1.48,
	    width: eleMarginRight * 3,
	    height: eleVerticalSpacing * 2,
	}).addLayer({
	    // 服务器名称
	    type: 'text',
	    fillStyle: '#FFF',
	    fontStyle: 'bold',
	    strokeWidth: 5,
	    x: x - eleWidth / 2,
	    y: y + eleVerticalSpacing * 2.5 + (w - eleMarginRight / 1.5) * 1.48,
	    fontSize: eleFontSize,
	    fontFamily: 'Microsoft YaHei',
	    text: ele.MODisplayName,
	});

    var eleUsedMemoryPct = '';
    var eleUsedDiskPct   = [];

    if (ele.MoState == 4) {
        eleUsedMemoryPct = '? %';
        eleUsedDiskPct.concat(['? %', '? %']);
    } else {
        eleUsedMemoryPct = ele.RAM.UsedPct;
        ele.DiskList.forEach(function(item) {
            eleUsedDiskPct.push(item.UsedPct);
        })
    }

    // Memory
    cvs.addLayer({
        // CPU名称
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x - eleWidth / 2,
        y: y + eleVerticalSpacing * 4.6 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Memory Time %',
    }).addLayer({
        // CPU使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 5,
        x: x - eleWidth / 2,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 3,
        height: eleVerticalSpacing * 2,
        cornerRadius: 5
    }).addLayer({
        // CPU使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.RAM.State),
        x: x - eleWidth + eleHorizontalSpacing * 1.5 + eleVerticalSpacing / 5,
        y: y + eleVerticalSpacing * 6.05 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 3 - eleVerticalSpacing / 3) * eleUsedMemoryPct / 100,
        height: eleVerticalSpacing * 1.6,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // CPU使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x - eleWidth / 2,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedMemoryPct + '%'
    })

    var drawDiskStartY = y + eleVerticalSpacing * 8.3 + (w - eleMarginRight / 1.5) * 1.48;
    // Disk
    ele.DiskList.forEach(function(item, i) {
        cvs.addLayer({
            // Disk图标
            type: 'image',
            source: GetFeaturesIcon('cp-disk'),
            x: x - eleWidth + eleHorizontalSpacing * 1.5,
            y: drawDiskStartY,
            width: eleHorizontalSpacing * 2.6,
            height: eleHorizontalSpacing * 2.6,
            fromCenter: false,
        }).addLayer({
            // Disk名称
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing * 2.2,
            y: drawDiskStartY + eleVerticalSpacing * 0.4,
            fontSize: eleFontSize * 1.2,
            fontFamily: 'Microsoft YaHei',
            text: item.Name + '  Free Disk %',
            fromCenter: false
        }).addLayer({
            // Disk使用率外框
            type: 'rectangle',
            strokeStyle: '#eee',
            strokeWidth: eleVerticalSpacing / 6,
            x: x - eleWidth / 2,
            y: drawDiskStartY + eleVerticalSpacing * 3.6,
            width: eleMarginRight * 3,
            height: eleVerticalSpacing * 2,
            cornerRadius: 5
        }).addLayer({
            // Disk使用率显示条
            type: 'rectangle',
            fillStyle: GetStateColor(ele.DiskList[i].State),
            x: x - eleWidth + eleHorizontalSpacing * 1.5 + eleVerticalSpacing / 6,
            y: drawDiskStartY + eleVerticalSpacing * 2.9,
            width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
            height: eleVerticalSpacing * 1.6,
            cornerRadius: 5,
            fromCenter: false
        }).addLayer({
            // Disk使用率
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth / 2,
            y: drawDiskStartY + eleVerticalSpacing * 3.6,
            fontSize: eleFontSize * 1.2,
            fontFamily: 'Microsoft YaHei',
            text: eleUsedDiskPct[i] + '%'
        })
        drawDiskStartY += eleVerticalSpacing * 5.5
    })

    var drawMPStartY = drawDiskStartY + eleVerticalSpacing * 4.5 - eleMarginRight * 0.8;

    ele.MPList.reverse().forEach(function (item, i) {
    	var displayNameLen = item.DisplayName.length;
    	var displayFontSize = eleFontSize * 1.3;
    	if (displayNameLen > 8) {
    		displayFontSize = eleHorizontalSpacing * 8 / displayNameLen * 2.2;
    	}
        cvs.addLayer({
            type: 'image',
            source: GetFeaturesIcon(item.MPIcon),
            x: x - eleWidth + eleHorizontalSpacing * 3,
            y: drawMPStartY,
            width: eleMarginRight * 0.8,
            height: eleMarginRight * 0.8,
        }).addLayer({
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing * 5.5,
            y: drawMPStartY - eleMarginRight * 0.15,
            fontSize: displayFontSize,
            fontFamily: 'Microsoft YaHei',
            text: item.DisplayName,
            fromCenter: false
        }).addLayer({
            type: 'image',
            source: GetStateIcon(item.State),
            x: x - eleWidth + eleHorizontalSpacing * 16,
            y: drawMPStartY,
            width: eleMarginRight * 0.5,
            height: eleMarginRight * 0.5,
        })
        drawMPStartY += eleVerticalSpacing * 3.5;
    })

    drawMPStartY -= eleVerticalSpacing * 1;

	cvs.addLayer({
        type: 'line',
        strokeStyle: '#00B0F0',
        strokeWidth: 3,
        strokeDash: [15, 10],
        x1: x - eleWidth, y1: y,
        x2: x, y2: y,
        x3: x, y3: drawMPStartY,
        x4: x - eleWidth, y4: drawMPStartY,
        closed: true
    });

    if (hasRope) {
    	cvs.addLayer({
	        type: 'line',
	        strokeStyle: '#8A56B1',
	        strokeWidth: 3,
	        x1: x - eleWidth / 2, y1: y - eleHorizontalMargin * 2.3,
	        x2: x - eleWidth / 2, y2: y,
	        closed: true
	    });
    }
}

function GetStateIcon(state) { return $('#img-st-' + state)[0]; }

function GetFeaturesIcon(icon) { return $('#img-' + icon)[0]; }

function GetStateColor(state) {
    switch(state*1) {
        case 1:
            return "#1afa29";
        case 2:
            return "#FF0";
        case 3:
            return "#F00";
        case 4:
            return "#8a8a8a";
        default:
            return "#8a8a8a";
    }
}