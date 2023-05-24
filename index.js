// Practice 8

// myLeads -> should be assigned to an empty array
let myLeads = [];
// fetch the element from html
const inputBtn = document.getElementById("input-btn");
// inputEl -> should be assigned to the text input field
const inputEl = document.getElementById("input-el");
// Grab the unordered list and store it in a const variable called ulEl
const ulEl = document.getElementById("ul-el");
// Store the delete button in a deleteBtn variable
const deleteBtn = document.getElementById("delete-btn");

// localStorage.setItem("myLeads", "www.my.com")
// localStorage.getItem("myLeads")
// console.log(localStorage.getItem)
// localStorage.clear()

// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// Log out the variable
// console.log(leadsFromLocalStorage)

// Grab the SAVE TAB button and store it in a tabBtn variable
const tabBtn = document.getElementById("tab-btn");
console.log(tabBtn);

// Check if leadsFromLocalStorage is truthy
// If so, set myLeads to its value and call renderLeads()

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// Listen for clicks on tabBtn. Log Per's LinkedIn URL to the console
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        myLeads.push(tabs[0].url);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // call the renderLeads() function
  render(myLeads)
    })
})

// wrap the code below in a renderLeads() function
function render(leads) {
  // Create a variable, listItems, to hold all the HTML for the list items
  // Assign it to an empty string to begin with
  let listItems = ""

  // Render the leads in the unordered list using ulEl.textContent
  for (let i = 0; i < leads.length; i++) {
    // variation 1
    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"

    //  variation 2
    //   //  create element
    //   const li = document.createElement("li")
    //     // set text content
    //   li.textContent = myLeads[i]
    //     // append to ul
    //   ulEl.append(li)

    // Add the item to the listItems variable instead of the ulEl.innerHTML
    //  listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
    `;
  }

  // Render the listItems inside the unordered list using ulEl.innerHTML
  ulEl.innerHTML = listItems;
}

// Listen for double clicks on the delete button (google it!)
deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked!");
  // When clicked, clear localStorage, myLeads, and the DOM
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// add event listener
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  // Save the myLeads array to localStorage
  // PS: remember JSON.stringify()
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  // call the renderLeads() function
  render(myLeads);
});
