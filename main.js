let iiifUrlBase = "";
let iiifUrlT = "full/843,/0/default.jpg";

window.onload = function() {
    getImg();
};

 // Get Images (Doing random Images)
function getImg() {
  let randomPage = Math.floor(Math.random() * 400);
  fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&fields=title,thumbnail,image_id`)
    .then((response) => response.json())
    .then((json) => collectImg(json));
};

function collectImg(art) {
  // Setup image base from config
  iiifUrlBase = art.config.iiif_url;
  
  // Get random images from API(Documentation)
  let randomIndex = Math.floor(Math.random() * (art.data.length - 1));
  let img = createImg(art.data[randomIndex]);
  let description = document.createElement("p");

  let img1 = document.querySelector("#art");
  img1.appendChild(img);

  let description1 = document.querySelector("#description");
  description.innerHTML += `${img.alt}`;
  description1.appendChild(description);
};

//Image constructor
function createImg(art) {
  removeImg();
  removeDescription();
  // Making the image element
  let img = document.createElement("img");
  
  // properties
  img.id = art.image_id;
  img.width = art.thumbnail.width;
  img.height = art.thumbnail.height;
  img.alt = `${art.title} | ${art.thumbnail.alt_text}`;
  img.src = `${iiifUrlBase}/${art.image_id}/${iiifUrlT}`;

  return img;
}

function removeImg() {
  let img = document.querySelector("img");
  
  if (img) {
    img.remove();
  }
}

function removeDescription() {
    const description = document.querySelector("p");
    
    if(description) {
        description.remove();
    }
}

document.querySelector("button").addEventListener("click", getImg);