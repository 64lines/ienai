var TWITTER_SHARE_TEXT = "https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Ftwitter.com%2Fabout%2Fresources%2Fbuttons&text=";
var HASH_TAGS = " %23news %23technology";

function fixVisualConfiguration(size) {
    for(var i = 0; i < size; i = i + 5) {
        $("#news" + i).addClass("removeMargin");
    }
}

function addShareButtons(parent) {
    var titleElement = parent
                    .children(".feedEkList")
                    .children("li")
                    .children(".itemTitle");

    titleElement.append($("<br>"));
     
    titleElement.append(function() { 
        var newsUrl = document.location.host;
        var newTitle = $(this).children("a").text();
        var value = $(this).children("a").attr("href");
        var twitterText = "Sharing news: "
            + newTitle
            + " "
            + value
            + " via "
            + newsUrl 
            + " " 
            + HASH_TAGS;
 
        var buttonLink = TWITTER_SHARE_TEXT + twitterText;
     
        var iconButtonShare = $("<span>");
        iconButtonShare.addClass("icon-share-alt icon-white");
     
        var shareButton = $("<a>");
        shareButton.attr("href", buttonLink);
        shareButton.attr("style", "margin: 5px 0px 5px 0px;");
        shareButton.attr("title", "Share on twitter " + value);
        shareButton.attr("target", "_blank");
        shareButton.addClass("btn btn-primary btn-small share-button");
        shareButton.append(iconButtonShare);    
     
        return shareButton;
    });
     
    titleElement.append(function() { 
        var iconButtonGo = $("<span>");
        var value = $(this).children("a").attr("href");
        iconButtonGo.addClass("icon-globe icon-white");
     
        var gotToResourceButton = $("<a>");
        gotToResourceButton.attr("href", value);
        gotToResourceButton.attr("style", "margin: 5px 5px 5px 5px;");
        gotToResourceButton.attr("title", "Go to " + value);
        gotToResourceButton.attr("target", "_blank");
        gotToResourceButton.addClass("btn btn-success btn-small share-button");
        gotToResourceButton.append(iconButtonGo);
     
        return gotToResourceButton;
    });    
}


function showResources(listFeeds) {
    listFeeds.sort(function() {return 0.5 - Math.random()});
    
    $.each(listFeeds, function(index, value) {
        var spanEntry = $("<span>");
        spanEntry.addClass("span3");
        spanEntry.attr("id", "news" + index);

        var entry = $("<div>");
        entry.attr("id", "entry" + index);
        entry.attr("title", "Resource: " + value)
        entry.addClass("newsPanel");

        spanEntry.append(entry);

        $("#entries").append(spanEntry);

        $("#entry" + index).FeedEk({
            FeedUrl: value,
            MaxCount: 3,
            ShowPubDate: false,
            DescCharacterLimit: 1000,
            TitleLinkTarget: '_blank',
            Success: function() {
                addShareButtons($("#entry" + index));
            }
        });
    });
}

$(document).ready(function(data) {
    $.get("sources.json", function(listFeeds) { 
        var size = listFeeds.length;
        showResources(listFeeds);
        fixVisualConfiguration(size);
    }).fail(function(data){
        console.log("Error: Is not a valid JSON");
    });    
});