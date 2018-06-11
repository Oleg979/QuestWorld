<?
//Подключаем заголовки ответа
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

///Роутер/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function route($method, $urlData, $formData, $db) {
////Отправка заказа/////////////////////////////////////////////////////////////
/////POST /order////////////////////////////////////////////////////////////////
    if($method === 'POST' && empty($urlData)) {
        $id = $formData[id];
        $quests = $formData[quests];
        
        $my = $db->query("SELECT quests FROM Users WHERE id='$id'")->fetch_row()[0];
        
        $new = $my.$quests;
       
        $db->query("UPDATE Users SET quests = '$new' WHERE id = '$id'");
            echo json_encode(array(
                'status' => 'OK',
            ));
        
        return;
    }
////////////////////////////////////////////////////////////////////////////////  
///Возвращаем ошибку////////////////////////////////////////////////////////////
    else header('location:https://gt99.xyz/QuestAPI/error.html');
////////////////////////////////////////////////////////////////////////////////    
}
?>
