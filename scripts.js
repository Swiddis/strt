const defaultsites = "d s stackexchange https://stackexchange.com/ https://stackexchange.com/search?q=,m r reddit https://www.reddit.com/ https://www.reddit.com/search/?q=,m t twitter https://twitter.com/home https://twitter.com/search?q=,w w wikipedia https://www.wikipedia.org/ https://en.wikipedia.org/wiki/,e w w3schools https://www.w3schools.com/";
const searchengine = "https://www.ecosia.org/search?q=";
const siteFile = "strtsites";

var sites = localStorage.getItem(siteFile) === null ? defaultsites : localStorage.getItem(siteFile);

var cats, catsts, tint, sitesbackup, hold=false;

var rcols = [], colors = [];

/*Update/format the time*/
function clockUpdate() {
    var d = new Date();
    var ds = d.toString().split(" ");
    var c = document.getElementById("clock");
    c.innerHTML = ds[0] + " " + ds[1] + " " + ds[2] + " " + ds[3] + "<br>" + ds[4] + "." + "" + d.getMilliseconds().toString().charAt(0) + " " + ds[5] + "<br>" + d.getTime();
    return null;
}

/*Get system information*/
function systemInfo() {
    sinfo = document.getElementById("sysinfo");
    var a = platform.os + "<br>" + platform.name + " " + platform.version + "<br>" + screen.width + " x " + screen.height;
    var b = parseInt(window.navigator.hardwareConcurrency);
    sinfo.innerHTML = a + "<br>" + b + " threads";
    return null;
}

/*Focus on the terminal*/
function trmnlFocus() {
    document.getElementById("trmnl").focus();
    return null;
}

/*Generate a random solarized color; the colors on each line of the menu will be unique.*/
function rancol(ids) {
    var mcolors = ["#b58900", "#cb4b16", "#dc322f", "#d33682",
                   "#6c71c4", "#268bd2", "#2aa198", "#859900"
    ];
    if (colors.length == 0) {
        colors = mcolors.slice();
    }
    var color;
    for (i = 0; i < ids.length; i++) {
        color = colors[Math.floor(Math.random() * colors.length)];
        if (colors.length == 0) {
            colors = mcolors.slice();
        } else {
            colors.splice(colors.indexOf(color), 1);
        }
        rcols.push([ids[i], color])
    }
    for (i = 0; i < rcols.length; i++) {
        $("#" + rcols[i][0]).css("color", rcols[i][1]);
    }
    return null;
}

/*Save modified site lists*/
function saveSites() {
    sitesbackup = sites;
    var saveList = "";
    for (i = 0; i < cats.length; i++) {
        for (j = 0; j < catsts[i].length; j++) {
            saveList += cats[i] + " " + catsts[i][j][0] + " " + catsts[i][j][1] + " " + catsts[i][j][2];
            if (catsts[i][j].length == 4) {
                saveList += " " + catsts[i][j][3];
            }
            saveList += ",";
        }
    }
    saveList = saveList.substr(0, saveList.length - 1);
    localStorage.setItem(siteFile, saveList);
}

/*Format a menu containing all the sites of a category as hyperlinks*/
function catMenu(category, items) {
    var menu = "<div id=\"" + category + "\" class=\"cat\" onmouseover=\"reveal(this.id);\" onclick=\"hold=!hold;\" onmouseout=\"if(!hold)hide(this.id);hold=false;\"><p>" + category + "</p><div id=\"" + category + "m\" style=\"display:none;\">";
    for (j = 0; j < items.length; j++) {
        menu += "<a href=\"" + items[j][2] + "\">" + items[j][0] + "-" + items[j][1] + "</a><br>";
    }
    menu += "</div></div>"
    return menu;
}

/*Build the category menus using the links.txt file*/
function menuBuilder(load, first) {
    if (load) {
        cats = [];
        catsts = [];
        if (first) {
            sites = defaultsites;
        }
        var sts = sites.split(",");
        var st;
        for (i = 0; i < sts.length; i++) {
            st = sts[i].split(" ");
            if (cats.indexOf(st[0]) > -1) {
                catsts[cats.indexOf(st[0])].push(st.slice(1, st.length + 1));
            } else {
                cats.push(st[0]);
                catsts.push([st.slice(1, st.length + 1)]);
            }
        }
    }
    document.getElementById("catmenu").innerHTML = "";
    for (i = 0; i < cats.length; i++) {
        document.getElementById("catmenu").innerHTML += catMenu(cats[i], catsts[i]);
    }
    saveSites();
    if (load) {
        rancol(cats);
    }
}

/*Toggling a hidden category menu*/
function reveal(id) {
    if ($("#" + id + "m").css("display") == "block") {
        hold = true;
    }
    else {
        $("#" + id + "m").css("display", "block");
    }
    return null;
}
function hide(id) {
    $("#" + id + "m").css("display", "none");
    return null;
}

