const accessKey = "XvFf_eE76CAKvEJWab7Nv7DGr8i6WgZWDMgmc5u4Hxw";

const formElement = document.querySelector("form");
const inputElememt = document.getElementById("search-input");
const searchResults = document.querySelector(".search-images");
const showMore = document.getElementById("show-more-btn");

let inputData= ""
let page = 1;

 async function searchImages(){
    inputData = inputElememt.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client-id=${accessKey}`;
    // const url = `https://source.unsplash.com/random/900x700/?fruit`;
 
     const response = await fetch(url);
     const data = await response.json();

     const results = data.results;

     if(page===1){
        searchResults.innerHTML = "";
     }
     results?.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.className.add("search-images");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
     });

     page++;
     if(page > 1){
        showMore.style.display = "block";
     }
}

formElement.addEventListener("submit", (event)=>{
    event.preventDefault()
    page=1;
    searchImages();
})
showMore.addEventListener("click", ()=>{
    searchImages();
})
