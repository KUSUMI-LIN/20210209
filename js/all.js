$('document').ready(function () {
    //側邊菜單
    $('#side-nav-control').click(function () {
        $('.label').toggle()
    });
    $('.side-menu-openBtn').click(function () {
        $('.side-bg-block').toggle(0.01)

    });
    //導覽列搜尋動畫
    $('.bi-search').hover(function () {
        $('#nav-search').show(300)
    });
    //購物車觸發警報
    $('.shoppingcarBtn').click(function () {
        $('.shoppingcar-alert').show(0.3).delay(1000).fadeOut(500)
    });

});

