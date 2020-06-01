        /*变量声明*/
         var pt = {
            begin: function() {},
            load: function() {
                return getTimestamp() - vtime
            },
            adload: function() {
                window.adltime = getTimestamp();
                return window.adltime - vtime
            },
            click: function() {
                return getTimestamp() - adltime
            },
            unload: function() {
                var a = new Image();
                if (gconfig.union_type == 1 || gconfig.union_type == 2) {
                    try {
                        var c = $("storage_login_account").value;
                        a.src = "//pt.clickdata.63yx.com/ps.gif?id=33&at=6&la=" + c + "&ck=&gid=" + window.gameId + "&sid=" + window.gameServerId + "&cf=" + encodeURIComponent(window.location.href) + "&e1=" + window.unionId + "&e2=" + window.uid + "&e3=" + (typeof(window.linkId) != "undefined" ? window.linkId: -1) + "&e4=" + window.adId + "&e5=" + adParam + "&e6=" + (getTimestamp() - adltime) + "&e7=" + window.referer
                    } catch(b) {}
                } else {
                    a.src = "/o/" + window.platformId + "/" + window.unionId + "/" + (typeof(window.linkId) != "undefined" ? window.linkId: -1) + ".js?step=6&uid=" + uid + "&lt=" + (getTimestamp() - adltime) + "&key=" + key
                }
            },
            scrollTop: function() {
                scrollTop = scrollTop || 0;
                var tmpScrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条

                scrollTop = (tmpScrollTop > scrollTop)? tmpScrollTop : scrollTop;

                return scrollTop;
            },
            leave: function() {
                return getTimestamp() - vtime
            }
         };

         //监听事件
        var addEvtListener = function (f, d, e) {
            if (document.addEventListener) {
                if (f) {
                    f.addEventListener(d, e, false)
                } else {
                    addEventListener(d, e, false)
                }
            } else {
                if (attachEvent) {
                    if (f) {
                        f.attachEvent("on" + d, e)
                    } else {
                        attachEvent("on" + d, e)
                    }
                }
            }
        };