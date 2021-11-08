var sw_status = 0; // startとstopのフラグ
var timeNum = 0;
var time_array = ["0"]; //スプリットを記録
var append_list = "<tr><th>ラップ</th><th>スプリット</th></tr>";
var timerID;

resetTime();

function resetTime(){
  if (sw_status == 1) {startCount();}
  timeNum = 0; // 時間の初期値
  document.getElementById("timer").innerHTML = count_format(0);
  $('#lap_split_area').empty();
  time_array.length = 0;
  time_array = ["0"];
}

function startCount(){
  if (sw_status == 0) {
    document.form_sw.bstart.value = "Stop";
    sw_status = 1;
    timerID = setInterval("countUp()",10); // 0.01秒毎に呼び出し
  } else {
    document.form_sw.bstart.value = "Start";
    sw_status = 0;
    clearInterval(timerID); // 呼び出しの停止
  }
}

function countUp(){
  timeNum++;
  document.getElementById("timer").innerHTML = count_format(timeNum);
}

function count_format(num) {
  var ts = num / 100;
  var tm = Math.floor(ts / 60);
  ts = (ts % 60).toFixed(2);
  var th = Math.floor(tm / 60);
  tm = tm % 60;
  if (ts < 10) ts = "0" + ts;
  if (tm < 10) tm = "0" + tm;
  if (th < 10) th = "0" + th;
    return th + ":" + tm + ":" + ts;
}

function lap_split(){
  if (sw_status == 1) {
    time_array.push(timeNum);
    append_list = "";
    append_list = "<tr><th></th><th>ラップ</th><th>スプリット</th></tr>";
    for (let i = 1; i < time_array.length; i++) {
      append_list += "<tr>"+ "<td>"+ i + "</td><td>" + count_format(time_array[i] - time_array[i-1]) + "</td><td>" + count_format(time_array[i]) + "</td></tr>";
    }
    $('#lap_split_area').html(append_list);
  }
}