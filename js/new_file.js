function  parseDeclareString(declareString) {
    var str = declareString;
    var e = new RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g");
    var d = str.match(e);
    var k, n, t = 0;
    var c = {};
    if (d) {
        d.push(',');
        for (var z = 0, u; u = d[z]; ++z) {
            var r = u.charCodeAt(0);
            if (44 === r) {
                if (0 >= t) {
                    if (k) {
                        try {
                            if (k == 'id') {
                                c[k] = n.join("").replace(/'/g, '');
                            } else {
                                c[k] = eval(n.join(""));
                            }
                        } catch (e) {
                            c[k] = n.join("");
                        }
                    }
                    k = n = t = 0;
                    continue;
                }
            } else if (58 === r) {
                if (!n)
                    continue
            } else if (47 === r && z && 1 < u.length)
                (r = d[z - 1].match(g)) && !h[r[0]] && (str = str.sustrstr(str.indexOf(u) + 1), d = str.match(e), d.push(","), z = -1, u = "/");
            else if (40 === r || 123 === r || 91 === r)
                ++t;
            else if (41 === r || 125 === r || 93 === r)
                --t;
            else if (!k && !n) {
                k = 34 === r || 39 === r ? u.slice(1, -1) : u;
                continue;
            }
            n ? n.push(u) : n = [u]
        }
    }
    return c;
}

function parseReqClient(cmd) {
    var dotIndex = cmd.indexOf(',');
    var clientCmd,
            clientParams = {};
    if (dotIndex > -1) { //瀛樺湪鍙傛暟浼犻€�
        clientCmd = cmd.substr(0, dotIndex);
        paramStr = cmd.substr(dotIndex + 1);
        clientParams = parseDeclareString(paramStr);
    } else {
        clientCmd = declareStr;
    }
    return {
        action: clientCmd,
        params: clientParams
    }
}

var linkedFn;

var os = navigator.userAgent.match(/iphone|ipad|ipod/i) ? 'ios' : 'android';

var appLink = {
    connect: function () {//ios=2-1 android=3-4
        var act = arguments[0];
        if (os == 'ios') {
            if (typeof (act) == 'object') {
                //alert(1);
                appLink.action = act.bridge;
                appLink.action.init();
                appLink.action.registerHandler('amapCallWebViewHandler', callbacks);
                if (linkedFn) {
                    linkedFn();
                }
            } else {
                //alert(2);
                window.ampTpl = act;
                document.addEventListener('WebViewJavascriptBridgeReady', appLink.connect, false);
                linkedFn = arguments[1];
                return;
            }
        } else {
            if (typeof (act) == 'object') {
                //alert(3);
                appLink.action = {
                    send: function (arg) {
                        arg = JSON.stringify(arg);
                        if (arguments[1]) {
                            try {
                                window.jsInterface.invokeMethod('send', [arg, arguments[1]]);
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            try {
                                window.jsInterface.invokeMethod('send', arg);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                }
                if (linkedFn) {
                    linkedFn();
                }
            } else {
                //alert(4);
                window.ampTpl = act;
                linkedFn = arguments[1];
                document.addEventListener('DOMContentLoaded', appLink.connect, false);
                return;
            }
        }
    }
}

var toastTimer;
function toast(info, timeStep) {
    if (!document.getElementById('toast')) {
        var toastDiv = document.createElement('div');
        toastDiv.id = "toast";
        document.body.appendChild(toastDiv);
    }
    if (toastTimer) {
        clearTimeout(toastTimer);
    }
    $("#toast").html(info).css('display', 'block');
    setTimeout(function () {
        $("#toast").html(info).css('display', 'none');
    }, timeStep || 2000);
}

function callbacks(res) {
    try {
        var data = res;
        if (data) {
            var _cbName = data._action;
            if (data.status == -1) {
                toast('缃戠粶寮傚父');
            } else if (data.status == -2) {
                //toast('璇蜂笅杞芥渶鏂扮増鏈�');
            } else if (data.status == 404) {
                toast('404 鐘舵€�');
            } else {
                if (_cbName) {
                    client.fnPool[_cbName].call(null, data.data ? data.data : data);
                    delete client.fnPool[_cbName]; //娓呴櫎缂撳瓨Fn.
                }
            }
        } else {
            toast('缃戠粶寮傚父');
        }
    } catch (e) {
        toast(e.message);
    }
}

var client = {
    count: 0,
    fnPool: {},
    sendMsg: function (params) {
        var _action = params._action;
        if (_action) {
            if (typeof _action == 'function') {
                var _cbName = '_action' + (client.count++);
                client.fnPool[_cbName] = _action;
                params._action = _cbName;
            }
        }
        appLink.action.send(params);
    },
    aosRequest: function (params) {
        params.url = (['m.meishubao.com', 'm.meishubaby.com', 'static2.meishubao.com', 'static2.meishubaby.com'].indexOf(location.host) != -1 ? 'http://api.meishubao.com/' : 'http://dev.meishubao.com:3000/') + params.url;
        //params.url= 'http://api.meishubaby.com/'+params.url;
        var _cbName = '_action' + (client.count++);
        client.fnPool[_cbName] = params.success;
        var subData = {
            action: 'aosrequest',
            _action: _cbName,
            params: params
        }
        client.sendMsg(subData);
    },
    jump2Teacher: function (params) {
        if (!params.action) {
            params.action = 'jump2Teacher';
        }
        client.sendMsg(params);
    },
    jump2Group: function (params) {
        if (!params.action) {
            params.action = 'jump2Group';
        }
        client.sendMsg(params);
    },
    jump2Login: function (fn) {
        var params = {
            action: 'jump2Login'
        }
        if (fn) {
            params._action = fn;
        }
        client.sendMsg(params);
    },
    jump2IM: function (params) {
        if (!params.action) {
            params.action = 'jump2IM';
        }
        client.sendMsg(params);
    },
    getAppVersion: function () {
        client.sendMsg({
            action: 'getAppVersion',
            _action: function (res) {
                toast(res.appVersion);
            }
        });
    },
    getUserInfo: function (fn) {
        var aa = fn;
        client.sendMsg({
            action: 'getUserInfo',
            _action: function (res) {
                fn(res);
            }
        });
    },
    setTitle: function (title) {
        client.sendMsg({
            action: 'setTitle',
            params: {
                title: title
            }
        })
    },
    jump2School: function (params) {
        if (!params.action) {
            params.action = 'jump2School';
        }
        client.sendMsg(params);
    },
    jump2Video: function (params) {
        if (!params.action) {
            params.action = 'jump2Video';
        }
        client.sendMsg(params);
    },
    jump2Theme: function (params) {
        if (!params.action) {
            params.action = 'jump2Theme';
        }
        client.sendMsg(params);
    },
    jump2Topic: function (params) {
        if (!params.action) {
            params.action = 'jump2Topic';
        }
        client.sendMsg(params);
    },
    canShare: function (canShare) {
        client.sendMsg({
            action: 'canShare',
            params: {
                canShare: canShare
            }
        })
    },
    vChat: function (params) {
        client.sendMsg({
            action: 'vChat',
            params: {
                userid: params.userid,
                nickname: params.nickname,
                fee: params.fee || 0,
                easemobuser: params.easemobuser
            }
        });
    },
    webClose: function () {
        client.sendMsg({
            action: 'webClose',
            params: {
            }
        });
    },
    shareInfo: function (params) {
        client.sendMsg({
            action: 'shareInfo',
            params: params
        });
    },
    teaActiv: function (params) {
        client.sendMsg({
            action: 'teaActiv',
            params: params
        });
    },
    videoChatPay: function (params) {
        client.sendMsg({
            action: 'videoChatPay',
            params: params
        });
    },
    webShare: function (params) {
        client.sendMsg({
            action: 'webShare',
            params: {
                title: params.title,
                desc: params.desc,
                img: params.img,
                url: params.url,
                type: params.type //1鏈嬪弸鍦� 2 qq绌洪棿 3寰俊濂藉弸 4 qq 5 寰崥 6 鑵捐寰崥 7 浜轰汉缃� 8 璞嗙摚
            }
        });
    },
	qqtalk: function (params) {
        client.sendMsg({
            action: 'qqtalk',
            params: {
                qq: params.qq,
                host: params.host,
				jumpurl: params.jumpurl
            }
        });
    }
};