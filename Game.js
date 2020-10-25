const electron = require('electron');
const ip = electron.ipcRenderer;
const win = document.getElementById("element");
var mat = [[" "," "," "],[" "," "," "],[" "," "," "]];
var player = "X";
for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
        addListener(i,j);
    }
}

function changePlayer(){
    if(player==="X"){
        player ="O";
    }else{
        player="X";
    }
}

function endGame(){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(mat[i][j]===" ") return false;
        }
    }
    return true;
}

function existWinColumn(){
    for(var i=0;i<3;i++){
        if(mat[0][i]!=" "&& mat[0][i]==mat[1][i] && mat[1][i]==mat[2][i]) return true;
    }
    return false;
}

function existWinRow(){
    for(var i=0;i<3;i++){
        if(mat[i][0]!=" "&& mat[i][0]==mat[i][1] && mat[i][1]==mat[i][2]) return true;
    }
    return false;
}

function existWinDiagon(){
    return (mat[0][0]!=" " && mat[0][0]===mat[1][1] && mat[1][1]===mat[2][2]) ||
            (mat[0][2]!=" " && mat[0][2]===mat[1][1] && mat[1][1]===mat[2][0]);

}

function isWin(){
    return existWinColumn() || existWinRow() || existWinDiagon();
}

function changeWindow(){
    changePlayer();
    ip.send("win",player);
}

function changeLoseWindow(){
    ip.send("lose");
}


function addListener(i,j){
    var elm =  document.createElement("div");
        elm.style.top = (166.66*i)+"px";
        elm.style.left = (166.66*j)+"px";
        elm.style.background = "orange";
        win.append(elm);
        elm.addEventListener("click",()=>{
            elm.innerText=player;
            mat[i][j]=player;
            changePlayer();
            if(isWin()) changeWindow();
            if(endGame()) changeLoseWindow();
            console.log(isWin());
            console.log(mat);
        });
}