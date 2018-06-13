/**
 * Bootkit v1.0.0 (http://bootkit.themebucket.net/)
 * Copyright 2017 ThemeBucket
 * Licensed under the ISC license
 */
+ function($) {

    'use strict';

    $(function() {

        $('[data-toggle="ui-nav"]').on('click', function(e) {
            e.preventDefault();
            $('#ui').toggleClass('ui-aside-compact');
        });

        $('[data-toggle="ui-aside-right"]').on('click', function(e) {
            e.preventDefault();
            $('#content').toggleClass('ui-content-compact');
        });

        $('[ui-nav]').on('click', 'a', function(e) {

            // locate href
            // if there is no submenu
            var href = $(this).attr('href');
            if (href) {
                window.location.href = href;
            }

            // Open submenu
            var $this = $(e.target),
                $active;
            $this.is('a') || ($this = $this.closest('a'));

            $active = $this.parent().siblings(".active");
            $active && $active.toggleClass('active').find('> ul:visible').stop().slideUp(200);

            ($this.parent().hasClass('active') && $this.next().stop().slideUp(200)) || $this.next().stop().slideDown(200);
            $this.parent().toggleClass('active');

            $this.next().is('ul') && e.preventDefault();
        });

        if ($('#ui').hasClass('ui-aside-compact')) {
            var uiHasCompact = true;
        }
        if ($('#content').hasClass('ui-content-compact')) {
            var uiContentHasCompact = true;
        }

        function doneResizing() {
            if (Modernizr.mq('screen and (min-width:768px)')) {
                // action for screen widths including and above 768 pixels

                if (uiHasCompact === true) {
                    $('#ui').addClass('ui-aside-compact')
                }
                if (uiContentHasCompact === true) {
                    $('#content').addClass('ui-content-compact')
                }

            } else if (Modernizr.mq('screen and (max-width:767px)')) {
                // action for screen widths below 768 pixels
                // ('Moblie');

                if (uiHasCompact === true) {
                    $('#ui').removeClass('ui-aside-compact')
                }
                if (uiContentHasCompact === true) {
                    $('#content').removeClass('ui-content-compact')
                }

                $('[data-toggle="ui-nav"]').on('click', function(e) {
                    e.preventDefault();

                    var hasAsideCompact = $('#ui').hasClass('ui-aside-compact'),
                        hasContentCompact = $('#content').hasClass('ui-content-compact');

                    if (hasAsideCompact) {
                        if (hasContentCompact) {
                            $('#content').removeClass('ui-content-compact');
                        }
                    }

                });

                $('[data-toggle="ui-aside-right"]').on('click', function(e) {
                    e.preventDefault();

                    var hasAsideCompact = $('#ui').hasClass('ui-aside-compact'),
                        hasContentCompact = $('#content').hasClass('ui-content-compact');

                    if (hasContentCompact) {
                        if (hasAsideCompact) {
                            $('#ui').removeClass('ui-aside-compact');
                        }
                    }
                });
            }
        }

        var id;
        $(window).resize(function() {
            clearTimeout(id);
            id = setTimeout(doneResizing, 0);
        });

        doneResizing();

    });

}(jQuery);

