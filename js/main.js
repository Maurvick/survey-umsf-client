// Get list of values for educationLevelSelect
export async function getAllEducationLevel() {
    let url = "http://localhost:8080/survey/subject/all/educationLevel";
    return await getValuesFetch(url);
}

// Get list of values for educationalFormSelect
export async function getAllEducationalForm() {
    let url = "http://localhost:8080/survey/subject/all/educationalForm";
    return await getValuesFetch(url);
}

// Get list of values for yearSelect
export async function getAllYear() {
    let url = "http://localhost:8080/survey/subject/all/year";
    return await getValuesFetch(url);
}

// Get list of values for selectDiscipline
export async function getAllSpeciality() {
    let url = "http://localhost:8080/survey/subject/all/speciality";
    return await getValuesFetch(url);
}

// Get list of values for selectTeacher
export async function getAnswerByLecturer() {
    let selectTeacher = document.getElementById("selectTeacher").value;

    let url = "http://localhost:8080/survey/answer/getByLecturer";
    let params = "?lecturer=" + selectTeacher;
    return await getValuesFetch(url,  encodeURI(params));
}

export async function getCommentByLecturer() {
    let selectTeacher = document.getElementById("selectTeacher").value;

    let url = "http://localhost:8080/survey/answer/getCommentByLecturer";
    let params = "?lecturer=" + selectTeacher;
    return await getValuesFetch(url,  encodeURI(params));
}

// Get list of subjects from server
export async function getSubjects() {
    let educationLevelSelect = localStorage.getItem("educationLevelSelect");
    let yearSelect =localStorage.getItem("yearSelect");
    let educationalFormSelect = localStorage.getItem("educationalFormSelect");
    let specialitySelect = localStorage.getItem("specialitySelect");

    let url = "http://localhost:8080/survey/subject/getSubjectByParams";
    let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
        "&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

    console.log("getSubjects() is working...");

    return await getValuesFetch(url, encodeURI(params), false);
}

// Get list of lecturers from server
export async function getLecturers() {
    let educationLevelSelect = localStorage.getItem("educationLevelSelect");
    let yearSelect = localStorage.getItem("yearSelect");
    let educationalFormSelect = localStorage.getItem("educationalFormSelect");
    let specialitySelect = localStorage.getItem("specialitySelect");
    let selectDiscipline = document.getElementById("selectDiscipline").value;

    let url = "http://localhost:8080/survey/subject/getLecturerByParams";
    let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
        "&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect +
        "&title=" + selectDiscipline;

    console.log("getLecturers() is working... , url: " + url + params);


    return await getValuesFetch(url, encodeURI(params), false);
}

// (UNUSED) Get list of disciplines from server for statistics
export async function getSubjectsStats() {
    let specialitySelect = document.getElementById("specialitySelect").value;

    let url = "http://localhost:8080/survey/subject/getSubjectStatsByParams";
    let params = "?speciality=" + specialitySelect;

    console.log("getSubjectsStats() is working...");

    return await getValuesFetch(url, encodeURI(params), false);
}

// Get list of lecturers from server for statistics
export async function getLecturersStats() {
    let specialitySelect = document.getElementById("specialitySelect").value;

	let url = "http://localhost:8080/survey/subject/getLecturerStatsByParams";
	let params = "?speciality=" + specialitySelect;

    console.log("getLecturersStats() is working... , url: " + url + params);

    return await getValuesFetch(url, encodeURI(params), false);
}

// Get values from server
export async function getValuesFetch(url, params = "") {
    console.log(url + params);
    url += params;

    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" :"http://localhost:8080/",
            "Access-Control-Allow-Credentials":"true"
        }
    });

    if (!response.ok) {
        throw new Error();
    }

    return response.json();
}

// Read answers from second-form.js select boxes
export async function sendAnswer() {
    let answer = {
        answer1:1,
        answer2:2,
        answer3:3,
        answer4:4,
        answer5:5,
        answer6:6,
        answer7:7,
        answer8:8,
        answer9:9,
        answer10:10,
        answer11:11,
        lecturer:"",
        subject:"",
        extra:""
    };

    answer.answer1 = parseInt( document.getElementById("selectCompetence").value);
    answer.answer2 = parseInt(document.getElementById("selectUnderstandability").value);
    answer.answer3 = parseInt(document.getElementById("selectPracticality").value);
    answer.answer4 = parseInt(document.getElementById("selectTools").value);
    answer.answer5 = parseInt(document.getElementById("selectCommunication").value);
    answer.answer6 = parseInt(document.getElementById("selectInformativeness").value);
    answer.answer7 = parseInt(document.getElementById("selectObjectivity").value);
    answer.answer8 = parseInt(document.getElementById("selectClassroom").value);
    answer.answer9 = parseInt(document.getElementById("selectConferences").value);
    answer.answer10 = parseInt(document.getElementById("selectFriendliness").value);
    answer.answer11 = parseInt(document.getElementById("selectPreferences").value);
    answer.lecturer = localStorage.getItem("teacherSelect");
    answer.subject = localStorage.getItem("disciplineSelect");
    answer.extra = document.getElementById("comment").value;
    

    let url = "http://localhost:8080/survey/answer/send";

    return await sendJsonFetch(url, answer);
}

// Get json from server
export async function sendJsonFetch(url, json) {
    console.log("JSON.stringify(json) -- " + JSON.stringify(json));

    let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" :"http://localhost:8080/",
            "Access-Control-Allow-Credentials":"true"
        },
        body: JSON.stringify(json)
    });

    if (!response.ok) {
        throw new Error();
    }

    return response;
}
