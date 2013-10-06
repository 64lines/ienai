function fixVisualConfiguration(size) {
    for(var i = 0; i < size; i = i + 5) {
        $("#entry" + i).addClass("removeMargin");
    }
}

$(document).ready(function(data) {
    $.get("sources.json", function(listFeeds) { 
        var size = 0;
        $.each(listFeeds, function(index, value){
            var entry = $("<div>");
            entry.attr("id", "entry" + index);
            entry.attr("title", "Resource: " + value)
            entry.addClass("span3");

            $("#entries").append(entry);

            $("#entry" + index).FeedEk({
                FeedUrl: value,
                MaxCount: 2,
                ShowPubDate: false,
                DescCharacterLimit: 1000,
            });
            size = index;
        });

        fixVisualConfiguration(size);
    }).fail(function(data){
        console.log("Error: Is not a valid JSON");
    });

    
});