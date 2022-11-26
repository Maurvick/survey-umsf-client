let educationLevel = [""];
let years =  [""];
let educationalForm = [""];
let speciality =  [""];
let subject = [""];
let lecturer = [""];

// Save answers after reloading page
if (!localStorage.getItem("educationLevelSelect")) {
    localStorage.setItem("educationLevelSelect", "");
}

if (!localStorage.getItem("yearSelect")) {
    localStorage.setItem("yearSelect", "");
}

if (!localStorage.getItem("educationalFormSelect")) {
    localStorage.setItem("educationalFormSelect", "");
}

if (!localStorage.getItem("specialitySelect")) {
    localStorage.setItem("specialitySelect", "");
}

if (!localStorage.getItem("teacherSelect")) {
    localStorage.setItem("teacherSelect", "");
}

// Print local storage values
function checkStorage() {
    console.log("Сейчас обрабатывается рендер educationLevelSelect--" +
    localStorage.getItem("educationLevelSelect") + " yearSelect--" +
    localStorage.getItem("yearSelect") + " educationalFormSelect--" +
    localStorage.getItem("educationalFormSelect") + " specialitySelect--"  +
    localStorage.getItem("specialitySelect"));
}

// Set local storage values after page reload
let sectors = document.querySelectorAll(".form-group");
console.log(sectors);

sectors.forEach((e) => e.addEventListener("change",(event) => {
    let element_id = e.querySelector("select").id;
    
    if(!localStorage.getItem("items")) {
        localStorage.setItem(element_id, event.target.value);
    }
    checkStorage();
    
    console.log("educationLevelSelect -- " + localStorage.getItem("educationLevelSelect"));
}));

// Add values for educationLevel select box
function educationLevelFill() {
    let educationLevelSelect = document.getElementById("educationLevelSelect");
    educationLevel = [""];
    
    getAllEducationLevel().then(res => {
        for (const iterator of res) {
            educationLevel = [...educationLevel, iterator.educationLevel];
        }
        for (let i = 0; i < educationLevel.length; i++) {
            let option = document.createElement("option");
            option.value = educationLevel[i];
            option.text = educationLevel[i];
            educationLevelSelect.appendChild(option);
        }
        console.log(localStorage.getItem("educationLevelSelect"));
        if (localStorage.getItem("educationLevelSelect")) {
            educationLevelSelect.value = localStorage.getItem("educationLevelSelect");
        }
    });
}

// Add values for year select box
function yearFill() {
    let yearSelect = document.getElementById("yearSelect");
    years = [""];
    
    getAllYear().then(res => {
        for (const iterator of res) {
            years = [...years, iterator.year];
        }
        for (let i = 0; i < years.length; i++) {
            let option = document.createElement("option");
            option.value = years[i];
            option.text = years[i];
            yearSelect.appendChild(option);
        }
        if (localStorage.getItem("yearSelect")) {
            yearSelect.value = localStorage.getItem("yearSelect");
        }
    });
}

// Add values for educationForm select box
function educationFormFill() {
    let educationalFormSelect = document.getElementById("educationalFormSelect");
    educationalForm = [""];
    
    getAllEducationalForm().then(res => {
        for (const iterator of res) {
            educationalForm = [...educationalForm, iterator.educationalForm];
        }
        for (let i = 0; i < educationalForm.length; i++) {
            let option = document.createElement("option");
            option.value = educationalForm[i];
            option.text = educationalForm[i];
            educationalFormSelect.appendChild(option);
        }
        if (localStorage.getItem("educationalFormSelect")) {
            educationalFormSelect.value = localStorage.getItem("educationalFormSelect");
        }
    });
}

// Add values for speciality select box
function specialityFill() {
    let selectSpeciality = document.getElementById("specialitySelect");
    speciality = [""];
    
    getAllSpeciality().then(res => {
        for (const iterator of res) {
            speciality = [...speciality, iterator.speciality];
        }
        for (let i = 0; i < speciality.length; i++) {
            let option = document.createElement("option");
            option.value = speciality[i];
            option.text = speciality[i];
            selectSpeciality.appendChild(option);
        }
        if (localStorage.getItem("specialitySelect")) {
            selectSpeciality.value = localStorage.getItem("specialitySelect");
        }
    });
}

