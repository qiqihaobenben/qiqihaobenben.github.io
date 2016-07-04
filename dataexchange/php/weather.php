<?php
    header('content-type:text/html;charset=utf-8');
    $cityname = $_GET['cityname'];
    $ch = curl_init();
    $url = 'http://apis.baidu.com/apistore/weatherservice/citylist?cityname={$cityname}';
    $header = array(
        'apikey: de601b3376a304ea1c9c90034345f34b',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    var_dump(json_decode($res));
?>