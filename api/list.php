<?php
    $con = mysqli_connect('localhost','root','123456','youpin');

    $cat_id = $_GET['id'];
    // $cat_id = '汽车生活';

    $start = $_GET['start'];
    $len = $_GET['len']+1;

    $s = ($start-1)*$len;

    $sql = "SELECT * FROM `goods` WHERE `cat_one_id`='$cat_id' LIMIT $s,$len";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error' . mysqli_error());
    }


    $dataArr = array();
    $row = mysqli_fetch_assoc($res);

    while( $row = mysqli_fetch_assoc($res)){
        array_push($dataArr,$row);
    }
    # $row 得到的是当前请求的20条数据


    $sql2 = "SELECT COUNT(*) `count` FROM `goods` WHERE `cat_one_id`='$cat_id'";
    $res2 = mysqli_query($con,$sql2);

    if (!$res2) {
        die('error' . mysqli_error());
    }
    $row2 = mysqli_fetch_assoc($res2);
    # 得到数据的总数量 
    # 需要把商品数据 和总数量都返回 给前端

    echo json_encode(array(
        "total" => $row2['count'],
        "list" => $dataArr,
        "code" => 1,
        "message" => "获取列表数据成功"
    ));
?>