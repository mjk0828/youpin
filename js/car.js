let express = document.querySelector('.express-append')


let login = getCookie('login');
console.log(login);

if (!login) {

    renderHtml();
    console.log(45);
    // location.href = "./login.html"
    localStorage.setItem('url', './car.html');
} else {
    pAjax({
        url: '../api/getCarData.php',
        data: {
            username: login
        }
    }).then(res => {
        res = JSON.parse(res)
            // 先把数据存放到本地
        localStorage.setItem('goodsList', JSON.stringify(res));

        let data = JSON.parse(localStorage.getItem('goodsList'));

        renderHTML3(data);

    })

}

// 还没有登录的结构
function renderHtml() {
    let str = `<div class="container">
<div class="m-secondary-navigator">
    <span><a href="./index.html">首页</a></span><span><a href="#">购物车</a></span>
</div>
</div>`
    str += `<div class="no-good-container">
    <div class="m-exception  m-no-login">
        <div class="e-img"></div>
        <p class="e-info">登录后才能看到购物车商品哦~</p>
    </div>
    <div class="btn-wrap">
        <a class="m-btn-default m-btns m-btn-gray" href="./login.html">去登录</a>
    </div>
</div>`
    express.innerHTML = str;

}



// 获取用户购物车中的数据


function renderHTML3(data) {

    if (!data.length) {
        express.innerHTML = `<div class="container">
        <div class="m-secondary-navigator">
            <span><a href="./index.html">首页</a></span><span><a href="#">购物车</a></span>
        </div>
        </div>
            <div class="no-good-container">
            <div class="m-exception  m-no-cart">
                <div class="e-img"></div>
                <p class="e-info">购物车还是空的</p>
            </div>
            <div class="btn-wrap"><a class="m-btn-default m-btns m-btn-gray" href="./index.html">继续逛</a></div>
        </div>`
        return
    }

    let str = `<div class="container">
    <div class="m-secondary-navigator">
        <span><a href="./index.html">首页</a></span><span><a href="#">购物车</a></span>
    </div>
    </div>`

    let allChecked = data.every(item => {
        return item.is_select == 1;
    });

    let total = shopNum(data);
    str += `<div class="has-good-container container">
        <div class="title" id="good-title">
        <a class="m-icons select-icon all ${allChecked?' m-icons-check-active' :' m-icons-check'}" data-src="" href="javascript:;"></a>
            <span class="all-txt">全选</span>
            <span class="product">商品信息</span>
            <span class="price">单价</span>
            <span class="num">数量</span>
            <span class="total">金额</span>
            <span class="edit">操作</span>
        </div>
        <div class="cart-merchant-list" id="merchantList">
            <div>
                <div class="merchant-item-container">
                    <div class="merchant-info">
                    <a class="m-icons select-icon all ${allChecked?' m-icons-check-active' :' m-icons-check'}" data-src="" href="javascript:;"></a>
                        <span class="name" data-src="/flagshipstore?id=1&amp;title=有品精选">有品精选</span>
                        <div class="postmarginright mijiapost">
                            <span>
                                <span class="postimg">!</span>
                                满99.00元免运费
                            </span>
                            <span class="layer hide">有品精选商品，即有品配送和第三方商家发货的商品，2018年1月1日起，单笔订单满99元免运费，不满99元收10元运费。*包邮订单拆单后若部分订单退款使得剩余订单不满足包邮条件时将补扣10元运费。</span></div>
                        </div>
                    <div>`
    data.forEach(item => {
        str += `<div class="good-item-container cart-goods-con">
            <div class="merchant-reduce-top"></div>
            <div class="cart-good-items clearFix">
                <div class="select fl">
                <a class="m-icons itemCheck ${item.is_select==1?'m-icons-check-active':'m-icons-check'} select-icon " data-src="" href="javascript:;" goods_id = '${item.goods_id}'></a>

                </div>
                <div class="image fl" data-src="" data-target="_blank"><img class="" src="${item.goods_small_logo}" data-src=" "
                        alt="${item.goods_name}"></div>
                <div class="name fl" data-src="./detail.html" data-target="_blank">
                    <div class="vertical-wrap">
                        <p class="good-name brown-hover">${item.goods_name}</p>
                        <div></div>
                    </div>
                </div>
                <div class="price fl"><span>￥${item.goods_price}</span></div>
                <div class="num fl">
                    <div class="can-edit">
                        <div class="num-reduce-add" style="width: 140px;" goods_id = '${item.goods_id}'>
                            <a class="m-icons m-icons-reduce minus-plus" data-src="" href="javascript:;"></a>
                            <span class="txt" style="width: 70px;">${item.cart_number}</span>
                            <a class="m-icons m-icons-add-active minus-plus" data-src="" href="javascript:;"></a>
                        </div>
                    </div>
                </div>
                <div class="subtotal fl"><span>￥${item.goods_price*item.cart_number}</span></div>
                <div class="del fl">
                    <a goods_id='${item.goods_id}' class="m-icons m-icons-close-hover icon dele" data-src="" href="javascript:;"></a>
                </div>
            </div>
        </div>`
    });

    str += `</div>
        </div>
    </div>
    </div>
    <div class="cart-total bottom-total fixed-to-bottom">
    <div class="ico fl">
    <a class="m-icons select-icon all ${allChecked?' m-icons-check-active' :' m-icons-check'}" data-src="" href="javascript:;"></a>
        <span class="select-text">全选</span>
        <span class="already-select">已选${total.totalNum}件</span>
    </div>
    <div class="totol-price-con no-reduce">
        <span class="total-after-prefer">
            <span>合计：</span> ￥${total.totalPrice}
        </span>
        <div class="total-info">总额：￥${total.totalPrice + total.totalReduce},<span>立减￥${total.totalReduce}</span></div>
    </div><span class="checkout disable fr jieSuan">去结算</span></div>
    </div>`
    express.innerHTML = str;
}



