/* Ienai Project
 * 
 * Ineai Project has as purpose write a news blog
 * without any database engine, using a single JSON file.
 * 
 * As we see, it works and I am happy for that.
 *
 * Make yourself at home.
 *
 * Author: Julian Alexander Murillo
 * Twitter: @lexinerus
 * GitHub: https://github.com/lexinerus/
 * Email: julian.alexander.murillo@gmail.com
 */

var ROW_NUMBER = 1;
var NEWS_LIMIT = 32;
var NEWS_FOR_ROW = 4;
var MAIN_NEWS_INDEX = 0;

function fixVisualConfiguration(size) {
    for(var i = 0; i < size; i = i + NEWS_LIMIT) {
        $("#news" + i).addClass("removeMargin");
    }
}

function showResources(listFeeds) {
    var continerEntries = null;
    
    // Row number
    for(var i = 0; i < ROW_NUMBER; i++) {
        continerEntries = $("<div>");
        continerEntries.addClass("entries");
        continerEntries.addClass("row-fluid marketing page-header");

        // Feeds are ordered randomically
        listFeeds.sort(function() {
            return 0.5 - Math.random()
        });

        // News for row
        $.each(listFeeds, function(index, value) {

            if (index == NEWS_FOR_ROW) {
                return false;
            }

            var spanEntry = $("<span>");
            spanEntry.addClass("span3");
            spanEntry.attr("id", "news" + MAIN_NEWS_INDEX);

            var entry = $("<div>");
            entry.attr("id", "entry" + MAIN_NEWS_INDEX);
            entry.attr("title", "Resource: " + value)
            entry.addClass("newsPanel");

            spanEntry.append(entry);
            continerEntries.append(spanEntry);
            $(".container").append(continerEntries);

            // Get feeds and save it into div
            $("#entry" + MAIN_NEWS_INDEX).FeedEk({
                FeedUrl: value,
                MaxCount: NEWS_FOR_ROW,
                ShowPubDate: true,
                DescCharacterLimit: 256,
                TitleLinkTarget: '_blank',
                Success: function() {
                    var parentElement = $("#entry" + MAIN_NEWS_INDEX).children(".feedEkList");
                    var titleElement = parentElement.children("li").children(".itemTitle");
                    titleElement.append($("<br>"));

                    fixVisualConfiguration();
                    $("iframe").remove();
                    cleanFormat();
                }
            });

            // Remove this new, this shouln't appear again.
            listFeeds.splice(index, 1)
            console.log("" + listFeeds.length);
            MAIN_NEWS_INDEX++;
        });
    }     
}

function cleanFormat() {
    $("div").attr("style", "");
    $("img").attr("style", "");
}

 /*
 * Get all resourses from sources.json, this resources
 * are added manually by the author.
 */
function getResources() { 
    $.get("sources.json", function(listFeeds) {
        var size = 0;
        listFeeds = listFeeds.slice(0, NEWS_LIMIT);
        size = listFeeds.length; 
        
        showResources(listFeeds);
        fixVisualConfiguration(size);
    }).fail(function(data){
        console.log("Error: Is not a valid JSON");
    });    
}

$(document).ready(function(data) {
    getResources();

    $("#randomNews").click(function(){
        document.location.reload();
    });

    
    /*
     * Infinite scroll
     */
    $(window).scroll(function() {
        var scrollIndicator = document.documentElement.clientHeight + $(document).scrollTop();
        if (scrollIndicator >= document.body.offsetHeight) { 
            getResources();
        }
    });
});