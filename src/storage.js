
// Usage: You must declare the "storage" permission 
// in the extension manifest to use the storage API. For example:

// Two things keep in mind: 
// 1.User data can be stored as objects
// 2. Your app's content scripts can directly 
// access user data without the need for a background page.
// {
//   "name": "SyncExtension",
//   "version": "0.1",
//   "manifest_version": 2,
  
//   "description": "Storage Sync Extension",
  
//   "permissions": [ "storage" ],
  
//   "browser_action": {
//     "default_popup": "popup.html"
//   }
// }


// document.getElementById("set").onclick = function() {
//   var d = document.getElementById("text").value;
//   chrome.storage.sync.set({ "data" : d }, function() {
//     if (chrome.runtime.error) {
//       console.log("Runtime error.");
//     }
//   });
//   window.close();
// }
// ******************************************************************



function setFavorite(team) {
        // Get a teamname saved in a form.
        var theValue = "Houston Rocket";
        // Sanity Check that there's some code there.
        if (!true) {
          message('undefined error so far');
          return;
        }
        var a = ["rockets", "michigan"];
        var listOfObjects = [];

        a.map(function(entry) {
        var singleObj = {};
        singleObj['name'] = entry;
        listOfObjects.push(singleObj);
        chrome.storage.sync.set({basketballList: listOfObjects}, function() {
          // Notify that we saved.
          console.log("Basketball list added");
        });
        chrome.storage.sync.get(basketballList, function (result) {
            if (!chrome.runtime.error) {
              console.log("Succeed getting basketballList");
              console.log(result.length);

            }
            // result is the stored list
        });
});
        // Save it using the Chrome extension storage API.
       
}
// function deleteFavorite(team) {
//         chrome.storage.sync.get('basketball', function () {
//             console.log(result.userKeyIds)
//         });
//  var map = new Object(); 
// }
// map['Key1'] = "Value1";
// map['Key2'] = "Value2";
// map['Key3'] = "Value3";
// map['Key4'] = "Value4";
// console.log(map);
// delete map["Key1"];
// console.log(map);
// chrome.storage.sync.get({
//     list:[]; //put defaultvalues if any
// },
// function(data) {
//    console.log(data.list);
//    update(data.list); //storing the storage value in a variable and passing to update function
// });  

// function update(array)
//    {
//     array.push("testAdd");
//     //then call the set to update with modified value
//     chrome.storage.sync.set({
//         list:array
//     }, function() {
//         console.log("added to list with new values");
//     });
//     }
// // by passing an object you can define default values e.g.: []
