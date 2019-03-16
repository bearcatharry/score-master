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

document.getElementById("done").addEventListener("click", function() {
    isSetting = false;
    show(isSetting);
});

// for (var i = 0; i < 3; i++) {
//     var n = i.toString();
//     console.log('id', i, document.getElementById(i));
//     document.getElementById(i).addEventListener("click", function() {
//         var attribute = this.getAttribute("alt");
//         team = attribute;
//         console.log('team clicked', team);

//     })
// }
// var teamImgs = document.getElementsByClassName("fav-team");
// console.log(teamImgs);
// var myFunction = function() {
//     var attribute = this.getAttribute("alt");
//     team = attribute;
//     console.log('team clicked', team);
// };

// console.log('team length', teamImgs.length);
// for (let item of teamImgs) {
//       item.addEventListener('click', myFunction);
//       console.log(item);
// };

function show(isSetting) {
    if (isSetting) {
        document.getElementById('all-games').style.display = "none";
        document.getElementById('select').style.display = "block";


    }
    else {
        document.getElementById('select').style.display = "none";
        document.getElementById('all-games').style.display = "block";

    }
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
