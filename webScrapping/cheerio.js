//cheerio parses HTML and it traverses the html so that data can be manipulated according to user's needs
const cheerio=require("cheerio");
let html=`<ul id="fruits">
<li class="apple">Apple</li>
<li class="orange">Orange</li>
<li class="pear">Pear</li>
</ul>`;
//cheerio stores data in form of objects
let selectTool=cheerio.load(html);

let fruitName=selectTool('#fruits')
console.log(fruitName.text());

let fruitsName=selectTool('.pear')
console.log(fruitsName.text());
