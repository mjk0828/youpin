let page = document.querySelector('.page');
let list = document.querySelector('.m-product-list')
let num = document.querySelector('#num')
let paiXu = document.querySelector('.paixu');

let reg = /id=(\D+)/;
if (!reg.test(location.search)) {

    location.href = './index.js'
}
search = location.search;
let id = decodeURIComponent(location.search.substr(4))
console.log(id);



let defaultInfo = {
    len: 12,
    num: 1,
    pai: 0
        // id: id
}

shuJu();

paiXu.onclick = function() {
    let e = window.event;
    console.log(e.target);

    if (e.target.className == 'jiaGe') {
        defaultInfo.pai = 1;
    } else {
        defaultInfo.pai = 0;
    }
    console.log(defaultInfo.pai);
    shuJu();
}

function shuJu() {
    pAjax({
        url: '../api/list.php',
        data: {
            start: 1,
            len: defaultInfo.len,
            id: id
        }
    }).then((res) => {
        res = JSON.parse(res);

        console.log(res);
        new Pagination(page, {
            pageInfo: {
                pagenum: 1,
                pagesize: defaultInfo.len,
                total: res.total,
                totalpage: Math.ceil(res.total / defaultInfo.len)
            },
            textInfo: {
                prev: '上一页',
                list: '',
                next: '下一页',
            },
            change: function(num) {
                defaultInfo.num = num
                getData();
                scrollTo(0, 0)
            }
        });

    })
}


async function getData() {
    let res = await pAjax({
        url: '../api/list.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len,
            id: id
        }
    });
    res = JSON.parse(res)
    console.log(res);
    let list = res.list;
    if (defaultInfo.pai == 1) {
        list.sort(function(a, b) {
            return a.goods_price - b.goods_price
        })
    }
    renderHtml(list);

    num.innerText = res.total
}

function renderHtml(data) {
    let str = ' ';
    data.forEach(item => {
        str += `<div class="pro-item m-tag-a" data-src="./detail.html?id=${item.goods_id}" data-target="_blank">
        <div class="pro-img m-img-hover"><img class="" src="${item.goods_big_logo}" data-src=""
                alt="${item.cat_id}" style="margin-top: 0px;"></div>
        <div class="pro-tags-con"></div>
        <div>
        <p class="pro-info" title="${item.goods_name}">${item.goods_name}</p>
        <p class="pro-desc" title="${item.goods_name}"${item.goods_name}</p>
        </div>
        <p class="pro-price"><span class="pro-unit">¥</span><span class="m-num">${item.goods_price}</span></p>
    </div>`
    });
    list.innerHTML = str;
}

document.ondblclick = function() {
    let e = window.event;
    let target = e.target.parentNode.parentNode;
    if (target.classList.contains('pro-item')) {
        let loc = target.getAttribute('data-src');
        location.href = loc
    }

}

let sousuo = document.querySelector('.search')
let contain = document.querySelector('.contain');

console.log(contain);

sousuo.onclick = function() {
        let e = window.event;
        e.preventDefault();
        console.log(123);
        let name = contain.value

        console.log(name);

        pAjax({
            url: '../api/search.php',
            data: {
                start: 1,
                len: defaultInfo.len,
                id: name
            }
        }).then((res) => {
            res = JSON.parse(res);

            console.log(res);
            renderHtml(res.list);
            new Pagination(page, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: defaultInfo.len,
                    total: res.total,
                    totalpage: Math.ceil(res.total / defaultInfo.len)
                },
                textInfo: {
                    prev: '上一页',
                    list: '',
                    next: '下一页',
                },
                change: function(num) {
                    defaultInfo.num = num
                    getData();
                    scrollTo(0, 0)
                }
            });

        })

        async function getData() {
            let res = await pAjax({
                url: '../api/search.php',
                data: {
                    start: defaultInfo.num,
                    len: defaultInfo.len,
                    id: id
                }
            });
            res = JSON.parse(res)
            console.log(res);



            num.innerText = res.total
        }

    } 
    // $('.search').on('click', function() {
    //     let e = window.event;
    //     e.preventDefault();
    //     // console.log(1);
    //     let con = $('.contain').val()
    //     console.log(con);
    //     $.get('../api/sousuo.php', {
    //         name: con
    //     }, function (res)  {            
    //         console.log(res);            
    //         renderHtml(res);        
    //     }, 'json');            
    // })