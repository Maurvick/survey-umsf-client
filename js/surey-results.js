// Survey results
function stats() {

    if (document.querySelector('form')) {
        document.querySelector('form').remove()
    }

    // Create new form
    let main = document.querySelector('main');
    let form = document.createElement('form');
    let horizontalRule = document.createElement('hr');
    let lineBreak = document.createElement('br');

    main.appendChild(form);

    // Create headingScore
    let headingScore = document.createElement('h2');
    headingScore.innerText = "Статистика";
    form.id = 'thirdForm';
    form.append(headingScore);
    form.appendChild(horizontalRule);
    form.appendChild(lineBreak);
}
