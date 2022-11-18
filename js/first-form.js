let educationLevel = [''];
let years =  [''];
let educationalForm = [''];
let speciality =  [''];
let subject = [''];
let lecturer = [''];

// function f_aw(){ getAllEducationLevel().then(res => {
//     educationLevel = [''];
//     for (const iterator of res) {
//         educationLevel = [...educationLevel, iterator.education_level];
//     }
//     console.log("await...");
// })
// };

// Save answers after reloading page
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

if (!localStorage.getItem("teacherSelect")) {
    localStorage.setItem("teacherSelect",'');
}

function checkStorage(){
    console.log("Сейчас обрабатывается рендер educationLevelSelect--" 
    + localStorage.getItem("educationLevelSelect") + " yearSelect--" 
    + localStorage.getItem("yearSelect") + " educationalFormSelect--" 
    + localStorage.getItem("educationalFormSelect") + " specialitySelect--"
    + localStorage.getItem("specialitySelect"));
}

let sectors = document.querySelectorAll('.form-group');
console.log(sectors);
sectors.forEach((e) => e.addEventListener('change',(event) => {
    element_id = e.querySelector('select').id;
    if(!localStorage.getItem(localStorage)){
        localStorage.setItem(element_id, event.target.value);
    }
    checkStorage();
    console.log("educationLevelSelect -- " + localStorage.getItem("educationLevelSelect"));
}));

function educationLevelFill(){
    let educationLevelSelect = document.getElementById('educationLevelSelect');
    educationLevel = [''];
    temp = getAllEducationLevel().then(res => {
    for (const iterator of res) {
        educationLevel = [...educationLevel, iterator.educationLevel];
    }
    for (let i = 0; i < educationLevel.length; i++) {
        let option = document.createElement('option');
        option.value = educationLevel[i];
        option.text = educationLevel[i];
        educationLevelSelect.appendChild(option);
    }
    console.log(localStorage.getItem("educationLevelSelect"));
    if(localStorage.getItem("educationLevelSelect")){
        educationLevelSelect.value = localStorage.getItem("educationLevelSelect");
    }});
}

function yearFill(){
    let yearSelect = document.getElementById('yearSelect');
    years = [''];
    temp = getAllYear().then(res => {
    for (const iterator of res) {
        years = [...years, iterator.year];
    }
    for (let i = 0; i < years.length; i++) {
        let option = document.createElement('option');
        option.value = years[i];
        option.text = years[i];
        yearSelect.appendChild(option);
    }
    if(localStorage.getItem("yearSelect")){
        yearSelect.value = localStorage.getItem("yearSelect");
    }});
    
}

function educationFormFill(){
    let educationalFormSelect = document.getElementById('educationalFormSelect');
    educationalForm = [''];
    temp = getAllEducationalForm().then(res => {
    for (const iterator of res) {
        educationalForm = [...educationalForm, iterator.educationalForm];
    }
    for (let i = 0; i < educationalForm.length; i++) {
        let option = document.createElement('option');
        option.value = educationalForm[i];
        option.text = educationalForm[i];
        educationalFormSelect.appendChild(option);
    }
    if(localStorage.getItem("educationalFormSelect")){
        educationalFormSelect.value = localStorage.getItem("educationalFormSelect");
    }});
    
}

function specialityFill(){
    let selectSpeciality = document.getElementById('specialitySelect');
    speciality = [''];
    temp = getAllSpeciality().then(res => {
    for (const iterator of res) {
        speciality = [...speciality, iterator.speciality];
    }
    for (let i = 0; i < speciality.length; i++) {
        let option = document.createElement('option');
        option.value = speciality[i];
        option.text = speciality[i];
        selectSpeciality.appendChild(option);
    }
    if(localStorage.getItem("specialitySelect")){
        selectSpeciality.value = localStorage.getItem("specialitySelect");
    }});
}
paramsCheack();
// Add options to first 4 select boxes
document.addEventListener('DOMContentLoaded', function() {
    educationLevelFill();
    yearFill();
    educationFormFill();
    specialityFill();
    
    // Add discipline select box when all questions answered
    document.querySelectorAll('.form-group').forEach((e) =>
        e.addEventListener('change',() => {
            paramsCheack();
    }));
        
});

