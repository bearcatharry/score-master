import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Selection from './setting';
import Navbar from './Navbar';
import * as serviceWorker from './serviceWorker';

var isSetting = false;
var team = "";
ReactDOM.render(<Navbar team={team}/>, document.getElementById('teams-tab'));
ReactDOM.render(<Selection />, document.getElementById('select'));
ReactDOM.render(<App team={team}/>, document.getElementById('all-games'));
document.getElementById('all-games').style.display = "block";
document.getElementById('select').style.display = "none";

document.getElementById("setting").addEventListener("click", function() {
    isSetting = true;
    show(isSetting);
});

document.getElementById("done-button").addEventListener("click", function() {
    isSetting = false;
    show(isSetting);
    ReactDOM.render(<Navbar team={team} name = {"susan"}/>, document.getElementById('teams-tab'));

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

    }
}



// teamImgs = collectionToArray(teamImgs);

function collectionToArray(collection){
    var length = collection.length;
    var array = [];
    for (var i = 0;i< length+1;i++){
        array.push(collection[i]);
    }
    return array;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
