// Create lecturer evaluation form
function createLecturerForm() {
    // Delete form
    let pageElement = document.querySelector("form");

    if (document.querySelector("form")) {
        pageElement.remove();
    }

    // Create new form
    let main = document.querySelector("main");
    let form = document.createElement("form");
    let horizontalRule = document.createElement("hr");
    let breakText = document.createElement("br");

    main.appendChild(form);

    // Create headingScore
    let headingScore = document.createElement("h2");
    headingScore.innerText = "Оцініть характеристики викладача";

    form.append(headingScore);
    form.appendChild(horizontalRule);
    form.appendChild(breakText);

    // Create divCompetence for competence select box
    let divCompetence = document.createElement("div");
    divCompetence.className = "form-group";
    
    form.appendChild(divCompetence);

    // Create competence select box
    let selectCompetence = document.createElement("select");

    // This variable used for all next select boxes
    let scores = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    divCompetence.innerHTML = "<label for=\"selectTeacher\">" +
        "1. Викладач компетентний у дисципліні та вільно володіє теоретичним матеріалом</label>";
    selectCompetence.className = "form-control";
    selectCompetence.setAttribute("id","selectCompetence");
    selectCompetence.required = false;

    divCompetence.appendChild(selectCompetence);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectCompetence.appendChild(option);
    }

    // Create divUnderstandability for understandability select box
    let divUnderstandability = document.createElement("div");
    divUnderstandability.className = "form-group";
    
    form.appendChild(divUnderstandability);

    // Create understandability select box
    let selectUnderstandability = document.createElement("select");
    
    divUnderstandability.innerHTML = "<label for=\"selectUnderstandability\">" +
        "2. Викладає матеріал логічно та зрозуміло</label>";
    selectUnderstandability.className = "form-control";
    selectUnderstandability.setAttribute("id","selectUnderstandability");
    selectUnderstandability.required = false;

    divUnderstandability.appendChild(selectUnderstandability);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectUnderstandability.appendChild(option);
    }

    // Create divPracticality for Practicality select box
    let divPracticality = document.createElement("div");
    divPracticality .className = "form-group";
    
    form.appendChild(divPracticality);

    // Create Practicality select box
    let selectPracticality = document.createElement("select");
    
    divPracticality.innerHTML = "<label for=\"selectPracticality\">" +
        "3. Викладач достатньо використовує практичні приклади під час занять</label>";
    selectPracticality.className = "form-control";
    selectPracticality.setAttribute("id","selectPracticality");
    selectPracticality.required = false;

    divPracticality.appendChild(selectPracticality);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectPracticality.appendChild(option);
    }

    // Create divTools for tools select box
    let divTools = document.createElement("div");
    divTools .className = "form-group";
    
    form.appendChild(divTools);

    // Create tools select box
    let selectTools = document.createElement("select");
    
    divTools.innerHTML = "<label for=\"selectTools\">" +
        "4. Викладач використовує мультимедійні засоби навчання (презентації, електронні лекції тощо)</label>";
    selectTools.className = "form-control";
    selectTools.setAttribute("id","selectTools");
    selectTools.required = false;

    divTools.appendChild(selectTools);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectTools.appendChild(option);
    }

    // Create divCommunication for communication select box
    let divCommunication = document.createElement("div");
    divCommunication .className = "form-group";
    
    form.appendChild(divCommunication);

    // Create communication select box
    let selectCommunication = document.createElement("select");
    
    divCommunication.innerHTML = "<label for=\"selectCommunication\">" +
        "5. Викладач налагоджує партнерські стосунки зі студентами, підтримує зворотній зв'язок</label>";
    selectCommunication.className = "form-control";
    selectCommunication.setAttribute("id","selectCommunication");
    selectCommunication.required = false;

    divCommunication.appendChild(selectCommunication);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectCommunication.appendChild(option);
    }

    // Create divInformativeness for Informativeness select box
    let divInformativeness = document.createElement("div");
    divInformativeness .className = "form-group";
    
    form.appendChild(divInformativeness);

    // Create Informativeness select box
    let selectInformativeness = document.createElement("select");
    
    divInformativeness.innerHTML = "<label for=\"selectInformativeness\">" +
        "6. Викладач на початку семестру інформує про форми контролю</label>";
    selectInformativeness.className = "form-control";
    selectInformativeness.setAttribute("id","selectInformativeness");
    selectInformativeness.required = false;

    divInformativeness.appendChild(selectInformativeness);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectInformativeness.appendChild(option);
    }

    // Create divObjectivity for Objectivity select box
    let divObjectivity = document.createElement("div");
    divObjectivity .className = "form-group";
    
    form.appendChild(divObjectivity);

    // Create Objectivity select box
    let selectObjectivity = document.createElement("select");
    
    divObjectivity.innerHTML = "<label for=\"selectObjectivity\">" +
        "7. Викладач об'єктивно оцінює знання студентів</label>";
    selectObjectivity.className = "form-control";
    selectObjectivity.setAttribute("id","selectObjectivity");
    selectObjectivity.required = false;

    divObjectivity.appendChild(selectObjectivity);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectObjectivity.appendChild(option);
    }

    // Create divClassroom for Classroom select box
    let divClassroom = document.createElement("div");
    divClassroom .className = "form-group";
    
    form.appendChild(divClassroom);

    // Create Classroom select box
    let selectClassroom = document.createElement("select");
    
    divClassroom.innerHTML = "<label for=\"selectClassroom\">" +
        "8. Викладач забезпечує студентів навчальними матеріалами на платформі Google Classroom</label>";
    selectClassroom.className = "form-control";
    selectClassroom.setAttribute("id","selectClassroom");
    selectClassroom.required = false;

    divClassroom.appendChild(selectClassroom);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectClassroom.appendChild(option);
    }

    // Create divConferences for Conferences select box
    let divConferences = document.createElement("div");
    divConferences.className = "form-group";
    
    form.appendChild(divConferences);

    // Create Conferences select box
    let selectConferences = document.createElement("select");
    
    divConferences.innerHTML = "<label for=\"selectConferences\">" +
        "9. Викладач проводить заняття за розкладом з використанням Zoom, Meet, Skype " +
        "чи інших програм для онлайн-конференцій</label>";
    
    selectConferences.className = "form-control";
    selectConferences.setAttribute("id","selectConferences");
    selectConferences.required = false;

    divConferences.appendChild(selectConferences);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectConferences.appendChild(option);
    }

    // Create divFriendliness for Friendliness select box
    let divFriendliness = document.createElement("div");
    divFriendliness .className = "form-group";
    
    form.appendChild(divFriendliness);

    // Create Friendliness select box
    let selectFriendliness = document.createElement("select");
    
    divFriendliness.innerHTML = "<label for=\"selectFriendliness\">" +
        "10. Викладач тактовний і доброзичливий зі студентами</label>";
    
    selectFriendliness.className = "form-control";
    selectFriendliness.setAttribute("id","selectFriendliness");
    selectFriendliness.required = false;

    divFriendliness.appendChild(selectFriendliness);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectFriendliness.appendChild(option);
    }

    // Create divPreferences for Preferences select box
    let divPreferences = document.createElement("div");
    divPreferences.className = "form-group";
    
    form.appendChild(divPreferences);

    // Create Preferences select box
    let selectPreferences = document.createElement("select");

    divPreferences.innerHTML = "<label for=\"selectPreferences\">" +
        "11. Хотів(-ла) б вивчати інші дисципліни саме з цим викладачем</label>";
    
    selectPreferences.className = "form-control";
    selectPreferences.setAttribute("id","selectPreferences");
    selectPreferences.required = false;

    divPreferences.appendChild(selectPreferences);

    for (let i = 0; i < scores.length; i++) {
        let option = document.createElement("option");
        option.value = scores[i];
        option.text = scores[i];
        selectPreferences.appendChild(option);
    }

    // Create divTextArea for textAreaComment
    let divComment = document.createElement("div");
    divComment.className = "form-group";
    
    form.appendChild(divComment);

    // Create textAreaComment
    let textAreaComment = document.createElement("textarea");

    divComment.innerHTML = "<label for=\"comment\">" +
        "12. Ваші побажання щодо покращення викладання цієї дисципліни</label>";
    
    textAreaComment.className = "form-control";
    textAreaComment.setAttribute("id","comment");
    textAreaComment.setAttribute("name","comment");
    textAreaComment.setAttribute("rows","5");
    textAreaComment.setAttribute("cols","33");
    textAreaComment.required = false;
    textAreaComment.setAttribute("maxlength","255");

    divComment.appendChild(textAreaComment);

    // Create submit button
    let buttonSubmit = document.createElement("button");
    
    buttonSubmit.className = "btn btn-primary btn-lg btn-block";
    buttonSubmit.setAttribute("type","submit");
    buttonSubmit.innerText = "Відправити";
    
    form.appendChild(buttonSubmit);

    // On click create new survey-result form
    buttonSubmit.onclick = function() {
        let selectTeacher = localStorage.getItem("teacherSelect");
        let teachers = [];
        
        if (localStorage.getItem("passedTeacher")) {
            teachers = JSON.parse(localStorage.getItem("passedTeacher"));
        } 
        sendAnswer().then(resp => {
            if (resp.status === 200) {
                alert("Дякуємо за оцінку!");
            }
        }).catch(() => {
            alert("Что-то пошло не так!");
            location.reload();
        });
        
        teachers.push(selectTeacher);
        console.log(teachers);
        localStorage.setItem("passedTeacher",JSON.stringify(teachers));
        alert(teachers.length + " -- " + localStorage.getItem("passedTeacher"));
        location.reload();
    };
}