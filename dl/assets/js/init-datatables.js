function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' + d.extn + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>';
}


// Data Table

$('.convert-data-table').DataTable({
    "PaginationType": "bootstrap",
    dom: '<"tbl-head clearfix"T>,<"tbl-top clearfix"lfr>,t,<"tbl-footer clearfix"<"tbl-info pull-left"i>>',
    tableTools: {
        "sSwfPath": "swf/copy_csv_xls_pdf.swf"
    }
});




$('.colvis-data-table').DataTable({
    "PaginationType": "bootstrap",
    dom: '<"tbl-head clearfix"T>'
});

// $('.colvis-data-table').DataTable({
//     "dom": '', //dom定位
//     "dom": '', //自定义显示项
//     //"dom":'<"domab"f>',
//     "scrollY": "220px", //dt高度
//     "lengthMenu": [
//         [8, 6, 8, -1],
//         [4, 6, 8, "All"]
//     ], //每页显示条数设置
//     "lengthChange": false, //是否允许用户自定义显示数量
//     "bPaginate": true, //翻页功能
//     "bFilter": false, //列筛序功能
//     "searching": true, //本地搜索
//     "ordering": true, //排序功能
//     "Info": true, //页脚信息
//     "autoWidth": true, //自动宽度
//     "oLanguage": { //国际语言转化
//         "oAria": {
//             "sSortAscending": " - click/return to sort ascending",
//             "sSortDescending": " - click/return to sort descending"
//         },
//         "sLengthMenu": "显示 _MENU_ 记录",
//         "sZeroRecords": "对不起，查询不到任何相关数据",
//         "sEmptyTable": "未有相关数据",
//         "sLoadingRecords": "正在加载数据-请等待...",
//         "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
//         "sInfoEmpty": "当前显示0到0条，共0条记录",
//         "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
//         "sProcessing": "<img src='../resources/user_share/row_details/select2-spinner.gif'/> 正在加载数据...",
//         "sSearch": "模糊查询：",
//         "sUrl": "",
//         //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
//         "oPaginate": {
//             "sFirst": "首页",
//             "sPrevious": " 上一页 ",
//             "sNext": " 下一页 ",
//             "sLast": " 尾页 "
//         }
//     },

//     "columnDefs": [{
//         orderable: false,

//         targets: 0
//     }, {
//         orderable: false,

//         targets: 1
//     }], //第一列与第二列禁止排序

//     "order": [
//         [0, null]
//     ], //第一列排序图标改为默认
//     initComplete: function() { //列筛选
//         var api = this.api();
//         api.columns().indexes().flatten().each(function(i) {
//             if (i != 0 && i != 1) { //删除第一列与第二列的筛选框
//                 var column = api.column(i);
//                 var $span = $('<span class="addselect">▾</span>').appendTo($(column.header()))
//                 var select = $('<select><option value="">All</option></select>')
//                     .appendTo($(column.header()))
//                     .on('click', function(evt) {
//                         evt.stopPropagation();
//                         var val = $.fn.dataTable.util.escapeRegex(
//                             $(this).val()
//                         );
//                         column
//                             .search(val ? '^' + val + '$' : '', true, false)
//                             .draw();
//                     });
//                 column.data().unique().sort().each(function(d, j) {
//                     function delHtmlTag(str) {
//                         return str.replace(/<[^>]+>/g, ""); //去掉html标签
//                     }

//                     d = delHtmlTag(d)
//                     select.append('<option value="' + d + '">' + d + '</option>')
//                     $span.append(select)
//                 });

//             }
//         });

//     }

// });


$('.responsive-data-table').DataTable({
    "PaginationType": "bootstrap",
    responsive: true,
    dom: '<"tbl-top clearfix"lfr>,t,<"tbl-footer clearfix"<"tbl-info pull-left"i><"tbl-pagin pull-right"p>>'
});