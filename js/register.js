// ? =============> Global =============> 
const inputs = document.querySelectorAll("input");
const btnregister =document.getElementById("btn-register");
const formdata = document.querySelector("form");
let isValid=false;
const mode = document.getElementById("mode");

// ! =============> when start =============> 

    if (localStorage.getItem("theme") != null) {
        const themeData = localStorage.getItem("theme");
     
        if (themeData === "light") {
           mode.classList.replace("fa-sun", "fa-moon");
        } else {
           mode.classList.replace("fa-moon", "fa-sun");
        }
     
        document.querySelector("html").setAttribute("data-theme", themeData);
     };
// ! =============> Events =============> 


document.getElementById("registerclick").addEventListener('click',function(){
    window.location = "index.html"
} );

formdata.addEventListener("input",() => {
    if(validationName(inputs[0]) &&
    validationName(inputs[1]) &&
    validationMail() &&
    validationPassword() &&
    validationAge() ){
    isValid= true;
    }
else {
    isValid= false;
};
    });

formdata.addEventListener("submit", (e)=>{
e.preventDefault();
if(isValid){
    setdata();
}
});

mode.addEventListener("click", function (e) {
    if (mode.classList.contains("fa-sun")) {
       document.querySelector("html").setAttribute("data-theme", "light");
       mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon
 
       localStorage.setItem("theme", "light");
    } else {
       mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
       document.querySelector("html").setAttribute("data-theme", "dark");
       localStorage.setItem("theme", "dark");
    }
 });

// ! =============> functions =============> 

function setdata(){
    const user = {
        first_name:inputs[0].value,
	last_name:inputs[1].value,
        email:inputs[2].value,
        password:inputs[3].value,
	age:inputs[4].value
    }
    console.log(user);
    registerform(user)
};

async function registerform(userdata){
    const api = await fetch(`https://movies-api.routemisr.com/signup`, {
        method: 'post',
        body: JSON.stringify(userdata),
        headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
        },
    });
    const response =await api.json();
    console.log(response);
    if(response.message === 'success') {
      
        location.href="./index.html";
    } else {
        document.getElementById('msg').innerHTML=response.errors?.email.message;
    }
}

// =============> Validation =============>  

function validationName(input){
const regexname = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/ ;
if (regexname.test(input.value)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
return true;
};
input.classList.add("is-invalid")
input.classList.remove("is-valid")
return false;

};
function validationMail(){
    const regexmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexmail.test(inputs[2].value)){
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");
    return true;
    }
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
    
    };
    function validationPassword(){
        const regexpass =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regexpass.test(inputs[3].value)){
            inputs[3].classList.add("is-valid")
            inputs[3].classList.remove("is-invalid")
        return true;
        }
        inputs[3].classList.add("is-invalid")
        inputs[3].classList.remove("is-valid")
        return false;
        
        };
        function validationAge(){
            const regexage =/^([1-7][0-9]|80)$/;
            if (regexage.test(inputs[4].value)){
                inputs[4].classList.add("is-valid")
                inputs[4].classList.remove("is-invalid")
            return true;
            }
            inputs[4].classList.add("is-invalid")
            inputs[4].classList.remove("is-valid")
            return false;
            
            };






            