paramsCheck();

// Add options to first four select boxes
document.addEventListener("DOMContentLoaded", function() {
    educationLevelFill();
    yearFill();
    educationFormFill();
    specialityFill();
    
    // Add discipline select box when all questions answered
    document.querySelectorAll(".form-group").forEach((e) =>
        e.addEventListener("change",() => {
            paramsCheck();
    }));
});

// Check entered values in local storage and add discipline select box
function paramsCheck() {
    if (localStorage.getItem("educationLevelSelect") !== "" &&
        localStorage.getItem("yearSelect") !== ""  &&
        localStorage.getItem("educationalFormSelect") !== ""  &&
        localStorage.getItem("specialitySelect") !== "") {
        console.log("Checking entered values...");

        getSubjects().then(res => {
            subject = [""];
            for (const iterator of res) {
                subject = [...subject, iterator.title];
            }

            console.log(subject);
            createDisciplineSelectBox(subject);
        });
    }
}

let createDisciplineSelectBox = function f1() {
    let form = document.querySelector("form");
    let existingElement = document.getElementById("selectDiscipline");
    let existingElementTeacher = document.getElementById("selectTeacher");
    
    if (existingElementTeacher) {
        lecturer = [""];
        createTeacherSelectBox();
    }

    // Create divDisciplines for discipline select box
    let divDisciplines = document.createElement("div");
    divDisciplines.className = "form-group";
    
    // Check if div don't exist
    if (!existingElement) {
        form.appendChild(divDisciplines);
    }
    
    // Update values
    divDisciplines.addEventListener("change", () => {
        getLecturers().then(res => {
            lecturer = [""];
            for (const iterator of res) {
                lecturer = [...lecturer, iterator.lecturer];
            }

            console.log(res);
            createTeacherSelectBox(lecturer);
        });
    });

    // Create discipline select box
    let selectDiscipline = document.createElement("select");

    divDisciplines.innerHTML = "<label for=\"selectDiscipline\">Дисципліна</label>";
    selectDiscipline.className = "form-control";
    selectDiscipline.setAttribute("id","selectDiscipline");
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
        let option = document.createElement("option");
        option.value = subject[i];
        option.text = subject[i];
        selectDiscipline.appendChild(option);
    }
};

let createTeacherSelectBox = function f2() {
    let form = document.querySelector("form");
    let existingElement = document.getElementById("selectTeacher");

    // Create divTeachers for teacher select box
    let divTeachers = document.createElement("div");
    divTeachers.className = "form-group";

    // Check if div don't exist
    if (!existingElement) {
        form.appendChild(divTeachers);
    }

    // Create teacher select box
    let selectTeacher = document.createElement("select");

    divTeachers.innerHTML = "<label for=\"selectTeacher\">Викладач</label>";
    selectTeacher.className = "form-control";
    selectTeacher.setAttribute("id","selectTeacher");
    selectTeacher.required = true;

    divTeachers.addEventListener("change", () => {
        let valueTeacher = document.getElementById("selectTeacher");

        localStorage.setItem("teacherSelect",valueTeacher.value);
        console.log(localStorage.getItem("teacherSelect"));
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
        let option = document.createElement("option");
        option.value = lecturer[i];
        option.text = lecturer[i];
        if(!checkPassedTeacher(lecturer[i])){
            selectTeacher.appendChild(option);
        }
    }
};

// Remove lecturer from list after evaluation
function checkPassedTeacher(teacher) {
    let teachers = JSON.parse(localStorage.getItem("passedTeacher"));

    if (!teachers || teacher.length === 0) {
        return false;
    }

    for (let index = 0; index < teachers.length; index++) {
        const element = teachers[index];
        console.log( "element -- " + element);
        if (element === teacher) {
            return true;
        }
    }
    return false;
}

function createButtonSubmit() {
    let form = document.querySelector("form");
    let buttonSubmit = document.createElement("button");

    buttonSubmit.className = "btn btn-primary btn-lg btn-block";
    buttonSubmit.id = "btnFormSubmit";
    buttonSubmit.setAttribute("type","submit");
    buttonSubmit.innerText = "Далі";

    form.appendChild(buttonSubmit);

    form.onsubmit = function() {
        createLecturerForm();
    };
}
