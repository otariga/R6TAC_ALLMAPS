var drawing = false;
// 前回の座標を記録する（初期値：０）
var before_x = 0;
var before_y = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', draw_canvas);
// マウスをクリックしてる時
canvas.addEventListener('mousedown', function(e) {
  drawing = true;
  var rect = e.target.getBoundingClientRect();
  before_x = e.clientX - rect.left;
  before_y = e.clientY - rect.top;
});
// マウスをクリックしてない時
canvas.addEventListener('mouseup', function() {
  drawing = false;
});

// 描画の処理
function draw_canvas(e) {
// drawingがtrueじゃなかったら返す
if (!drawing){
  return
};
var rect = e.target.getBoundingClientRect();
var x = e.clientX - rect.left;
var y = e.clientY - rect.top;
var w = document.getElementById('width').value;
var color = document.getElementById('color').value;
var r   = parseInt(color.substring(1,3), 16);
var g = parseInt(color.substring(3,5), 16);
var b  = parseInt(color.substring(5,7), 16);
// 描画
ctx.lineCap = 'round';
ctx.strokeStyle = 'rgb('+ r + ',' + g + ',' + b + ')';
ctx.lineWidth = w;
ctx.beginPath();
ctx.moveTo(before_x, before_y);
ctx.lineTo(x, y);
ctx.stroke();
ctx.closePath();
// 描画最後の座標を前回の座標に代入する
before_x = x;
before_y = y;
}

// クリアボタンクリック時
// クリアボタンクリックした時にアラートを表示
function delete_canvas(){
ret = confirm('描画内容を削除します。');
// アラートで「OK」を選んだ時
if (ret == true){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
}

var pen = document.getElementById('pencil');
var era = document.getElementById('eraser');
// 鉛筆と消しゴムの切り替え

function tool(btnNum){
// クリックされボタンが鉛筆だったら
if (btnNum == 1){
  ctx.globalCompositeOperation = 'source-over';
  pen.className = 'active';
  era.className = '';
}
// クリックされボタンが消しゴムだったら
else if (btnNum == 2){
  ctx.globalCompositeOperation = 'destination-out';
  pen.className = '';
  era.className = 'active';
}
}
