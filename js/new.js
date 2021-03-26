var btn = document.querySelector(".shoppingcarBtn");
//綁定 購物車btn
var delBtn = document.querySelector(".item-del");
//綁定 購物車刪除按鈕
var list = document.querySelector(".taskList");
//綁定新增 todos 的清單 .taskList

var getData = localStorage.getItem("shoppinglist");
//宣告 getData 變數作為從 localStorage 取出 value，typeof 會是 string

//先宣告一個 getDataAry = 空值，如果 getData 是 true，會去解析 getDataAry 字串資料成陣列，否則就會空陣列。

var getDataAry = "";
if (getData) {
    getDataAry = JSON.parse(getData); //將字串轉成陣列
} else {
    getDataAry = [];
}
var carList = getDataAry; //陣列資料

//更新清單，組完字串後，會放在 .taskList 的 ul 中
updateList(); //讓後面新增與刪除的功能也吃到 funciton
//更新清單
function updateList() {
    var len = taskList.length; //計算 taskList 的長度
    var str = ""; //組字串
    for (var i = 0; i < len; i++) {
        str += `
        <li>
          <a data-num=${i}>
            <i class='fas fa-times-circle'></i>
          </a>${taskList[i]}
        </li>`;
        //字串加總後會產生 li，並加入 a 連結，新增一個 data-num 作為陣列排序，加上陣列資料
    }
    list.innerHTML = str; //每次更新就存回 localStorage 印在網頁上成字串

    var taskListStr = JSON.stringify(taskList); //解析陣列成字串
    localStorage.setItem("task", taskListStr); //把輸入的資料存到 localStorage 的 key, value
}



//站存
[
    {
        'id': 1,
        'imgSrc': 'images/products/10.jpg',
        'name': '經典巧克力',
        'price': 300,
        'number': 0,
        'isChecked': true //預設勾選
    },
    {
        'id': 2,
        'imgSrc': "images/products/13.jpg",
        'name': "辣椒巧克力",
        'price': 500,
        'number': 0,
        'isChecked': true
    },
    {
        'id': 3,
        'imgSrc': "images/products/11.jpg",
        'name': "百香果巧克力",
        'price': 600,
        'number': 0,
        'isChecked': true
    },
    {
        'id': 4,
        'imgSrc': "images/products/12.jpg",
        'name': "覆盆莓巧克力",
        'price': 600,
        'number': 0,
        'isChecked': true
    }
]


//參考
const itemList = document.querySelector(".plates");
const addItems = document.getElementById("add-items");
const submitBtn = document.getElementById("submitBtn");

let items = JSON.parse(localStorage.getItem("items2")) || []; // 如果localStorge裡面有對應的資料就拿出來 沒的話就指定空陣列給 items

function addItem(e) {
  e.preventDefault(); //  submit 預設會 reload page
  const text = this.querySelector("[name=item]").value; // 這裡的this 就是 form
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemList);
  localStorage.setItem("items2", JSON.stringify(items));
  this.reset(); // 回到輸入表單時的初始值
}

addItems.addEventListener("submit", addItem);

// 為了讓這個函式更具彈性 所以用建立引數 而不是直接向上連到 selector
function populateList(plates = [], plateList) {
  plateList.innerHTML = plates
    .map((eachPlate, i) => {
      return `
      <li id="item${i}" class="list">
        <input type ="checkbox" data-index=${i} id=item${i} 
          ${eachPlate.done ? "checked" : ""}>
        <label for="item${i}">${eachPlate.text}</label>
        <button id="btn${i}">remove</button>
      </li>`;
    })
    .join(""); // 直接把整段 join 成一個大字串 (但是每次執行都是"從頭開始建構一組list")
}

function removeList(e) {
  if (!e.target.matches("button")) return; // 如果 e.target 非 button 就 return 掉
  let targetClass = e.target.id.replace("btn", "item"); // 代換出 li 的 id 值

  // console.log(typeof(items)); // items=object
  // console.log(this.querySelector(`"#${targetClass} label"`).innerHTML);

  // console.log(this); // this=ul(class=plate)

  // 抓到當下點擊詞->在物件中找出匹配詞的index值->在array裡將該物件砍掉->回存localStorage
  console.log(this.querySelector("#" + targetClass + " " + "label").innerHTML);
  let targetText = this.querySelector("#" + targetClass + " " + "label")
    .innerHTML; // 找到點擊項目的詞
  let findObjIndex = items.findIndex(o => o.text === targetText); // 在物件中找出匹配詞的index值
  items.splice(findObjIndex, 1); // 切掉
  localStorage.setItem("items2", JSON.stringify(items)); // 回存localStorage

  document.getElementById(targetClass).remove(); // 針對抓到 id 的 dom 做刪除(要最後刪除 不然先刪掉後面的匹配詞會找不到)
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; // 如果e.target !=input 就return 掉
  console.log(e.target.dataset.index); // 這裡取出的是 "data-index" 的值
  let itemIndex = e.target.dataset.index;
  items[itemIndex].done = !items[itemIndex].done; // 點擊後狀態 toggle 改變(原本 true 點擊變 false..)
  localStorage.setItem("items2", JSON.stringify(items)); // 把該項的狀態存到 localStorage 裡
}

populateList(items, itemList); // 頁面初始時先從 localStorage 取資料

itemList.addEventListener("click", toggleDone);
itemList.addEventListener("click", removeList);
