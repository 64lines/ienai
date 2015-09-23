/* Ienai Project
 * 
 * Ineai Project has as purpose write a news blog
 * without any database engine.
 * 
 * As we see, it works and I am happy for that. :D
 *
 * Make yourself at home.
 *
 * Author: Julian Alexander Murillo
 * Twitter: @64lines
 * GitHub: https://github.com/64lines/
 * Email: julian.alexander.murillo@gmail.com
 */

var GUIFormat = GUIFormat || {};
var ResourcesControl = ResourcesControl || {};
var Utils = Utils || {};
var Events = Events || {};

/**
 * Class to manage the formating of the html content.
 */
GUIFormat = {
    /**
     * Applies the format to the titles of the
     * HTML feeds.
     */
    formatTitles: function() {
        $(".itemTitle").each(function(index, element) {
            var titleText = $(element).html();

            if (titleText.trim()) {
                // Create a new header element
                var headerElement = $("<h2>");
                headerElement.attr('class', 'news-title');
                headerElement.html(titleText);

                $(element).before(headerElement);
                $(element).remove();
            } else {
                $(element).parent().remove();
            }
        });
    },

    /**
     * Appli the format to the content of 
     * the HTML feeds.
     */
    formatContent: function() {
        $(".itemContent").each(function(index, element) {
            var contentText = $(element).text();
            contentText = Utils.removeHtmlTags(contentText);

            var image = $(element).children('img');
            image.attr('class', 'img-responsive');

            // Create a new header element
            var headerElement = $("<h3>");
            headerElement.attr('class', 'news-subtitle');
            headerElement.text(contentText);

            $(element).before(image);
            $(element).before(headerElement);

            $(element).remove();
        });
    },

    /**
     * Applies the format for the PostMetaData. 
     */
    formatPostMetadata: function() {
        $(".itemDate").each(function(index, element) {
            var metaData = "";
            var dateText = $(element).text();
            var urlAuthor = $(element).parent().find('a').attr('href');

            var paragraphElement = $("<p>");
            paragraphElement.attr('class', 'news-meta');
            
            metaData = 'Posted by ';
            metaData += '<a href="' + urlAuthor + '" target="_blank">This resource</a>';
            metaData += ' on ';
            metaData += Date(dateText).split(' ').slice(0, 4).join(' ');
            paragraphElement.html(metaData);

            var separator = $('<hr>');
            $(element).parent().after(separator);

            $(element).parent().children('h3').after(paragraphElement);
            $(element).remove();
        });
    }
}

/**
 * Class to manage the functions of getting data from 
 * feed resources.
 */
ResourcesControl = {
    NEWS_LIMIT: 20,
    CHAR_LIMIT: 256,
    listAlreadyAddedNews: [],
    generateRandomIndex: function() {
        return Math.floor(Math.random() * Resources.list.length);
    },
    loadResources: function(divId) {
        var randomIndex = this.generateRandomIndex();
        var randomUrl = Resources.list[randomIndex];

        $(".current-resource").text(randomUrl).attr("href", randomUrl);
        this.listAlreadyAddedNews.push(randomIndex);
        $(divId).FeedEk({
            FeedUrl: randomUrl,
            MaxCount: this.NEWS_LIMIT,
            ShowPubDate: true,
            ShowDesc: true,
            DescCharacterLimit: this.CHAR_LIMIT,
            TitleLinkTarget: '_blank',
            Success: function() {
                GUIFormat.formatTitles();
                GUIFormat.formatContent();
                GUIFormat.formatPostMetadata();
            }
        });
    }
}

/** 
 * Class to provide additional utilities
 */
Utils = {
    /**
     * Removes html tags from the text
     * @param {String} text, the text to remove html tags.
     * @return {String} the text without the html tags.
     */
    removeHtmlTags: function(text) {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    },
}
