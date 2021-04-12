var dataArr = JSON.parse(localStorage.getItem('shopCart')) || []
let paylist = dataArr.map(function (v) {
    // 寫生成結構的程式碼
    return `
    <tr>
    <td>${v.name}</td>
    <td>${v.number}</td>
    <td><span>$</span>${v.price * v.number}</td>
</tr>
        `
});
$('.paylist').html(paylist.join(''));


$(function () {
    $(".checkout-btn").click(function () {
        //取得付款方式
        function FormData(e) {
            const form = document.forms['form'];    // 取得 name 屬性為 form 的表單
            const paymethod = form.elements.paymethod.value;  // 取得 elements 集合中 name 屬性為 name 的值
            return paymethod
        }
        var formData = FormData();
        localStorage.setItem('formData', formData);
        //沒有選擇付款方式
        if (formData == "請選擇付款方式") {
            $(".form-select").css({ "border-color": "red", "border-width": "1.8px" });
            return false;
        }
    })
    //顯示訂單頁中
    let orderForm = localStorage.getItem('formData');
    $(".paymethod-info").text(orderForm)
    //貨到付款不顯示已付款
    if (orderForm == "貨到付款") {
        $(".payment-status").text("未付款").css("color", "red");
    }
    else {
        $(".payment-status").text("已付款").css("color", "green");
    }
    //買完刪除本地資料
    $(".pay-btn").click(function () {
        localStorage.removeItem("shopCart")
    })
})