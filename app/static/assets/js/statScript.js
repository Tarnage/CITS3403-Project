"use strict";
var users = [];
var scores = [];
const data2 = {
  columns: ["Rank", "User", "Score"],
  rows: user_data,
};

function forChart() {
  for (let i = 0; i < data2.rows.length; i++) {
    users.push(data2.rows[i][0]);
    scores.push(data2.rows[i][1]);
  }
  console.log(users);
  console.log(scores);
}

/**
 * Generates table based on data
 * @returns table element
 */

function createTable(data) {
  // create table parent
  let table = document.createElement("table");
  table.className = "table";
  table.classList.add("table-striped");

  // create thead child
  let thead = document.createElement("thead");

  // fill in thead
  let tr_head = document.createElement("tr");
  for (let i = 0; i < data.columns.length; i++) {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerText = data.columns[i];
    tr_head.appendChild(th);
  }
  // append thead and its children to table
  thead.appendChild(tr_head);
  table.appendChild(thead);

  // creat the table body and fill in data from data array
  let tbody = document.createElement("tbody");

  // sort data for proccessing
  data.rows.sort(comparator);
  for (let i = 0; i < data.rows.length; i++) {
    // create each row
    let tr_body = document.createElement("tr");
    // th is the rank of current row being generated
    let th = document.createElement("th");
    th.scope = "row";
    th.innerText = i + 1;
    tr_body.appendChild(th);

    // create and fill in the row with data
    for (let j = 0; j < data.rows[i].length; j++) {
      let td = document.createElement("td");
      td.innerText = data.rows[i][j];
      tr_body.appendChild(td);
    }

    // append each row to the table body
    tbody.appendChild(tr_body);
  }

  // append table body to the table element
  table.appendChild(tbody);

  return table;
}

function searchTable(rank, data) {
  // create table parent
  let table = document.createElement("table");
  table.className = "table";
  table.classList.add("table-striped");

  // create thead child
  let thead = document.createElement("thead");

  // fill in thead
  let tr_head = document.createElement("tr");
  for (let i = 0; i < data.columns.length; i++) {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerText = data.columns[i];
    tr_head.appendChild(th);
  }
  // append thead and its children to table
  thead.appendChild(tr_head);
  table.appendChild(thead);

  // creat the table body and fill in data from data array
  let tbody = document.createElement("tbody");

  // sort data for proccessing
  data.rows.sort(comparator);
  for (let i = 0; i < data.rows.length; i++) {
    // create each row
    let tr_body = document.createElement("tr");
    // th is the rank of current row being generated
    let th = document.createElement("th");
    th.scope = "row";
    th.innerText = rank[i] + 1;
    tr_body.appendChild(th);

    // create and fill in the row with data
    for (let j = 0; j < data.rows[i].length; j++) {
      let td = document.createElement("td");
      td.innerText = data.rows[i][j];
      tr_body.appendChild(td);
    }

    // append each row to the table body
    tbody.appendChild(tr_body);
  }

  // append table body to the table element
  table.appendChild(tbody);

  return table;
}

function search() {
  // find the search bar
  let input = document.getElementById("datatable-search-input");
  // greab the input
  let search = input.value;

  // create new data
  let filteredList = {};
  filteredList.columns = data2.columns;
  filteredList.rows = [];
  var rankList = [];

  // iterate through orginal data and compare the content
  let flag = 0;
  for (let i = 0; i < data2.rows.length; i++) {
    if (containsStr(data2.rows[i], search)) {
      flag = 1;
      rankList.push(i);
      filteredList.rows.push(data2.rows[i]);
    }
  }
  console.log(filteredList);

  // replace current table with new table
  if (flag === 0) {
    // swal("Here's a message!", "It's pretty, isn't it?");
    var h = document.getElementById("datatable");
    h.innerHTML =
      '<div id="no-match" style="color:white; font-size:30px;">No matched entries.</div>';
  } else {
    document
      .getElementById("datatable")
      .replaceChildren(searchTable(rankList, filteredList));
  }
}

/**
 * Helper function to match search parameters
 * @param {array} array
 * @param {string} input
 * @returns
 */
function containsStr(array, input) {
  console.log(array + "\n" + input);
  for (let i = 0; i < array.length; i++) {
    if (array[0].includes(input)) {
      return true;
    }
    if (array[1].includes(input)) {
      return true;
    }
  }
  return false;
}

/**
 * Call back to sort a 2d matrix by 1st index
 * @param {array} a
 * @param {array} b
 * @returns -1, 0, 1 (<, ==, >)
 */

function comparator(a, b) {
  if (a[1] == b[1]) return 0;
  else return a[1] > b[1] ? -1 : 1;
}

$(window).on("load", () => {
  document.getElementById("datatable").appendChild(createTable(data2));

  document.getElementById("search-btn").addEventListener("click", search);
  forChart();
});
