// 微信JS工具类
class WxJs {
    constructor() {
    }
    /**
     * 参数parm
     *  currentPath：当前页面路径
     *  global：全局对象
     *  callback：初始化完成以后的回调
    */
    init (parm) {
        // 如果是苹果设备，不进行再次注册
        if(WxJs.isInit == true && (navigator.userAgent.toLowerCase().indexOf('ipad')>=0 || navigator.userAgent.toLowerCase().indexOf('iphone')>=0)){
            if (parm.callback) {
                parm.callback()
            }
            return null
        }
        // 注册JS
        var script = document.createElement("script")
        script.type = "text/javascript"
        script.src = 'http://weixin.talkedu.cn/WxJsApiHandler.ashx?mp_id=' + parm.global.mpId + '&debugger=false&url=' + encodeURIComponent(location.origin + parm.currentPath)
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = function () {
            try {
                wx.ready(function () {
                    //屏蔽微信右上角所有非基础按钮
                    wx.hideAllNonBaseMenuItem();
                    //要显示的菜单项
                    wx.showMenuItems({
                        menuList: [
                            "menuItem:copyUrl",
                            "menuItem:share:appMessage",
                            "menuItem:share:timeline",
                            "menuItem:favorite"
                        ]
                    });
                    wx.onMenuShareTimeline(parm.global.wxShare)  //分享朋友圈
                    wx.onMenuShareAppMessage(parm.global.wxShare)//分享给朋友
                    if (parm.callback) {
                        parm.callback()
                    }
                });
            } catch (e) { }
        }
        WxJs.isInit = true
    }
}
WxJs.isInit = false
export default new WxJs()
