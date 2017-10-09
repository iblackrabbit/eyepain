$(window).load(function () {
    var audio = document.getElementsByTagName("audio")[0];
    var playswitch = "off";
    var voiceswitch = "off";
    $("#play").click(function () {
        if (playswitch == "off") {
            audio.play();
            musicActive();
            playswitch = "on";
        } else {
            audio.pause();
            musicStatic();
            playswitch = "off";
        }
    });
    $(".progressbar").click(function (e) {
        var progress = e.clientX - $(".progressbar").offset().left;
        audio.currentTime = parseInt(progress / 400 * audio.duration);
    });
    audio.addEventListener('timeupdate', function () {
        var duration = audio.duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        var currentTime = audio.currentTime;
        var currentMin = parseInt(currentTime / 60) < 10 ? "0" + parseInt(currentTime / 60) : parseInt(currentTime / 60);
        var currentSec = parseInt(currentTime % 60) < 10 ? "0" + parseInt(currentTime % 60) : parseInt(currentTime % 60);
        $(".time").text(currentMin + ":" + currentSec + "/" + min + ":" + sec);
        var percent = currentTime / duration;
        $(".move").css('width', 400 * percent);
    });
    //效果
    function musicActive() {
        $("#play").removeClass("fa fa-play");
        $("#play").addClass("fa fa-pause");
        $(".circle").css("animation", "active 3s linear infinite  .5s");
        $(".microphone img").css("transform", "rotate(0deg)");
    }

    function musicStatic() {
        $("#play").removeClass("fa fa-pause");
        $("#play").addClass("fa fa-play");
        $(".circle").css("animation", "");
        $(".microphone img").css("transform", "rotate(-21deg)");
    }
    //音量
    $(".fa-volume-down").click(function () {
        if (voiceswitch == "off") {
            $(".volume").show();
            voiceswitch = "on";
        } else {
            $(".volume").hide();
            voiceswitch = "off";
        }
    });
    $(".volume").click(function (e) {
        var volume = parseInt($('.volume').offset().top + 80 - e.clientY);
        $(".vol_inner").css('height', volume);
        audio.volume = volume / 100;
    });
    var arrmusic = [
        ["music/认真的雪 - 薛之谦.mp3", "認真的雪"],
        ["music/丑八怪 - 薛之谦.mp3", "醜八怪"],
        ["music/绅士 - 薛之谦.mp3", "紳士"],
        ["music/一半 - 薛之谦.mp3", "一半"]
    ];
    var $index=0;
	$(".playlist li").click(function(){
		musicActive();
        $index=$(this).index();
        audio.src=arrmusic[$index][0];
		$("h1").text(arrmusic[$index][1]);
		audio.play();
    })
    $(".fa-forward").click(function() {
		$index++;
		if ($index>3) $index=0;
		audio.src=arrmusic[$index][0];
		$("h1").text(arrmusic[$index][1]);
		audio.play();
		musicActive();
	});
    $(".fa-backward").click(function() {
		$index--;
		if ($index<0) $index=3;
		audio.src=arrmusic[$index][0];
		$("h1").text(arrmusic[$index][1]);
		audio.play();
		musicActive();
    });
    //random
    $(".fa-random").click(function(){
        $index = Math.floor(Math.random()*4);
        audio.src=arrmusic[$index][0];
        $("h1").text(arrmusic[$index][1]);
        audio.play();
		musicActive();
    });
    //repeat
    $(".fa-repeat").click(function(){
        audio.load();
        audio.play();
    })
});