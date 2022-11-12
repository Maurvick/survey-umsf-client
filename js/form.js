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

            if (valueEducationLevel !== '' && valueYear !== '' &&
                valueSpeciality !== '' && valueEducationalForm !== '') {
                createDisciplineSelectBox();
                createTeacherSelectBox();
                createButtonSubmit();
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
    let disciplines = ["", "Менеджмент"];

    divDisciplines.innerHTML = "<label for=\"selectDiscipline\">Дисципліна</label>";
    selectDiscipline.className = 'form-control';
    selectDiscipline.setAttribute('id','selectDiscipline');
    selectDiscipline.required = true;

    divDisciplines.appendChild(selectDiscipline);

    for (let i = 0; i < disciplines.length; i++) {
        let option = document.createElement('option');
        option.value = disciplines[i];
        option.text = disciplines[i];
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
        getAnswers();
        createNewForm();
        console.log("Next page...");
    }
}

// Create teacher form
function createNewForm() {
    // Delete form
    let pageElement = document.querySelector('form');

    if (document.querySelector('form')) {
        pageElement.remove()
    }

    // Create new form
    // let main = document.getElementsByTagName('main')[0];
    let main = document.querySelector('main');
    let form = document.createElement('form');
    let horizontalRule = document.createElement('hr');
    let breakText = document.createElement('br');

    main.appendChild(form);

    // Create headingScore
    let headingScore = document.createElement('h2');
    // let horizontalRuleScore = document.createElement('hr');
    headingScore.innerText = "Оцініть характеристики викладача";

    form.append(headingScore);
    form.appendChild(horizontalRule);
    form.appendChild(breakText);
    // form.appendChild(horizontalRuleScore);

    // Create divCompetence for competence select box
    let divCompetence = document.createElement('div');
    divCompetence.className = 'form-group';
    form.appendChild(divCompetence);

    // Create competence select box
    let selectCompetence = document.createElement('select');

    // This variable used for all next select boxes
    let scores = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    divCompetence.innerHTML = "<label for=\"selectTeacher\">" +
        "1. Викладач компетентний у дисципліні та вільно володіє теоретичним матеріалом</label>";
    selectCompetence.className = 'form-control';
    selectCompetence.setAttribute('id','selectCompetence');
    selectCompetence.required = true;

    divCompetence.appendChild(selectCompetence);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectCompetence.appendChild(option);
    }

    // Create divUnderstandability for understandability select box
    let divUnderstandability = document.createElement('div');
    divUnderstandability.className = 'form-group';
    form.appendChild(divUnderstandability);

    // Create understandability select box
    let selectUnderstandability = document.createElement('select');
    divUnderstandability.innerHTML = "<label for=\"selectUnderstandability\">" +
        "2. Викладає матеріал логічно та зрозуміло</label>";
    selectUnderstandability.className = 'form-control';
    selectUnderstandability.setAttribute('id','selectUnderstandability');
    selectUnderstandability.required = true;

    divUnderstandability.appendChild(selectUnderstandability);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectUnderstandability.appendChild(option);
    }

    // Create divPracticality for Practicality select box
    let divPracticality = document.createElement('div');
    divPracticality .className = 'form-group';
    form.appendChild(divPracticality);

    // Create Practicality select box
    let selectPracticality = document.createElement('select');
    divPracticality.innerHTML = "<label for=\"selectPracticality\">" +
        "3. Викладач достатньо використовує практичні приклади під час занять</label>";
    selectPracticality.className = 'form-control';
    selectPracticality.setAttribute('id','selectPracticality');
    selectPracticality.required = true;

    divPracticality.appendChild(selectPracticality);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectPracticality.appendChild(option);
    }

    // Create divTools for tools select box
    let divTools = document.createElement('div');
    divTools .className = 'form-group';
    form.appendChild(divTools);

    // Create tools select box
    let selectTools = document.createElement('select');
    divTools.innerHTML = "<label for=\"selectTools\">" +
        "4. Викладач використовує мультимедійні засоби навчання (презентації, електронні лекції тощо)</label>";
    selectTools.className = 'form-control';
    selectTools.setAttribute('id','selectTools');
    selectTools.required = true;

    divTools.appendChild(selectTools);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectTools.appendChild(option);
    }

    // Create divCommunication for communication select box
    let divCommunication = document.createElement('div');
    divCommunication .className = 'form-group';
    form.appendChild(divCommunication);

    // Create communication select box
    let selectCommunication = document.createElement('select');
    divCommunication.innerHTML = "<label for=\"selectCommunication\">" +
        "5. Викладач налагоджує партнерські стосунки зі студентами, підтримує зворотній зв'язок</label>";
    selectCommunication.className = 'form-control';
    selectCommunication.setAttribute('id','selectCommunication');
    selectCommunication.required = true;

    divCommunication.appendChild(selectCommunication);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectCommunication.appendChild(option);
    }

    // Create divInformativeness for Informativeness select box
    let divInformativeness = document.createElement('div');
    divInformativeness .className = 'form-group';
    form.appendChild(divInformativeness);

    // Create Informativeness select box
    let selectInformativeness = document.createElement('select');
    divInformativeness.innerHTML = "<label for=\"selectInformativeness\">" +
        "6. Викладач на початку семестру інформує про форми контролю</label>";
    selectInformativeness.className = 'form-control';
    selectInformativeness.setAttribute('id','selectInformativeness');
    selectInformativeness.required = true;

    divInformativeness.appendChild(selectInformativeness);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectInformativeness.appendChild(option);
    }

    // Create divObjectivity for Objectivity select box
    let divObjectivity = document.createElement('div');
    divObjectivity .className = 'form-group';
    form.appendChild(divObjectivity);

    // Create Objectivity select box
    let selectObjectivity = document.createElement('select');
    divObjectivity.innerHTML = "<label for=\"selectObjectivity\">" +
        "7. Викладач об'єктивно оцінює знання студентів</label>";
    selectObjectivity.className = 'form-control';
    selectObjectivity.setAttribute('id','selectObjectivity');
    selectObjectivity.required = true;

    divObjectivity.appendChild(selectObjectivity);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectObjectivity.appendChild(option);
    }

    // Create divClassroom for Classroom select box
    let divClassroom = document.createElement('div');
    divClassroom .className = 'form-group';
    form.appendChild(divClassroom);

    // Create Classroom select box
    let selectClassroom = document.createElement('select');
    divClassroom.innerHTML = "<label for=\"selectClassroom\">" +
        "8. Викладач забезпечує студентів навчальними матеріалами на платформі Google Classroom</label>";
    selectClassroom.className = 'form-control';
    selectClassroom.setAttribute('id','selectClassroom');
    selectClassroom.required = true;

    divClassroom.appendChild(selectClassroom);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectClassroom.appendChild(option);
    }

    // Create divConferences for Conferences select box
    let divConferences = document.createElement('div');
    divConferences.className = 'form-group';
    form.appendChild(divConferences);

    // Create Conferences select box
    let selectConferences = document.createElement('select');
    divConferences.innerHTML = "<label for=\"selectConferences\">" +
        "9. Викладач проводить заняття за розкладом з використанням Zoom, Meet, Skype " +
        "чи інших програм для онлайн-конференцій</label>";
    selectConferences.className = 'form-control';
    selectConferences.setAttribute('id','selectConferences');
    selectConferences.required = true;

    divConferences.appendChild(selectConferences);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectConferences.appendChild(option);
    }

    // Create divFriendliness for Friendliness select box
    let divFriendliness = document.createElement('div');
    divFriendliness .className = 'form-group';
    form.appendChild(divFriendliness);

    // Create Friendliness select box
    let selectFriendliness = document.createElement('select');
    divFriendliness.innerHTML = "<label for=\"selectFriendliness\">" +
        "10. Викладач тактовний і доброзичливий зі студентами</label>";
    selectFriendliness.className = 'form-control';
    selectFriendliness.setAttribute('id','selectFriendliness');
    selectFriendliness.required = true;

    divFriendliness.appendChild(selectFriendliness);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectFriendliness.appendChild(option);
    }

    // Create divPreferences for Preferences select box
    let divPreferences = document.createElement('div');
    divPreferences .className = 'form-group';
    form.appendChild(divPreferences);

    // Create Preferences select box
    let selectPreferences = document.createElement('select');
    divPreferences.innerHTML = "<label for=\"selectPreferences\">" +
        "11. Хотів(-ла) б вивчати інші дисципліни саме з цим викладачем</label>";
    selectPreferences.className = 'form-control';
    selectPreferences.setAttribute('id','selectPreferences');
    selectPreferences.required = true;

    divPreferences.appendChild(selectPreferences);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement('option');
        option.value = scores[i];
        option.text = scores[i];
        selectPreferences.appendChild(option);
    }

    // Create divTextArea for textAreaComment
    let divComment = document.createElement('div');
    divComment.className = 'form-group';
    form.appendChild(divComment);

    // Create textAreaComment
    let textAreaComment = document.createElement('textarea');
    divComment.innerHTML = "<label for=\"comment\">" +
        "12. Ваші побажання щодо покращення викладання цієї дисципліни</label>";
    textAreaComment.className = 'form-control';
    textAreaComment.setAttribute('id','comment');
    textAreaComment.setAttribute('name','comment');
    textAreaComment.setAttribute('rows','5');
    textAreaComment.setAttribute('cols','33');
    textAreaComment.required = true;
    divComment.appendChild(textAreaComment);

    // Create submit button
    let buttonSubmit = document.createElement('button');
    buttonSubmit.className = 'btn btn-primary btn-lg btn-block';
    buttonSubmit.setAttribute('type','submit');
    buttonSubmit.innerText = "Відправити";
    form.appendChild(buttonSubmit);

    form.onsubmit = function() {
        stats();
    }
}

// Survey results
function stats() {

    if (document.querySelector('form')) {
        document.querySelector('form').remove()
    }

    // Create new form
    let main = document.querySelector('main');
    let form = document.createElement('form');
    let horizontalRule = document.createElement('hr');
    let lineBreak = document.createElement('br');

    main.appendChild(form);

    // Create headingScore
    let headingScore = document.createElement('h2');
    headingScore.innerText = "Статистика";
    form.id = 'thirdForm';
    form.append(headingScore);
    form.appendChild(horizontalRule);
    form.appendChild(lineBreak);
}
