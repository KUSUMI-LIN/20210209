// 判斷購物車是否為空
var cartListData = localStorage.getItem('shopCar');
var arr = JSON.stringify(cartListData);

// 如果我們處理過了資料，就是當陣列的長度為0的時候，沒有資料
if (arr.arr !== 0) {
    // 有資料
    // 把空空如也隱藏
    $('.noshoppingCar').addClass('hidden');
} else {
    // 沒有資料
    // 把表頭和表格資料隱藏
    $('.shoppingcar-list,.container').addClass('hidden');
}
$(function () {
    //1.獲取本地儲存
    let dataArr = JSON.parse(localStorage.getItem('shopCar')) || []
    let list = dataArr.map(function (v) {
        return ` 
        <div class="item-pro">
            <div class="item-img">
                <img src="${v.imgSrc}" alt="">
                <div class="item-name">
                ${v.name}
                </div>
            </div>
            <div class="item-price">
                <span>$</span>
                ${v.price}
            </div>
            <div class="count">
                <a href="javascript:void(0);" class="reduce fl">-</a>   
                ${v.number}
                <a href="javascript:void(0);" class="add fl">+</a>
            </div>
            <div class="amount">
                <span>$</span>
                ${v.price * v.number}
            </div>
            <div class="operate">
                <a href="javascript:void(0);" class="item-del">X</a>
            </div>
        </div>
        `
    })
    $('.item-body').html(list)

    let totalPrice = 0
    dataArr.forEach(item => {
        totalPrice += item.number * item.price
    });

    $('.total-money').text(totalPrice)
})

//刪除資料
