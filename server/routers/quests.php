<?
//Подключаем заголовки ответа
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

///Роутер/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function route($method, $urlData, $formData, $db) {

/////Получение всех квестов/////////////////////////////////////////////////////
/////GET /quests////////////////////////////////////////////////////////////////
    if ($method === 'GET' && empty($urlData)) {
        //Добываем квесты из базы
        $quest = [];
        $quests = $db->query("SELECT id, title, descr, img, price, genre, rate FROM Quests ORDER BY id DESC")
        ->fetch_all();
        for($i = 0; $i < count($quests); $i++) {
                $quest += [$i => ["id" => $quests[$i][0] , "title" => $quests[$i][1], 
                "desc" => $quests[$i][2] , "img" => $quests[$i][3], "price" => $quests[$i][4],
                "genre" => $quests[$i][5], "rate" => $quests[$i][6]]];
        }
            
        // Выводим ответ клиенту
        echo json_encode($quest);
         
        return;
    }
/////Получение одного квеста////////////////////////////////////////////////////
/////GET /quests/{id}/////////////////////////////////////////////////////////// 
    else if ($method === 'GET' && count($urlData) == 1) {
        //Добываем квесты из базы
        $id = $urlData[0];
        $quest =  $db->query("SELECT id, title, descr, img, price, genre, rate FROM Quests WHERE id = $id")
        ->fetch_row();
        
         // Выводим ответ клиенту
        echo json_encode(["id" => $quest[0] , "title" => $quest[1], 
                "desc" => $quest[2] , "img" => $quest[3], "price" => $quest[4],
                "genre" => $quest[5], "rate" => $quest[6]]);
        return;
    }
/////Добавление квеста//////////////////////////////////////////////////////////
/////POST /quests///////////////////////////////////////////////////////////////    
    else if($method === 'POST' && empty($urlData)) {
        if (count($formData) < 3) {
            header('HTTP/1.0 400 Bad Request');
            echo json_encode(array(
                'status' => 'ERROR',
                'paramsCount' => count($formData)
            ));
            return;
        }
        //Добываем параметры из тела запроса
        $title = trim($formData[title]);
        $descr = trim($formData[descr]);
        $img = trim($formData[img]);
        $price = trim($formData[price]);
        $genre = trim($formData[genre]);
        
        //Засовываем в бд
        $db->query(
        "INSERT INTO Quests (title, descr, img, price, genre) VALUES ('$title', '$descr', '$img', '$price', '$genre')"
        );
        
        echo json_encode(array(
            'status' => 'OK',
        ));
        
        return;
    }
/////Удаление одного квеста/////////////////////////////////////////////////////
/////DELETE /quests/{id}////////////////////////////////////////////////////////     
    else if ($method === 'DELETE' && count($urlData) == 1) {
        $id = $urlData[0];
        $db->query("DELETE FROM Quests WHERE id=$id");
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
