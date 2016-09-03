/**
 *
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-24.
 */
var hdMDrawv1 = [{
    "id"         : "hdMDrawv1",
    "extend_attr": {
        "img"   : "http://hd.res.meizu.com/hd/image/2016/07/20/kw.png",
        "search": ["DRAW"]
    },
    "content"    : {
        "main"   : {
            "bg"            : {
                "name"       : "全局背景",
                "text"       : "#4f42ff",
                "description": "设置全局背景：'#fff'或'url(xx.jpg) top center'"
            },
            "id"            : {
                "name"       : "抽奖活动id",
                "disabled"   : "222",
                "description": "抽奖活动id"
            },
            "start_date": {
                "name"       : "抽奖开始时间",
                "disabled"       : "2016/08/11 00:00:00",
                "description": "抽奖开始时间"
            },
            "end_date": {
                "name"       : "抽奖结束时间",
                "disabled"       : "2016/09/19 00:00:00",
                "description": "抽奖结束时间"
            },
            "drawShareBtn": {
                "name"       : "分享按钮标题",
                "text"       : "更多抽奖机会",
                "description": "分享微博按钮标题文案"
            },
            "drawShareDec": {
                "name"       : "分享文案",
                "text"       : "这个是分享抽奖的文案",
                "description": "这个是分享抽奖的文案"
            },
            "drawShareImg": {
                "name"       : "分享图片",
                "link"       : "http://storeimg.meizu.com/product/1467792389-37357.jpg",
                "description": "这个是分享图片连接"
            },
            "addChance" : {
                "name"       : "分享赠送机会次数",
                "text"       : "3",
                "description": "分享微博赠送抽奖机会次数"
            },
            "pullInfoSucc" : {
                "name"       : "成功后微博分享文案",
                "text"       : "分享“我的奖品”至新浪微博，再送您3次抽奖机会～",
                "description": "提交收货信息成功后分享文案"
            },
            "shareMyPrice" : {
                "name"       : "分享我的奖品文案",
                "text"       : "在魅粉节我抽中了[name],你也来玩吧！",
                "description": "格式按照”xxx[name]xxx“的形式，其中[name]系统会自动替换为奖品名称"
            },
            "defaultId":{
                "name"       : "默认奖品ID*",
                "text"   : "2",
                "description": "用于未中奖时的位置或请求超时"
            },
            "regulation":{
                "name"       : "抽奖规则",
                "textarea"   : "<p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p><p>抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签抽奖规则，支持html标签</p>",
                "description": "抽奖规则，支持html标签"
            }
        },
        "details": [
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 1,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://hd.res.meizu.com/hd/image/2016/08/31/meilan3.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品1",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 2,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://hd.res.meizu.com/hd/image/2016/08/31/meilan3.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品2",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 3,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://hd.res.meizu.com/hd/image/2016/08/31/meilan3.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品3",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 4,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://open.file.meizu.com/group1/M00/00/25/CnQOjVepOvOAOGCrAAXR6vpSrko819_180x180.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品4",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 5,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://open.file.meizu.com/group1/M00/00/20/Cix_s1ehSPOACER1AATZrGgT1ak591_180x180.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品5",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 6,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://open.file.meizu.com/group1/M00/00/27/CnQOjVeqj2OAVrp-AAJnOutUJbs295_180x180.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品6",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 7,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://open.file.meizu.com/group1/M00/00/1A/Cix_s1ePN7KAOHGyAAvhVMfnh40024_180x180.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品7",
                    "description": "奖品标题，可为空"
                }
            },
            {
                "prizeId"  : {
                    "name"       : "奖品ID",
                    "disabled"   : 8,
                    "description": "奖品ID，不支持修改"
                },
                "prizeImg" : {
                    "name"       : "奖品图片链接",
                    "link"       : "http://open.file.meizu.com/group1/M00/00/27/CnQOjVeqkH2AVS42AAJC8V5rXjc047_180x180.png",
                    "description": "奖品图片链接"
                },
                "prizeName": {
                    "name"       : "奖品标题",
                    "text"       : "奖品8",
                    "description": "奖品标题，可为空"
                }
            }

        ]
    }
}
]