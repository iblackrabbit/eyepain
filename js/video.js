$(window).load(function () {
    var video = document.getElementsByTagName("video")[0];
    var playswitch = false;
    var fullScreenSwitch = false;
    $("#play").click(function () {
        if (!playswitch) {
            activeVideo();
            playswitch = true;
        } else {
            staticVideo();
            playswitch = false;
        }
    });
    $(".pause").click(function () {
        console.log(1);
        if (!playswitch) {
            activeVideo();
            playswitch = true;
        } else {
            staticVideo();
            playswitch = false;
        }
    });

    function activeVideo() {
        video.play();
        $(".pause").css("display", "none");
        $("#play").removeClass("fa fa-play");
        $("#play").addClass("fa fa-pause");
    }

    function staticVideo() {
        video.pause();
        $(".pause").css("display", "block");
        $("#play").removeClass("fa fa-pause");
        $("#play").addClass("fa fa-play");
    }
    $("#fullscreen").click(function () {
        if (!fullScreenSwitch) {
            video.webkitRequestFullScreen();
            fullScreenSwitch = true;
            $(".bottom").css("z-index", "2147483648");
            setTimeout(function () {
                $(".bottom").css("z-index", "200");
            }, 5000);
        } else {
            document.webkitCancelFullScreen();
            fullScreenSwitch = false;
            $(".bottom").css("display", "block");
        }
    });
    var timer = null;
    $("video").mousemove(function (e) {
        clearTimeout(timer);
        $(".bottom").css("z-index", "2147483648");
        timer = setTimeout(function () {
            $(".bottom").css("z-index", "200");
        }, 5000);
    });

    $(".progress").click(function (e) {
        var progress = e.clientX - $(".progress").offset().left;
        video.currentTime = parseInt(progress / 800 * video.duration);
    });
    video.addEventListener("timeupdate", function () {
        var duration = video.duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        var currentTime = video.currentTime;
        var currentMin = parseInt(currentTime / 60) < 10 ? "0" + parseInt(currentTime / 60) : parseInt(currentTime / 60);
        var currentSec = parseInt(currentTime % 60) < 10 ? "0" + parseInt(currentTime % 60) : parseInt(currentTime % 60);
        $(".time").text(currentMin + ":" + currentSec + "/" + min + ":" + sec);
        var percent = currentTime / duration;
        $(".move").css('width', 800 * percent);
    });
    $(".fa-repeat").click(function () {
        video.load();
        video.play();
    })
});