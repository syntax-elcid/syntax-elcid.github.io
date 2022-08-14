$(document).ready(function()
{
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

	var badges = "";
	var tinyBadges = "";

	var deadline = "";
	var color = "";
	var style = "";

	var pos = 9;
	var achievements = [];
	var groups = [];

	var clock;
	var currentDate = new Date();
	var futureDate  = new Date(2022, 7, 16, 12, 00);
	if (currentDate<futureDate)
	{
		var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
	}
	else
	{
		var diff = 0;
	}

	$("body").css("min-height", $( window ).height());

	for(i = 0; i < achievementCount; i++)
	{
		var newAchievement = [];

		achievements.push(newAchievement);
	}

	$.getJSON(url, function(data)
	{
		var entry = data.feed.entry;

		$("#achievements").empty();

		$(entry).each(function()
		{
			if(this.gsx$groep.$t !== "")
			{
				var newGroup = [];

				newGroup[0] = this.gsx$groepsnaam.$t;
				newGroup[1] = this.gsx$studenten.$t;
				newGroup[2] = this.gsx$coins.$t;
				newGroup[3] = this.gsx$makkelijk.$t;
				newGroup[4] = this.gsx$magekocht.$t;
				newGroup[5] = this.gsx$gemiddeld.$t;
				newGroup[6] = this.gsx$gegekocht.$t;
				newGroup[7] = this.gsx$moeilijk.$t;
				newGroup[8] = this.gsx$mogekocht.$t;

				/*for(i = 0; i < achievementCount; i++)
				{
					newGroup[3 + i] = eval("this.gsx$a" + (i + 1) + ".$t");
				}*/

				groups.push(newGroup);
			}
			else
			{
				for(i = 0; i < achievementCount; i++)
				{
					achievements[i][pos] = eval("this.gsx$a" + (i + 1) + ".$t");
				}

				pos--;
			}
		});

		groups.sort(function (a, b)
		{
		    if (parseInt(a[2]) < parseInt(b[2])) return  1;
		    if (parseInt(a[2]) > parseInt(b[2])) return -1;
		    if (parseInt(a[0]) > parseInt(b[0])) return  1;
		    if (parseInt(a[0]) < parseInt(b[0])) return -1;
		    return 0;
		});

		$.each(groups, function()
		{
			badges = '<li class="groep">' + this[0] + '</li>';
			badges += '<span class="puzzels"><li><img src="img/star_ma.png"></li>';
			badges += '<li class="opgelost">' + this[3] + '</li>';
			badges += '<li>/</li>';
			badges += '<li class="gekocht">' + this[4] + '</li>';
			badges += '<li><img src="img/star_gm.png"></li>';
			badges += '<li class="opgelost">' + this[5] + '</li>';
			badges += '<li>/</li>';
			badges += '<li class="gekocht">' + this[6] + '</li>';
			badges += '<li><img src="img/star_mo.png"></li>';
			badges += '<li class="opgelost">' + this[7] + '</li>';
			badges += '<li>/</li>';
			badges += '<li class="gekocht">' + this[8] + '</li></span>';
			badges += '<span class="trophy"><li><img src="img/trophy.png"></li>';
			badges += '<li class="punten">' + this[2] + '</li></span>';

			$('#achievements').append('<article><ul class="badges">' + badges + '</ul></article>');
		});

		$("article").on("click", function()
		{
			$(this).find("section").slideToggle(150);
			$(this).toggleClass("grey");
		});
	});

	clock = $('.clock').FlipClock(diff,
	{
		clockFace: 'MinuteCounter',
		countdown: true,
		language: 'nl-be'
	});
});