/*Open link in new tab or new window*/
function loadSite(link, newWindow) {
    if (newWindow) {
        window.open(link);
    }
    else {
        window.location.assign(link);
    }
}

/*Handling input for the terminal*/
function terminal(event) {
    var skey = event.shiftKey;
    var input = document.getElementById("trmnl").value;
    document.getElementById("trmnl").value = "";
    if (input == "") {
        return null;
    }
    var cmd = input.charAt(0);
    var arg = input.substr(1);
    switch (cmd) {
        case "?":
            if ($("#helpmenu").css("display") == "none") {
                $("#helpmenu").css("display", "block");
            }
            else {
                $("#helpmenu").css("display", "none");
            }
            break;
        case "/":
            loadSite(searchengine + encodeURIComponent(arg), skey);
            break;
        case "=":
            loadSite("https://www.wolframalpha.com/input/?i=" + encodeURIComponent(arg), skey);
            break;
        case ",":
            loadSite(arg.slice(0,4) == "http" ? arg : "http://" + arg, skey);
            break;
        case "+":
            var l = cats.length;
            if (arg.length == 1 && cats.indexOf(arg) < 0) {
                cats.push(arg);
                catsts.push([]);
                menuBuilder(false, false);
                rancol([arg]);
                break;
            }
            else if (arg.length == 1) {
                break;
            }
            var args = arg.split(" ");
            var indx = cats.indexOf(args[0]);
            if (indx < 0) {
                cats.push(args[0]);
                catsts.push([]);
                indx = cats.indexOf(args[0]);
            }
            if (catsts[indx].length == 0) {
                catsts[indx] = [[args[1]]];
            }
            for (i = 0; i < catsts[indx].length; i++) {
                var inclHttp1 = args[3].slice(0, 4) == "http" ? "" : "http://";
                var inclHttp2 = (args.length == 5 && args[4].slice(0, 4) == "http") ? "" : "http://";
                if (catsts[indx][i][0] == args[1]) {
                    if (args.length == 5) {
                        catsts[indx][i] = [args[1], args[2], inclHttp1 + args[3], inclHttp2 + args[4]];
                    }
                    else {
                        catsts[indx][i] = [args[1], args[2], inclHttp1 + args[3]];
                    }
                    break;
                } else if (i == catsts[indx].length - 1) {
                    if (args.length == 5) {
                        catsts[indx].push([args[1], args[2], inclHttp1 + args[3], inclHttp2 + args[4]]);
                    }
                    else {
                        catsts[indx].push([args[1], args[2], inclHttp1 + args[3]]);
                    }
                }
            }
            menuBuilder(false, false);
            if (l < cats.length) {
                rancol([args[0]]);
            }
            else {
                rancol([]);
            }
            break;
        case "-":
            var indx = cats.indexOf(arg.charAt(0));
            if (arg.length == 1) {
                cats.splice(indx, 1);
                catsts.splice(indx, 1);
            } else {
                for (i = 0; i < catsts[indx].length; i++) {
                    if (catsts[indx][i][0] == arg.substr(1)) {
                        catsts[indx].splice(i, 1);
                        break;
                    }
                }
            }
            menuBuilder(false, false);
            rancol([]);
            break;
        case "*":
            menuBuilder(true, true);
            break;
        case "$":
            if ($("#clock").css("display") == "none") {
                $("#clock").css("display", "block");
                $("#sysinfo").css("display", "block");
                clockUpdate();
                systemInfo();
                tint = setInterval(clockUpdate, 0);
            } else {
                $("#clock").css("display", "none");
                $("#sysinfo").css("display", "none");
                clearInterval(tint);
            }
            break;
        case "<":
            sites = sitesbackup;
            menuBuilder(true, false);
        default:
            if (arg.length == 0) {
                if ($("#" + cmd + "m").css("display") == "none") {
                    reveal(cmd);
                }
                else {
                    hide(cmd);
                }
            }
            var indx = cats.indexOf(cmd);
            if (indx > -1) {
                args = arg.split(" ");
                for (i = 0; i < catsts[indx].length; i++) {
                    if (catsts[indx][i][0] == arg[0]) {
                        if (args.length == 1) {
                            loadSite(catsts[indx][i][2], skey);
                        }
                        else if (catsts[indx][i].length == 4) {
                            loadSite(catsts[indx][i][3] + encodeURIComponent(args.splice(1, args.length - 1).join(" ")), skey);
                        }
                        else {
                            loadSite(searchengine + encodeURIComponent(args.splice(1, args.length - 1).join(" ") + " site:" + catsts[indx][i][2]), skey);
                        }
                        break;
                    }
                }
            }
    }
    return null;
}
