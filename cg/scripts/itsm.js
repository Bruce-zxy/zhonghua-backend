$(function () {
    var data = ReadData();
    Draw($('#cvs'), data);
});

var eleWidth             = 925 - 700;
var eleHeight            = 770 - 345;
var eleHorizontalSpacing = eleWidth / 18;
var eleVerticalSpacing   = eleHeight / 28;
var eleMarginRight       = eleHorizontalSpacing * 5;
var eleFontSize          = 15;
var cvsBrushStartPointX  = 0;
var cvsBrushStartPointY  = 0;
var diskArr              = ['C', 'D', 'E', 'F'];

function ReadData() {
    //$.ajax({
    //    url: "/cg/cg-handler.ashx",
    //    data: { 'id': '9F7218DA-5234-474A-B2D1-CE8BF3D5CF8B'},
    //    dataType: 'json',
    //    type: 'POST',
    //    success: function (data) {
    //        Draw($('#cvs'),data);
    //    },
    //    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        debugger;
    //    }
    //});
    return {
        "DataTime": "/Date(-62135596800000)/",
        "GroupList": [
			{
                "MoList": [
                    {
                        "MoState": 3,
                        "MPList": [
                            {
                                "State": 1,
                                "MPId": "7b75ce65-9c4d-4da4-8332-cb5047f74344",
                                "DisplayName": "Services",
                                "MPIcon": "cp-service",
                                "SrcId": "2624be59-4f6a-1beb-2d1f-30cbc5ef4cf0",
                                "SrcIds": null,
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 1,
                                "MOId": "7e5c7911-c7ac-45e0-8868-ea9b71f8a6d4"
                            },
                            {
                                "State": 1,
                                "MPId": "892f6e7d-9e13-447f-8ac2-ccf9e7f64d98",
                                "DisplayName": "Database",
                                "MPIcon": "cp-db",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": [
                                    "16c2b555-13e6-f9e7-a7ce-033ab284e8ed",
                                    "b75add78-50d5-1075-7163-0f5aeb070327",
                                    "ff2b5e4b-f481-cf27-3d38-28ffdfc88098",
                                    "07acbb55-9f51-2ede-7388-37471a258982",
                                    "7a0534a9-dd5f-ecaa-1d1a-3ea15c354174",
                                    "b8ed563e-a77f-b8d5-fb0a-40784a96d5ef",
                                    "e89ff3f2-72f2-7229-dbee-50e7913946ce",
                                    "c3794e43-3488-86a6-dafa-5631c70f28e3",
                                    "e5674f21-4aa8-698b-40fc-5e9f48581e08",
                                    "b8bb3d42-1715-e06a-7022-5fc199e6909f",
                                    "0ab03a95-d487-597a-84f2-6a90e5d5c7fb",
                                    "79df1237-b713-208f-be0f-6e8458d91ad6",
                                    "4d4518b8-19fd-e3bf-e39b-7712eab2acbe",
                                    "9c6f7279-3683-c017-41a3-b4b500bd1096",
                                    "144ac885-a77f-71a1-c2b2-ba6605416ece",
                                    "1b00eede-2655-c4c7-6a4f-cace40413c81",
                                    "e295a4c1-b92e-91ce-ef7a-d60dedfc7285",
                                    "c9e225cd-c051-1560-a6bf-e3d736766727",
                                    "53b032ad-ef28-26c8-bd47-e8e4631119db",
                                    "56149e14-9583-7c79-eec5-efff3cd4b78e"
                                ],
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 2,
                                "MOId": "7e5c7911-c7ac-45e0-8868-ea9b71f8a6d4"
                            },
                            {
                                "State": 1,
                                "MPId": "cf870cc3-f522-4c30-95fd-ff994eb8e942",
                                "DisplayName": "ITSM Page",
                                "MPIcon": "cp-ie",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": [
                                    "2d6e9ac1-fd67-16d2-a818-33cb6093f45f",
                                    "7ce5f500-5e8f-fc10-1c23-f4720317cdac"
                                ],
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 3,
                                "MOId": "7e5c7911-c7ac-45e0-8868-ea9b71f8a6d4"
                            },
                            {
                                "State": 1,
                                "MPId": "5e1d41d6-0ff2-4726-95d6-8b54b83659d5",
                                "DisplayName": "Cluster Disks",
                                "MPIcon": "cp-cd",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": null,
                                "RuleId": "ca3e9326-4213-4f10-9ca7-2ab1ad685bb0",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 999,
                                "MOId": "7e5c7911-c7ac-45e0-8868-ea9b71f8a6d4"
                            }
                        ],
                        "RAM": {
                            "State": 3,
                            "Total": 31086,
                            "Used": 29478,
                            "UsedPct": 95,
                            "Free": 1608,
                            "FreePct": 5
                        },
                        "CPU": {
                            "State": 1,
                            "Total": -1,
                            "Used": -1,
                            "UsedPct": 5,
                            "Free": -1,
                            "FreePct": 95
                        },
                        "DiskList": [
                            {
                                "State": 1,
                                "Total": 102049,
                                "Used": 39147,
                                "UsedPct": 38,
                                "Free": 62902,
                                "FreePct": 62
                            },
                            {
                                "State": 1,
                                "Total": 754300,
                                "Used": 95631,
                                "UsedPct": 13,
                                "Free": 658669,
                                "FreePct": 87
                            }
                        ],
                        "MOId": "7e5c7911-c7ac-45e0-8868-ea9b71f8a6d4",
                        "MOName": "ITSM-SDP-1.corp.sinochem.com",
                        "MOSrcId": "61dcfb82-5300-610a-3b0f-52567d3c8fcc",
                        "MODisplayName": "ITSM-SDP-1",
                        "GroupId": "0dcbf3de-e37a-4f33-bafa-e10736b808df",
                        "IsServer": true,
                        "CpuRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "RamRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "DiskRuleId": "ca3e9326-4213-4f10-9ca7-2ab1ad685bb0",
                        "Rank": 1,
                        "MOIcon": "sv-basic",
                        "Remarks": null,
                        "ExAttributes": null
                    },
                    {
                        "MoState": 1,
                        "MPList": [
                            {
                                "State": 1,
                                "MPId": "0b37adc4-1005-4a80-b302-35f5389519ce",
                                "DisplayName": "Services",
                                "MPIcon": "cp-service",
                                "SrcId": "9223bf2b-d504-554b-2d71-cab1fb178a0a",
                                "SrcIds": null,
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 1,
                                "MOId": "4ea35a53-313e-4d88-90fe-49670033bc49"
                            },
                            {
                                "State": 1,
                                "MPId": "d8039e3f-3239-4256-86e1-93e388695bf5",
                                "DisplayName": "Database",
                                "MPIcon": "cp-db",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": [
                                    "16c2b555-13e6-f9e7-a7ce-033ab284e8ed",
                                    "b75add78-50d5-1075-7163-0f5aeb070327",
                                    "ff2b5e4b-f481-cf27-3d38-28ffdfc88098",
                                    "07acbb55-9f51-2ede-7388-37471a258982",
                                    "7a0534a9-dd5f-ecaa-1d1a-3ea15c354174",
                                    "b8ed563e-a77f-b8d5-fb0a-40784a96d5ef",
                                    "e89ff3f2-72f2-7229-dbee-50e7913946ce",
                                    "c3794e43-3488-86a6-dafa-5631c70f28e3",
                                    "e5674f21-4aa8-698b-40fc-5e9f48581e08",
                                    "b8bb3d42-1715-e06a-7022-5fc199e6909f",
                                    "0ab03a95-d487-597a-84f2-6a90e5d5c7fb",
                                    "79df1237-b713-208f-be0f-6e8458d91ad6",
                                    "4d4518b8-19fd-e3bf-e39b-7712eab2acbe",
                                    "9c6f7279-3683-c017-41a3-b4b500bd1096",
                                    "144ac885-a77f-71a1-c2b2-ba6605416ece",
                                    "1b00eede-2655-c4c7-6a4f-cace40413c81",
                                    "e295a4c1-b92e-91ce-ef7a-d60dedfc7285",
                                    "c9e225cd-c051-1560-a6bf-e3d736766727",
                                    "53b032ad-ef28-26c8-bd47-e8e4631119db",
                                    "56149e14-9583-7c79-eec5-efff3cd4b78e"
                                ],
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 2,
                                "MOId": "4ea35a53-313e-4d88-90fe-49670033bc49"
                            },
                            {
                                "State": 1,
                                "MPId": "445bfd31-7082-4161-979c-0d4dc5558eac",
                                "DisplayName": "ITSM Page",
                                "MPIcon": "cp-ie",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": [
                                    "2d6e9ac1-fd67-16d2-a818-33cb6093f45f",
                                    "7ce5f500-5e8f-fc10-1c23-f4720317cdac"
                                ],
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 3,
                                "MOId": "4ea35a53-313e-4d88-90fe-49670033bc49"
                            },
                            {
                                "State": 1,
                                "MPId": "d78e294a-a2c4-43de-8d29-063d078466d7",
                                "DisplayName": "Cluster Disks",
                                "MPIcon": "cp-cd",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": null,
                                "RuleId": "ca3e9326-4213-4f10-9ca7-2ab1ad685bb0",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 999,
                                "MOId": "4ea35a53-313e-4d88-90fe-49670033bc49"
                            }
                        ],
                        "RAM": {
                            "State": 1,
                            "Total": 32668,
                            "Used": 13823,
                            "UsedPct": 42,
                            "Free": 18845,
                            "FreePct": 58
                        },
                        "CPU": {
                            "State": 1,
                            "Total": -1,
                            "Used": -1,
                            "UsedPct": 5,
                            "Free": -1,
                            "FreePct": 95
                        },
                        "DiskList": [
                            {
                                "State": 1,
                                "Total": 102049,
                                "Used": 29813,
                                "UsedPct": 29,
                                "Free": 72236,
                                "FreePct": 71
                            },
                            {
                                "State": 1,
                                "Total": 754300,
                                "Used": 252226,
                                "UsedPct": 33,
                                "Free": 502074,
                                "FreePct": 67
                            }
                        ],
                        "MOId": "4ea35a53-313e-4d88-90fe-49670033bc49",
                        "MOName": "ITSM-SDP-2.corp.sinochem.com",
                        "MOSrcId": "076db59b-5925-1bc2-042b-f027bd370460",
                        "MODisplayName": "ITSM-SDP-2",
                        "GroupId": "0dcbf3de-e37a-4f33-bafa-e10736b808df",
                        "IsServer": true,
                        "CpuRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "RamRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "DiskRuleId": "ca3e9326-4213-4f10-9ca7-2ab1ad685bb0",
                        "Rank": 2,
                        "MOIcon": "sv-basic",
                        "Remarks": null,
                        "ExAttributes": null
                    }
                ],
                "GroupId": "0dcbf3de-e37a-4f33-bafa-e10736b808df",
                "GroupName": "ITSM SDP",
                "Rank": 1,
                "ViewId": "9f7218da-5234-474a-b2d1-ce8bf3d5cf8b"
            },
            {
                "MoList": [
                    {
                        "MoState": 1,
                        "MPList": [
                            {
                                "State": 1,
                                "MPId": "9765664e-00d0-4a59-8021-439e80dc2825",
                                "DisplayName": "Services",
                                "MPIcon": "cp-service",
                                "SrcId": "00000000-0000-0000-0000-000000000000",
                                "SrcIds": [
                                    "f40a118f-9533-b812-c8fc-1201f74506f1",
                                    "d2539121-7f9a-a2c0-c7f9-14c7e3b2b8e4",
                                    "fa06301e-5a8f-c919-40c6-1b5ce0c2c626",
                                    "c1a3c16a-7931-7303-8abf-1eed67d98d80",
                                    "43e7dfa4-f60d-056c-4cf1-3cf5cf761c68",
                                    "f2ffe5e8-eee0-4495-385d-602ed338e175",
                                    "fb7db862-a978-87ae-ba64-b922099304be",
                                    "cbfbee26-c462-e4c4-b05c-bfcaf1c7cde8",
                                    "19924dce-94a5-1d54-4ea5-bffb71ff8963",
                                    "5361f6ac-92ff-1ee1-aa78-c566f77d14ef",
                                    "1d560b4a-d3a3-5582-c645-c73b598e21dc",
                                    "7c6c97d1-e369-6afb-1320-c7f15036e563",
                                    "d04d2b81-7925-11e5-c907-d54f6e90bb70",
                                    "e7496471-0eef-bd8f-691b-e7f6385bdd2a",
                                    "fd122c66-7afb-af5b-b6f7-eeb17c4a638b",
                                    "69c322eb-88d0-058f-c5ec-efcad0309b04"
                                ],
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 1,
                                "MOId": "0cb080d1-f67b-4aef-ad31-dcdddb5b6517"
                            }
                        ],
                        "RAM": {
                            "State": 1,
                            "Total": 16268,
                            "Used": 3099,
                            "UsedPct": 19,
                            "Free": 13169,
                            "FreePct": 81
                        },
                        "CPU": {
                            "State": 1,
                            "Total": -1,
                            "Used": -1,
                            "UsedPct": 1,
                            "Free": -1,
                            "FreePct": 99
                        },
                        "DiskList": [
                            {
                                "State": 1,
                                "Total": 99649,
                                "Used": 20272,
                                "UsedPct": 20,
                                "Free": 79377,
                                "FreePct": 80
                            },
                            {
                                "State": 1,
                                "Total": 756700,
                                "Used": 4078,
                                "UsedPct": 1,
                                "Free": 752622,
                                "FreePct": 99
                            },
                            {
                                "State": 1,
                                "Total": 3071869,
                                "Used": 6480,
                                "UsedPct": 0,
                                "Free": 3065389,
                                "FreePct": 100
                            }
                        ],
                        "MOId": "0cb080d1-f67b-4aef-ad31-dcdddb5b6517",
                        "MOName": "ITSM-RECORD.corp.sinochem.com",
                        "MOSrcId": "075f2852-2ca7-cb54-f5b0-c1130a413be4",
                        "MODisplayName": "ITSM-RECORD",
                        "GroupId": "b3f05950-3aea-4904-95a4-b8f3c168bbf2",
                        "IsServer": true,
                        "CpuRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "RamRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "DiskRuleId": "686c1496-cc64-4ba3-ab94-ccfcb7cabd7f",
                        "Rank": 1,
                        "MOIcon": "sv-basic",
                        "Remarks": null,
                        "ExAttributes": null
                    }
                ],
                "GroupId": "b3f05950-3aea-4904-95a4-b8f3c168bbf2",
                "GroupName": "ITSM RECORD",
                "Rank": 2,
                "ViewId": "9f7218da-5234-474a-b2d1-ce8bf3d5cf8b"
            },
            {
                "MoList": [
                    {
                        "MoState": 1,
                        "MPList": [
                            {
                                "State": 1,
                                "MPId": "dd78f314-e029-43c8-ae15-0e72333f1525",
                                "DisplayName": "Process",
                                "MPIcon": "cp-wheel",
                                "SrcId": "1ef73c61-cb9e-d1a3-7f94-96c628d8f4c5",
                                "SrcIds": null,
                                "RuleId": "00000000-0000-0000-0000-000000000000",
                                "ExAttributes": null,
                                "Remarks": null,
                                "Rank": 1,
                                "MOId": "dc9b9d9b-d600-4305-8f8f-797137b08538"
                            }
                        ],
                        "RAM": {
                            "State": 1,
                            "Total": 16298,
                            "Used": 2655,
                            "UsedPct": 16,
                            "Free": 13643,
                            "FreePct": 84
                        },
                        "CPU": {
                            "State": 1,
                            "Total": -1,
                            "Used": -1,
                            "UsedPct": 0,
                            "Free": -1,
                            "FreePct": 100
                        },
                        "DiskList": [
                            {
                                "State": 1,
                                "Total": 99649,
                                "Used": 14985,
                                "UsedPct": 15,
                                "Free": 84664,
                                "FreePct": 85
                            },
                            {
                                "State": 1,
                                "Total": 756701,
                                "Used": 491,
                                "UsedPct": 0,
                                "Free": 756210,
                                "FreePct": 100
                            }
                        ],
                        "MOId": "dc9b9d9b-d600-4305-8f8f-797137b08538",
                        "MOName": "ITSM-MESSAGE.corp.sinochem.com",
                        "MOSrcId": "56cbfdd5-f57e-4f9a-f831-90fab487f8de",
                        "MODisplayName": "ITSM-MESSAGE",
                        "GroupId": "d712214d-3601-4875-8420-e27e6488ce74",
                        "IsServer": true,
                        "CpuRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "RamRuleId": "1fe2fde4-782c-49df-b676-d090e7a53fb3",
                        "DiskRuleId": "ca3e9326-4213-4f10-9ca7-2ab1ad685bb0",
                        "Rank": 1,
                        "MOIcon": "sv-basic",
                        "Remarks": null,
                        "ExAttributes": null
                    }
                ],
                "GroupId": "d712214d-3601-4875-8420-e27e6488ce74",
                "GroupName": "ITSM MESSAGE",
                "Rank": 3,
                "ViewId": "9f7218da-5234-474a-b2d1-ce8bf3d5cf8b"
            }
        ],
        "ViewId": "9f7218da-5234-474a-b2d1-ce8bf3d5cf8b",
        "ViewType": 1,
        "Expandable": false,
        "ViewName": "ITSM ÏµÍ³ÍØÆË¼à¿ØÍ¼",
        "Rank": 1,
        "Frequency": 20,
        "Enabled": true
    };
}
function Draw(cvs,json) {

    //todo:zhu xiao yi

    var Group_List           = json.GroupList;
    
    var ITSM_SDP             = Group_List[0];
    var ITSM_RECORD          = Group_List[1];
    var ITSM_MESSAGE         = Group_List[2];

    cvs.addLayer({
        type: 'image',
        source: $('#img-itsm-bg')[0],
        x: 0, y: 0,
        index: -1,
        width: 1920,
        height: 1080,
        fromCenter: false
    })

    cvsBrushStartPointX = 700;
    cvsBrushStartPointY = 345;

    ITSM_SDP.MoList.forEach(function(ele, i) {
        drawMoList(cvs, ele, i, cvsBrushStartPointX, cvsBrushStartPointY);
        cvsBrushStartPointX += eleWidth + 1.8 * eleHorizontalSpacing;
    });

    cvsBrushStartPointX = 1325;
    cvsBrushStartPointY = 120;

    ITSM_RECORD.MoList.forEach(function(ele, i) {
        drawMoList(cvs, ele, i, cvsBrushStartPointX, cvsBrushStartPointY);
        cvsBrushStartPointX += eleWidth + 1.8 * eleHorizontalSpacing;
    });

    cvsBrushStartPointX = 1325;
    cvsBrushStartPointY = 610;

    ITSM_MESSAGE.MoList.forEach(function(ele, i) {
        drawMoList(cvs, ele, i, cvsBrushStartPointX, cvsBrushStartPointY);
        cvsBrushStartPointX += eleWidth + 1.8 * eleHorizontalSpacing;
    });

    cvs.addLayer({
        type: 'line',
        strokeStyle: '#EB7B22',
        strokeWidth: 4,
        x1: 938, y1: 785,
        x2: 938, y2: 835,
        close: true
    })

    cvs.drawLayers();

}

