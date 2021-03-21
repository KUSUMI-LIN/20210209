let lis = dataMock.map(function (v, i) {
    // 寫生成結構的程式碼
    return `
    <div class="card shoppingCard">
    <img src="${v.imgSrc}" class="card-img-top" alt="...">
    <div class="card-body">
        <h3 class="itemName">
        ${v.name}
        </h3>
        <div class="price">
            <div class="origin-price">
            ${v.price}
            </div>
            <div class="sale-price">
            ${v.price * 0.9}
            </div>
        </div>
        <div>
            <a href="detail.html?id=${v.id}"
                style="border-bottom:1px dashed gray; font-size: 1rem;">➔產品介紹</a>
        </div>
        <div class="card-body-footer shoppingcarBtn" id="${v.id}">
            <a href="#">
                <img><i class="nav-icon bi bi-cart"></i>
                加入購物車
            </a>
        </div>
    </div>
</div>
</div>
        `
});
$('.col').html(lis.join(''));


var shopCart = [
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
var shopCart = JSON.stringify(shopCart); //物件轉換成JSON
console.log(shopCart);
localStorage.setItem('shopCar', shopCart);//將變數存到localStorage裡


$(function () {
    //點選按鈕, 新增購物車資料到本地儲存
    $('.shoppingcarBtn').click(function () {
        //1.獲取本地儲存
        let dataArr = JSON.parse(localStorage.getItem('shopCar')) || []
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
                price: good.price,
                name: good.name,
                imgSrc: good.imgSrc,
                isChecked: true
            }
            // 3.2.2 往數組裡新增資料
            dataArr.push(newGood)
        }
        //把陣列新增到本地儲存
        localStorage.setItem('shopCar', JSON.stringify(dataArr))

    })
})






