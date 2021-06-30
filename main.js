

document.addEventListener("DOMContentLoaded", () => {

    let divToAppend = document.getElementById("kids");
    let childCount = 0;
    let formElement = document.getElementById("first-form");

    formElement.addEventListener("click", checkItem);

    function checkItem(event) {

        let newTarget = event.target;
        let newField = document.createElement("fieldset");
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.classList.add("deleteButton")
        deleteButton.innerText = "Delete";
        if(newTarget.classList[0] == "child-button")
        {
            childCount++
            event.preventDefault();
            
            
            newField.innerHTML = 
            `
            <legend>Enfants moins de 12 ans: #${childCount}</legend>
            <div>
                <div>
                    
                    <label for="child-name">Nom:</label>
                    <input type="text" id="child-name">
                </div>

                <div>
                    <label for="child-lastname">Prenom:</label>
                    <input type="text" id="child-lastname">
                </div>

                <div>
                    <label for="child-DOB">Date de Naissance:</label>
                    <input type="text" id="child-DOB">
                </div>
            </div>
            `
            newField.appendChild(deleteButton)

            divToAppend.append(newField);
        } 

        deleteButton.addEventListener("click", () => {
            newField.remove();
            childCount = 0;
            console.log(newField)
        })
            

    }


let submitButton = document.getElementById("submit-button");
let formInput = null;
submitButton.addEventListener("click", myFunction)



    function myFunction (event) {
        // event.preventDefault();
       formInput = Array.from(document.querySelectorAll("#first-form input")).reduce((acc, input) => 
        ({ ...acc, [input.id]: input.value}), {});
        console.log(formInput);
   }
   



   //Zipcode API

const smartyUrl = "https://us-street.api.smartystreets.com/street-address?auth-id=99423014619672828&candidates=10"

let addressField = document.querySelector("#address");
let cityField = document.querySelector("#city");
let stateField = document.querySelector("#state");
let zipcodeField = document.querySelector("#zip-code");
let zipCodeSection = document.querySelector(".zip-code-section");

smartyUrlHearder = {
    Headers: {
       "Content-Type": "application/json",
        Host: "us-street.api.smartystreets.com", 
    },
    
}

const handleErrors = function(response) {
    if(!response.ok) {
        throw (response.status + ":" + response.statusText)
    }
    return response.json();
}
// const createRequest = function(url) {
//     fetch(url)
//     .then((response) => {
//             handleErrors(response)
//             .then((data) => {

//                     const zipCode = data[0].components.zipcode;
//                     const lastDigits = data[0].components.plus4_code;
//                     zipcodeField.value = zipCode + "-" + lastDigits;
//                     zipCodeSection.classList.add("display-zip");
//                 })
//                 .catch((error) => console.log(error))
//         })

const createRequest = function(url) {
    fetch(url, smartyUrlHearder)
    .then((response) => handleErrors(response)
    .then((data) => {
                    const zipCode = data[0].components.zipcode;
                    const lastDigits = data[0].components.plus4_code;
                    zipcodeField.value = zipCode + "-" + lastDigits;
                    
                })
                .catch((error) => console.log(error))
        )
    // const httpRequest = new XMLHttpRequest(url);
    // httpRequest.addEventListener("readystatechange", (url)=> {
    //     if(httpRequest.readyState === 4)
    //     {
    //         const parseAddress = JSON.parse(httpRequest.responseText);
            // const zipCode = parseAddress[0].components.zipcode;
            // const lastDigits = parseAddress[0].components.plus4_code;
            // zipcodeField.value = zipCode + "-" + lastDigits;
            // zipCodeSection.classList.add("display-zip")
    //     }
    // }); 

    // httpRequest.open("GET", url);
    // httpRequest.send();
}



const checkCompletion = function() {
    if(addressField.value !== "" && cityField.value !== "" && stateField !== "")
    {
        const churchUrl = smartyUrl + "&street=" + addressField.value + "&city=" + cityField.value + "&state=" + stateField.value;
        createRequest(churchUrl);
    }

}

addressField.addEventListener("blur", checkCompletion);
cityField.addEventListener("blur", checkCompletion);
stateField.addEventListener("blur", checkCompletion);


})

