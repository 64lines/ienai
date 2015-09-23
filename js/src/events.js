/**
 * Class that controls events asociated with the html and
 * misellaneous interactions.
 */
Events = {
    SECONDS_COUNTER: 15,
    loadEvents: function() {
        ResourcesControl.loadResources('#news-entry'); 
        
        $('#shuffle-news').on('click', function() {
            ResourcesControl.loadResources('#news-entry'); 
            window.scrollTo(0, 0);
        });
    },
    buttonEnvents: function() {
        // Amazing random button
         $(".new").click(function(){
            document.location.reload();
        });
    },
    screenEvents: function() {
        var startCounter = this.SECONDS_COUNTER;

        var intervalChangeNews = setInterval(function() {
            $('.next-news-time').text(startCounter + " seconds.");
            startCounter--;
            
            if ((startCounter + 1) == 0) {
                startCounter = Events.SECONDS_COUNTER;
                ResourcesControl.loadResources('#news-entry');
            }
        }, 1000);
    }
}

