import { getAllSpeciality, getLecturersStats, 
    getAnswerByLecturer, getCommentByLecturer } from "./main.js";

let speciality = [""];
let lecturer = [""];
let avgScores =  [
    "", 0, 0, 
    0, 0, 0,
    0, 0, 0,
    0, 0, 0, 0, 0
];
let countAvg =  [
    "", 0, 0, 
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

let subject = [];
let count_stats = [];

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
        countAvg  =  [
            "", 0, 0, 
            0, 0, 0,
            0, 0, 0,    
            0, 0, 0, 0, 0
        ];
        
        subject = [];
    
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
        if (document.querySelector("table")) {
            document.querySelector("table").remove();
        }

        document.querySelectorAll(".comment, .title_comment").forEach((e) => {
            e.remove();
        });
        avgScores =  [
            "", 0, 0, 
            0, 0, 0,
            0, 0, 0,
            0, 0, 0, 0, 0
        ];
        countAvg  =  [
            "", 0, 0, 
            0, 0, 0,
            0, 0, 0,    
            0, 0, 0, 0, 0
        ];
        subject = [];
    });

    // Create new table
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
    heading_2.innerHTML = "Дисципліна";
    
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Q1";

    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Q2";

    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Q3";

    let heading_6 = document.createElement("th");
    heading_6.innerHTML = "Q4";

    let heading_7 = document.createElement("th");
    heading_7.innerHTML = "Q5";

    let heading_8 = document.createElement("th");
    heading_8.innerHTML = "Q6";

    let heading_9 = document.createElement("th");
    heading_9.innerHTML = "Q7";

    let heading_10 = document.createElement("th");
    heading_10.innerHTML = "Q8";

    let heading_11 = document.createElement("th");
    heading_11.innerHTML = "Q9";

    let heading_12 = document.createElement("th");
    heading_12.innerHTML = "Q10";

    let heading_13 = document.createElement("th");
    heading_13.innerHTML = "Q11";

    let heading_14 = document.createElement("th");
    heading_14.innerHTML = "Середня оцінка";

    let heading_15 = document.createElement("th");
    heading_15.innerHTML = "Оцінили";

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
    row_1.appendChild(heading_15);
    thead.appendChild(row_1);

    // Creating and adding data to second row of the table
    getAnswerByLecturer().then(res => {
        let json_res = res; 
        console.log(json_res);
        json_res.forEach((answer) => {
            console.log(answer);
            subject = [...subject, answer.subject];
            
            count_stats = [...count_stats, answer.countAnswers];
            console.log("avgScores[13] -- " + avgScores[13]);
            addStatsRow(table, answer); 
        });
        addAvgStats(table);
    });

    getCommentByLecturer().then(res => {
        let json_res = res; 
        console.log(json_res);

        let temp_title_comment = "";
        json_res.forEach((answer) => {
            if (temp_title_comment !== answer.subject){
                let p = document.createElement("p");
                p.innerText = answer.subject;
                p.className = "title_comment";
                temp_title_comment = answer.subject;
                document.querySelector("main").appendChild(p);
            }
            document.querySelector("main").appendChild(createComment(answer.extra));
        });
    });
}

function addAvgStats(table) {
    let row = table.insertRow(-1);
    row.className = "bg-warning";

    let cell_1 = row.insertCell(0);
    cell_1.innerHTML = "Середня оцінка";

    let cell_2_1 = row.insertCell(1);
    console.log("avg arr -- " + avgScores);
    cell_2_1.innerHTML = "";
    
    let cell_2_2 = row.insertCell(2);
    console.log("avg arr -- " + avgScores);
    cell_2_2.innerHTML = round(avgScores[1] / countAvg[1]);
    
    let cell_3 = row.insertCell(3);
    cell_3.innerHTML = round(avgScores[2] / countAvg[2]);

    let cell_4 = row.insertCell(4);
    cell_4.innerHTML = round(avgScores[3] / countAvg[3]); 
    
    let cell_5 = row.insertCell(5);
    cell_5.innerHTML = round(avgScores[4] / countAvg[4]);
    
    let cell_6 = row.insertCell(6);
    cell_6.innerHTML = round(avgScores[5] / countAvg[5]);
    
    let cell_7 = row.insertCell(7);
    cell_7.innerHTML = round(avgScores[6] / countAvg[6]);
    
    let cell_8 = row.insertCell(8);
    cell_8.innerHTML = round(avgScores[7] / countAvg[7]);
    
    let cell_9 = row.insertCell(9);
    cell_9.innerHTML = round(avgScores[8] / countAvg[8]);
    
    let cell_10 = row.insertCell(10);
    cell_10.innerHTML = round(avgScores[9] / countAvg[9]);
    
    let cell_11 = row.insertCell(11);
    cell_11.innerHTML = round(avgScores[10] / countAvg[10]);
    
    let cell_12 = row.insertCell(12);
    cell_12.innerHTML = round(avgScores[11] / countAvg[11]);
    
    let cell_13 = row.insertCell(13);
    cell_13.innerHTML = round(avgScores[12] / avgScores[13]);

    // cell_14
    row.insertCell(14);
}

