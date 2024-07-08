const endpoint = "https://meme-api.com/gimme/wholesomememes";

const memeParent = document.querySelector(".meme-parent");
const generateBtn = document.querySelector(".generate-btn");
const memeImg = document.querySelector(".meme-img");
const errorParent = document.querySelector(".error-parent");
const likesParent = document.querySelector(".likes-parent");

generateBtn.onclick = function() {
    generateMeme()
    .then((response) => {
        memeParent.classList.remove("hide");
        memeImg.src = response.url;
        likesParent.textContent = `${response.ups} people liked this shit`;
    })
    .catch((response) => {
        errorParent.classList.remove("hide");
        memeParent.classList.add("hide");
        errorParent.textContent = response;
    });
};

function generateMeme() {
    return new Promise(function(resolve,reject) {
        const memeRequest = new XMLHttpRequest();
        memeRequest.open("GET",endpoint);
        memeRequest.send();

        memeRequest.onload = function() {
            if (this.status === 200) {
                resolve(JSON.parse(memeRequest.response));
            } else {
                reject("An Error Occured");
            };
        };
    });
};
