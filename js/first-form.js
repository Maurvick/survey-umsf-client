const years = ['', '2019', '2020', '2021', '2022'];
const speciality =  [
    "", "Міжнародне право", "Публічне управління або адміністрування",
    "Туризм", "Кібербезпека", "Право", "Менеджмент", "Журналістика",
    "Економіка", "Історія та археологія", "Міжнародні економічні відносини",
    "Транспортні технології", "Готельно-ресторанна справа", "Комп'ютерні науки",
    "Підприємництво, торгівля та біржова діяльність", "Фінанси, банківська справа та страхування",
    "Психологія", "Філологія", "Дизайн", "Міжнародні відносини, суспільні комунікації та регіональні студії",
    "Правоохоронна діяльність", "Соціальне забезпечення", "Інженерія програмного забезпечення",
    "Маркетинг", "Облік i оподаткування", "Політологія", "Культурологія", "Фізична культура"
];

document.addEventListener('DOMContentLoaded', function() {
    let yearSelect = document.getElementById('yearSelect');
    let selectSpeciality = document.getElementById('specialitySelect');

    for (let i = 0; i < speciality.length; i++) {
        let option = document.createElement('option');
        option.value = speciality[i];
        option.text = speciality[i];
        selectSpeciality.appendChild(option);
    }

    for (let i = 0; i < years.length; i++) {
        let option = document.createElement('option');
        option.value = years[i];
        option.text = years[i];
        yearSelect.appendChild(option);
    }
});


