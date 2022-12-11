<?php
//http://rainbowit.net/themes/imroz/
$host = 'http://rainbowit.net';

$request = urldecode($_SERVER['REQUEST_URI']);
$url = $host . $request;
$file = substr($request, 1);
$dir = pathinfo($file, PATHINFO_DIRNAME);

function getPage($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER , 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION , true);
    $result = curl_exec($ch);
    $info = curl_getinfo($ch);
    return $result;
}

if ($position = strpos($file, '?')) 
{
    $file = substr($file, 0, $position);
}

if ($position = strrpos($file, '.')) 
{
    $ext = substr($file, $position + 1, );
}
else 
{
    $dir = $file;
    $file .= '/index.html';
    $ext = 'html';
}

//$content = file_get_contents($url);
$content = getPage($url);

if ($content) 
{
    if (!file_exists($file)) {
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
        
        if ($ext == 'html' || $ext == 'css' || $ext == 'js') {
            $content = str_replace($host, '', $content);
        }
        $saved = file_put_contents($file, $content);
        if ($saved) {
            file_put_contents('log.txt', 'File saved ' . $file . "\n", FILE_APPEND);
            header('Location: /'.$file);
        }
    }
}