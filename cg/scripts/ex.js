$(function() {
	$.ajax({
		url: "ex.json", //json文件位置
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

var cvsBrushStartPointX = 1250;
var cvsBrushStartPointY = 125;
var eleWidth = 167;
var eleHeight = 240;
var eleHorizontalMargin = 10;

var eleHorizontalSpacing = eleWidth / 18;
var eleVerticalSpacing   = eleHeight / 28;
var eleMarginRight       = eleHorizontalSpacing * 5;
var eleFontSize          = 12;

function draw(cvs, data) {

	var Group_List      = data.GroupList;
	
	var EX_INTRANET     = Group_List[0].MoList.reverse();
	var EX_MAIL_GATEWAY = Group_List[1].MoList;
	var EX_ARR          = Group_List[2].MoList;
	var EX_EDGE         = Group_List[3].MoList;

	cvs.addLayer({
	    type: 'image',
	    source: $('#img-itsm-bg')[0],
	    x: 0, y: 0,
	    index: -1,
	    width: 1920,
	    height: 1080,
	    fromCenter: false
	})

	EX_INTRANET.slice(0, 6).reverse().forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1250;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight + eleHorizontalMargin * 2.5;
	eleWidth             = 166;
	eleHeight            = 240;
	EX_INTRANET.slice(6, 13).reverse().forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1250;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight + eleHorizontalMargin * 1.7;
	eleWidth             = 166;
	eleHeight            = 195;
	EX_INTRANET.slice(13, 20).reverse().forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1250;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight + eleHorizontalMargin * 1.8;
	eleWidth             = 166;
	eleHeight            = 195;
	EX_INTRANET.slice(20, 27).reverse().forEach(function (item, i) {
		drawServer(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1410;
	cvsBrushStartPointY  = 165;
	eleWidth             = 110;
	eleHeight            = 80;
	EX_MAIL_GATEWAY.slice(0, 4).forEach(function (item, i) {
		drawGateway(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
	    cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1410;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight + eleHorizontalMargin * 1;
	eleWidth             = 110;
	eleHeight            = 80;
	EX_MAIL_GATEWAY.slice(4, 8).forEach(function (item, i) {
		drawGateway(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
	    cvsBrushStartPointX += (eleWidth + eleHorizontalMargin);	
	})

	cvsBrushStartPointX  = 1715;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight * 1.9;
	eleWidth             = 150;
	eleHeight            = 195;
	EX_ARR.reverse().forEach(function (item, i) {
		drawARR(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1860;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight * 1.2;
	eleWidth             = 170;
	eleHeight            = 195;
	EX_EDGE.slice(0, 2).reverse().forEach(function (item, i) {
		drawEDGE(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvsBrushStartPointX  = 1860;
	cvsBrushStartPointY  = cvsBrushStartPointY + eleHeight * 1.05;
	eleWidth             = 170;
	eleHeight            = 195;
	EX_EDGE.slice(2, 4).reverse().forEach(function (item, i) {
		console.log(item);
		drawEDGE(cvs, item, i, cvsBrushStartPointX, cvsBrushStartPointY);
		cvsBrushStartPointX -= (eleWidth + eleHorizontalMargin);
	})

	cvs.drawLayers();

}

function drawEDGE(cvs, ele, i, x, y) {

	var w = eleWidth - 4.5 * eleHorizontalSpacing - eleMarginRight;
	var h = eleHeight - 2 * eleVerticalSpacing;

	cvs.addLayer({
        type: 'line',
        strokeStyle: '#00B0F0',
        strokeWidth: 3,
        strokeDash: [15, 10],
        x1: x - eleWidth, y1: y,
        x2: x, y2: y,
        x3: x, y3: y + eleHeight,
        x4: x - eleWidth, y4: y + eleHeight,
        closed: true
    })

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
        x: x + eleHorizontalSpacing - eleWidth,
        y: y + eleVerticalSpacing * 1.5 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 1.5,
        fromCenter: false
    }).addLayer({
        // 服务器名称
        type: 'text',
        fillStyle: '#FFF',
        fontStyle: 'bold',
        strokeWidth: 5,
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 2.25 + (w - eleMarginRight / 1.5) * 1.48,
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
        x: x - eleWidth + eleHorizontalSpacing,
        y: y + eleVerticalSpacing * 3.5 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Memory Time %',
        fromCenter: false
    }).addLayer({
        // CPU使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 5,
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 2,
        cornerRadius: 5
    }).addLayer({
        // CPU使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.RAM.State),
        x: x - eleWidth + eleHorizontalSpacing + eleVerticalSpacing / 6,
        y: y + eleVerticalSpacing * 6.1 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedMemoryPct / 100,
        height: eleVerticalSpacing * 1.6,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // CPU使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedMemoryPct + '%'
    })

    var drawDiskStartY = y + eleVerticalSpacing * 8.35 + (w - eleMarginRight / 1.5) * 1.48;
    // Disk
    ele.DiskList.forEach(function(item, i) {
        cvs.addLayer({
            // Disk图标
            type: 'image',
            source: GetFeaturesIcon('cp-disk'),
            x: x - eleWidth + eleHorizontalSpacing,
            y: drawDiskStartY,
            width: eleHorizontalSpacing * 2.6,
            height: eleHorizontalSpacing * 2.6,
            fromCenter: false,
        }).addLayer({
            // Disk名称
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing * 1.7,
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
            x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            width: eleMarginRight * 2.5,
            height: eleVerticalSpacing * 2,
            cornerRadius: 5
        }).addLayer({
            // Disk使用率显示条
            type: 'rectangle',
            fillStyle: GetStateColor(ele.DiskList[i].State),
            x: x - eleWidth + eleHorizontalSpacing + eleVerticalSpacing / 6,
            y: drawDiskStartY + eleVerticalSpacing * 3.3,
            width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
            height: eleVerticalSpacing * 1.6,
            cornerRadius: 5,
            fromCenter: false
        }).addLayer({
            // Disk使用率
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            fontSize: eleFontSize,
            fontFamily: 'Microsoft YaHei',
            text: eleUsedDiskPct[i] + '%'
        })
        drawDiskStartY += eleVerticalSpacing * 5.5
    })

    var drawMPStartY = y + eleHeight - eleMarginRight * 0.8;

    ele.MPList.reverse().forEach(function (item, i) {
        cvs.addLayer({
            type: 'image',
            source: GetFeaturesIcon(item.MPIcon),
            x: x - eleWidth + w + eleHorizontalSpacing * 5.5,
            y: drawMPStartY,
            width: eleMarginRight * 0.7,
            height: eleMarginRight * 0.7,
            fromCenter: false
        }).addLayer({
            type: 'image',
            source: GetStateIcon(item.State),
            x: x - eleWidth + w + eleMarginRight * 1.5,
            y: drawMPStartY,
            width: eleMarginRight / 3,
            height: eleMarginRight / 3,
            fromCenter: false
        })
        drawMPStartY -= eleVerticalSpacing * 4.3;
    })
}

function drawARR(cvs, ele, i, x, y) {

	var w = eleWidth - 2.5 * eleHorizontalSpacing - eleMarginRight;
	var h = eleHeight - 2 * eleVerticalSpacing;

	cvs.addLayer({
        type: 'line',
        strokeStyle: '#00B0F0',
        strokeWidth: 3,
        strokeDash: [15, 10],
        x1: x, y1: y,
        x2: x + eleWidth, y2: y,
        x3: x + eleWidth, y3: y + eleHeight,
        x4: x, y4: y + eleHeight,
        closed: true
    })

    cvs.addLayer({
        // 服务器图标
        type: 'image',
        source: GetFeaturesIcon(ele.MOIcon),
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing + (w - eleMarginRight / 1.5) * 1.48 / 2,
        width: w - eleMarginRight / 1.5,
        height: (w - eleMarginRight / 1.5) * 1.48,
        fromCenter: true,
    }).addLayer({
        // 服务器状态图标
        type: 'image',
        source: GetStateIcon(ele.MoState),
        x: x + eleWidth / 2,
        y: y + eleMarginRight / 1.5,
        width: eleMarginRight / 2,
        height: eleMarginRight / 2
    }).addLayer({
        // 服务器名称背板
        type: 'rectangle',
        fillStyle: '#3a75c5',
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing * 2 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 2,
        fromCenter: true
    }).addLayer({
        // 服务器名称
        type: 'text',
        fillStyle: '#FFF',
        fontStyle: 'bold',
        strokeWidth: 5,
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing * 2 + (w - eleMarginRight / 1.5) * 1.48,
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
        x: x + eleHorizontalSpacing,
        y: y + eleVerticalSpacing * 3.5 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Memory Time %',
        fromCenter: false
    }).addLayer({
        // Memory使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 5,
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.85,
        height: eleVerticalSpacing * 2,
        cornerRadius: 5
    }).addLayer({
        // Memory使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.RAM.State),
        x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
        y: y + eleVerticalSpacing * 6.1 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 2.85 - eleVerticalSpacing / 3) * eleUsedMemoryPct / 100,
        height: eleVerticalSpacing * 1.6,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // Memory使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedMemoryPct + '%'
    })

    var drawDiskStartY = y + eleVerticalSpacing * 8.35 + (w - eleMarginRight / 1.5) * 1.48;
    // Disk
    ele.DiskList.forEach(function(item, i) {
        cvs.addLayer({
            // Disk图标
            type: 'image',
            source: GetFeaturesIcon('cp-disk'),
            x: x + eleHorizontalSpacing,
            y: drawDiskStartY,
            width: eleHorizontalSpacing * 2.6,
            height: eleHorizontalSpacing * 2.6,
            fromCenter: false,
        }).addLayer({
            // Disk名称
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x + eleHorizontalSpacing * 1.7,
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
            x: x + eleWidth / 2,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            width: eleMarginRight * 2.85,
            height: eleVerticalSpacing * 2,
            cornerRadius: 5
        }).addLayer({
            // Disk使用率显示条
            type: 'rectangle',
            fillStyle: GetStateColor(ele.DiskList[i].State),
            x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
            y: drawDiskStartY + eleVerticalSpacing * 3.3,
            width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
            height: eleVerticalSpacing * 1.6,
            cornerRadius: 5,
            fromCenter: false
        }).addLayer({
            // Disk使用率
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x + eleWidth / 2,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            fontSize: eleFontSize,
            fontFamily: 'Microsoft YaHei',
            text: eleUsedDiskPct[i] + '%'
        })
        drawDiskStartY += eleVerticalSpacing * 5.5
    })

    var drawMPStartY = y + eleHeight / 2 - eleMarginRight * 1.1;

    ele.MPList.reverse().forEach(function (item, i) {
        cvs.addLayer({
            type: 'image',
            source: GetFeaturesIcon(item.MPIcon),
            x: x + w + eleHorizontalSpacing * 3.5,
            y: drawMPStartY,
            width: eleMarginRight * 0.7,
            height: eleMarginRight * 0.7,
            fromCenter: false
        }).addLayer({
            type: 'image',
            source: GetStateIcon(item.State),
            x: x + w + eleMarginRight * 1,
            y: drawMPStartY,
            width: eleMarginRight / 3,
            height: eleMarginRight / 3,
            fromCenter: false
        })
        drawMPStartY -= eleVerticalSpacing * 4.3;
    })
}

function drawGateway(cvs, ele, i, x, y) {

	var w = eleWidth - 2 * eleHorizontalSpacing - eleMarginRight;
	var h = eleHeight - 2 * eleVerticalSpacing;

	cvs.addLayer({
	    // Disk图标
	    type: 'image',
	    source: GetFeaturesIcon(ele.MOIcon),
	    x: x + eleWidth / 2,
	    y: y + eleHeight / 3,
	    width: eleHorizontalSpacing * 9,
	    height: eleHorizontalSpacing * 6,
	    fromCenter: true,
	}).addLayer({
        // 服务器状态图标
        type: 'image',
        source: GetStateIcon(ele.MoState),
        x: x + eleWidth / 2,
        y: y + eleMarginRight / 2,
        width: eleMarginRight / 1.75,
        height: eleMarginRight / 1.75
    }).addLayer({
        // 服务器名称背板
        type: 'rectangle',
        fillStyle: '#3a75c5',
        x: x,
        y: y + eleVerticalSpacing * 4.5 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.3,
        height: eleVerticalSpacing * 2.3,
        fromCenter: false
    }).addLayer({
        // 服务器名称
        type: 'text',
        fillStyle: '#FFF',
        fontStyle: 'bold',
        strokeWidth: 5,
        x: x + eleWidth / 2,
        y: y + eleVerticalSpacing * 5.5 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: ele.MODisplayName,
    });
}

function drawServer(cvs, ele, i, x, y) {

	var w = eleWidth - 4.5 * eleHorizontalSpacing - eleMarginRight;
	var h = eleHeight - 2 * eleVerticalSpacing;

	cvs.addLayer({
        type: 'line',
        strokeStyle: '#00B0F0',
        strokeWidth: 3,
        strokeDash: [15, 10],
        x1: x - eleWidth, y1: y,
        x2: x, y2: y,
        x3: x, y3: y + eleHeight,
        x4: x - eleWidth, y4: y + eleHeight,
        closed: true
    }).addLayer({
        type: 'line',
        strokeStyle: '#8A56B1',
        strokeWidth: 3,
        x1: x - eleWidth / 2, y1: y - eleHorizontalMargin * 1,
        x2: x - eleWidth / 2, y2: y,
        closed: true
    })

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
        x: x + eleHorizontalSpacing - eleWidth,
        y: y + eleVerticalSpacing * 1.5 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 1.5,
        fromCenter: false
    }).addLayer({
        // 服务器名称
        type: 'text',
        fillStyle: '#FFF',
        fontStyle: 'bold',
        strokeWidth: 5,
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 2.25 + (w - eleMarginRight / 1.5) * 1.48,
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
        x: x - eleWidth + eleHorizontalSpacing,
        y: y + eleVerticalSpacing * 3.5 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Memory Time %',
        fromCenter: false
    }).addLayer({
        // CPU使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 5,
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 2,
        cornerRadius: 5
    }).addLayer({
        // CPU使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.RAM.State),
        x: x - eleWidth + eleHorizontalSpacing + eleVerticalSpacing / 6,
        y: y + eleVerticalSpacing * 6.1 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedMemoryPct / 100,
        height: eleVerticalSpacing * 1.6,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // CPU使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 6.8 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedMemoryPct + '%'
    })

    var drawDiskStartY = y + eleVerticalSpacing * 8.35 + (w - eleMarginRight / 1.5) * 1.48;
    // Disk
    ele.DiskList.forEach(function(item, i) {
        cvs.addLayer({
            // Disk图标
            type: 'image',
            source: GetFeaturesIcon('cp-disk'),
            x: x - eleWidth + eleHorizontalSpacing,
            y: drawDiskStartY,
            width: eleHorizontalSpacing * 2.6,
            height: eleHorizontalSpacing * 2.6,
            fromCenter: false,
        }).addLayer({
            // Disk名称
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing * 1.7,
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
            x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            width: eleMarginRight * 2.5,
            height: eleVerticalSpacing * 2,
            cornerRadius: 5
        }).addLayer({
            // Disk使用率显示条
            type: 'rectangle',
            fillStyle: GetStateColor(ele.DiskList[i].State),
            x: x - eleWidth + eleHorizontalSpacing + eleVerticalSpacing / 6,
            y: drawDiskStartY + eleVerticalSpacing * 3.3,
            width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
            height: eleVerticalSpacing * 1.6,
            cornerRadius: 5,
            fromCenter: false
        }).addLayer({
            // Disk使用率
            type: 'text',
            fillStyle: '#000',
            fontStyle: 'bold',
            x: x - eleWidth + eleHorizontalSpacing + eleMarginRight * 1.25,
            y: drawDiskStartY + eleVerticalSpacing * 4,
            fontSize: eleFontSize,
            fontFamily: 'Microsoft YaHei',
            text: eleUsedDiskPct[i] + '%'
        })
        drawDiskStartY += eleVerticalSpacing * 5.5
    })

    var drawMPStartY = y + eleHeight - eleMarginRight * 0.8;

    ele.MPList.reverse().forEach(function (item, i) {
        cvs.addLayer({
            type: 'image',
            source: GetFeaturesIcon(item.MPIcon),
            x: x - eleWidth + w + eleHorizontalSpacing * 5.5,
            y: drawMPStartY,
            width: eleMarginRight * 0.7,
            height: eleMarginRight * 0.7,
            fromCenter: false
        }).addLayer({
            type: 'image',
            source: GetStateIcon(item.State),
            x: x - eleWidth + w + eleMarginRight * 1.5,
            y: drawMPStartY,
            width: eleMarginRight / 3,
            height: eleMarginRight / 3,
            fromCenter: false
        })
        drawMPStartY -= eleVerticalSpacing * 4.3;
    })
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