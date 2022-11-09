function createSecondForm() {
    // Delete form
    let pageElement = document.querySelector('#firstForm');

    if (document.querySelector('#firstForm')) {
        pageElement.remove()
    }

    // Create new form
	let main = document.getElementsByTagName('main')[0];
    let form = document.createElement('form');
    let horizontalRule = document.createElement('hr');


    form.id = 'secondForm';
    form.innerHTML = "<h3>Оберіть дисципліну, та викладача цієї дисципліни</h3>";
    main.appendChild(form);

    // form.appendChild(horizontalRule);

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

    // Create submit button
    let buttonSubmit = document.createElement('button');
    buttonSubmit.className = 'btn btn-primary btn-lg btn-block';
    buttonSubmit.id = 'btnSecondFormSubmit';
    buttonSubmit.setAttribute('type','submit');
    buttonSubmit.innerText = "Далі";
    form.appendChild(buttonSubmit);

    // go to the next page
    form.onsubmit = function() {
        createThirdForm();
    }
}