function drawMoList(cvs, ele, i, x, y) {

    var w = eleWidth - 2 * eleHorizontalSpacing - eleMarginRight;
    var h = eleHeight - 2 * eleVerticalSpacing;

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
        y: y + eleMarginRight / 1.2,
        width: eleMarginRight / 1.75,
        height: eleMarginRight / 1.75
    }).addLayer({
        // 服务器名称背板
        type: 'rectangle',
        fillStyle: '#3a75c5',
        x: x + eleHorizontalSpacing,
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
        x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 2.25 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: ele.MODisplayName,
    });

    var eleUsedCPUPct    = '';
    var eleUsedMemoryPct = '';
    var eleUsedDiskPct   = [];

    if (ele.MoState == 4) {
        eleUsedCPUPct = eleUsedMemoryPct = '? %';
        eleUsedDiskPct.concat(['? %', '? %']);
    } else {
        eleUsedCPUPct = ele.CPU.UsedPct;
        eleUsedMemoryPct = ele.RAM.UsedPct;
        ele.DiskList.forEach(function(item) {
            eleUsedDiskPct.push(item.UsedPct);
        })
    }

    // CPU
    cvs.addLayer({
        // CPU名称
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x + eleHorizontalSpacing,
        y: y + eleVerticalSpacing * 3.3 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Processor Time %',
        fromCenter: false
    }).addLayer({
        // CPU使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 6,
        x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 5.25 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 1.2,
        cornerRadius: 5
    }).addLayer({
        // CPU使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.CPU.State),
        x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
        y: y + eleVerticalSpacing * 4.85 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedCPUPct / 100,
        height: eleVerticalSpacing * 1.2 - eleVerticalSpacing / 3,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // CPU使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 5.25 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedCPUPct + '%'
    })

    // Memory
    cvs.addLayer({
        // CPU名称
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x + eleHorizontalSpacing,
        y: y + eleVerticalSpacing * 6.25 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize * 1.2,
        fontFamily: 'Microsoft YaHei',
        text: 'Memory Time %',
        fromCenter: false
    }).addLayer({
        // CPU使用率外框
        type: 'rectangle',
        strokeStyle: '#eee',
        strokeWidth: eleVerticalSpacing / 6,
        x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 8.35 + (w - eleMarginRight / 1.5) * 1.48,
        width: eleMarginRight * 2.5,
        height: eleVerticalSpacing * 1.2,
        cornerRadius: 5
    }).addLayer({
        // CPU使用率显示条
        type: 'rectangle',
        fillStyle: GetStateColor(ele.RAM.State),
        x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
        y: y + eleVerticalSpacing * 7.95 + (w - eleMarginRight / 1.5) * 1.48,
        width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedMemoryPct / 100,
        height: eleVerticalSpacing * 0.8,
        cornerRadius: 5,
        fromCenter: false
    }).addLayer({
        // CPU使用率
        type: 'text',
        fillStyle: '#000',
        fontStyle: 'bold',
        x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
        y: y + eleVerticalSpacing * 8.35 + (w - eleMarginRight / 1.5) * 1.48,
        fontSize: eleFontSize,
        fontFamily: 'Microsoft YaHei',
        text: eleUsedMemoryPct + '%'
    })

    var drawDiskStartY;

    if(!!ele.MODisplayName.match('ITSM-SDP')){
        drawDiskStartY = y + eleVerticalSpacing * 9.35 + (w - eleMarginRight / 1.5) * 1.48;
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
                x: x + eleHorizontalSpacing * 1.85,
                y: drawDiskStartY + eleVerticalSpacing * 0.4,
                fontSize: eleFontSize * 1.2,
                fontFamily: 'Microsoft YaHei',
                text: diskArr[i] + '    Free Disk %',
                fromCenter: false
            }).addLayer({
                // Disk使用率外框
                type: 'rectangle',
                strokeStyle: '#eee',
                strokeWidth: eleVerticalSpacing / 6,
                x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
                y: drawDiskStartY + eleVerticalSpacing * 3.2,
                width: eleMarginRight * 2.5,
                height: eleVerticalSpacing * 1.2,
                cornerRadius: 5
            }).addLayer({
                // Disk使用率显示条
                type: 'rectangle',
                fillStyle: GetStateColor(ele.DiskList[i].State),
                x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
                y: drawDiskStartY + eleVerticalSpacing * 2.8,
                width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
                height: eleVerticalSpacing * 0.8,
                cornerRadius: 5,
                fromCenter: false
            }).addLayer({
                // Disk使用率
                type: 'text',
                fillStyle: '#000',
                fontStyle: 'bold',
                x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
                y: drawDiskStartY + eleVerticalSpacing * 3.2,
                fontSize: eleFontSize,
                fontFamily: 'Microsoft YaHei',
                text: eleUsedDiskPct[i] + '%'
            })
            drawDiskStartY += eleVerticalSpacing * 4.5
        })
    } else {
        drawDiskStartY = y + eleVerticalSpacing * 9.1 + (w - eleMarginRight / 1.5) * 1.48;
        // Disk
        ele.DiskList.forEach(function(item, i) {
            cvs.addLayer({
                // Disk图标
                type: 'image',
                source: GetFeaturesIcon('cp-disk'),
                x: x + eleHorizontalSpacing,
                y: drawDiskStartY,
                width: eleHorizontalSpacing * 2.4,
                height: eleHorizontalSpacing * 2.4,
                fromCenter: false,
            }).addLayer({
                // Disk名称
                type: 'text',
                fillStyle: '#000',
                fontStyle: 'bold',
                x: x + eleHorizontalSpacing * 1.85,
                y: drawDiskStartY + eleVerticalSpacing * 0.35,
                fontSize: eleFontSize * 1.2,
                fontFamily: 'Microsoft YaHei',
                text: diskArr[i] + '    Free Disk %',
                fromCenter: false
            }).addLayer({
                // Disk使用率外框
                type: 'rectangle',
                strokeStyle: '#eee',
                strokeWidth: eleVerticalSpacing / 6,
                x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
                y: drawDiskStartY + eleVerticalSpacing * 2.8,
                width: eleMarginRight * 2.5,
                height: eleVerticalSpacing * 1.2,
                cornerRadius: 5
            }).addLayer({
                // Disk使用率显示条
                type: 'rectangle',
                fillStyle: GetStateColor(ele.RAM.State),
                x: x + eleHorizontalSpacing + eleVerticalSpacing / 6,
                y: drawDiskStartY + eleVerticalSpacing * 2.4,
                width: (eleMarginRight * 2.5 - eleVerticalSpacing / 3) * eleUsedDiskPct[i] / 100,
                height: eleVerticalSpacing * 0.8,
                cornerRadius: 5,
                fromCenter: false
            }).addLayer({
                // Disk使用率
                type: 'text',
                fillStyle: '#000',
                fontStyle: 'bold',
                x: x + eleHorizontalSpacing + eleMarginRight * 1.25,
                y: drawDiskStartY + eleVerticalSpacing * 2.8,
                fontSize: eleFontSize,
                fontFamily: 'Microsoft YaHei',
                text: eleUsedDiskPct[i] + '%'
            })
            drawDiskStartY += eleVerticalSpacing * 3.6
        })
    }

    var MPListLength = ele.MPList.length;
    var drawMPStartY = 0;
    switch(MPListLength) {
        case 1:
            drawMPStartY = y + eleVerticalSpacing * 7.5 + (w - eleMarginRight / 1.5) * 1.48;
            break;
        case 2:
            drawMPStartY = y + eleVerticalSpacing * 5.5 + (w - eleMarginRight / 1.5) * 1.48;;
            break;
        case 3:
            drawMPStartY = y + eleVerticalSpacing * 2.5 + (w - eleMarginRight / 1.5) * 1.48;;
            break;
        case 4:
            drawMPStartY = y + eleVerticalSpacing * 1.5 + (w - eleMarginRight / 1.5) * 1.48;
            break;
        default: 
            drawMPStartY = y + eleVerticalSpacing * 1.5 + (w - eleMarginRight / 1.5) * 1.48;
            break;
    }

    ele.MPList.forEach(function (item, i) {
        cvs.addLayer({
            type: 'image',
            source: GetFeaturesIcon(item.MPIcon),
            x: x + w + eleHorizontalSpacing * 2.8,
            y: drawMPStartY,
            width: eleMarginRight * 0.7,
            height: eleMarginRight * 0.7,
            fromCenter: false
        }).addLayer({
            type: 'image',
            source: GetStateIcon(item.State),
            x: x + w + eleMarginRight * 0.95,
            y: drawMPStartY,
            width: eleMarginRight / 3,
            height: eleMarginRight / 3,
            fromCenter: false
        })
        drawMPStartY += eleVerticalSpacing * 4.3;
    })
}

function GetStateIcon(state) {
    return $('#img-st-' + state)[0];
}

function GetFeaturesIcon(icon) {
    return $('#img-' + icon)[0];
}

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