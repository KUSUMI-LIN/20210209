//產品介紹頁面
//怎麼獲取跳轉連結問號後面的id
//Location 物件儲存在 Window 物件的 Location 屬性中，表示那個視窗中當前顯示的文件的 Web 地址
let id = location.search.split('=')[1]
// console.log(id)

//如果不是從列表頁跳轉過來而是直接開啟, 那麼沒有id, undefined
if (!id) {
    // location.href = '../list.html'       //錯誤 
    //JS檔案內的相對路徑，也是從HTML檔案所在位置開始計算的，跟js檔案在哪無關。
    // CSS檔案內如果寫相對路徑，是基於CSS檔案本身的，跟誰引入了這個CSS無關。
    // HTML程式碼中的相對路徑就是以本HTML檔案所在目錄開始計算，無論引入的檔案是js還是css還是圖片還是其他任何型別。
    location.href = './products.html'
}
//遍歷, 陣列中滿足id相同的, 取出來, 用filter
//filter返回符合條件的元素到新的陣列中
let good = dataMock.filter(function (v) {
    //為集合中的每個元素規定要執行的函式。如果返回 true，則保留元素，否則元素將被移除
    return v.id == id
})[0]
//id是唯一的, 只要陣列中的第一個
//console.log(good)

$('.pro-img > img').attr('src', good.imgSrc)
$('h3').text(good.name)
$('.pro-introduction').text(good.introduction)
$('.origin-price').text(good.price)
$('.sale-price').text((good.price * 0.9))
$('#pro-cartBtn').attr('id', good.id)


