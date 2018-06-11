<?
//Подключаем заголовки ответа
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

///Роутер/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function route($method, $urlData, $formData, $db) {
////Регистрация/////////////////////////////////////////////////////////////////
/////POST /reg////////////////////////////////////////////////////////////////
    if($method === 'POST' && empty($urlData)) {
        $login = $formData[login];
        $pass = $formData[pass];
        
        
        $isExist = $db->query("SELECT id FROM Users WHERE login='$login'")->fetch_row()[0];
        if($isExist != null) 
            echo json_encode(array(
                'status' => 'ERROR',
                'error' => 'ALREADY EXIST'
            ));
        else {
            $db->query("INSERT INTO Users (login, password) VALUES ('$login','$pass')");
            echo json_encode(array(
                'status' => 'OK',
            ));
        }
        return;
    }
////////////////////////////////////////////////////////////////////////////////  
///Возвращаем ошибку////////////////////////////////////////////////////////////
    else header('location:https://gt99.xyz/QuestAPI/error.html');
////////////////////////////////////////////////////////////////////////////////    
}
?>
