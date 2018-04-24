$(function() {

    $("#aside .nav").html('');
    /**
     *    # 菜单数据（动态数据）
     *    
     *    title: 菜单名
     *    href: 菜单超链接
     *    icon: 菜单图标（为空即无图标）
     *    labelName: 标签名
     *    labelType: 标签种类（包含success, warning, danger三种）
     *    children: 子菜单项（内容重复此六项参数）
     */
    // 
    var domData = [{
        "title": "主页",
        "href": "javascript:;",
        "icon": "fa-home",
        "labelName": "2",
        "labelType": "danger",
        "children": []
    }, {
        "title": "一级菜单",
        "href": "javascript:;",
        "icon": "fa-envelope-o",
        "labelName": "10",
        "labelType": "success",
        "children": [{
            "title": "二级菜单",
            "href": "javascript:;",
            "icon": "fa-home",
            "labelName": "",
            "labelType": "",
            "children": [{
                "title": "三级菜单",
                "href": "javascript:;",
                "icon": "",
                "labelName": "2",
                "labelType": "danger",
                "children": []
            }]
        }]
    }];

    var createUL = function(className) {
        var UL = document.createElement('ul');
        UL.className = className || '';
        return UL;
    }

    var createLI = function(className) {
        var LI = document.createElement('li');
        LI.className = className || '';
        return LI;
    }

    var createA = function(href) {
        var A = document.createElement('a');
        A.href = href || 'javascript:;';
        return A;
    }

    var createI = function(className) {
        var I = document.createElement('i');
        I.className = 'fa ' + className || '';
        return I;
    }

    var createSPAN = function(textContent) {
        var SPAN = document.createElement('span');
        SPAN.textContent = textContent || '';
        return SPAN;
    }

    var createSMALL = function(textContent, type) {
        var SMALL = document.createElement('small');
        SMALL.className = 'label label-' + type;
        SMALL.textContent = textContent || '';
        return SMALL;
    }

    var isRightType = function(str, type) {
        return Object.prototype.toString.call(str) === '[object ' + type + ']'
    }

    // DOM构建函数
    var createMenu = function(domInfo, isRoot) {
        var LI = createLI();
        var A = createA('javascript:;');
        var SPAN = createSPAN(domInfo.title);
        if (!!domInfo.icon && isRightType(domInfo.icon, 'String')) {
            A.appendChild(createI(domInfo.icon));
        }
        if (!!domInfo.labelName && isRightType(domInfo.labelName, 'String')) {
            SPAN.appendChild(createSMALL(domInfo.labelName, domInfo.labelType))
        }
        A.appendChild(SPAN);
        // 非根节点需要ul包住子节点
        if (!isRoot && isRightType(isRoot, 'Boolean')) {
            var UL = createUL('nav nav-sub');
            // 具有子菜单继续深度遍历
            if (!!domInfo.children && isRightType(domInfo.children, 'Array') && !!domInfo.children.length) {
                A.appendChild(createI('fa-angle-right pull-right'));
                LI.appendChild(A);
                domInfo.children.forEach(function(item) {
                    LI.appendChild(createMenu(item, false));
                })
                UL.appendChild(LI);
                return UL;
            }
            LI.appendChild(A);
            UL.appendChild(LI);
            return UL;
        } else {
            if (!!domInfo.children && isRightType(domInfo.children, 'Array') && !!domInfo.children.length) {
                A.appendChild(createI('fa-angle-right pull-right'));
                LI.appendChild(A);
                domInfo.children.forEach(function(item) {
                    LI.appendChild(createMenu(item, false));
                })
                return LI;
            }
            LI.appendChild(A);
            return LI
        }
    }

    // 模拟异步延迟
    setTimeout(function() {
    	var docfrag = document.createDocumentFragment();
    	var menu = createUL('nav');
    	menu.setAttribute('ui-nav', '');
    	domData.forEach(function(item) {
    	    menu.appendChild(createMenu(item, true));
    	})
    	docfrag.appendChild(menu);
    	$("#aside .nav").append(docfrag.children[0].children);
    }, 500)

    // 滑动条美化
    $("#aside, .ui-aside-right").mCustomScrollbar({
        "autoHideScrollbar": true,
        'theme': 'dark'
    });
    $('.ui-container').mCustomScrollbar({
        "autoHideScrollbar": true,
        'theme': 'dark'
    });
});