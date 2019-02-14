import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.getScore = this.getScore.bind(this);

    // const score = this.getScore();
   
    // Get initial state.
    this.state = {
      score: 0
    };

    this.getScore();

  }
  

  
  getScore() {
    let homeScore;
    let url;
    url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&calendartype=blacklist&limit=100&dates=20190213";
    let home;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        // console.log(response);

        let games = response.events;

        let home = games[6].competitions[0].competitors[0];

        homeScore = parseInt(home.score, 10);

        console.log(homeScore);

        this.setState({
            score: homeScore
        });
      });
      console.log(this.state.score);
  }



  render() {
    return (
      <div class="game col-128888">
            <div class="row"><h4>Feb 2</h4></div>
            <div class="row bg-light">4:00 PM</div>
            <div class="row bg-light">
                <div class="col-2">
                    <img src="/images/houston_rockets.png" alt="Houston Rockets" class="team"/>
                </div>
                <div class="col-7">Rockets</div>
                <div class="col-3">{this.state.score}</div>
                <div class="col-2">
                    <img src="/images/michigan.png" alt="Michigan" class="team"/>
                </div>
                <div class="col-7">Michigan</div>
                <div class="col-3">9999</div>
            </div>
      </div>
    );
  }
}


export default App;