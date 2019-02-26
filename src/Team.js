//
//  TEAM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React, { Component } from "react";
import PropTypes from "prop-types";

//
//  COMPONENT
//––––––––––––––––––––––––––––––––––––––––––––––––––

class Team extends Component {
  render() {
    // Destructure props.
    const { data, homeOrAway, status, winner } = this.props;

    // Destructure data.
    let record;
    let { records } = data;
    [records] = records;
    if (records && records.name === "Total") {
      record = records.summary;
    }

    // Team class name.
    let teamClassName = "col-2 team--" + homeOrAway;

    // If the game is over.
    if (status === "post") {
      // If this team is the winner.
      if (winner === homeOrAway) {
        // Add winner to the team name.
        teamClassName += " team--winner";

        // If this team is the loser.
      } else {
        // Add loser to the team name.
        teamClassName += " team--loser";
      }
    }

    return (
      <React.fragment>
        <div class={teamClassName}>
          <img src={data.team.logo} alt={data.team.location} alt="Rockets" class="team"/>
        </div>
        <div class="col-7">{data.team.abbreviation}</div>
        <div class="col-3">
          {/* Only show score if game is live or over. */}
          {status !== "pre" ? (
            <span className="team__score">{data.score}</span>
          ) : (
            <span className="team__record">{record}</span>
          )}
        </div>
      </React.fragment>
    );
  }
}

//
//  PROP TYPES
//––––––––––––––––––––––––––––––––––––––––––––––––––

Team.propTypes = {
  data: PropTypes.object.isRequired,
  homeOrAway: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default Team;



// WEBPACK FOOTER //
// ./src/components/Team.js