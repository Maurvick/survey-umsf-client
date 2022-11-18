let statSpeciality = ['', '1', '2', '3', '4', '5'];
let statDiscipline = ['', '1', '2', '3', '4', '5'];
let statLecturer = ['', '1', '2', '3', '4', '5'];

// Survey results
function stats() {

    // Delete form
    document.querySelector('form').remove();

    // Create new form
    let form = document.createElement('form');

    form.innerHTML = '<h2>Статистика</h2>';

    document.querySelector('main').appendChild(form);

    createStatSpecialitySelectBox(form);
    createStatDisciplineSelectBox(form);
    createStatLecturerSelectBox(form);
    createStatButtonSubmit(form);
    createStatTable(form);
}

function createStatSpecialitySelectBox(form) {
    // Create divStatSpeciality
    let divStatSpeciality = document.createElement('div');
    
    divStatSpeciality.className = 'form-group';
    
    form.appendChild(divStatSpeciality);

    // Create selectStatSpeciality 
    let labelStatSpeciality = document.createElement('label');
    let selectStatSpeciality = document.createElement('select');
    
    selectStatSpeciality.className = 'form-control';
    
    labelStatSpeciality.setAttribute('for','selectStatSpeciality');
    selectStatSpeciality.setAttribute('id','selectStatSpeciality');
    
    labelStatSpeciality.innerText = 'Спеціальність';

    selectStatSpeciality.required = true;

    divStatSpeciality.appendChild(labelStatSpeciality);
    divStatSpeciality.appendChild(selectStatSpeciality);

    for (let i = 0; i < statSpeciality.length; i++) {
        let option = document.createElement('option');
        option.value = statSpeciality[i];
        option.text = statSpeciality[i];
        selectStatSpeciality.appendChild(option);
    }
}

function createStatDisciplineSelectBox(form) {
    // Create divStatDiscipline
    let divStatDiscipline = document.createElement('div');
    
    divStatDiscipline.className = 'form-group';
    
    form.appendChild(divStatDiscipline);

    // Create selectStatDiscipline 
    let labelStatDiscipline = document.createElement('label');
    let selectStatDiscipline = document.createElement('select');
    
    selectStatDiscipline.className = 'form-control';
    
    labelStatDiscipline.setAttribute('for','selectStatDiscipline');
    selectStatDiscipline.setAttribute('id','selectStatDiscipline');
    
    labelStatDiscipline.innerText = 'Дисципліна';

    selectStatDiscipline.required = true;

    divStatDiscipline.appendChild(labelStatDiscipline);
    divStatDiscipline.appendChild(selectStatDiscipline);

    for (let i = 0; i < statDiscipline.length; i++) {
        let option = document.createElement('option');
        option.value = statDiscipline[i];
        option.text = statDiscipline[i];
        selectStatDiscipline.appendChild(option);
    }
}

function createStatLecturerSelectBox(form) {
    // Create divStatLecturer
    let divStatLecturer = document.createElement('div');
    
    divStatLecturer.className = 'form-group';
    
    form.appendChild(divStatLecturer);

    // Create selectStatLecturer 
    let labelStatLecturer = document.createElement('label');
    let selectStatLecturer = document.createElement('select');
    
    selectStatLecturer.className = 'form-control';
    
    labelStatLecturer.setAttribute('for','selectStatLecturer');
    selectStatLecturer.setAttribute('id','selectStatLecturer');
    
    labelStatLecturer.innerText = 'Викладач';

    selectStatLecturer.required = true;

    divStatLecturer.appendChild(labelStatLecturer);
    divStatLecturer.appendChild(selectStatLecturer);

    for (let i = 0; i < statLecturer.length; i++) {
        let option = document.createElement('option');
        option.value = statLecturer[i];
        option.text = statLecturer[i];
        selectStatLecturer.appendChild(option);
    }
}

function createStatButtonSubmit(form) {
    // Create submit button
    let buttonSubmit = document.createElement('button');
    
    buttonSubmit.className = 'btn btn-secondary';
    buttonSubmit.setAttribute('type','submit');
    buttonSubmit.id = 'btnStat';
    buttonSubmit.innerText = "Відправити";
    
    form.appendChild(buttonSubmit);

    // On click create new survey-result form
    form.onsubmit = function() { 
        
    };
}

function createStatTable(form) {
    // Create table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Adjust table style
    table.className = 'table table-bordered';
    thead.className = 'thead-dark';

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    form.appendChild(table);

    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Sr. No.";
    
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Name";
    
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Company";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    thead.appendChild(row_1);

    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1.";
    
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "James Clerk";
    
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "Netflix";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);

    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = "2.";
    
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = "Adam White";
    
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = "Microsoft";

    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    tbody.appendChild(row_3);
}
