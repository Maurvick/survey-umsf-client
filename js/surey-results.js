let statSpeciality = ['', '1', '2', '3', '4', '5'];
let statDiscipline = ['', '1', '2', '3', '4', '5'];
let statLecturer = ['', '1', '2', '3', '4', '5'];
let lecturerScores =  [
    "", "Обліково-аналітичне забезпеченн", "Історія та антропологія права",
    "Туризм", "Кібербезпека", "Право", "Менеджмент", "Журналістика",
    "Економіка", "Історія та археологія", "Міжнародні економічні відносини",
    "Транспортні технології", "Готельно-ресторанна справа", "Комп'ютерні науки",
    "Підприємництво, торгівля та біржова діяльність", "Фінанси, банківська справа та страхування",
    "Психологія", "Філологія", "Дизайн", "Міжнародні відносини, суспільні комунікації та регіональні студії",
    "Правоохоронна діяльність", "Соціальне забезпечення", "Інженерія програмного забезпечення",
    "Маркетинг", "Облік i оподаткування", "Політологія", "Культурологія", "Фізична культура"
];

// Survey results
function stats() {

    // Delete form
    document.querySelector('form').remove();

    // Create new form
    let form = document.createElement('form');

    form.innerHTML = '<h2>Статистика</h2>';

    document.querySelector('main').appendChild(form);

    createStatSpecialitySelectBox();
    createStatDisciplineSelectBox();
    createStatLecturerSelectBox();
    createStatButtonSubmit();

    document.querySelectorAll('.form-group').forEach((e) =>
        e.addEventListener('change',() => {

            let selectStatSpeciality = document.getElementById('selectStatSpeciality').value;
            let selectStatDiscipline = document.getElementById('selectStatDiscipline').value;
            let selectStatLecturer = document.getElementById('selectStatLecturer').value;
            let buttonOnClickStat = document.getElementById('btnStat');

            if (selectStatSpeciality !== '' && selectStatDiscipline !== '' &&
            selectStatLecturer !== '') {

                buttonOnClickStat.addEventListener('click', () => {
                    createStatTable();
                });
            }
    }));
}

function createStatSpecialitySelectBox() {
    // Create divStatSpeciality
    let divStatSpeciality = document.createElement('div');
    
    divStatSpeciality.className = 'form-group';
    
    document.querySelector('form').appendChild(divStatSpeciality);

    // Create selectStatSpeciality 
    let labelStatSpeciality = document.createElement('label');
    let selectStatSpeciality = document.createElement('select');
    
    selectStatSpeciality.className = 'form-control';
    
    labelStatSpeciality.setAttribute('for','selectStatSpeciality');
    selectStatSpeciality.setAttribute('id','selectStatSpeciality');
    
    labelStatSpeciality.innerText = 'Спеціальність';

    // selectStatSpeciality.required = true;

    divStatSpeciality.appendChild(labelStatSpeciality);
    divStatSpeciality.appendChild(selectStatSpeciality);

    for (let i = 0; i < statSpeciality.length; i++) {
        let option = document.createElement('option');
        option.value = statSpeciality[i];
        option.text = statSpeciality[i];
        selectStatSpeciality.appendChild(option);
    }
}

function createStatDisciplineSelectBox() {
    // Create divStatDiscipline
    let divStatDiscipline = document.createElement('div');
    
    divStatDiscipline.className = 'form-group';
    
    document.querySelector('form').appendChild(divStatDiscipline);

    // Create selectStatDiscipline 
    let labelStatDiscipline = document.createElement('label');
    let selectStatDiscipline = document.createElement('select');
    
    selectStatDiscipline.className = 'form-control';
    
    labelStatDiscipline.setAttribute('for','selectStatDiscipline');
    selectStatDiscipline.setAttribute('id','selectStatDiscipline');
    
    labelStatDiscipline.innerText = 'Дисципліна';

    // selectStatDiscipline.required = true;

    divStatDiscipline.appendChild(labelStatDiscipline);
    divStatDiscipline.appendChild(selectStatDiscipline);

    for (let i = 0; i < statDiscipline.length; i++) {
        let option = document.createElement('option');
        option.value = statDiscipline[i];
        option.text = statDiscipline[i];
        selectStatDiscipline.appendChild(option);
    }
}

function createStatLecturerSelectBox() {
    // Create divStatLecturer
    let divStatLecturer = document.createElement('div');
    
    divStatLecturer.className = 'form-group';
    
    document.querySelector('form').appendChild(divStatLecturer);

    // Create selectStatLecturer 
    let labelStatLecturer = document.createElement('label');
    let selectStatLecturer = document.createElement('select');
    
    selectStatLecturer.className = 'form-control';
    
    labelStatLecturer.setAttribute('for','selectStatLecturer');
    selectStatLecturer.setAttribute('id','selectStatLecturer');
    
    labelStatLecturer.innerText = 'Викладач';

    // selectStatLecturer.required = true;

    divStatLecturer.appendChild(labelStatLecturer);
    divStatLecturer.appendChild(selectStatLecturer);

    for (let i = 0; i < statLecturer.length; i++) {
        let option = document.createElement('option');
        option.value = statLecturer[i];
        option.text = statLecturer[i];
        selectStatLecturer.appendChild(option);
    }
}

function createStatButtonSubmit() {
    // Create submit button
    let buttonStatSubmit = document.createElement('button');
    
    buttonStatSubmit.className = 'btn btn-secondary btn-lg btn-block';
    buttonStatSubmit.setAttribute('type','button');
    buttonStatSubmit.id = 'btnStat';
    buttonStatSubmit.innerText = "Результати";
    
    document.querySelector('form').appendChild(buttonStatSubmit);
}

function createStatTable() {
    // Create table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let isTableExists = document.querySelector('table');

    // Adjust table style
    table.className = 'table table-bordered';
    thead.className = 'thead-dark';

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    if (!isTableExists) {
        document.querySelector('main').appendChild(table);
    }
    
    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Викладач";
    
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Компетентність";
    
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Зрозумілість";

    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Практичність";

    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "Мультимедіа";

    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "Комунікативність";

    let heading_7 = document.createElement('th');
    heading_7.innerHTML = "Інформативність";

    let heading_8 = document.createElement('th');
    heading_8.innerHTML = "Об'єктивність";

    let heading_9 = document.createElement('th');
    heading_9.innerHTML = "Гугл класс";

    let heading_10 = document.createElement('th');
    heading_10.innerHTML = "Конференції";

    let heading_11 = document.createElement('th');
    heading_11.innerHTML = "Уподобання";

    let heading_12 = document.createElement('th');
    heading_12.innerHTML = "Середня оцінка";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    row_1.appendChild(heading_9);
    row_1.appendChild(heading_10);
    row_1.appendChild(heading_11);
    row_1.appendChild(heading_12);
    thead.appendChild(row_1);

    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    row_2.id = 'row_0';
    
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "";

    row_2.appendChild(row_2_data_1);
    tbody.appendChild(row_2);

    // Insert data rows
    row_nr = 0;
    col_nr = 1;

    let isExist = document.getElementById('row_1');
    
    for (let i = 0; i < lecturerScores.length; i++) {
        
        let tableRows = document.querySelector("table");
        // row id must be row_0
        let row = document.getElementById("row_" + row_nr);
        let cell = row.insertCell(col_nr);
        
        cell.innerHTML = row_nr + "," + col_nr;
        col_nr++;
        
        if (col_nr % 3 == 0) {
        col_nr = 0;
        row_nr++;
        row = tableRows.insertRow(row_nr);
        row.setAttribute("id", "row_" + row_nr);
        }
    }
}
