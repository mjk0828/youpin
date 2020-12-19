"use strict";

/* 
    设置cookie，删除，修改
    如果cookie中没有key就添加，如果有这个可以 就是修改
    删除，直接设置cookie的过期时间为负数
*/
function setCookie(key, value, expires) {
  // 当没有传递过期时间的时候，那么默认为会话时间，不设置 expires=${date}
  if (expires) {
    var date = new Date();
    var time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000;
    date.setTime(time);
    document.cookie = "".concat(key, "=").concat(value, ";expires=").concat(date);
    return;
  }

  document.cookie = "".concat(key, "=").concat(value);
}
/* 
    获取cookie，需要传递一个参数，为key
*/


function getCookie(key) {
  var cookie = document.cookie; // a=1;b=2;c=3;
  // 先把字符串分割为数组，然后再把数组转化为对象
  // console.log(cookie);

  var arr = cookie.split("; ");
  var obj = {};
  arr.forEach(function (item) {
    var newArr = item.split("=");
    obj[newArr[0]] = newArr[1];
  });
  return obj[key];
}