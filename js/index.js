let zu_list = document.querySelector('.zu_list');
let miaoSha = document.querySelector('#miaoSha');
let news = document.querySelector('#news');
let product = document.querySelector(".m-product-list")
    // console.log(zu_list);

pAjax({
    url: '../api/getIndexData.php',
    data: {
        classFy: 'chou',
        len: 4

    }
}).then(res1 => {
    res1 = JSON.parse(res1);
    renderHTML1(res1['list']);
})

function renderHTML1(data) {
    console.log(data);
    let str = " ";
    data.forEach(item => {
        str += `<li class="home-good-item two">
    <div class="item-inner">
        <div class="pro-text">
            <h5 class="zu_name">${item.cat_id}</h5>
            <p class="zu_intuoduce">${item.goods_name}</p>
            <p class="zu_price">
                <span class="qian">￥</span>
                <span class="price">${item.goods_price}</span>
                
            </p>
        </div>

        <img src="${item.goods_big_logo}" alt="">
    </div>
    <div class="m-progress-wrap-con clearFix">
        <div class="m-bar-con">
            <div class="m-bar" style="width: ${parseInt(item.cart_number/20)}%;">
            </div>
        </div>
        <div class="m-progress-info clearFix">
            <div class="m-suppory">
                <span class="sup-num">${item.cart_number}</span> 人支持
                <span class="common-tag-txt">热</span>
            </div>

        </div>
        <div class="m-present">
            <div>
                <span class="m-num">${parseInt(item.cart_number/20)}</span>
                <span class="m-num-flag">%</span>
            </div>
        </div>
    </div>
</li>`;
    });
    zu_list.innerHTML = str;
}

pAjax({
    url: '../api/getIndexData.php',
    data: {
        classFy: 'miao',
        len: 9

    }
}).then(res2 => {
    res2 = JSON.parse(res2);
    renderHTML2(res2['list']);
})

function renderHTML2(data) {
    console.log(data);
    let str = " ";
    data.forEach(item => {
        str += `<div class="swiper-slide" style="width: 266.25px; margin-right: 5px;">
        <div class="m-goods-item-container pro-item-trap margin-left-0" data-src="" data-target="_blank">
            <div class="bigtrap-img-tag-container">
                <div class="small-item-img">
                    <div class="m-product-image-container undefined" style="width: 266px; height: 266px;" data-src="${item.goods_big_logo}">
                        <div class="img-container" style="width: 266px; height: 266px;"><img src="${item.goods_big_logo}" data-src="${item.goods_big_logo}" alt="${item.cat_id}" style="width: 266px; height: 266px;"></div>
                    </div>
                </div>
            </div>
            <div class="bigtrap-box">
                <p class="pro-info" title="${item.cat_id}">${item.cat_id}</p>
                <p class="pro-price"><span class="pro-unit">¥</span><span class="m-num">${item.goods_price}</span><span class="pro-flag">起</span><span class="market-price"><span class="pro-unit">¥</span><span class="m-num">${item.goods_old_price}</span></span>
                </p>
            </div>
        </div>
    </div>`;
    });
    miaoSha.innerHTML = str;

}

pAjax({
    url: '../api/getIndexData.php',
    data: {
        classFy: 'new',
        len: 9

    }
}).then(res3 => {
    res3 = JSON.parse(res3);
    // renderHTML3(res3['list']);
})

function renderHTML3(data) {
    console.log(data);
    let str = " ";
    data.forEach(item => {
        str += `<div class="swiper-slide" style="width: 266.25px; margin-right: 5px;">
        <div class="m-goods-item-container pro-item-trap margin-left-0" data-src="./detail.html?id=${item.goods_id}" data-target="_blank">
            <div class="bigtrap-img-tag-container">
                <div class="small-item-img">
                    <div class="m-product-image-container undefined" style="width: 266px; height: 266px;" data-src="data-src="./detail.html?id=${item.goods_id}"">
                        <div class="img-container" style="width: 266px; height: 266px;"><img src="${item.goods_big_logo}" data-src="${item.goods_big_logo}" alt="${item.cat_id}" style="width: 266px; height: 266px;"></div>
                    </div>
                </div>
            </div>
            <div class="bigtrap-box" data-src="./detail.html?id=${item.goods_id}">
                <p class="pro-info" title="${item.cat_id}">${item.cat_id}</p>
                <p class="pro-desc" title="${item.goods_name}">${item.goods_name}</p>
                <p class="pro-price">
                    <span class="pro-unit">¥</span>
                    <span class="m-num">${item.goods_price}</span>
                    <span class="pro-flag">起</span>
                </p>
            </div>
        </div>
    </div>`;
    });
    news.innerHTML = str;

}



pAjax({
    url: '../api/getIndexData.php',
    data: {
        classFy: 'recommend',
        len: 81

    }
}).then(res4 => {
    res4 = JSON.parse(res4);
    renderHTML4(res4['list']);
})

function renderHTML4(data) {
    // console.log(data);
    let str = " ";
    data.forEach(item => {
        str += `<div class="m-goods-item-container first pro-item-category" data-src="" data-target="_blank">
        <div class="category-img-container" data-src="./detail.html">
            <div class="product-img" >
                <div class="m-product-image-container undefined" data-src="../../youpin/html/detail.html" data-target="_blank" style="width: 264px; height: 198px;">
                    <div class="img-container" style="padding-left: 35px; padding-right: 35px; padding-bottom: 3px; width: 194px; height: 195px;">
                    <a href='./detail.html?id=${item.goods_id}'><img src="${item.goods_big_logo}"alt="${item.cat_id}" style="height: 195px; width: 195px; margin-left: -0.5px;"></a>
                    </div>
                </div>
            </div>
            <p class="pro-desc">${item.goods_name}</p>
        </div>
        <div class="category-box" data-src="../../youpin/html/detail.html" data-target="_blank">
            <div class="m-goods-common-tag-con"><span class="common-tag common-tag-text" style="background-color: rgb(217, 107, 108);">${item.is_promote}</span></div>
            <p class="pro-info" title="${item.cat_id}"><span>${item.cat_id}</span></p>
            <p class="pro-price"><span class="pro-unit">¥</span><span class="m-num">${item.goods_price}</span><span class="pro-flag">起</span></p>
        </div>
    </div>`;
    });
    product.innerHTML = str;

}


console.log(product);
product.ondblclick = function() {
    // console.log(123);
    let e = window.event;
    let target = e.target.parentNode.parentNode;
    let loc = target.getAttribute('data-src')
    console.log(loc);
    if (loc) {
        // location.href = loc
    }
}