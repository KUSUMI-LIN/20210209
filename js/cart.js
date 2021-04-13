
// 如果我們處理過了資料，就是當陣列為空陣列的時候，陣列長度為4，沒有資料
var cartList = function () {
    // 判斷購物車是否為空
    var cartListData = localStorage.getItem('shopCart');
    var arr = JSON.stringify(cartListData);
    if (arr.length == 4 || arr.length == 6) {
        // 沒有資料
        $('.shoppingcar-list,.item-header,.total,.checkout-btn').hide();
        $('.noshoppingCar').show();
    } else {
        // 有資料
        $('.noshoppingCar').hide();
        $('.shoppingcar-list,.item-header,.total,.checkout-btn').show();
    }
}
cartList();

$(function () {
    //1.獲取本地儲存
    var dataArr = JSON.parse(localStorage.getItem('shopCart')) || []
    let list = dataArr.map(function (v) {
        return ` 
        <div class="item-pro" id="${v.id}">
            <div class="cell col-1" style="display:none;">
                <input type="checkbox" class="item-ck" checked="">
            </div>  
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
                <a href="javascript:void(0);" class="reduce" id="${v.name}">-</a>   
                <span class="countNum" type="text" id="${v.name}" >${v.number}</span>
                <a href="javascript:void(0);" class="add" id="${v.name}">+</a>
            </div>
            <div class="amount">
               <span>$</span>
               <span class="amountCount" id="${v.name}">${v.price * v.number}</span>
            </div>
            <div class="operate">
               <div class="del">
                <a href="javascript:void(0);" class="item-del" id=${v.name}>X</a>
               </div>
            </div>
        </div>
        `
    })
    $('.item-body').html(list)

    //計算總價
    let totalPrice = 0
    let totalCount = 0
    dataArr.forEach(item => {
        totalPrice += item.number * item.price
        totalCount += item.number
    });
    $('.total-money').text(totalPrice)
    $('.total-count').text(totalCount)


    //---------------------------------------刪除資料
    $('.item-pro').on('click', '.item-del', function () {
        $(this).closest('.item-pro').remove() //closest選取父元素

        //BtnID的值遍歷dataArr，找出索引值刪除
        var dataArr = JSON.parse(localStorage.getItem('shopCart'))
        var BtnID = this.id
        var IDvalue = dataArr.findIndex(e => e.name === BtnID);
        dataArr.splice(IDvalue, 1);
        //重新存回本地
        localStorage.setItem('shopCart', JSON.stringify(dataArr))
        //重新計算
        let totalPrice = 0
        let totalCount = 0
        dataArr.forEach(item => {
            totalPrice += item.number * item.price
            totalCount += item.number
        });
        $('.total-money').text(totalPrice)
        $('.total-count').text(totalCount)
        cartList();
    });

    //------------------------購物車數量增減
    $('.add').on('click', function () {
        //改變文本的值
        var val = $(this).prev().text()
        var num = parseInt(val);
        $(this).prev().text(num + 1)

        //改變本地儲存值
        var dataArr = JSON.parse(localStorage.getItem('shopCart'))
        var addId = this.id
        var Id = dataArr.findIndex(e => e.name === addId);
        dataArr[Id].number += 1
        //重新存回本地
        localStorage.setItem('shopCart', JSON.stringify(dataArr, dataArr[Id].number))
        //重新計算總價
        let totalPrice = 0
        let totalCount = 0
        dataArr.forEach(item => {
            totalPrice += item.number * item.price
            totalCount += item.number
        });
        $('.total-money').text(totalPrice)
        $('.total-count').text(totalCount)

        //重新計算小計
        let newList = dataArr.map(function (v) {
            return `${v.price * v.number}`
        })
        let amountCount = document.getElementsByClassName('amountCount')[Id]
        $(amountCount).html(newList[Id])


    })

    $('.reduce').on('click', function () {
        //改變文本的值
        var val = $(this).next().text()
        if (val > 1) {
            var num = parseInt(val);
            $(this).next().text(num - 1)
        }
        else {
            false;
        }
        //改變本地儲存值
        var dataArr = JSON.parse(localStorage.getItem('shopCart'))
        if (val > 1) {
            var reduceId = this.id
            var Id = dataArr.findIndex(e => e.name === reduceId);
            dataArr[Id].number -= 1
            //重新存回本地
            localStorage.setItem('shopCart', JSON.stringify(dataArr, dataArr[Id].number))
            //重新計算
            let totalPrice = 0
            let totalCount = 0
            dataArr.forEach(item => {
                totalPrice += item.number * item.price
                totalCount += item.number
            });
            $('.total-money').text(totalPrice)
            $('.total-count').text(totalCount)
            //重新計算小計
            let newList = dataArr.map(function (v) {
                return `${v.price * v.number}`
            })
            let amountCount = document.getElementsByClassName('amountCount')[Id]
            $(amountCount).html(newList[Id])
        }
        else {
            false;
        }
    })
})

