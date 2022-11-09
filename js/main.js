function sendAnswers() {
    let educationLevelSelect = document.getElementById("educationLevelSelect").value;
    let yearSelect = document.getElementById("yearSelect").value;
    let educationalFormSelect = document.getElementById("educationalFormSelect").value;
    let specialitySelect = document.getElementById("specialitySelect").value;

    let url = "http://localhost:8080/survey/subject/getLecturerByParams" + 
    "?educationLevel=" + educationLevelSelect + "&year=" + yearSelect + "&educationalForm=" + educationalFormSelect + "&speciality=" + specialitySelect;

    // sendValues(url);
}

function sendValues(url, params) {
	let getParams = encodeURI(params);
	if (getParams == null) {
		return false;
	} else {
		let http = new XMLHttpRequest();
		
		http.open("GET", url, true);
		console.log("getParams -- "+ getParams);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		http.send(getParams);

		http.onerror = function() {
			alert('Помилка з`єднання');
		};

		http.onload = function() {
			if ( http.responseText.includes("Error update")) {
				alert("Не вдалося оновити.");
				return;
			}
			if (http.responseText.includes("Error insert")) {
				alert("Не вдалося додати.");
				return;
			}
			if (http.responseText.includes("Error delete")) {
				alert("Не вдалося видалити.");
			}
	    };
    } 
}

