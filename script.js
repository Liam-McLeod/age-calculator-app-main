const form_element = document.querySelector('form');
const day_input_element = document.getElementById('day-input');
const month_input_element = document.getElementById('month-input');
const year_input_element = document.getElementById('year-input');

const submit_btn = document.querySelector('button');

submit_btn.addEventListener('click',e => {
    var day_value = day_input_element.value;
    var month_value = month_input_element.value;
    var year_value = year_input_element.value;

    // Invalid Day 1-31
    if (day_value =='') {
        errorFunc(day_input_element, "This field is required")
    } else if (day_value < 1 || day_value > 31) {
        errorFunc(day_input_element,"Must be a valid day")
    }

    //Invalid Month 1-12
    if (month_value==''){
        errorFunc(month_input_element, "This field is required")
    } else if(month_value < 1 || month_value > 12) {
        errorFunc(month_input_element,"Must be a valid month")
    }

    //Invalid Year > 2023
    if (year_value==''){
        errorFunc(year_input_element, "This field is required")
        return
    } else if(year_value < 1 || year_value > 2023) {
        errorFunc(year_input_element,"Must be in the past")
        return
    }

    // Age calculation
    const [ageYears,ageMonths,ageDays] = getAge(day_value,month_value,year_value);
    // Age output
    document.querySelector(".years-output").innerText = ageYears;
    document.querySelector(".months-output").innerText = ageMonths;
    document.querySelector(".days-output").innerText = ageDays;
    
})

function getAge(day_value,month_value,year_value) {
    const currentDate = new Date()

    var ageYears = currentDate.getFullYear() - year_value;
    var ageMonths = currentDate.getMonth() + 1 - month_value;
    var ageDays = currentDate.getDate() - day_value-1;

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths +=12;
    }

    if (ageDays < 0) {
		var prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
		ageDays += prevMonth.getDate();
		ageMonths--;
	}

    return [ageYears,ageMonths,ageDays]
}


function errorFunc(element, message) {

    var elementContainer = element.parentElement;
    var error_message = elementContainer.querySelector('.error-msg');
    var label = elementContainer.querySelector('p');

    element.style.borderColor = 'red'
    label.style.color = 'red';
    error_message.innerText = message;
}