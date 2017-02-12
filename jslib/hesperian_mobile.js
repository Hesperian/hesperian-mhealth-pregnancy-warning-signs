// hesperian_mobile.js

// Override swipe verticalDistanceThreshold (75) and friends to be less sensitive.
$.event.special.swipe.verticalDistanceThreshold = 125; // Swipe vertical displacement must be less than this.
$.event.special.swipe.scrollSupressionThreshold= 20; // More than this horizontal displacement, and we will suppress scrolling.
$.event.special.swipe.durationThreshold= 1000; // More time than this, and it isn't a swipe.
$.event.special.swipe.horizontalDistanceThreshold= 60;  // Swipe horizontal displacement must be more than this.


/* start of code for displaying an indicator that you can scroll to see more content */
function getHiddenHeight() {
		return $(document).height() - $(document).scrollTop() - $(window).height();
}

// TODO: check jqm fixed header code for a better cross platform way of doing this
function setBottomPosition (el) {
	$(el).css("top",window.innerHeight + window.scrollY - 44 + "px");
}

function showKeepReadingText(id) {
	// TODO: should really use an attribute on the page container div instead, ala jqm
	var menus = ["home","Staying_healthy_during_pregnancy", "Danger_Signs_During_Pregnancy",  "Danger_Signs_After_Birth"];
	if ($.inArray($.mobile.activePage[0].id,menus) != -1) {
		return false;
	}
	var hidden = getHiddenHeight();
	if (hidden > 20) {
		setBottomPosition(id);
		$(id).show();
		$(id).fadeIn("slow");
	} else {
		$(id).hide();
	}
}

$(document).on("pageshow","div:jqmData(role='page')",function(event) {
	showKeepReadingText("#hm-keepreading");
});

$(document).on("pagehide","div:jqmData(role='page')",function(event) {
	$("#hm-keepreading").hide();
});

$(window).bind("scrollstart",function(event){
	$("#hm-keepreading").hide();
});

$(window).bind("scrollstop",function(event){
	showKeepReadingText("#hm-keepreading");
});
