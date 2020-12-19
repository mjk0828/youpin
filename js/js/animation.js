/* 
    封装一个动画函数
    参数：
        目标值
        给谁做动画
        做什么样式的动画（css属性）


    思考：多属性的动画？
*/
// var timer;
function move(ele,obj,callback){
    // 记录定定时器的个数
    let timerLen = 0;
    for(let key in obj){
        // 没for循环一次 那么timerLen 加一次
        timerLen++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height
        ele[attr] =  setInterval(()=>{
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100
            if(attr == "opacity"){
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele,attr) *100;
            }else{
                style = parseInt(getStyle(ele,attr)) ;
            }
            speed = (target - style) / 10; 
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                style += speed;
                if (target == style) {
                    clearInterval(ele[attr]);
                    // 没结束一个定时器，就让timerLen - 1
                    timerLen--;
                    // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
                }
               
                // 如果属性为透明度的时候 ，样式是不需要单位的
                if(attr == "opacity"){
                    // 因为上面获取的时候 *100
                    ele.style[attr] = style/100;
                }else{
                    ele.style[attr] = style + 'px';
                }
                
                 // 当timerLen = 0的时候说明所有动画都结束
                 if(timerLen == 0){
                    //  当有callback的时候那么久执行callback
                    // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                   callback && callback();
                }
        },30)
    }
}

// 获取样式的函数
function getStyle(ele,attr){
    var style ;
    if(window.getComputedStyle){
        style = window.getComputedStyle(ele)[attr];
    }else{
        style = ele.currentStyle[attr];
    }
    return style;
}