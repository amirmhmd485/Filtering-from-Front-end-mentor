let container = document.querySelector(".container");
let input = document.querySelector("input");
let searchBtn = document.querySelector(".search");
// start fetchingData
function stylingdata(arr) {
    container.innerHTML = "";
    let identity = 0;
    arr.forEach((box) => {
        container.innerHTML += `
            <div class="box" id = "${identity}">
                <div class="left">
                    <img src="${box.logo}" alt="">
                    <div class="info">
                        <div class="head">
                            <h3>${box.company}</h3>
                            ${box.new ? `<span class = "first">new</span>`:""}
                            ${box.featured ? `<span class = "last">feature</span>`:""}
                        </div>
                        <h2>${box.position}</h2>
                        <div class="foot">
                            <p>${box.postedAt}</p>
                            <p>${box.contract}</p>
                            <p>${box.location}</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span>${box.role}</span>
                    ${box.languages.map((lang) => `<span>${lang}</span>`).join("")}
                    <span>${box.level}</span>
                </div>
            </div>
        `
        identity++;
    })
}
async function fetchingdata() {
    let response = await fetch("data.json");
    let data = await response.json();
    return data;
}
fetchingdata().then((data) => {
    stylingdata(data);
    return data;
}).then((data) => {
    searchBtn.addEventListener("click" , function (e){
        filtering(data);
    });
})
// End fetchingData
// start filterration
function filtering(arr){
    if(input.value != ""){
        arr = arr.filter((element) => {
            if(element.languages.includes(input.value) || element.role == input.value || element.level == input.value || element.position.includes(input.value)){
                return element;
            }
        });
        stylingdata(arr);
    }
    else{
        stylingdata(arr);
    }
}
// End filterration