(function($) {
    
    'use strict';

    $(document).ready(function() {

        var fetchData = function () {
            var dataTime, groupList;
            var colorArr = ['#939393', '#1afa29', '#FF0', '#F00', '#939393']
            var docfrag = document.createDocumentFragment();
            var getUsedPct = function(hard) {
                return !!hard ? (hard.UsedPct === 4 ? '? %' : hard.UsedPct + ' %') : '';
            }
            var createDiv = function(ctn, name, className) {
                var DIV = document.createElement('div');
                DIV.textContent = ctn || '';
                DIV.className = !!className && 'st-' + className;
                if (name === 'disk ' && !!ctn) {
                    var PIE = document.createElement('div');
                    PIE.className = 'pie';
                    PIE.textContent = ctn.slice(2, -2);
                    PIE.style.backgroundImage = 'linear-gradient(to right, transparent 50%, ' + colorArr[className] + ' 0)'
                    var PIE_CHILD = document.createElement('div');
                    PIE_CHILD.className = 'pie-child';
                    PIE_CHILD.style.animation = "spin 50s linear infinite, st-" + className + " 100s step-end infinite";
                    PIE_CHILD.style.animationDelay = 'inherit';
                    PIE_CHILD.style.animationPlayState = 'paused';
                    PIE.appendChild(PIE_CHILD);
                    DIV.appendChild(PIE);
                } else {
                    var DIV_STATE = document.createElement('div');
                    DIV_STATE.className = 'state-point';
                    DIV_STATE.style.backgroundColor = colorArr[className]
                    DIV.insertBefore(DIV_STATE, DIV.childNodes[0]);
                }
                return DIV;
            }
            var createTd = function(ctn, name, className) {
                var TD = document.createElement('td');
                TD.className = name + (!!className && 'st-' + className);
                TD.textContent = ctn || '';
                if (['cpu ', 'ram ', 'disk '].indexOf(name) !== -1 && !!ctn) {
                    var DIV = document.createElement('div');
                    DIV.className = 'pie';
                    DIV.textContent = ctn.slice(0, -2);
                    DIV.style.backgroundImage = 'linear-gradient(to right, transparent 50%, ' + colorArr[className] + ' 0)'
                    var DIV_CHILD = document.createElement('div');
                    DIV_CHILD.className = 'pie-child';
                    DIV_CHILD.style.animation = "spin 50s linear infinite, st-" + className + " 100s step-end infinite";
                    DIV_CHILD.style.animationDelay = 'inherit';
                    DIV_CHILD.style.animationPlayState = 'paused';
                    DIV.appendChild(DIV_CHILD);
                    TD.appendChild(DIV);
                } else if(name === 'name ') {
                    var DIV = document.createElement('div');
                    DIV.className = 'state-point';
                    DIV.style.backgroundColor = colorArr[className]
                    TD.insertBefore(DIV, TD.childNodes[0]);
                }
                return TD;
            };
            var createTdRowspan = function(ctn, rowspan) {
                var TD = document.createElement('td');
                TD.textContent = ctn || '';
                if (Object.prototype.toString.call(rowspan * 1) === '[object Number]') {
                    TD.setAttribute('rowspan', rowspan)
                }
                return TD;
            };
            var createUnit = function(group, docfrag) {
                var tr = document.createElement('tr');
                var td;
                var tdFirst = createTdRowspan(group.GroupName, group.MoList.length);
                tr.appendChild(tdFirst);
                group.MoList.forEach(function(item, i) {
                    tr.append(createTd(item.MODisplayName, 'name ', item.MoState));
                    tr.append(createTd(getUsedPct(item.CPU), 'cpu ', (item.CPU && item.CPU.State)));
                    tr.append(createTd(getUsedPct(item.RAM), 'ram ', (item.RAM && item.RAM.State)));

                    td = document.createElement('td');
                    if (!!item.DiskList) {
                        item.DiskList.forEach(function(item, i) {
                            td.append(createDiv(item.Name + getUsedPct(item), 'disk ', item.State))
                        })
                    } else {
                        td.textContent = "";
                    }
                    td.className = 'disk';
                    tr.append(td);

                    td = document.createElement('td');
                    if (!!item.MPList) {
                        item.MPList.forEach(function(item, i) {
                            td.append(createDiv(item.DisplayName, 'mp ', item.State))
                        });
                    } else {
                        td.textContent = "";
                    }
                    td.className = 'cp'
                    tr.append(td);

                    docfrag.appendChild(tr);
                    tr = document.createElement('tr');
                })
                return docfrag;
            }
            var checkEmptyElement = function (eleGroup) {
                var empty = 0;
                var len = eleGroup.length;
                for (var i = 0; i < len; i++) {
                    if(!!eleGroup[i].innerHTML) return false;
                }
                return true;
            }
            $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>").appendTo($(this).parents('.tools').parents('.panel-heading').parents('.panel'));
            $.ajax({
                url: 'ex.json',
                method: 'get',
                success: function(res) {
                    console.log(res);
                    var disappear = [];
                    dataTime = res.DataTime;
                    groupList = res.GroupList;

                    groupList.forEach(function(item) {
                        docfrag = createUnit(item, docfrag);
                    })
                    if(checkEmptyElement(docfrag.querySelectorAll('.name'))) {
                        disappear.push('.name')
                    };
                    if(checkEmptyElement(docfrag.querySelectorAll('.cpu'))) {
                        disappear.push('.cpu')
                    };
                    if(checkEmptyElement(docfrag.querySelectorAll('.ram'))) {
                        disappear.push('.ram')
                    };
                    if(checkEmptyElement(docfrag.querySelectorAll('.disk'))) {
                        disappear.push('.disk')
                    };
                    if(checkEmptyElement(docfrag.querySelectorAll('.cp'))) {
                        disappear.push('.cp')
                    };
                    $("tbody tr").remove();
                    $('tbody').append(docfrag);
                    disappear.forEach(function (item) {
                        $(item).css('display', 'none');
                    })
                    document.querySelectorAll('.pie').forEach(function(pie) {
                        console.log(pie);
                        var p = parseFloat(pie.textContent);
                        console.log(pie.textContent, pie.textContent.length);
                        pie.style.animationDelay = '-' + p + 's';
                    });
                    $('.update-time').html('<span>数据更新点：</span> ' + new Date(dataTime.slice(7, -2) * 1).toLocaleString());
                    $('.refresh-block').remove();
                },
                error: function(err) {
                    console.log(err);
                }
            })
        }

        fetchData();

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();

        // collapsible panel
        $('.panel .tools .collapse-box').click(function() {
            var el = $(this).parents(".panel").children(".panel-body");
            if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideUp(200);
            } else {
                $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideDown(200);
            }
        });

        // close panel
        $('.panel .tools .close-box').click(function() {
            $(this).parents(".panel").parent().remove();
        });

        // refresh panel
        $('.refresh-box').on('click', function(br) {
            br.preventDefault();
            fetchData.call(this);
        });

        // Auto size textarea
        autosize($('.autosize'));

        // searchCollapse
        $('.search-collapse').each(function() {
            var $searchInput = $('.form-control'),
                $searchBtn = $('.btn-search-collapse');

            $searchBtn.click(function(e) {
                e.preventDefault();
                $searchInput.toggleClass('form-control-open').focus();
            });

        });

        // niceScroll
        $(".niceScroll").niceScroll({
            cursorcolor: "#000000",
            cursoropacitymax: 0.3,
            cursorwidth: "8px",
            cursorborder: "2px solid transparent",
            cursordragontouch: true, // drag cursor in touch / touchbehavior mode also
            zindex: "10", // change z-index for scrollbar div
            cursorborderradius: "10px",
        });

    });

})(window.jQuery);

