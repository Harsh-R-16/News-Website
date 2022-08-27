import { nameOfCountry, countries } from "./data.js";
import { types } from "./data.js";

let divCon = document.querySelector("#country");
let section = document.querySelector("section");

for (let i = 0; i < nameOfCountry.length; i++) {
  let p = document.createElement("p");
  p.classList.add("aside");
  p.innerHTML = `<a href="#">${nameOfCountry[i]}</a>`;
  divCon.appendChild(p);
}

for (let i = 0; i < types.length; i++) {
  let btn = document.createElement("button");
  btn.innerText = types[i];
  section.append(btn);
}
getData("in", "health");
// country=ve&category=health
async function getData(con, type) {
  let a = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${con}&category=${type}&apiKey=199730ef83854286a05ef0005c689379`
  );
  // 1933591142374b34984a1ed1b46d3904

  let b = await a.json();
  let main = document.getElementById("main");
  main.innerHTML = "";
  let news = b.articles;
  let random = Math.floor(Math.random() * 6);
  if (news.length == 0) {
    console.log(types[random], random);
    return getData("in", types[random]);
  }
  console.log(news.length);
  for (let i = 0; i < news.length; i++) {
    let div = document.createElement("div");
    let date = news[i].publishedAt;
    if (!news[i].urlToImage)
      news[i].urlToImage =
        "https://th.bing.com/th/id/OIP.XEbARmZr0lwaCvkxsfi-PwHaGE?w=227&h=185&c=7&o=5&dpr=1.25&pid=1.7";
    if (news[i].author == null) news[i].author = "Anonymous Person";
    if (!news[i].content)
      news[i].content =
        "Read full news from the given news url. Sorry the Content is not provided here because of the copyright issues. Click the below link to see read full article.";
    if ((i - 2) % 3 == 0) {
      div.innerHTML = `
    <img src=${news[i].urlToImage} class="img">
    <div class="div">  <p  class="src2Para"><strong>Source: </strong>${
      news[i].source.name
    }</p>
    <p class="title">${news[i].title}</p>
    <p><strong>News Headline: </strong>${news[i].content.slice(
      0,
      120
    )}. Read full news from the given news url. Sorry the Content is not provided here because of the copyright issues. Click the below link to see read full article.</p>
 
    <p><p><strong>Author: </strong>${news[i].author}</p>
    <p><strong>Publish Date: </strong>${date.slice(
      0,
      10
    )} & <strong>Publish Time: </strong>${date.slice(11, date.length - 1)}</p>
   <p><strong>Full Article Link: </strong><a href="${
     news[i].url
   }">Click here</a></p>
      </div>

      `;
    } else {
      div.innerHTML = `
    <img src=${news[i].urlToImage} class="img-2">
    <p class="srcPara"><strong>Source: </strong>${news[i].source.name}</p>
    <p class="title">${news[i].title}</p>
    <p><strong>News Headline: </strong>${news[i].content.slice(0)}</p>
   
    <p><p><strong>Author: </strong>${news[i].author}</p>
    <p><strong>Publish Date: </strong>${date.slice(
      0,
      10
    )} & <strong>Publish Time: </strong>${date.slice(11, date.length - 1)}</p>
 <p class="url"><strong>Full Article Link: </strong><a href="${
   news[i].url
 }">Click here.....</a></p>
      `;
    }
    main.appendChild(div);
  }
}
let c = "in";
let t = "business";
let btns = document.querySelectorAll("button");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    t = types[i];
    getData(c, types[i]);
    console.log(c, t);
  });
}

let aside = document.querySelectorAll(".aside");
for (let i = 0; i < nameOfCountry.length; i++) {
  aside[i].addEventListener("click", () => {
    c = countries[i];
    getData(countries[i], t);
    console.log(c, t);
  });
}
