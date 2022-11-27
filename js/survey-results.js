let speciality = [""];
let lecturer = [""];
let avgScores =  [
    "", 0, 0, 
    0, 0, 0,
    0, 0, 0,
    0, 0, 0, 0, 0
];
let comment = [];

document.addEventListener("DOMContentLoaded", () => {
    // Load speciality options
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
    });

    let selectTeacher = document.getElementById("selectTeacher");

    selectSpeciality.addEventListener("change",() => {

        lecturer = [""];
        selectTeacher.innerHTML = "";
        avgScores =  [
            "", 0, 0, 
            0, 0, 0,
            0, 0, 0,    
            0, 0, 0, 0, 0
        ];
        comment = [];
    
        getLecturersStats().then(res => {
            for (const iterator of res) {
                lecturer = [...lecturer, iterator.lecturer];
            }
            for (let i = 0; i < lecturer.length; i++) {
                let option = document.createElement("option");
                option.value = lecturer[i];
                option.text = lecturer[i];
                selectTeacher.appendChild(option);
            }
        });
    });

    // Remove old comments
    selectTeacher.addEventListener("change",() => {
        lecturer = [""];
        document.querySelector("table").remove();
        document.querySelectorAll(".comment").forEach((e) => {
            e.remove();
        });
        avgScores =  [
            "", 0, 0, 
            0, 0, 0,
            0, 0, 0,
            0, 0, 0, 0, 0
        ];
        comment = [];
    });

    stats();
});

// Local storage 
let sectors = document.querySelectorAll(".form-group");

console.log(sectors);

sectors.forEach((e) => e.addEventListener("change",(event) => {
    let element_id = e.querySelector("select").id;
    
    if(!localStorage.getItem("items")){
        localStorage.setItem(element_id, event.target.value);
    }
    
    checkStorage();
    
    console.log("educationLevelSelect -- " + localStorage.getItem("educationLevelSelect"));
}));

// Survey results
function stats() {
    document.querySelectorAll(".form-group").forEach((e) =>
        e.addEventListener("change",() => {

            let selectStatSpeciality = document.getElementById("specialitySelect").value;
            let selectStatLecturer = document.getElementById("selectTeacher").value;
            let buttonOnClickStat = document.getElementById("btnStat");

            if (selectStatSpeciality !== "" &&
            selectStatLecturer !== "") {

                buttonOnClickStat.addEventListener("click", () => {
                    createStatTable();
                });
            }
    }));
}

function createStatTable() {
    // Create table
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    
    let isTableExists = document.querySelector("table");

    // Adjust table style
    table.className = "table table-bordered";
    thead.className = "thead-dark";

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    if (!isTableExists) {
        document.querySelector("main").appendChild(table);
    } else {
        return;
    }
    
    // Creating and adding data to first row of the table
    let row_1 = document.createElement("tr");
        
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Викладач";
    
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Q1";
    
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Q2";

    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Q3";

    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Q4";

    let heading_6 = document.createElement("th");
    heading_6.innerHTML = "Q5";

    let heading_7 = document.createElement("th");
    heading_7.innerHTML = "Q6";

    let heading_8 = document.createElement("th");
    heading_8.innerHTML = "Q7";

    let heading_9 = document.createElement("th");
    heading_9.innerHTML = "Q8";

    let heading_10 = document.createElement("th");
    heading_10.innerHTML = "Q9";

    let heading_11 = document.createElement("th");
    heading_11.innerHTML = "Q10";

    let heading_12 = document.createElement("th");
    heading_12.innerHTML = "Q11";

    let heading_13 = document.createElement("th");
    heading_13.innerHTML = "Середня оцінка";

    let heading_14 = document.createElement("th");
    heading_14.innerHTML = "Відгук";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    row_1.appendChild(heading_9);
    row_1.appendChild(heading_10);
    row_1.appendChild(heading_11);
    row_1.appendChild(heading_12);
    row_1.appendChild(heading_13);
    row_1.appendChild(heading_14);
    thead.appendChild(row_1);

    // Creating and adding data to second row of the table
    getAnswerByLecturer().then(res => {
        let json_res = res; 
        console.log(json_res);
        json_res.forEach((answer) => {
            console.log(answer);
            comment = [...comment, answer.extra];
            console.log("avgScores[13] -- " + avgScores[13]);
            document.querySelector("main").appendChild(createComment(comment[avgScores[13]]));
            addStatsRow(table, answer);
        });
        addAvgStats(table);
    });
}