(function($) {

    $(document).ready(function() {

        

        'use strict';

        // Toggle Mail-nav
        // When click #toggle-mailbox-nav > .btn
        $('#toggle-mailbox-nav').click(function(e) {
            e.stopPropagation();
            $('.Mailbox-nav-aside').toggle();
        });

        // Return to Mail-list
        // when click .return-mail-list > a
        $('#return-mailbox-list > a').click(function(e) {
            e.preventDefault();
            $('.Mailbox-list').removeClass('Mailbox-list--slideLeft');
        });

        if ($(window).width() <= 767) {
            $('.Mail > a').click(function(e) {
                e.preventDefault();
                $('.Mailbox-list').addClass('Mailbox-list--slideLeft');
                $('.Mailbox-nav-aside').hide();
            });
        };
        $(window).resize(function() {
            if ($(window).width() <= 767) {
                $('.Mailbox-nav-aside').hide();
                $('.Mail > a').click(function(e) {
                    e.preventDefault();
                    $('.Mailbox-list').addClass('Mailbox-list--slideLeft');
                    $('.Mailbox-nav-aside').hide();
                });
            } else {
                $('.Mailbox-list').removeClass('Mailbox-list--slideLeft');
                $('.Mailbox-nav-aside').show();
                $('.Mail > a').click(function(e) {
                    $('.Mailbox-list').removeClass('Mailbox-list--slideLeft');
                    $('.Mailbox-nav-aside').show();
                });
            }
        });

        if ($(window).width() <= 1200) {
            $('.Mail > a').click(function(e) {
                e.preventDefault();
                $('.Mailbox-list').addClass('Mailbox-list--slideLeft');
            });
        };
        $(window).resize(function() {
            if ($(window).width() <= 1200) {
                $('.Mail > a').click(function(e) {
                    e.preventDefault();
                    $('.Mailbox-list').addClass('Mailbox-list--slideLeft');
                });
            } else {
                $('.Mailbox-list').removeClass('Mailbox-list--slideLeft');
                $('.Mail > a').click(function(e) {
                    $('.Mailbox-list').removeClass('Mailbox-list--slideLeft');
                });
            }
        });

    });

})(window.jQuery);

(function($) {

    $(document).ready(function() {

        

        'use strict';

        // Return to Mail-list
        // when click .return-mail-list > a
        $('.return-note-list').click(function(e) {
            e.preventDefault();
            $('.Note-aside').removeClass('Note-aside--slideleft');
        });

        if ($(window).width() <= 767) {
            $('.Note-list').on('click', '.Note', function(e) {
                e.preventDefault();
                $('.Note-aside').addClass('Note-aside--slideleft');
            });
        };


        $(window).resize(function() {
            if ($(window).width() <= 767) {
                $('.Note-list').on('click', '.Note', function(e) {
                    e.preventDefault();
                    $('.Note-aside').addClass('Note-aside--slideleft');
                });
            } else {
                $('.Note-aside').removeClass('Note-aside--slideleft');
                $('.Note-list').on('click', '.Note', function(e) {
                    e.preventDefault();
                    $('.Note-aside').removeClass('Note-aside--slideleft');
                });
            }
        });

    });

})(window.jQuery);