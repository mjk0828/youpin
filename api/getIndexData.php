<?php
$con = mysqli_connect('localhost','root','123456','youpin');

$classFy = $_GET['classFy'];
// $classFy = 'chou';
$s = 0;
$len = $_GET['len'];

$sql = "SELECT * FROM `goods` WHERE `is_classfy`='$classFy' LIMIT $s,$len";

$res = mysqli_query($con,$sql);

if (!$res) {
  die('error for mysql: ' . mysqli_error());
}


$arr = array();
    $row = mysqli_fetch_assoc($res);

    while( $row = mysqli_fetch_assoc($res)){
        array_push($arr,$row);
    }

    echo json_encode(array(
      "list" => $arr,
      "code" => 1,
      "message" => "获取列表数据成功"
    ),JSON_UNESCAPED_UNICODE);
?>