function paramsCheack() {
    if (localStorage.getItem("educationLevelSelect") != "" && localStorage.getItem("yearSelect") != ""  && localStorage.getItem("educationalFormSelect") != ""  && localStorage.getItem("specialitySelect") != "") {
                
        //getAnswers();
        
        console.log("Checking entered values...");
        
        let t = getSubjects().then(res => {
            subject = [''];
            for (const iterator of res) {
                subject = [...subject, iterator.title];
            }
                          
            console.log(subject);
            createDisciplineSelectBox(subject);
                
        });
    }
}

let createDisciplineSelectBox = function f1() {
    let form = document.querySelector('form');
    let existingElement = document.getElementById('selectDiscipline');
    let existingElementTeacher = document.getElementById('selectTeacher');
    
    if (existingElementTeacher) {
        lecturer = [''];
        createTeacherSelectBox();
    }

    // Create divDisciplines for discipline select box
    let divDisciplines = document.createElement('div');
    divDisciplines.className = 'form-group';
    
    // Check if div don't exist
    if (!existingElement) {
        form.appendChild(divDisciplines);
    }
    
    // Update values
    divDisciplines.addEventListener('change', () => {
        valueDiscipline = document.getElementById('selectDiscipline');
        
        let y = getLecturers().then(res => {
            lecturer = [''];
            for (const iterator of res) {
                lecturer = [...lecturer, iterator.lecturer];
            }
                          
            console.log(res);
            createTeacherSelectBox(lecturer);
        });
    });

    // Create discipline select box
    let selectDiscipline = document.createElement('select');

    divDisciplines.innerHTML = "<label for=\"selectDiscipline\">Дисципліна</label>";
    selectDiscipline.className = 'form-control';
    selectDiscipline.setAttribute('id','selectDiscipline');
    selectDiscipline.required = true;
    
    // Check if select box is exist
    if (existingElement) {
        selectDiscipline = existingElement;
        
        while (selectDiscipline.lastElementChild) {
            selectDiscipline.removeChild(selectDiscipline.lastElementChild);
        }
    }

    if (!existingElement) {
        divDisciplines.appendChild(selectDiscipline);
    }

    for (let i = 0; i < subject.length; i++) {
        let option = document.createElement('option');
        option.value = subject[i];
        option.text = subject[i];
        selectDiscipline.appendChild(option);
    }
};

let createTeacherSelectBox = function f2() {
    
    let form = document.querySelector('form');
    let existingElement = document.getElementById('selectTeacher');

    // Create divTeachers for teacher select box
    let divTeachers = document.createElement('div');
    divTeachers.className = 'form-group';

    // Check if div don't exist
    if (!existingElement) {
        form.appendChild(divTeachers);
    }

    // Create teacher select box
    let selectTeacher = document.createElement('select');

    divTeachers.innerHTML = "<label for=\"selectTeacher\">Викладач</label>";
    selectTeacher.className = 'form-control';
    selectTeacher.setAttribute('id','selectTeacher');
    selectTeacher.required = true;

    divTeachers.addEventListener('change', () => {
        valueTeacher = document.getElementById('selectTeacher');
        
        localStorage.setItem('teacherSelect',valueTeacher.value)
        console.log(localStorage.getItem('teacherSelect'));
    });

    divTeachers.appendChild(selectTeacher);
    
    // Check if select box is exist
    if (existingElement) {
        selectTeacher = existingElement;
        
        while (selectTeacher.lastElementChild) {
            selectTeacher.removeChild(selectTeacher.lastElementChild);
        }
    }

    if (!existingElement) {
        divTeachers.appendChild(selectTeacher);
        createButtonSubmit();
    }

    for (let i = 0; i < lecturer.length; i++) {
        let option = document.createElement('option');
        option.value = lecturer[i];
        option.text = lecturer[i];
        if(!checkPassedTeacher(lecturer[i])){
            selectTeacher.appendChild(option);
        }
    }
};

function checkPassedTeacher(teacter){
    teachers = JSON.parse(localStorage.getItem("passedTeacher"));
    if(!teachers || teacters.length == 0){
        return false;
    }
    for (let index = 0; index < teachers.length; index++) {
        const element = teachers[index];
        if(element === teacter){
            return false;
        }
    }
    return true;
}

function createButtonSubmit() {

    let form = document.querySelector('form');
    let buttonSubmit = document.createElement('button');

    buttonSubmit.className = 'btn btn-primary btn-lg btn-block';
    buttonSubmit.id = 'btnFormSubmit';
    buttonSubmit.setAttribute('type','submit');
    buttonSubmit.innerText = "Далі";

    form.appendChild(buttonSubmit);

    form.onsubmit = function() {
        createLecturerForm();
    };
}
