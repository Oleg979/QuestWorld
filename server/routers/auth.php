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
        if($isExist == null) 
            echo json_encode(array(
                'status' => 'ERROR',
                'error' => 'NOT REGISTERED!'
            ));
        else {
            $rightPass = $db->query("SELECT password FROM Users WHERE login='$login'")->fetch_row()[0];
            $admin = $db->query("SELECT isAdmin FROM Users WHERE login='$login'")->fetch_row()[0];
            if($pass != $rightPass)
                echo json_encode(array(
                   'status' => 'ERROR',
                    'error' => 'WRONG PASSWORD!'
                ));
            else
                echo json_encode(array(
                    'status' => 'OK',
                    'id' => $isExist,
                    'isAdmin' => $admin == 0 ? false : true
                ));
        }
        return;
    }
////////////////////////////////////////////////////////////////////////////////  
///Возвращаем ошибку////////////////////////////////////////////////////////////
    else header('location:https://gt99.xyz/QuestAPI/error.html');
////////////////////////////////////////////////////////////////////////////////    
}
