var colorArr = ['#939393', '#1afa29', '#FF0', '#F00', '#939393']

// 初始化Tree的Click事件
var initTreeEvent = function () {
    $('.tree li:has(ul)').removeClass('parent_li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').unbind('click').bind('click', function(e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
}

// GB转换
var transformToGB = function (num) {
    return Math.round((Math.round((num / 1024) * 10) / 10));
}

var getTitleStyle = function (name, used, total, pct, state) {

    if (state === 4) pct = '?';

    var SPAN = document.createElement('span');
    var SPAN1 = document.createElement('i');
    SPAN1.textContent = name;
    SPAN1.style.fontWeight = 'bold';
    var SPAN2 = document.createElement('i');
    SPAN2.textContent = state === 4 ? '? / ? GB' : transformToGB(used) + ' / ' + transformToGB(total) + ' GB';
    var SPAN3 = document.createElement('i');
    SPAN3.textContent = pct + '%';
    SPAN3.style.color = '#666'
    SPAN3.style.fontWeight = 'bold';
    SPAN3.style.float = 'right';

    // 饼图
    var PIE = document.createElement('div');
    PIE.className = 'pie';
    PIE.textContent = pct;
    PIE.style.backgroundImage = 'linear-gradient(to right, transparent 50%, ' + colorArr[state] + ' 0)'
    var PIE_CHILD = document.createElement('div');
    PIE_CHILD.className = 'pie-child';
    PIE_CHILD.style.animation = "spin 50s linear infinite, st-" + state + " 100s step-end infinite";
    PIE_CHILD.style.animationDelay = 'inherit';
    PIE_CHILD.style.animationPlayState = 'paused';
    PIE.appendChild(PIE_CHILD);
    SPAN.appendChild(PIE);

    SPAN.appendChild(SPAN1);
    SPAN.appendChild(SPAN2);
    SPAN.appendChild(SPAN3);    
    return SPAN;
}

var createLeaf = function (name, state, op) {
    var LI = document.createElement('li');
    var SPAN;
    var type = /\w:/.test(name);
    // CPU、RAM以、硬盘与组名、检查点的样式
    switch(type) {
        case true:
            SPAN = getTitleStyle(name, op.used, op.total, op.pct, state);
            break;
        default:
            SPAN = document.createElement('SPAN');
            SPAN.textContent = name;
            SPAN.style.fontWeight = 'bold';
            break;
    }

    // 状态点
    var DIV_STATE = document.createElement('div');
    DIV_STATE.className = 'state-point';
    DIV_STATE.style.backgroundColor = colorArr[state];
    SPAN.insertBefore(DIV_STATE, SPAN.childNodes[0]);
    LI.appendChild(SPAN);
    return LI
}

var createTree = function(group) {
    // 每个组单元中的最外层LI
    var PARENT_LI = document.createElement('li');
    var PARENT_SPAN = document.createElement('span');
    PARENT_SPAN.textContent = group.GroupName;
    PARENT_SPAN.style.fontWeight = 'bold';
    PARENT_LI.appendChild(PARENT_SPAN);
    var PARENT_UL = document.createElement('ul');

    group.MoList.forEach(function(item, i) {
        var LI_LIST = createLeaf(item.MODisplayName, item.MoState)
        var UL_LIST = document.createElement('ul');
        if (!!item.CPU) {
            UL_LIST.appendChild(createLeaf('CPU:', item.CPU.State, {
                used: item.CPU.Used,
                total: item.CPU.Total,
                pct: item.CPU.UsedPct
            }));
        }
        if (!!item.RAM) {
            UL_LIST.appendChild(createLeaf('RAM:', item.RAM.State, {
                used: item.RAM.Used,
                total: item.RAM.Total,
                pct: item.RAM.UsedPct
            }));
        }
        if (!!item.DiskList && item.DiskList.length) {
            item.DiskList.forEach(function (item, i) {
                UL_LIST.appendChild(createLeaf(item.Name, item.State, {
                    used: item.Used,
                    total: item.Total,
                    pct: item.UsedPct
                }))
            })
        }
        if (!!item.MPList && item.MPList.length) {
            item.MPList.forEach(function (item, i) {
                UL_LIST.appendChild(createLeaf(item.DisplayName, item.State))
            })
        }
        LI_LIST.appendChild(UL_LIST);
        PARENT_UL.appendChild(LI_LIST);
    })
    PARENT_LI.appendChild(PARENT_UL);
    return PARENT_LI;
}

var fetchData = function () {
    $.ajax({
        url: 'test.json',
        method: 'get',
        success: function(res) {
            var docfrag = document.createDocumentFragment();
            var UL = document.createElement('ul');
            res.GroupList.forEach(function(item) {
                UL.appendChild(createTree(item));
            })
            docfrag.appendChild(UL);
            $(".tree ul").remove();
            $('.tree').append(docfrag);
            document.querySelectorAll('.pie').forEach(function(pie) {
                var p = parseFloat(pie.textContent);
                pie.style.animationDelay = '-' + p + 's';
            });
            initTreeEvent();
        },
        error: function(err) {
            console.log(err);
        }
    })
}

$(function() {
    fetchData();
});