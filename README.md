# Node quiz

Hacked-together Star Wars quiz for Kyan Christmas party.

Requires: 
* node
* npm
* heroku toolbelt

All available through `brew` on OS X

## Running Locally

``` 
npm install
heroku local
```

Quizmaster goes to /quizmaster.html and clicks login.

Then gives URL to players. As players register they should appear on the quizmaster screen.

When players are registered, Quizmaster taps "Next Question".  Question is displayed to players, who can only make a single answer selection. 

As players select answers their name turns green on the Quizmaster screen and their score is updated.

When all players have answered tap "Show Answer" to show players the correct answer.

Repeat "Next question"/"Show Answer" until all questions complete, then tap "Show results" to send table of results to all players.

## Known/potential Issues

* Doesn't maintain session state if connections are lost
* Poor styling/mobile only
* Inline JS/CSS
* No proper resetting of quiz
* ...
* Basically, lots of improvements could be made

### Acknowledgements:

Star Wars Titles/Crawl nabbed from [http://codepen.io/TimPietrusky/pen/eHGfj](http://codepen.io/TimPietrusky/pen/eHGfj)