$(document).ready(function() {

    /* remove rtsMsgWrapper for custom error handling */
    $("#rtsMsgWrapper").remove();

    /* disable copy past in application */
    document.documentElement.style.webkitTouchCallout = "none";
    document.documentElement.style.webkitUserSelect = "none";

    /* detect if useragent is chrome for developing purposes */
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    if (is_chrome) {
        $("#container").show();
    }

    /* prevent vertical scrolling */
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    /* handele leftmenu apperance */

    $("#squarebutton, #stsquarebutton, #btn-close").hammer().on("touch", function(event) {
        event.gesture.preventDefault();
        ss_leftmenu(true);
        $("#menuleft").toggle("slide", {
            direction: "left"
        }, 500);
        $("#btn-close").toggle();
    });

    $("#menuleft").hammer().on("dragleft", {
        drag_min_distance: -1,
        drag_max_touches: 1
    }, function(event) {
        event.gesture.preventDefault();
        ss_leftmenu(false);
        $("#menuleft").toggle("slide", {
            direction: "left"
        }, 500);
        $("#btn-close").toggle();
        event.gesture.stopDetect();
        ss_leftmenu(false);
    });

    $("#transmenuleft").hammer().on("dragright", {
        drag_min_distance: -1,
        drag_max_touches: 1
    }, function(event) {
        event.gesture.preventDefault();
        ss_leftmenu(false);
        $("#menuleft").toggle("slide", {
            direction: "left"
        }, 500);
        $("#btn-close").toggle();
        event.gesture.stopDetect();
        ss_leftmenu(true);
    });

    /* handele rightmenu apperance */

    $("#stripesbutton, #ststripesbutton").hammer().on("touch", function(event) {
        event.gesture.preventDefault();
        $("#menuright").toggle("slide", {
            direction: "right"
        }, 500);
    });

    $("#exit").hammer().on("touch", function(event) {
        event.gesture.preventDefault();
        $("#menuright").toggle("slide", {
            direction: "right"
        }, 500);
    });

    $("#transmenuright").hammer().on("dragleft", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#menuright").toggle("slide", {
            direction: "right"
        }, 250);
        event.gesture.stopDetect();
    });

    $("#menuright, #transmenuright").hammer().on("dragright", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#menuright").toggle("slide", {
            direction: "right"
        }, 250);
        event.gesture.stopDetect();
    });

    /* threshold widget handler */

    if (localStorage.getItem("bottomth") == null) {
        localStorage.setItem("bottomth", 0.40);
        localStorage.setItem("middleth", 0.60);
        localStorage.setItem("topth", 0.70);
    }


    $("#circle1").attr("cx", (localStorage.getItem("bottomth") * 324) + 113); // set circle1 stored in localconfig
    $("#circle2").attr("cx", (localStorage.getItem("middleth") * 324) + 113); // set circle1 stored in localconfig
    $("#circle3").attr("cx", (localStorage.getItem("topth") * 324) + 113); // set circle1 stored in localconfig

    var startPosX1 = parseInt($("#circle1").attr("cx"));
    var startPosX2 = parseInt($("#circle2").attr("cx"));
    var startPosX3 = parseInt($("#circle3").attr("cx"));



    $("#circle1").hammer().on("drag dragend", function(event) {
        switch (event.type) {
            case "drag":
                event.gesture.preventDefault();
                $(this).attr("cx", startPosX1 + event.gesture.deltaX);
                //threshold value cannot go below 10%
                $("#leftval").text(Math.round((parseInt($(this).attr("cx")) - 113) / 3.24) + "%");
                if (parseInt($(this).attr("cx") - 113) / 3.24 < 10) {
                    $(this).attr("cx", (113 + 10 * 3.24));
                    $("#leftval").text("10%");
                }
                if (parseInt($(this).attr("cx")) > parseInt($("#circle2").attr("cx")) - 32) {
                    $(this).attr("cx", parseInt($("#circle2").attr("cx")) - 32);
                    event.gesture.stopDetect();
                }
                $("#offset1").attr("offset", 0.1 + (event.gesture.deltaX * 0.00323));
                break;
            case "dragend":
                startPosX1 = parseInt($("#circle1").attr("cx"));
                localStorage.setItem("bottomth", (Math.round((parseInt($(this).attr("cx")) - 113) / 3.24)) / 100);
                break;
        }
    });

    $("#circle2").hammer().on("drag dragend", function(event) {

        switch (event.type) {
            case "drag":
                event.gesture.preventDefault();
                $(this).attr("cx", startPosX2 + event.gesture.deltaX);
                $("#middleval").text(Math.round((parseInt($(this).attr("cx")) - 113) / 3.24) + "%");

                if (parseInt($(this).attr("cx")) < parseInt($("#circle1").attr("cx")) + 32) {
                    $(this).attr("cx", parseInt($("#circle1").attr("cx")) + 32);
                    event.gesture.stopDetect();
                }
                if (parseInt($(this).attr("cx")) > parseInt($("#circle3").attr("cx")) - 32) {
                    $(this).attr("cx", parseInt($("#circle3").attr("cx")) - 32);
                    event.gesture.stopDetect();
                }

                $("#offset2").attr("offset", 0.45 + (event.gesture.deltaX * 0.00323));
                break;
            case "dragend":
                startPosX2 = parseInt($("#circle2").attr("cx"));
                localStorage.setItem("middleth", (Math.round((parseInt($(this).attr("cx")) - 113) / 3.24)) / 100);
                break;
        }
    });

    $("#circle3").hammer().on("drag dragend", function(event) {

        switch (event.type) {
            case "drag":
                event.gesture.preventDefault();
                $(this).attr("cx", startPosX3 + event.gesture.deltaX);
                $("#rightval").text(Math.round((parseInt($(this).attr("cx")) - 113) / 3.24) + "%");
                if (parseInt($(this).attr("cx") - 113) / 3.24 > 90) {
                    $(this).attr("cx", (113 + 90 * 3.24));
                    $("#rightval").text("90%");
                }
                if (parseInt($(this).attr("cx")) < parseInt($("#circle2").attr("cx")) + 32) {
                    $(this).attr("cx", parseInt($("#circle2").attr("cx")) + 32);
                    event.gesture.stopDetect();
                }

                $("#offset3").attr("offset", 0.9 + (event.gesture.deltaX * 0.00323));
                break;
            case "dragend":
                startPosX3 = parseInt($("#circle3").attr("cx"));
                localStorage.setItem("topth", (Math.round((parseInt($(this).attr("cx")) - 113) / 3.24)) / 100);
                break;
        }
    });

    /* circle buttons */

    $("#buttonswitch1").hammer().on("dragright", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#buttoncircle1").animate({
            left: "31px"
        }, 500);
        event.gesture.stopDetect();
    });

    $("#buttonswitch1").hammer().on("dragleft", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#buttoncircle1").animate({
            left: "2px"
        }, 500);
        event.gesture.stopDetect();
    });

    $("#buttonswitch2").hammer().on("dragright", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#buttoncircle2").animate({
            left: "31px"
        }, 500);
        event.gesture.stopDetect();
    });

    $("#buttonswitch2").hammer().on("dragleft", {
        drag_min_distance: -1
    }, function(event) {
        event.gesture.preventDefault();
        $("#buttoncircle2").animate({
            left: "2px"
        }, 500);
        event.gesture.stopDetect();
    });

    //drag container or settingcontainer

    $("#container").children().hammer().on("dragup", {
        drag_min_distance: 1,
        drag_max_touches: 1
    }, function(event) {
        event.gesture.preventDefault();
        $("#settingcontainer").toggle("slide", {
            direction: "down"
        }, 500);
        $("#container").toggle("slide", {
            direction: "up"
        }, 500);
        event.gesture.stopDetect();
    });

    $("#stleft, #stright").hammer().on("dragdown", {
        drag_min_distance: 1,
        drag_max_touches: 1
    }, function(event) {
        console.log("dragqueen");
        event.gesture.preventDefault();
        $("#settingcontainer").toggle("slide", {
            direction: "down"
        }, 500);
        $("#container").toggle("slide", {
            direction: "up"
        }, 500);
        event.gesture.stopDetect();
    });

    /* interval functions */

    /* leftmenu arcs */

    function ss_leftmenu(arg) {
        if (arg == true) {
            var leftarcs = setInterval(function() {
                if ($('body').data('stats').hasOwnProperty('ServiceLevel1')) {
                    leftarc1.render($('body').data('stats')['ServiceLevel1'] / 100);
                }
                if ($('body').data('stats').hasOwnProperty('ServiceLevel2')) {
                    leftarc2.render($('body').data('stats')['ServiceLevel2'] / 100);
                }
                if ($('body').data('stats').hasOwnProperty('ServiceLevel3')) {
                    leftarc3.render($('body').data('stats')['ServiceLevel3'] / 100);
                }
                if ($('body').data('stats').hasOwnProperty('ServiceLevel4')) {
                    leftarc4.render($('body').data('stats')['ServiceLevel4'] / 100);
                }
                if ($('body').data('stats').hasOwnProperty('ServiceLevel5')) {
                    leftarc5.render($('body').data('stats')['ServiceLevel5'] / 100);
                }

            }, 3000);
        } else {
            clearInterval(leftarcs);
        }
    }


}); /* end of document ready function */