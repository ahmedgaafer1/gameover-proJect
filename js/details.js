// Global
const loading = document.querySelector(".loading");


// ! =============> When Start ===============>

    const searchparams = location.search;
    console.log(searchparams);
    const params = new URLSearchParams(searchparams);
    console.log(params);

    const id = params.get("id");
    const mode = document.getElementById("mode");

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme");

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon");
   } else {
      mode.classList.replace("fa-moon", "fa-sun");
   }

   document.querySelector("html").setAttribute("data-theme", themeData);
};

console.log(id);
    (async function(){
        loading.classList.remove("d-none"); 
        const options = {
            method: "GET",
            headers: {
               "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
               "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
         };
         const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
      
         const responseData = await api.json();
         console.log(responseData);
         displaydata(responseData)
         loading.classList.add("d-none"); 
    })();


    function displaydata(data){
const detailsBox= `
<div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a  href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-white" aria-current="page">${data.title}</li>
         </ol>
      </nav>

      <h1>${data.title}</h1>

      <h3>About ${data.title}</h3>
      <p>${data.description}</p>

      
   </div>
</div>

   `;
   document.getElementById("detailsData").innerHTML = detailsBox;

   const backgroundImage = data.thumbnail.replace("thumbnail", "background");
document.body.style.cssText=`
background-image:url('${backgroundImage}') ;
   background-size:cover;
   background-position:center; `;
    };

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