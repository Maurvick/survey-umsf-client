function getAnswers() {
	let educationLevelSelect = document.getElementById("educationLevelSelect").value;
	let yearSelect = document.getElementById("yearSelect").value;
	let educationalFormSelect = document.getElementById("educationalFormSelect").value;
	let specialitySelect = document.getElementById("specialitySelect").value;

	let url = "http://localhost:8080/survey/subject/getSubjectByParams";
	let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
		"&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

	console.log('SendAnswers() is working...');

	// let url = "http://localhost:8080/survey/subject";
	// let params = '';
	sendValuesFetch(url, encodeURI(params), false).then(() => {
		console.log('The values have been sent...');
	});
}

async function getSubjects() {
	let educationLevelSelect = document.getElementById("educationLevelSelect").value;
	let yearSelect = document.getElementById("yearSelect").value;
	let educationalFormSelect = document.getElementById("educationalFormSelect").value;
	let specialitySelect = document.getElementById("specialitySelect").value;

	let url = "http://localhost:8080/survey/subject/getSubjectByParams";
	let params = "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect +
		"&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

	console.log('getSubjects() is working...');

	
	return await sendValuesFetch(url, encodeURI(params), false);
}



// Send answers to server
async function sendValuesFetch(url, params, isReload) {

	console.log(url+params);
	url += params;

	let response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		headers: {
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' :'http://localhost:8080/',
			'Access-Control-Allow-Credentials':'true'
		}
	});
	if(!response.ok){
		throw new Error();
	}
	return response.json();
}
