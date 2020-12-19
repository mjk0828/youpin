let username = document.querySelector('#username');
let password = document.querySelector('#password ');
let tips = document.querySelector('.tips')
$('#register').validate({
    // 填写的 输入框验证的规则
    rules: {
        // 就是input的name属性的属性值来验证
        username: {
            required: true,
            maxlength: 12,
            minlength: 6
        },
        password: {
            required: true
        },
        password2: {
            required: true,
            // 确认密码，是否跟上一个密码一样
            equalTo: "#password"
        }
    },
    // 当不满足规则的是 编写的提示信息
    messages: {
        username: {
            required: '用户名必填项',
            maxlength: '用户的最大长度只能为12位',
            minlength: '用户名不能低于6位字符'
        },
        password: {
            required: '密码必填项',
            maxlength: '用户的最大长度只能为12位',
            minlength: '用户名不能低于6位字符'

        },
        password2: {
            required: '必须确认密码',
            equalTo: '两次输入密码不相同',
            maxlength: '用户的最大长度只能为12位',
            minlength: '用户名不能低于6位字符'
        }
    },
    submitHandler: function() {
        pAjax({
            type: 'post',
            url: '../api/register.php',
            data: {
                username: username.value,
                password: password.value
            }
        }).then(res => {
            res = JSON.parse(res)
            tips.innerHTML = res['message'];
            console.log(res['message']);

        })
    }
});