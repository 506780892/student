        
        //热点图统计埋点
        //屏幕分辨率
        var width = window.screen.width;
        var height = window.screen.height;
        //浏览器分辨率
        var b_width = document.documentElement.clientWidth;
        var b_height = document.documentElement.clientHeight;
        //操作系统
        var OS = (isIOS)?"ios": ((isAndroid)?"Android":"other");
        //页面长度
        var page_len = document.body.clientHeight;
        //初始化滚动条位置
        var scrollTop = 0;
        //初始化时间
        var clickTime = 0;
        var clickStatus = false;
        var loadtime = loadtime || 0;
        var union_mapping_id = gconfig.union_mapping_id || 0;

        var baseApi = "//datain.rvfdp.com/api/v1/gn/sqw/platform/ab_hotmap_click?apikey=06789451-66fd-45a4-afa0-ad0f5d31fdc2";

        //捕获热点图
        var catchClickHeat = function (e) {
          //阻止触摸时浏览器的缩放、滚动条滚动等
          e.preventDefault();
          //获取元素信息
          var target = e.target;
          var nodeName = target.nodeName;
          var nodeSrc = target.getAttribute("src");
          var className = target.className;
          var reg = /([^\/]+)$/g;
          var nodeSrcName = reg.exec(nodeSrc);
          var eUrlName = (nodeSrcName[0]=="null")?className:nodeSrcName[0];
          //记录触点位置
          var x = Number(e.pageX); //页面触点X坐标
          var y = Number(e.pageY); //页面触点Y坐标

          //点击获取滚动条位置
          var clickScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

          //首次点击时间
          if (clickStatus == false) {
              clickTime = pt.click();
              clickStatus = true;
          }

          var imgObj = new Image();
            imgObj.src = baseApi + "&referer=" + referer + "&platform_id=" + platformId + "&union_id=" + unionId + "&step=6&link_id=" + linkId + "&page_id=" + adId + "&b_id=" + bid + "&gid=" + gameId + "&sid=" + gameServerId + "&w=" + width + "&h=" + height + "&bw=" + b_width + "&bh=" + b_height + "&x=" + x + "&y=" + y + "&element=" + nodeName + "&e_url=" + eUrlName+"&os="+OS+"&scroll="+clickScrollTop+"&union_mapping_id="+union_mapping_id;
          }

        //页面离开触发事件
        var leaveStatus = true; //首次触发
        var clickLeaveStatus = (clickLeaveStatus == "undefined")?false:clickLeaveStatus;  //点击触发
        var leaveTime = 0;
        var reportLeave = function (e) { 
        	//如果是点击触发，则返回
        	if (clickLeaveStatus) {
        		clickLeaveStatus = false;
        		return ;
        	}
            //非首次触发
            if (!leaveStatus) {
                return ;
            }
            //首次触发
            if (leaveStatus) {
                leaveTime = pt.leave() || 0;
                leaveStatus = false;
            };
            //时间长度限制
            if (leaveTime >= 5 * 60 * 1000) {
                leaveTime = 300000; //最大页面访问时间
            }
            
            var imgObj = new Image();
            imgObj.src = baseApi + "&referer=" + referer + "&platform_id=" + platformId + "&union_id=" + unionId + "&step=7&link_id=" + linkId + "&page_id=" + adId + "&b_id=" + bid + "&gid=" + gameId + "&sid=" + gameServerId + "&w=" + width + "&h=" + height + "&bw=" + b_width + "&bh=" + b_height+"&click_time="+clickTime+"&load_time="+loadtime+"&leave_time="+leaveTime+"&scroll="+scrollTop+"&os="+OS+"&page_len="+document.body.clientHeight+"&union_mapping_id="+union_mapping_id;

        }

        //事件监听, ios不支持document.body
        if (isIOS) {
            $("img").on("click",catchClickHeat);
        } else {
            addEvtListener(document.body, "click", catchClickHeat);
        }
        //croll监听
        addEvtListener(document, "scroll", pt.scrollTop);
        //离开页面触发
        addEvtListener(window, "beforeunload",function(e){
            e = e || window.event;
            reportLeave(e);
        });
        addEvtListener(window, "unload",function(e){
            e = e || window.event;
            reportLeave(e);
        });

        //心跳触发统计
        // setInterval(reportLeave,2000);



