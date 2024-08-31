// ========> Global Variables ========>
let datagames=[];
const loading = document.querySelector(".loading");
const mode = document.getElementById("mode");


// ! =============> When Start ===============>
    getgames("mmorpg");

if (localStorage.getItem("theme") != null) {
    const themeData = localStorage.getItem("theme"); // light Or dark
 
    if (themeData === "light") {
       mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
    } else {
       mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
    }
 
    document.querySelector("html").setAttribute("data-theme", themeData); // light Or dark
 };



// ========> Events ========>
    
    document.querySelectorAll(".menu a").forEach(link=>{
link.addEventListener("click", ()=>{
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
const category = link.dataset.category;
console.log(category);
getgames(category);

})
    })
 
document.getElementById("logout").addEventListener('click',()=>{
   localStorage.removeItem("uToken");
    location.href="./index.html";
})

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



// ? =================> functions ========>

    async function getgames(category){
        loading.classList.remove("d-none"); //show loading
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6dfe1755b3msh14e06801c049b93p1bf72bjsne7507c9ea42a',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
  const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,options);
  const data= await api.json();
console.log(data);
displaydata(data);
loading.classList.add("d-none"); // hide loading

    };


    function displaydata(gamesdata){
let gamesbox=``;
for (const element of gamesdata) {
    let videopath=element.thumbnail.replace("thumbnail.jpg","videoplayback.webm");
    gamesbox +=`
        <div class="col">
      <div onmouseenter="startvideo(event)" onmouseleave="stopvideo(event)" onclick="showdetails(${element.id})" class="card h-100 bg-transparent" role="button" >
      <div class="card-body">

         <figure class="position-relative">
            <img class="card-img-top object-fit-cover h-100" src="${element.thumbnail}" />

          <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
           <source src="${videopath}">
           </video>

         </figure>

         <figcaption>

            <div class="hstack justify-content-between">
               <h3 class="h6 small"> ${element.title} </h3>
               <span class="badge text-bg-primary p-2">Free</span>
            </div>

            <p class="card-text small text-center opacity-50">
               ${element.short_description}
            </p>

         </figcaption>
      </div>

      <footer class="card-footer small hstack justify-content-between">

         <span class="badge badge-color text-bg-primary">${element.genre}</span>
         <span class="badge badge-color text-bg-primary">${element.platform}</span>

      </footer>
   </div>
</div>`
    
}
document.getElementById("gameData").innerHTML=gamesbox;


    };

    function startvideo(event){
const vid= event.target.querySelector("video");
vid.classList.remove("d-none");
vid.muted=true;
vid.play();
    } ;
    function stopvideo(event){
        const vid= event.target.querySelector("video");
        vid.classList.add("d-none");
        vid.muted=true;
        vid.pause();
            } ;

    function showdetails(id){
location.href=`./details.html?id=${id}`;
    }
 



 