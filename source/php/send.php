<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$id= $_POST['id'];
$city = $_POST['city'];
$street = $_POST['street'];
$house = $_POST['house'];
$flat = $_POST['flat'];
$orderlist = implode(', ',$_POST['product'], $_POST['product-count']);

// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Заказ с сайта</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br>
<b>Телефон:</b> $phone<br>
<b>4Life ID:</b> $id<br>
<b>Адрес:</b> $сity, $street, $house, $flat<br>
<b>Заказ:</b><br>$orderlist
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'tf.immun'; // Логин на почте
    $mail->Password   = 'cjmfgyhf396'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('tf.immun@gmail.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('tf.immun@gmail.ru');

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
