const prefix = "https://cors-anywhere.herokuapp.com/";
const tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
  $.getJSON(prefix + quoteUrl, createTweet);
  $.ajaxSetup({ cache: false });
}

function createTweet(input) {
  const data = input[0];
 
  const quoteText = $(data.content).text().trim();
  const quoteAuthor = data.title;

  if (!quoteAuthor.length) {
      quoteAuthor = "Unknown author";
  }

  const tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (tweetText.length > 140) {
    getQuote();
  } else {
      const tweet = tweetLink + encodeURIComponent(tweetText);
      $('.quote').text(quoteText);
      $('.author').text("Author: " + quoteAuthor);
      $('.tweet').attr('href', tweet);
  }
}

$(document).ready(function() {
  getQuote();
  $('.trigger').click(function() {
      getQuote();
  })
  
});