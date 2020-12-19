let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = './index.js'
}
search = location.search;
let id = decodeURIComponent(location.search.substr(4))
console.log(id);

let detail = document.querySelector('.detail');

pAjax({
    url: '../api/getDetail.php',
    data: {
        id: id
    }
}).then(res => {
    res = JSON.parse(res)
    console.log(res.detail);
    localStorage.setItem('details', JSON.stringify(res.detail));
    let data = JSON.parse(localStorage.getItem('details'));
    data.cart_number = 1;
    // console.log(data);
    renderHtml(data)

    let text = detail.querySelector('.count-input')
        // number = text.value
    new Enlarge(".box");
})

function renderHtml(data) {
    let str = " ";

    str += `
    <div class="contain box clearFix">
    <div class="main show fl">
        <img src="${data.goods_big_logo}">
        <div class="mask"></div>
    </div>
    <div class="thumb  fr" style="display: block;">
        <div class="thumb-container list" style="top: 0px;">
            <div class="thumb-pic active " >
                <img midelImg='${data.goods_small_logo}' bigImg='${data.goods_big_logo}' src="${data.goods_small_logo}">
            </div>
            <div class="thumb-pic">
            <img midelImg='${data.goods_small_logo}' bigImg='${data.goods_big_logo}' src="${data.goods_small_logo}">
            </div>
            <div class="thumb-pic"">
            <img midelImg='${data.goods_small_logo}' bigImg='${data.goods_big_logo}' src="${data.goods_small_logo}">
            </div>
            <div class="thumb-pic">
                <img midelImg='${data.goods_small_logo}' bigImg='${data.goods_big_logo}' src="${data.goods_small_logo}">
            </div>
        </div>
        
    </div>
    <div class="enlarge" style ='background-image: url(${data.goods_big_logo});'>
    </div>
</div>
<div class="sku-container">
    <div class="name clearFix">
        <div class="good-name fl">${data.cat_id}</div>
    </div>
    <div class="summary">${data.goods_name}</div>
    <div class="promotion-box"></div>
    <div class="card">
        <div class="price-line">
            <h5 class="sku-title">售价</h5>
            <div class="price">
            <span class="money-symbol">¥</span>
            <span class="value">${data.goods_price}</span>
            <span class="money-symbol">起</span>
            <span class="market-price">¥${data.goods_price*1 + data.goods_old_price*1}</span>
            </div>
        </div>
        <div class="service-line">
            <h5 class="sku-title">服务</h5>
            <div class="introduce-container">
                <p class="icon">!</p>
            </div>
            <div class="service">
                <div class="service-item">
                    <a class="m-icons m-icons-service " data-src="" href="javascript:;"></a><span class="service-item-text">满99包邮</span></div>
                <div class="service-item">
                    <a class="m-icons m-icons-service " data-src="" href="javascript:;"></a><span class="service-item-text">三方店铺</span></div>
                <div class="service-item">
                    <a class="m-icons m-icons-service " data-src="" href="javascript:;"></a><span class="service-item-text">支持7天无理由退货 (拆封后不支持)</span></div>
                <div class="service-item">
                    <a class="m-icons m-icons-service " data-src="" href="javascript:;"></a><span class="service-item-text">售后免邮</span></div>
                <div class="service-item">
                    <a class="m-icons m-icons-service " data-src="" href="javascript:;"></a><span class="service-item-text">由上海能良电子科技有限公司发货并提供售后</span><span class="service-item-qualification">(查看商家资质)</span></div>
            </div>
        </div>
    </div>
    <div class="address-line">
        <h5 class="sku-title">配送区域</h5>
        <div class="address">
            <div><span>北京 北京市 海淀区</span><span>&nbsp;</span><a>修改</a></div>
        </div>
    </div>
    <div>
        <div style="overflow: hidden; padding: 0px 0px 12px;">
            <div class="size-line clearFix">
                <h5 class="sku-title"> 颜色 </h5>
                <div class="size-container">
                    <div class="tag-item-offSaled">黑色</div>
                    <div class="tag-item-offSaled">粉砂色</div>
                    <div class="tag-item-offSaled">白色</div>
                    <div class="tag-item-offSaled">深海军蓝色</div>
                    <div class="tag-item-offSaled">梅子色</div>
                    <div class="tag-item-offSaled">黄色</div>
                </div>
            </div>
            <div class="size-line clearFix">
                <h5 class="sku-title"> 规格 </h5>
                <div class="size-container">
                    <div class="tag-item-offSaled">XL</div>
                    <div class="tag-item-offSaled">L</div>
                    <div class="tag-item-offSaled">M</div>
                    <div class="tag-item-offSaled">S</div>
                    <div class="tag-item-offSaled">XS</div>

                </div>
            </div>
        </div>
        <div class="count-line">
            <h5 class="sku-title count-title">数量</h5>
            <div class="count-container">
                <div class="clearFix "goods_id= '${data.goods_id}'>
                    <div class="minus-btn">
                        <a class="m-icons m-icons-reduce " data-src="" href="javascript:;"></a>
                    </div>
                        <input type="text" value="${data.cart_number}" class="count-input">
                    <div class="minus-btn-active">
                        <a class="m-icons m-icons-add-active " data-src="" href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-line">
        <div class="buy-btn-container" goods_id = "${data.goods_id}">
            <a class="add m-btns m-btn-middle m-btn-brown"">加入购物车</a>
            <a class="buy m-btns m-btn-middle m-btn-brown-stroke"">立即购买</a>
        </div>
        <div class="favor-btn ">
            <div>
                <a class="m-icons m-icons-collection " data-src="" href="javascript:;"></a>
                <p>收藏</p>
            </div>
        </div>
        <div class="faver-service-btn favor-btn ">
            <div>
                <a class="m-icons m-icons-service-detail " data-src="" href="javascript:;"></a>
                <p>客服</p>
            </div>
        </div>
    </div>
</div>`


    detail.innerHTML = str;
}
document.onclick = function() {
    let e = window.event;
    let target = e.target;
    let login = getCookie('login');


    if (e.target.classList.contains('m-icons-reduce')) {
        // 进行数量减法
        let data = JSON.parse(localStorage.getItem('details'));
        console.log(e.target.parentNode.parentNode);
        let num = data.cart_number;
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        data.cart_number = num;
        localStorage.setItem('details', JSON.stringify(data));
        console.log(data);
        renderHtml(data)
    }
    if (e.target.classList.contains('m-icons-add-active')) {
        // 进行数量jia法
        let data = JSON.parse(localStorage.getItem('details'));
        let id = e.target.parentNode.parentNode.getAttribute('goods_id');
        let num = data.cart_number;
        num++;
        data.cart_number = num;
        localStorage.setItem('details', JSON.stringify(data));
        console.log(data);
        renderHtml(data)
    }

    // 因为添加到购物车按钮 需要把用户名和商品id
    // 所以需要判断是否有登录
    if (target.classList.contains('add')) {

        let data = JSON.parse(localStorage.getItem('details'));
        let id = e.target.parentNode.getAttribute('goods_id');
        console.log(id);
        if (!login) {
            localStorage.setItem('url', './detail.html?id=' + id)
            let e = window.event;
            e.preventDefault();
            location.href = "./login.html"

        }
        // 如果已经登录，把商品加入购物车
        pAjax({
                url: '../api/addCarData.php',
                data: {
                    username: login,
                    goods_id: id,
                    goods_num: data.cart_number
                }
            }).then(res => {
                res = JSON.parse(res)
                console.log(res);
            })
            // console.log(target.parentNode.getAttribute('data-src'));
    }
    if (target.classList.contains('buy')) {
        location.href = './car.html';
    }


}