function addStatsRow(table, json_one) {
    let row = table.insertRow(1);

    let cell_1 = row.insertCell(0);
    cell_1.innerHTML = document.getElementById("selectTeacher").value;

    let cell_2 = row.insertCell(1);
    cell_2.innerHTML = subject[avgScores[13]];
    
    let cell_3 = row.insertCell(2);
    cell_3.innerHTML = json_one.answer1;
    avgScores[1] += json_one.answer1;
    if(json_one.answer1){
        countAvg[1] += 1;
    }
    console.log(avgScores[1] + " -- " + json_one.answer1 + " -- " + typeof json_one.answer1);
    
    let cell_4 = row.insertCell(3);
    cell_4.innerHTML = json_one.answer2;
    avgScores[2] += json_one.answer2;
    if(json_one.answer2){
        countAvg[2] += 1;
    }
    
    let cell_5 = row.insertCell(4);
    cell_5.innerHTML = json_one.answer3; 
    avgScores[3] += json_one.answer3;
    if(json_one.answer3){
        countAvg[3] += 1;
    }
    
    let cell_6 = row.insertCell(5);
    cell_6.innerHTML = json_one.answer4;
    avgScores[4] += json_one.answer4;
    if(json_one.answer4){
        countAvg[4] += 1;
    }
    
    let cell_7 = row.insertCell(6);
    cell_7.innerHTML = json_one.answer5;
    avgScores[5] += json_one.answer5;
    if(json_one.answer5){
        countAvg[5] += 1;
    }
    
    let cell_8 = row.insertCell(7);
    cell_8.innerHTML = json_one.answer6;
    avgScores[6] += json_one.answer6;
    if(json_one.answer6){
        countAvg[6] += 1;
    }
    
    let cell_9 = row.insertCell(8);
    cell_9.innerHTML = json_one.answer7;
    avgScores[7] += json_one.answer7;
    if(json_one.answer7){
        countAvg[7] += 1;
    }
    
    let cell_10 = row.insertCell(9);
    cell_10.innerHTML = json_one.answer8;
    avgScores[8] += json_one.answer8;
    if(json_one.answer8){
        countAvg[8] += 1;
    }
    
    let cell_11 = row.insertCell(10);
    cell_11.innerHTML = json_one.answer9;
    avgScores[9] += json_one.answer9;
    if(json_one.answer9){
        countAvg[9] += 1;
    }
    
    let cell_12 = row.insertCell(11);
    cell_12.innerHTML = json_one.answer10;
    avgScores[10] += json_one.answer10;
    if(json_one.answer10){
        countAvg[10] += 1;
    }
    
    let cell_13 = row.insertCell(12);
    cell_13.innerHTML = json_one.answer11;
    avgScores[11] += json_one.answer11;
    if(json_one.answer11){
        countAvg[11] += 1;
    }
    
    let cell_14 = row.insertCell(13);
    cell_14.innerHTML = round(json_one.avg);
    avgScores[12] += json_one.avg;
    avgScores[13] += 1;

    let cell_15 = row.insertCell(14);
    cell_15.innerHTML = count_stats[avgScores[13]-1];
}

function createComment(comment) {
    let divComment = document.createElement("div");
    divComment.className = "comment";

    let p = document.createElement("p");
    p.innerText = comment;
    divComment.appendChild(p);

    return divComment;
}

function round(num) {
    return Math.floor((num * 100)) / 100;
}