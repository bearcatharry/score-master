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
        console.log('element clicked', e.target.className);
        console.log(e.target.alt);
        console.log(this.props.teamNames);

        var listOfObjects = [];
        var a = this.props.teamNames;
        var temp = a[0];
        var index = a.indexOf(e.target.alt);
        a[0] = e.target.alt;
        a[index] = temp;
        console.log(a);
        a.map(function(entry) {
        listOfObjects.push(entry);
        chrome.storage.sync.set({"basketballList": listOfObjects}, (result) => {
        });
        });


    }

    render() {
        var teamLogo = this.props.teamLogo;
        var teamName = this.props.teamName;
        return(
            <img src={teamLogo} alt={teamName} className="fav-team col-2"
            onClick={(e) => this.teamClicked(e)}/>
        )
    }
}

Teambar.propTypes = {
  teamLogo: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  teamNames: PropTypes.array
};

export default Teambar;