express.onclick = function() {
    let e = window.event;
    // 全选
    if (e.target.classList.contains('all')) {
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let res = data.every(item => {
                return item.is_select == 1;
            })
            // console.log(res == false);
        data.forEach(item => {
            res == false ? item.is_select = 1 : item.is_select = 0
        });

        // console.log(data);

        renderHTML3(data);
        localStorage.setItem('goodsList', JSON.stringify(data));

    }

    // 单选
    if (e.target.classList.contains('itemCheck')) {
        let id = e.target.getAttribute('goods_id');
        // console.log(id);
        let data = JSON.parse(localStorage.getItem('goodsList'));
        data.forEach(item => {
                if (item.goods_id == id) {
                    // console.log(id);
                    item.is_select == 0 ? item.is_select = 1 : item.is_select = 0
                }
            })
            // console.log(data);
            // console.log(data);
            // 需要把 修改够的数据存储本地存储中
        localStorage.setItem('goodsList', JSON.stringify(data));
        renderHTML3(data);
        // console.log(e.target);
    }

    if (e.target.classList.contains('dele')) {
        // console.log(2);
        // 删除数据库中 和 本地存储中对应的数据 
        let id = e.target.getAttribute('goods_id');
        pAjax({
            url: '../api/removeCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            res = JSON.parse(res)
            console.log(res);
            if (res) {
                console.log(123);
                // 先获取本地存储中的数据
                let data = JSON.parse(localStorage.getItem('goodsList'));
                let res = data.filter(item => {
                    return item.goods_id != id;
                });
                console.log(res);

                localStorage.setItem('goodsList', JSON.stringify(res));
                renderHTML3(res);
            }
        })
    }

    // 更新商品的数量

    if (e.target.classList.contains('m-icons-reduce')) {
        // 进行数量减法
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');

        let obj = data.filter(item => {
            return item.goods_id == id
        })[0];
        let num = obj.cart_number * 1;
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {
            res = JSON.parse(res)
            if (res.code) {
                obj.cart_number = num;
                localStorage.setItem('goodsList', JSON.stringify(data));
                renderHTML3(data);
            }
        })
    }
    if (e.target.classList.contains('m-icons-add-active')) {
        // 进行数量减法
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let id = e.target.parentNode.getAttribute('goods_id');

        let obj = data.filter(item => {
            return item.goods_id == id
        })[0];
        let num = obj.cart_number * 1;
        num++;

        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                obj.cart_number = num;
                localStorage.setItem('goodsList', JSON.stringify(data));
                renderHTML3(data);
            }
        })
    }

    if (e.target.classList.contains('jieSuan')) {
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let res = data.filter(item => {
            return item.is_select == 0;
        })
        data.forEach(item => {
            if (item.is_select == 1) {
                pAjax({
                    url: '../api/removeCarData.php',
                    data: {
                        username: login,
                        goods_id: item.goods_id
                    }
                }).then(res1 => {
                    res1 = JSON.parse(res1)
                    console.log(res1);
                    // 重新把它存入本地
                    localStorage.setItem('goodsList', JSON.stringify(res));
                    renderHTML3(res);
                })
            }

        })


    }
}

function shopNum(goods) {
    let res = goods.filter(item => {
        return item.is_select == 1
    })


    // 计算选中商品的数量
    let totalNum = res.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);

    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre, item) => {
        return pre + item.goods_price * item.cart_number
    }, 0);

    let totalReduce = res.reduce((pre, item) => {
        return pre + (item.goods_old_price - item.goods_price) * item.cart_number
    }, 0)

    return {
        totalNum,
        totalPrice,
        totalReduce
    }
}