let maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '+', '+', '+', '#', '#', '#', '#', '#'],
  ['#', '+', '#', '+', '#', '#', '#', '#', '#'],
  ['+', '+', '#', '+', '0', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

let moves = [];

let start = {};
let end = {};

for (let y in maze) {
  for (let x in maze[y]) {
    if (maze[y][x] == '0') {
      start.x = Number(x);
      start.y = Number(y);
    }
  }
}

for (let y = 0; y < maze.length; y++){
  for (let x = 0; x < maze[y].length; x++){
    if (maze[y][x] == '+' && (maze[y + 1][x] == undefined || maze[y - 1][x] == undefined || maze[y][x + 1] == undefined || maze[y][x - 1] == undefined)){
      end.x = Number(x);
      end.y = Number(y);
    }
  }
}

function checkPath(cords = start) {
   let siblings = getValidSib(cords);
  
   const currentCords = {
     x: siblings.x,
     y: siblings.y,
   };
  
   maze[currentCords.y][currentCords.x] = '#';
  
   if (currentCords.x == end.x && currentCords.y == end.y){
     console.log('Выход найден');
     console.log(moves);
   }else{
     checkPath(currentCords)
   }
}


function getValidSib(cord) {
  const { x, y } = cord;

  let cords = {};

  if (maze[y + 1][x] == '+') {
    cords = { x: x, y: y + 1, dir:'bottom' }
    moves.push('bottom')
  }

  if (maze[y - 1][x] == '+') {
    cords = { x: x, y: y - 1, dir:'top' }
    moves.push('top');
  }
  if (maze[y][x - 1] == '+') {
    cords = { x: x - 1, y: y, dir:'left' }
    moves.push('left')
  }
  if (maze[y][x + 1] == '+') {
    cords = { x: x + 1, y: y, dir:'right' }
    moves.push('right')
  }

  return cords;
}

checkPath()