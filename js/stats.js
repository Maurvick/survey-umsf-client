function stats() {
    // Delete form
    let pageElement = document.querySelector('#thirdForm');

    if (document.querySelector('#thirdForm')) {
        pageElement.remove()
    }

    // Create new form
    // let main = document.getElementsByTagName('main')[0];
    let main = document.querySelector('main');
    let form = document.createElement('form');
    let horizontalRule = document.createElement('hr');

    form.id = 'thirdForm';
    main.appendChild(form);
    // form.appendChild(horizontalRule);

    // Create headingScore
    let headingScore = document.createElement('h2');
    let horizontalRuleScore = document.createElement('hr');
    headingScore.innerText = "Статистика";
    form.append(headingScore);
    // form.appendChild(horizontalRuleScore);
}
