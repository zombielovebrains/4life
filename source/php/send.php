<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$id= $_POST['id'];
$town = $_POST['town'];
$street = $_POST['street'];
$house = $_POST['house'];
$flat = $_POST['flat'];

$stuff = array_combine($_POST['product'], $_POST['product-count']);
$descriptions = [];
foreach ($stuff as $ingredient => $quantity) {
    $descriptions[] = $ingredient." — ".$quantity." шт";
}

$orderlist = implode('<br>', $descriptions);

// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Заказ с сайта</h2>
<b>Имя:</b> $fullname<br>
<b>Почта:</b> $email<br>
<b>Телефон:</b> $phone<br>
<b>4Life ID:</b> $id<br>
<b>Адрес:</b> $town, $street, д. $house, кв. $flat<br>
<b>Заказ:</b><br>$orderlist
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    // $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    // $mail->Username   = 'tf.immun@gmail.com'; // Логин на почте
    // $mail->Password   = 'cjmfgyhf396'; // Пароль на почте
    // $mail->Port       = 465;
    // $mail->setFrom('tf.immun@gmail.com', 'Имя отправителя'); // Адрес самой почты и имя отправителя
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'test.4life@yandex.ru'; // Логин на почте
    $mail->Password   = 'cjmfgyhf396'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    // Адрес самой почты и имя отправителя
    $mail->setFrom('test.4life@yandex.ru', 'Имя отправителя');

    // // Получатель письма
    $mail->addAddress('test.4life@yandex.ru');

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";}
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
