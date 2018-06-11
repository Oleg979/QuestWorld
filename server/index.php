<?php
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL & ~E_NOTICE);

//ini_set('display_errors','Off');
////////////////////////////////////////////////////////////////////////////////
// Функция получения данных из тела запроса
function getFormData($method) {
 
    // GET или POST: данные возвращаем как есть
    if ($method === 'GET') return $_GET;
    if ($method === 'POST') return $_POST;
 
    // PUT, PATCH или DELETE
    $data = array();
    $exploded = explode('&', file_get_contents('php://input'));
 
    foreach($exploded as $pair) {
        $item = explode('=', $pair);
        if (count($item) == 2) {
            $data[urldecode($item[0])] = urldecode($item[1]);
        }
    }
 
    return $data;
}
////////////////////////////////////////////////////////////////////////////////
// Определяем метод запроса
$method = $_SERVER['REQUEST_METHOD'];

// Получаем данные из тела запроса
$formData = getFormData($method);

// Разбираем url
$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

// Определяем роутер и url data
$router = $urls[0];
$urlData = array_slice($urls, 1);
 
//Создаем связь с бд

$host = "localhost";
$username = "u148682720_quest";
$password = "mevpRiRia0ql";
$db = "u148682720_quest";

$connection = new mysqli($host, $username, $password, $db); 
 
// Подключаем файл-роутер и запускаем главную функцию
include_once 'routers/' . $router . '.php';
route($method, $urlData, $formData, $connection);
////////////////////////////////////////////////////////////////////////////////
?>
