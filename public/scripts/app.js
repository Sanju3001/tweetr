
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */


  var timeStamp = function convertTime (milliseconds) {

      var date = new Date(milliseconds);
      var fullYear = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getUTCDate();
      var formattedTime = fullYear + '/' + (month < 10 ? '0' : '') + month + '/' + day;

      return formattedTime;

    }


  function createTweetElement (tweetData) {

    var newTweet = (`
      <p><br/></p>
      <article>
        <header>
          <img src="${tweetData.user.avatars.small}">
          <h3>${(tweetData.user && tweetData.user.name) ? tweetData.user.name : ''}</h3>
          <span>${tweetData.user.handle}</span>
        </header>
        <div>${tweetData.content.text}</div>
        <footer>
          <span>${timeStamp(tweetData.created_at)}</span>
          <div>
            <a href=""><i class="fa fa-thumbs-up" aria-hidden="true"></i></i></a>
            <a href=""><i class="fa fa-retweet" aria-hidden="true"></i></a>
            <a href=""><i class="fa fa-heart" aria-hidden="true"></i></a>
          </div>
        </footer>
      </article>
    `);

    return `${newTweet}`;
  }

  function renderTweets(tweets){
    var $tweetContainer = $('#all-tweets');
    $tweetContainer.empty();

    tweets.forEach(function (tweet) {
      var tweetEl = createTweetElement(tweet);
      $tweetContainer.prepend(tweetEl);
    });
  }


// Behaviour once page is ready

$( document ).ready(function(){

  function getTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
      }).then(renderTweets);
  }

  function loadTweets() {
    $('form').on('submit', function (event) {

        event.preventDefault();

        let errorVal = $('textarea').val();


        if ((errorVal === "") || (errorVal === null)) {
          alert("Please enter a valid tweet");
          return;
        }

        else if (errorVal.length > 140) {
          alert("Tweet is too long - please shorten your tweet");
          return;
        }

        else {
          $.ajax({
            url: '/tweets',
            method: 'POST',
            data: $(this).serialize(),
            //success: renderTweets,
            //error: function (x, y, z) { console.log(x, y, z);}
          }).done(function (x) {
              getTweets();
            });
        }
    });
  }


  $('#compose').click(function () {

    //event.preventDefault();
      $('.new-tweet').slideToggle(200, loadTweets());
    });


  getTweets();

  loadTweets();


})

