const educationLevel = ['', 'Магістр', 'Бакалавр'];
const years = ['', '2019', '2020', '2021', '2022'];
const educationalForm = ['', 'Денна', 'Заочна'];
const speciality =  [
    "", "Обліково-аналітичне забезпеченн", "Публічне управління або адміністрування",
    "Туризм", "Кібербезпека", "Право", "Менеджмент", "Журналістика",
    "Економіка", "Історія та археологія", "Міжнародні економічні відносини",
    "Транспортні технології", "Готельно-ресторанна справа", "Комп'ютерні науки",
    "Підприємництво, торгівля та біржова діяльність", "Фінанси, банківська справа та страхування",
    "Психологія", "Філологія", "Дизайн", "Міжнародні відносини, суспільні комунікації та регіональні студії",
    "Правоохоронна діяльність", "Соціальне забезпечення", "Інженерія програмного забезпечення",
    "Маркетинг", "Облік i оподаткування", "Політологія", "Культурологія", "Фізична культура"
];
let subject = [''];
let lecturer = [''];


if (!localStorage.getItem("educationLevelSelect")) {
    localStorage.setItem("educationLevelSelect",'');
}

if (!localStorage.getItem("yearSelect")) {
    localStorage.setItem("yearSelect",'');
}

if (!localStorage.getItem("educationalFormSelect")) {
    localStorage.setItem("educationalFormSelect",'');
}

if (!localStorage.getItem("specialitySelect")) {
    localStorage.setItem("specialitySelect",'');
}

function checkStorage() {
    if (localStorage.getItem("educationLevelSelect") !== "" &&
        localStorage.getItem("yearSelect") !== ""  &&
        localStorage.getItem("educationalFormSelect") !== ""  &&
        localStorage.getItem("specialitySelect") !== "") {
    }
} checkStorage();

document.addEventListener('DOMContentLoaded', function() {
    let educationLevelSelect = document.getElementById('educationLevelSelect');
    let yearSelect = document.getElementById('yearSelect');
    let educationalFormSelect = document.getElementById('educationalFormSelect');
    let selectSpeciality = document.getElementById('specialitySelect');

    for (let i = 0; i < educationLevel.length; i++) {
        let option = document.createElement('option');
        option.value = educationLevel[i];
        option.text = educationLevel[i];
        educationLevelSelect.appendChild(option);
    }

    for (let i = 0; i < years.length; i++) {
        let option = document.createElement('option');
        option.value = years[i];
        option.text = years[i];
        yearSelect.appendChild(option);
    }

    for (let i = 0; i < educationalForm.length; i++) {
        let option = document.createElement('option');
        option.value = educationalForm[i];
        option.text = educationalForm[i];
        educationalFormSelect.appendChild(option);
    }

    for (let i = 0; i < speciality.length; i++) {
        let option = document.createElement('option');
        option.value = speciality[i];
        option.text = speciality[i];
        selectSpeciality.appendChild(option);
    }


    document.querySelectorAll('.form-group').forEach((e) =>
        e.addEventListener('change',() => {

            let valueEducationLevel = document.getElementById('educationLevelSelect').value;
            let valueEducationalForm = document.getElementById('educationalFormSelect').value;
            let valueYear = document.getElementById('yearSelect').value;
            let valueSpeciality = document.getElementById('specialitySelect').value;

            let existingElement = document.getElementById('selectDiscipline');
            let existingElementLecturer = document.getElementById('selectTeacher');


            if (valueEducationLevel !== '' && valueYear !== '' &&
                valueSpeciality !== '' && valueEducationalForm !== '') {
                
                getAnswers();
                
                let t = getSubjects().then(res => {
                    for (const iterator of res) {
                        subject = [...subject, iterator.title];
                    }
                    
                    console.log(subject);

                    if (!document.body.contains(existingElement)) {
                        createDisciplineSelectBox(subject);
                        createTeacherSelectBox();
                        createButtonSubmit();
                        

                }});
                        
                checkStorage();
            }
        }));
});

// New select box render
let createDisciplineSelectBox = function f1() {
    let form = document.querySelector('form');

    // Create divDisciplines for discipline select box
    let divDisciplines = document.createElement('div');
    divDisciplines.className = 'form-group';
    form.appendChild(divDisciplines);

    // Create discipline select box
    let selectDiscipline = document.createElement('select');

    divDisciplines.innerHTML = "<label for=\"selectDiscipline\">Дисципліна</label>";
    selectDiscipline.className = 'form-control';
    selectDiscipline.setAttribute('id','selectDiscipline');
    selectDiscipline.required = true;

    divDisciplines.appendChild(selectDiscipline);

    for (let i = 0; i < subject.length; i++) {
        let option = document.createElement('option');
        option.value = subject[i];
        option.text = subject[i];
        selectDiscipline.appendChild(option);
    }
}

// New select box render
let createTeacherSelectBox = function f2() {
    let form = document.querySelector('form');

    // Create divTeachers for teacher select box
    let divTeachers = document.createElement('div');
    divTeachers.className = 'form-group';
    form.appendChild(divTeachers);

    // Create teacher select box
    let selectTeacher = document.createElement('select');
    let teachers = ["", "Петруня В.Ю."];

    divTeachers.innerHTML = "<label for=\"selectTeacher\">Викладач</label>";
    selectTeacher.className = 'form-control';
    selectTeacher.setAttribute('id','selectTeacher');
    selectTeacher.required = true;

    divTeachers.appendChild(selectTeacher);

    for (let i = 0; i < teachers.length; i++) {
        let option = document.createElement('option');
        option.value = teachers[i];
        option.text = teachers[i];
        selectTeacher.appendChild(option);
    }
}

// Sends answers and creates new form
function createButtonSubmit() {
    let form = document.querySelector('form');
    let buttonSubmit = document.createElement('button');
    buttonSubmit.className = 'btn btn-primary btn-lg btn-block';
    buttonSubmit.id = 'btnFormSubmit';
    buttonSubmit.setAttribute('type','submit');
    buttonSubmit.innerText = "Далі";
    form.appendChild(buttonSubmit);

    form.onsubmit = function() {
        createNewForm();
        console.log("Next page...");
    }
}
