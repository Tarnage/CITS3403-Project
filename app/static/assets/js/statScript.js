'use strict'

const data2 = {
    columns: ['Rank', 'User', 'Score'],
    rows: [
      ['Tiger Nixon',61],
      ['Sonya Frost', 23],
      ['Jena Gaines', 0],
      ['Quinn Flynn', 22],
      ['Charde Marshall', 36],
      ['Haley Kennedy', 43],
      ['Tatyana Fitzpatrick', 19],
      ['Michael Silva', 66],
      ['Paul Byrd', 64],
      ['Gloria Little',59]
    ],
  };
  

/**
 * Generates table based on data
 * @returns table element
 */
function createTable(data) {
    // create table parent
    let table = document.createElement('table');
    table.className = 'table';
    table.classList.add('table-striped');

    // create thead child
    let thead = document.createElement('thead');

    // fill in thead
    let tr_head = document.createElement('tr');
    for (let i = 0; i < data.columns.length; i++) {
        let th = document.createElement('th');
        th.scope = 'col';
        th.innerText = data.columns[i];
        tr_head.appendChild(th);
    }
    // append thead and its children to table
    thead.appendChild(tr_head);
    table.appendChild(thead);

    // creat the table body and fill in data from data array
    let tbody = document.createElement('tbody');

    // sort data for proccessing
    data.rows.sort(comparator);
    for (let i = 0; i < data.rows.length; i++) {
        // create each row
        let tr_body = document.createElement('tr');
        // th is the rank of current row being generated
        let th = document.createElement('th');
        th.scope = 'row';
        th.innerText = i + 1;
        tr_body.appendChild(th);

        // create and fill in the row with data
        for (let j = 0; j < data.rows[i].length; j++) {
            let td = document.createElement('td');
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
    let input = document.getElementById('datatable-search-input');
    // greab the input
    let search = input.value;

    // create new data 
    let filteredList = {};
    filteredList.columns = data2.columns;
    filteredList.rows = [];

    // iterate through orginal data and compare the content
    for (let i = 0; i < data2.rows.length; i++) {
        if (containsStr(data2.rows[i], search)) {
            filteredList.rows.push(data2.rows[i]);
        }
    }

    // replace current table with new table
    document.getElementById('datatable').replaceChildren(createTable(filteredList));
}

/**
 * Helper function to match search parameters
 * @param {array} array 
 * @param {string} input 
 * @returns 
 */
function containsStr(array, input) {
    console.log(array + '\n' + input);
    for (let i = 0; i < array.length; i++) {
        if(array[0].includes(input)){
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
    if (a[1] === b[1]) return 0;
    else return a[1] > b[1] ? -1 : 1;
}

$(window).on('load', () => {
    document.getElementById('datatable').appendChild(createTable(data2));

    document.getElementById('search-btn').addEventListener('click', search);
});