function addAvgStats(table) {
    let row = table.insertRow(-1);

    let cell_1 = row.insertCell(0);
    cell_1.innerHTML = "Середнє";
    
    let cell_2 = row.insertCell(1);
    console.log("avg arr -- " + avgScores);
    cell_2.innerHTML = round(avgScores[1] / avgScores[13]);
    
    let cell_3 = row.insertCell(2);
    cell_3.innerHTML = round(avgScores[2] / avgScores[13]);

    let cell_4 = row.insertCell(3);
    cell_4.innerHTML = round(avgScores[3] / avgScores[13]); 
    
    let cell_5 = row.insertCell(4);
    cell_5.innerHTML = round(avgScores[4] / avgScores[13]);
    
    let cell_6 = row.insertCell(5);
    cell_6.innerHTML = round(avgScores[5] / avgScores[13]);
    
    let cell_7 = row.insertCell(6);
    cell_7.innerHTML = round(avgScores[6] / avgScores[13]);
    
    let cell_8 = row.insertCell(7);
    cell_8.innerHTML = round(avgScores[7] / avgScores[13]);
    
    let cell_9 = row.insertCell(8);
    cell_9.innerHTML = round(avgScores[8] / avgScores[13]);
    
    let cell_10 = row.insertCell(9);
    cell_10.innerHTML = round(avgScores[9] / avgScores[13]);
    
    let cell_11 = row.insertCell(10);
    cell_11.innerHTML = round(avgScores[10] / avgScores[13]);
    
    let cell_12 = row.insertCell(11);
    cell_12.innerHTML = round(avgScores[11] / avgScores[13]);
    
    let cell_13 = row.insertCell(12);
    cell_13.innerHTML = round(avgScores[12] / avgScores[13]);
}

function addStatsRow(table, json_one) {
    let row = table.insertRow(1);

    let cell_1 = row.insertCell(0);
    cell_1.innerHTML = "Препод";
    
    let cell_2 = row.insertCell(1);
    cell_2.innerHTML = json_one.answer1;
    avgScores[1] += json_one.answer1;
    console.log(avgScores[1] + " -- " + json_one.answer1 + " -- " + typeof json_one.answer1);
    
    let cell_3 = row.insertCell(2);
    cell_3.innerHTML = json_one.answer2;
    avgScores[2] += json_one.answer2;
    
    let cell_4 = row.insertCell(3);
    cell_4.innerHTML = json_one.answer3; 
    avgScores[3] += json_one.answer3;
    
    let cell_5 = row.insertCell(4);
    cell_5.innerHTML = json_one.answer4;
    avgScores[4] += json_one.answer4;
    
    let cell_6 = row.insertCell(5);
    cell_6.innerHTML = json_one.answer5;
    avgScores[5] += json_one.answer5;
    
    let cell_7 = row.insertCell(6);
    cell_7.innerHTML = json_one.answer6;
    avgScores[6] += json_one.answer6;
    
    let cell_8 = row.insertCell(7);
    cell_8.innerHTML = json_one.answer7;
    avgScores[7] += json_one.answer7;
    
    let cell_9 = row.insertCell(8);
    cell_9.innerHTML = json_one.answer8;
    avgScores[8] += json_one.answer8;
    
    let cell_10 = row.insertCell(9);
    cell_10.innerHTML = json_one.answer9;
    avgScores[9] += json_one.answer9;
    
    let cell_11 = row.insertCell(10);
    cell_11.innerHTML = json_one.answer10;
    avgScores[10] += json_one.answer10;
    
    let cell_12 = row.insertCell(11);
    cell_12.innerHTML = json_one.answer11;
    avgScores[11] += json_one.answer11;
    
    let cell_13 = row.insertCell(12);
    cell_13.innerHTML = round(json_one.avg);
    avgScores[12] += json_one.avg;
    avgScores[13] += 1;

    let cell_14 = row.insertCell(13);
    let divDropdown = createButtonComment(comment[avgScores[13]-1]);
    console.log(divDropdown);
    cell_14.appendChild(divDropdown);//comment[avgScores[13]-1]
}

function createComment(comment) {
    let divComment = document.createElement("div");
    divComment.className = "comment";

    let p = document.createElement("p");
    p.innerText = comment;
    divComment.appendChild(p);

    return divComment;
}

function createButtonComment(comment){
    let divDropdown = document.createElement("div");
    divDropdown.className = "dropdown";

    let buttonComment = document.createElement("button");
    buttonComment.className = "dropbtn";

    divDropdown.appendChild(buttonComment);

    buttonComment.addEventListener("click",() => {
        showComment();
    });

    let dropdown_content = document.createElement("div");
    dropdown_content.className = "dropdown-content";

    divDropdown.appendChild(dropdown_content);

    let p = document.createElement("p");
    p.innerText = comment;
    dropdown_content.appendChild(p);

    return divDropdown;
}

function showComment() {
    // document.getElementById("myDropdown").classList.toggle("show");
    document.querySelectorAll(".dropdown-content").forEach((element) => {
        element.classList.toggle("show");
    });
}
  
  // Close the dropdown if the user clicks outside it
  window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

function round(num){
    return Math.floor((num * 100)) / 100;
}