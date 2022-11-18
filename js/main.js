// Get list of values for first 4 select boxes
async function getAllEducationLevel() {
	let url = "http://localhost:8080/survey/subject/all/educationLevel";
	return await sendValuesFetch(url);
}

async function getAllYear() {
	let url = "http://localhost:8080/survey/subject/all/year";
	return await sendValuesFetch(url);
}

async function getAllEducationalForm() {
	let url = "http://localhost:8080/survey/subject/all/educationalForm";
	return await sendValuesFetch(url);
}

async function getAllSpeciality() {
	let url = "http://localhost:8080/survey/subject/all/speciality";
	return await sendValuesFetch(url);
}

// Get values from first 4 select boxes
function getAnswers() {
	
	let educationLevelSelect = document.getElementById("educationLevelSelect").value;
	let yearSelect = document.getElementById("yearSelect").value;
	let educationalFormSelect = document.getElementById("educationalFormSelect").value;
	let specialitySelect = document.getElementById("specialitySelect").value;
	
	console.log(educationLevelSelect);
	console.log(yearSelect);
	console.log(educationalFormSelect);
	console.log(specialitySelect);

	let url = "http://localhost:8080/survey/subject/getSubjectByParams";
	let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
		"&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

	sendValuesFetch(url, encodeURI(params), false).then(() => {
		console.log('The values have been sent...');
	});
}

// Get list of subjects from server
async function getSubjects() {

	let educationLevelSelect = localStorage.getItem("educationLevelSelect");
	let yearSelect =localStorage.getItem("yearSelect");
	let educationalFormSelect = localStorage.getItem("educationalFormSelect");
	let specialitySelect = localStorage.getItem("specialitySelect");

	let url = "http://localhost:8080/survey/subject/getSubjectByParams";
	let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
		"&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

	console.log('getSubjects() is working...');

	return await sendValuesFetch(url, encodeURI(params), false);
}

// Get list of lecturers from server
async function getLecturers() {

	let educationLevelSelect = localStorage.getItem("educationLevelSelect");
	let yearSelect = localStorage.getItem("yearSelect");
	let educationalFormSelect = localStorage.getItem("educationalFormSelect");
	let specialitySelect = localStorage.getItem("specialitySelect");
	let selectDiscipline = document.getElementById('selectDiscipline').value;

	let url = "http://localhost:8080/survey/subject/getLecturerByParams";
	let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
		"&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect +
		"&title=" + selectDiscipline;

	console.log('getLecturers() is working... , url: ' + url + params);


	return await sendValuesFetch(url, encodeURI(params), false);
}

// Send values to server
async function sendValuesFetch(url, params = "") {

	console.log(url+params);
	url += params;

	let response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' :'http://localhost:8080/',
			'Access-Control-Allow-Credentials':'true'
		}
	});
	
	if (!response.ok) {
		throw new Error();
	}

	return response.json();
}
