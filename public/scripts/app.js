
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */



  var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  /*
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  */

  // var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like

  var timeStamp = function convertTime (milliseconds) {
      var date = new Date(milliseconds * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
    tweets.forEach(function (tweet) {
      var tweetEl = createTweetElement(tweet);
      $('#all-tweets').append(tweetEl);
    });
  }

  //renderTweets(data);

  /*
  $('.container').on('submit', function (e) {
      e.preventDefault();
      var $tweet = $('#someTweet')
      //console.log($tweet);
      $('#all-tweets').append('<p><br/></p>' + $tweet.val() );

  })
  */

$( document ).ready(function(){

  function getTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
      }).then(function (jsonContent) {
        renderTweets(jsonContent);
      });
  }

  function loadTweets() {
    $('form').on('submit', function (event) {

        event.preventDefault();

        let errorVal = $('textarea').val();

        if ((errorVal === "") || (errorVal === null)) {
          alert("Please enter a valid tweet");

        }
        else if (errorVal.length > 140) {
          alert("Tweet is too long - please shorten your tweet");
        }

        else {
          $.ajax({
            url: '/tweets',
            method: 'POST',
            data: $(this).serialize()
            //success: renderTweets(myData),
            //console.log(success);
            //$('.container').replaceWith(success);
          }).done(function () {
              //slider();
              getTweets();
            });
        }
    });
  }


  $('#compose').click(function () {

    //event.preventDefault();
      $('.new-tweet').slideToggle(200, loadTweets());
    });


  loadTweets();


})