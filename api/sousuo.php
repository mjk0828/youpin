<?php
//模糊搜索
$con = mysqli_connect('localhost','root','123456','youpin');
// $name=$_GET['name'];
// echo $name;

$sql = "SELECT * FROM `goods` WHERE `goods_name` LIKE '%立健%'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die("数据库的错误：" . mysqli_error($con));
    }

    $arr = array();
    $row = mysqli_fetch_assoc($res);

    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));

?>