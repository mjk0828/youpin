<?php
    # 获取前端传递过来的参数
    $username = $_POST['username'];
    $password = $_POST['password'];

    // $name = $_GET['username'];
    // $password = $_GET['password'];

    $con = mysqli_connect('localhost','root','123456','youpin');

    // 先去数据库中对比这个用户名是否存在
    $sql1 = "SELECT *  FROM `userlist` WHERE `username` = '$username'";
    $res1 = mysqli_query($con,$sql1);
    
    $row = mysqli_fetch_assoc($res1);
    if($row){
        echo json_encode(array(
            "code" => 0,
            "message" => "已经注册，可直接登录"
        ),JSON_UNESCAPED_UNICODE);
    }else{
        // 写插入数据的SQL语句
        $sql2 = "INSERT INTO `userlist` (`username`,`password`) VALUES ('$username','$password')";

        $res2 = mysqli_query($con,$sql2);

        if(!$res2){
            echo json_encode(array(
                "code" => 0,
                "message" => "注册失败"
            ),JSON_UNESCAPED_UNICODE);
        }else{
            echo json_encode(array(
                "code" => 1,
                "message" => "注册成功"
            ),JSON_UNESCAPED_UNICODE);
        }
    }
?>