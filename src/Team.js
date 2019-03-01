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
    console.log(records);
    [records] = records;
    if (records && records.name === "Total") {
      record = records.summary;
    }

    // Team class name.
    let teamClassName = "row bg-light team-" + homeOrAway;

    // If the game is over.
    if (status === "post") {
      // If this team is the winner.
      if (winner === homeOrAway) {
        // Add winner to the team name.
        teamClassName += " team-winner";

        // If this team is the loser.
      } else {
        // Add loser to the team name.
        teamClassName += " team-loser";
      }
    }

    return (
      <div className={teamClassName}>
        <div className="col-2">
          <img src={data.team.logo} alt={data.team.location} className="team"/>
        </div>
        <div className="col-6">{data.team.abbreviation}</div>
        <div className="col-4 score-record">
          {/* Only show score if game is live or over. */}
          {status !== "pre" ? (
            <span className="team_score">{data.score}</span>
          ) : (
            <span className="team_record">{record}</span>
          )}
        </div>
      </div>
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