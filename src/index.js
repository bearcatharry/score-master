import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Selection from './setting';
import Navbar from './Navbar';
import * as serviceWorker from './serviceWorker';
/*global chrome*/

var isSetting = false;
var team = "";
chrome.storage.sync.get("basketballList", (result) => {
        if (!chrome.runtime.error) {
            var newteams = result.basketballList;
            ReactDOM.render(<Navbar team={newteams} name = {"susan"}/>, document.getElementById('teams-tab'));
        } else {
            // console.log("ffffff");
        }
      });
// ReactDOM.render(<Navbar team={team}/>, document.getElementById('teams-tab'));
ReactDOM.render(<Selection />, document.getElementById('select'));
ReactDOM.render(<App team={team}/>, document.getElementById('all-games'));
document.getElementById('all-games').style.display = "block";
document.getElementById('select').style.display = "none";

document.getElementById("setting").addEventListener("click", function() {
    isSetting = true;
    show(isSetting);
});

chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && "basketballList" in changes) {
        var newteams = changes.basketballList.newValue;
            ReactDOM.render(<Navbar team={newteams} name = {"susan"}/>, document.getElementById('teams-tab'));
      }
}); 

document.getElementById("done-button").addEventListener("click", function() {
    isSetting = false;
    show(isSetting);
});



function show(isSetting) {
    if (isSetting) {
        document.getElementById('all-games').style.display = "none";
        document.getElementById('select').style.display = "block";
        document.getElementById('teams-tab').style.display = "none";

    }
    else {
        document.getElementById('select').style.display = "none";
        document.getElementById('all-games').style.display = "block";
        document.getElementById('teams-tab').style.display = "block";
        chrome.storage.sync.get("basketballList", (result) => {
        if (!chrome.runtime.error) {
            var newteams = result.basketballList;
            ReactDOM.render(<Navbar team={newteams} name = {"susan"}/>, document.getElementById('teams-tab'));
        } else {
            // console.log("ffffff");
        }
      });


    }
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
