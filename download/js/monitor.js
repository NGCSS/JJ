var monitor = {
    _domain: "monitor.cheyipai.com",
    _sessionName: "cypweblog",
    _pageId: "",
    _monitorModel: "",
    _http: "http://",
    Init: function () {
        $('.track').click(function () { monitor.TrackClick(this); });
    },
    TrackClick: function (obj) {
        var name = $(obj).attr("trackname");
        var sessionId = monitor.GetCookie();
        var url = window.location.href;
        var referrer = document.referrer;
        var postUrl = monitor._http + monitor._domain + "/click";
        $.ajax({
            url: postUrl,
            dataType: "jsonp",
            data: { url: url, referrer: referrer,name: name, sessionId: sessionId, monitorModel: monitor._monitorModel },
            jsonp: "jsonpcallback"
        });
    },
    LoadPage: function (monitorModel,ishttps) {
        monitor._pageId = monitor.GetGuid();
        monitor.Init();
        try {
            $(window).unload(function () {
                monitor.Leave();
            });
        } catch (e) {

        }
        if (ishttps == true) {
            monitor._http = "https://";
        }
        var sessionId = monitor.GetCookie();
        var screenHeight = window.screen.height;
        var screenWidth = window.screen.width;
        var url = window.location.href;
        var referrer = document.referrer;
        var postUrl = monitor._http + monitor._domain + "/loadpage";
        monitor._monitorModel = monitorModel;
        $.ajax({
            url: postUrl,
            dataType: "jsonp",
            data: { url: url, referrer: referrer, sessionId: sessionId, pageId: monitor._pageId, monitorModel: monitorModel },
            jsonp: "jsonpcallback"
        });
    },
    Leave: function () {
        var sessionId = monitor.GetCookie();
        var screenHeight = window.screen.height;
        var screenWidth = window.screen.width;
        var url = window.location.href;
        var referrer = document.referrer;
        var postUrl = monitor._http + monitor._domain + "/leave";
        $.ajax({
            url: postUrl,
            dataType: "jsonp",
            data: { url: url, referrer: referrer, sessionId: sessionId, pageId: monitor._pageId, monitorModel: monitor._monitorModel },
            jsonp: "jsonpcallback"
        });
    },
    //写cookies
    SetCookie: function () {
        var guid = monitor.GetGuid();
        document.cookie = monitor._sessionName + "=" + escape(guid);
        return guid;
    },
    //读取cookies
    GetCookie: function () {
        var arr, reg = new RegExp("(^| )" + monitor._sessionName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else {
            return monitor.SetCookie();
        }
    },
    GetGuid: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
};
