
// btn? =============> Global =============> 
const mode = document.getElementById("mode");
    const inputs = document.querySelectorAll("input");
const btnlogin =document.getElementById("btn-login");
const formdata = document.querySelector("form");
let isValid=false;

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
    document.getElementById("register").addEventListener('click',function(){
        window.location = "./register.html"
    } );
    

formdata.addEventListener("input",() => {
    if(validationMail() &&
    validationPassword()){
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

mode.addEventListener("click", function () {
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
        email:inputs[0].value,
        password:inputs[1].value,
    }
    console.log(user);
    loginform(user)
};

async function loginform(userdata){
    const api = await fetch(`https://movies-api.routemisr.com/signin`, {
        method: 'post',
        body: JSON.stringify(userdata),
        headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
        },
    });
    const response =await api.json();

    if(response.message === 'success') {
      localStorage.setItem("uToken",response.token)
        location.href="./home.html";
    } else {
        document.getElementById('msg').innerHTML=response.message;
    }
    console.log(response);

}

// =============> Validation =============>  


function validationMail(){
    const regexmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexmail.test(inputs[0].value)){
        inputs[0].classList.add("is-valid")
        inputs[0].classList.remove("is-invalid")
    return true;
    }
    inputs[0].classList.add("is-invalid")
    inputs[0].classList.remove("is-valid")
    return false;
    
    };
    function validationPassword(){
        const regexpass =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regexpass.test(inputs[1].value)){
            inputs[1].classList.add("is-valid")
            inputs[1].classList.remove("is-invalid")
        return true;
        }
        inputs[1].classList.add("is-invalid")
        inputs[1].classList.remove("is-valid")
        return false;
        };
