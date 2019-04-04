/*global chrome*/
import React, { Component } from 'react';
import PropTypes from "prop-types";

class Teambar extends Component {
    constructor() {
        super();
        this.state = {
            team: "",
            teams: [],
        };
        this.teamClicked = this.teamClicked.bind(this);

    }

    teamClicked(e) {
        // e.target.src = "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/" + "ATL" + '.png'
        console.log('element clicked is', e.target.src);
        //console.log(e.target.alt);
        ////console.log(this.props.teamNames);


        var listOfObjects = [];
        var a = this.props.teamNames;
        var temp = a[0];
        var index = a.indexOf(e.target.alt);
        if (index ==0) {
            e.target.className = "fav-team-selected col-2 btn btn-outline-secondary"

        }
        a[0] = e.target.alt;
        a[index] = temp;
        //console.log(a);
        a.map(function(entry) {
        listOfObjects.push(entry);
        chrome.storage.sync.set({"basketballList": listOfObjects}, (result) => {
        });
        });
        // the first item of the listOfObjects is the score to show
    }

    render() {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        var teamLogo = this.props.teamLogo;
        var teamName = this.props.teamName;
        var formatName = this.props.formatName;
        console.log(formatName);
        var key = this.props.key;
        console.log(key);


        return(
            <img src={teamLogo} alt={teamName} className={formatName}
            onClick={(e) => this.teamClicked(e)}/>
        )
    }
}

Teambar.propTypes = {
  teamLogo: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  formatName: PropTypes.string.isRequired,
  key: PropTypes.number,
  teamNames: PropTypes.array
};

export default Teambar;