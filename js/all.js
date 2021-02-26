$('document').ready(function () {
    //側邊菜單
    $('#side-nav-control').click(function () {
        $('.Label').toggle()
    });
    $('.side-menu-openBtn').click(function () {
        $('.side-bg-block').toggle(0.01)
        
    });
    //導覽列搜尋動畫
    $('.bi-search').mouseover(function () {
        $('#nav-search').show(300);
    });
    $('main').click(function () {
        $('#nav-search').hide(300);
    });
});

/*隱藏
$('this').mouseup(function (e) {
    var container = $(".side-menu"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});*/