let list = dataMock.map(function (v, i) {
    // 寫生成結構的程式碼
    return `
    <div class="col col_hot">
    <div class="card shoppingCard">
        <img src="${v.imgSrc}" class="card-img-top" alt="...">
         <div class="card-body">
            <h3>
            ${v.name}
            </h3>
            <div class="price">
                <div class="origin-price">
                <span>$</span>${v.price}
                </div>
                <div class="sale-price">
                <span>$</span>${v.price * 0.9}
                </div>
            </div>
            <div>
                <a href="detail.html?id=${v.id}"
                    style="border-bottom:1px dashed gray; font-size: 1rem;">➔產品介紹</a>
            </div>
            <div class="card-body-footer shoppingcarBtn" id=${v.id}>
                <a href="##">
                    <img><i class="nav-icon bi bi-cart"></i>
                    加入購物車
                </a>
            </div>
        </div>
    </div>
    </div>
        `
});
$('.container-fluid>.row').html(list.join(''));


//宣告 getData 變數作為從 localStorage 取出 value，typeof 會是 string
var shopCart = localStorage.getItem("shopCart");
//先宣告一個 getDataAry = 空值，如果 getData 是 true，會去解析 getDataAry 字串資料成陣列，否則就會空陣列。
var shopCartAry = "";
if (shopCart) {
    shopCartAry = JSON.parse(shopCart); //將字串轉成陣列
} else {
    shopCartAry = [];
}
var dataArr = shopCartAry; //陣列資料
localStorage.setItem('shopCart', shopCart);//將變數存到localStorage裡


$(function () {
    //點選按鈕, 新增購物車資料到本地儲存
    $('.shoppingcarBtn').click(function () {
        //1.獲取本地儲存
        let dataArr = JSON.parse(localStorage.getItem('shopCart')) || []
        //邏輯短路, 當本地儲存沒有pyg_cart, dataArr為undefined, 把一個空陣列給它

        //遍歷dataArr, 如果id相同, 那麼取出來, 增加數量. 如果id找不到即undefined, 往裡面加新資料 
        let id = (this.id)
        let existGood = dataArr.filter(function (v) {
            return v.id == id
        })[0]
        console.log(existGood);
        //陣列和物件是引用傳遞, existGood的記憶體地址和dataArr中對應元素的記憶體地址是一樣的
        //在第一個加入購物車商品頁面驗證下: 
        console.log(existGood === dataArr[0]) //true


        let good = dataMock.filter(function (v) {
            //為集合中的每個元素規定要執行的函式。如果返回 true，則保留元素，否則元素將被移除
            return v.id == id
        })[0]

        let i = 1;
        if (existGood) {
            existGood.number += i++
        } else {
            // 3.2.1獲取當前頁面購物資訊
            let newGood = {
                id: good.id,
                number: i++, //$('.choose-number').val()是string
                price: (good.price * 0.9),
                name: good.name,
                imgSrc: good.imgSrc,
                isChecked: true
            }
            // 3.2.2 往數組裡新增資料
            dataArr.push(newGood)
        }
        //把陣列新增到本地儲存
        localStorage.setItem('shopCart', JSON.stringify(dataArr))
        //計算總數量
        let totalCount = 0
        dataArr.forEach(item => {
            totalCount += item.number
        });
        $('.total-count').text(totalCount)
    })

})






