import React, { useState } from 'react'
import Board from './board'
import Message from './message'
import Refresh from './refresh'

const rows_max=15
const cols_max=15

const isWon = (board2d) => {
    //check horizontal
    for (let r=0; r< rows_max; r++) {
        for (let c=0; c < cols_max-4; c++) {
            if(
                board2d[r][c] === board2d[r][c+1] 
                && board2d[r][c] === board2d[r][c+2]
                && board2d[r][c] === board2d[r][c+3]
                && board2d[r][c] === board2d[r][c+4]
                && board2d[r][c] !== ""
                // && ((c+5>10 && board2d[r][c+5] ==="" ) 
                // || ( c-1>=0 && board2d[r][c-1]==="") )
                ){
                return true;
            }
        }
    }
    //check vertical
    for (let r=0; r< rows_max-4; r++) {
        for (let c=0; c < cols_max; c++) {
            if( board2d[r][c] === board2d[r+1][c]
                && board2d[r][c] === board2d[r+2][c]
                && board2d[r][c] === board2d[r+3][c]
                && board2d[r][c] === board2d[r+4][c]
                && board2d[r][c] !==""
                // && (( r+5>10&&board2d[r+5][c] === "")
                // || (r-1>=0 && board2d[r-1][c]=== ""))
                ){
                return true;
            }
        }
    }
    //check diagonal down
    for (let r=0; r< rows_max-4; r++) {
        for (let c=0; c < cols_max-4; c++) {
            if(
                board2d[r][c] === board2d[r+1][c+1]
                && board2d[r][c] === board2d[r+2][c+2]
                && board2d[r][c] === board2d[r+3][c+3]
                && board2d[r][c] === board2d[r+4][c+4]
                && board2d[r][c] !== ""
                // && ((r+5>10 && c+5>10&&board2d[r+5][c+5] === "")
                // || (r-1>=0 && c-1>=0&&board2d[r-1][c-1]=== ""))
                ){
                return true;
            }
        }
    }
    //check diagonal up
    for (let r=4; r< rows_max; r++) {
        for (let c=0; c < cols_max-4; c++) {
            if(
                board2d[r][c] === board2d[r-1][c+1]
                && board2d[r][c] === board2d[r-2][c+2]
                && board2d[r][c] === board2d[r-3][c+3]
                && board2d[r][c] === board2d[r-4][c+4]
                && board2d[r][c] !== ""
                // && ((r-5>=0 && c+5>10 && board2d[r-5][c+5] === "")
                // || (r-1>=0 && c-1>=0&&board2d[r+1][c-1] === ""))
                ){
                return true;
            }
        }
    }
    return false;
}

var AI_arr;
const defense=[0,1,5,25,100]
const offense=[0,1,6,30,110]
function AIcheck(isPlayer,board2d){
     AI_arr=new Array(rows_max).fill(0).map(()=>new Array(cols_max).fill(0));
    var isOpponent= (isPlayer === "X") ? "O" : "X";
    // check horizontal
    for (let r=0; r< rows_max; r++) {
        for (let c=0; c < cols_max-4; c++) {
            var player=0;
            var opponent=0;
            for (let i=0; i<5; i++) { 
                if(board2d[r][c+i] === isPlayer){
                    player++;
                } else if(board2d[r][c+i] === isOpponent){
                    opponent++;
                }    
            }
            for (let i=0; i<5; i++) {
                if(board2d[r][c+i] === ""){
                    if(player*opponent===0 && player!==opponent){
                        if(player>0){
                            // if(c-1>=0 && c+5<=cols_max-1 && board2d[r][c-1]===isOpponent && board2d[r][c+5]===isOpponent){
                            //     break
                            // }
                            if(c+5<=cols_max-1 && board2d[r][c]===isOpponent && board2d[r][c+5]===isOpponent ){
                                break
                            }
                            if(c+4<=cols_max-1 &&board2d[r][c]===isOpponent && board2d[r][c+4]===isOpponent){
                                break
                            }
                                AI_arr[r][c+i]+=offense[player]
                            if( player===3 && c+3<=cols_max-1 && board2d[r][c+1]===0 && board2d[r][c+3]===0) {
                                AI_arr[r][c+i]*=1.5
                            }
                            if(player===2){
                                AI_arr[r][c+i]*=1.5
                            }
                        }
                        if(opponent>0){
                            if(c-1>=0 && c+5<=cols_max-1 && board2d[r][c-1]===isPlayer && board2d[r][c+5]===isPlayer){
                                break
                            }
                            if(c+5<=cols_max-1 && board2d[r][c]===isPlayer && board2d[r][c+5]===isPlayer){
                                break
                            }
                            if(c+4<=cols_max-1 &&board2d[r][c]===isPlayer && board2d[r][c+4]===isPlayer){
                                break
                            }
                            AI_arr[r][c+i]+=defense[opponent]
                            if( opponent===3 && c+3<=cols_max-1 && board2d[r][c+1]===0 && board2d[r][c+3]===0){
                                AI_arr[r][c+i]*=1.5
                            }
                            if(opponent===2){
                                AI_arr[r][c+i]*=1.5
                            }
                        }
                        if(player===4){
                            if(c-1>=0 && board2d[r][c]===0 && board2d[r][c-1]===opponent) break
                            if(r+5<=rows_max-1 &&board2d[r][c+4]===0 && board2d[r][c+5]===opponent) break
                            //console.log(AI_board2d[r][c+i])
                            AI_arr[r][c+i]*=2
                        }           
                        if(opponent===4){
                                if(c-1>=0 && board2d[r][c]===0 && board2d[r][c-1]===player) break
                                if(r+5<=rows_max-1 &&board2d[r][c+4]===0 && board2d[r][c+5]===player) break
                                //console.log(AI_arr[r][c+i])
                                AI_arr[r][c+i]*=2
                        }
                    }
                    if(player!==0 && opponent!==0){
                        if(player>opponent)
                        AI_arr[r][c+i]+=offense[player-opponent]
                        if(opponent>player)
                        AI_arr[r][c+i]+=defense[opponent-player] 
                    }
                }
            }
        }
    }
    // check vertical
    for (let r=0; r < rows_max-4; r++) {
        for (let c=0; c< cols_max; c++) {
             player=0;
             opponent=0;
            for (let i=0; i<5; i++) {
                if(board2d[r+i][c] === isPlayer){
                    player++;
                } else if(board2d[r+i][c] === isOpponent){
                    opponent++;
                }
            }
            for (let i=0; i<5; i++) {
                if(board2d[r+i][c] === ""){                
                    if(player*opponent===0 && player!==opponent){
                        if(player>0){
                            // if(r-1>=0 && r+5<=rows_max-1 && board2d[r-1][c]===isOpponent && board2d[r+5][c]===isOpponent){
                            //     break
                            // }
                            if(r+5<=rows_max-1 && board2d[r][c]===isOpponent && board2d[r+5][c]===isOpponent ){
                                break
                            }
                            if(r+4<=rows_max-1 &&board2d[r][c]===isOpponent && board2d[r+4][c]===isOpponent){
                                break
                            }
                            AI_arr[r+i][c]+=offense[player]
                            if( player===3 && r+3<=rows_max-1 && board2d[r+1][c]===0 && board2d[r+3][c]===0) {
                                AI_arr[r+i][c]*=1.5
                            }
                            if(player===2){
                                AI_arr[r+i][c]*=1.5
                            }
                        }
                        if(opponent>0){
                            if(r-1>=0 && r+5<=rows_max-1 && board2d[r-1][c]===isPlayer && board2d[r+5][c]===isPlayer){
                                break
                            }
                            if(r+5<=rows_max-1 && board2d[r][c]===isPlayer && board2d[r+5][c]===isPlayer){
                                break
                            }
                            if(r+4<=rows_max-1 &&board2d[r][c]===isPlayer && board2d[r+4][c]===isPlayer){
                                break
                            }
                            AI_arr[r+i][c]+=defense[opponent]
                            if( opponent===3 && r+3<=rows_max-1 && board2d[r+1][c]===0 && board2d[r+3][c]===0){
                                AI_arr[r+i][c]*=1.5
                            }
                            if(opponent===2){
                                AI_arr[r+i][c]*=1.5
                            }
                        }
                        if(player===4){
                            if(r-1>=0 && board2d[r][c]===0 && board2d[r-1][c]===opponent) break
                            if(r+5<=rows_max-1 &&board2d[r+4][c]===0 && board2d[r+5][c]===opponent) break
                            //console.log(AI_board2d[r][c+i])
                            AI_arr[r+i][c]*=2
                        }
                        if(opponent===4){
                            if(r-1>=0 && board2d[r][c]===0 && board2d[r-1][c]===player) break
                            if(r+5<=rows_max-1 &&board2d[r+4][c]===0 && board2d[r+5][c]===player) break
                            //console.log(AI_arr[r][c+i])
                            AI_arr[r+i][c]*=2
                        }
                    }
                    if(player!==0 && opponent!==0){
                        if(player>opponent)
                        AI_arr[r+i][c]+=offense[player-opponent]
                        if(opponent>player)
                        AI_arr[r+i][c]+=defense[opponent-player] 
                    }
                }
            }
        }
    }
    // check diagonal down
    for (let r=0; r < rows_max-4; r++) {
        for (let c=0; c< cols_max-4; c++) {
             player=0;
             opponent=0;
            for (let i=0; i<5; i++) {
                if(board2d[r+i][c+i] === isPlayer){
                    player++;
                } else if(board2d[r+i][c+i] === isOpponent){
                    opponent++;
                }
            }
            for (let i=0; i<5; i++) {
                if(board2d[r+i][c+i] === ""){
                    if(player*opponent===0 && player!==opponent){
                        if(player>0){
                            // if(r-1>=0 && c-1>=0 && r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r-1][c-1]===isOpponent && board2d[r+5][c+5]===isOpponent){
                            //     break
                            // }
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r][c]===isOpponent && board2d[r+5][c+5]===isOpponent ){
                                break
                            }
                            if(r+4<=rows_max-1 && c+4<=cols_max-1 &&board2d[r][c]===isOpponent && board2d[r+4][c+4]===isOpponent){
                                break
                            }
                            AI_arr[r+i][c+i]+=offense[player]
                            if( player===3 && r+3<=rows_max-1 && c+3<=cols_max-1 && board2d[r+1][c+1]===0 && board2d[r+3][c+3]===0) {
                                AI_arr[r+i][c+i]*=1.5
                            }
                            if(player===2){
                                AI_arr[r+i][c+i]*=1.5
                            }
                        }
                        if(opponent>0){
                            if(r-1>=0 && c-1>=0 && r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r-1][c-1]===isPlayer && board2d[r+5][c+5]===isPlayer){
                                break
                            }
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r][c]===isPlayer && board2d[r+5][c+5]===isPlayer){
                                break
                            }
                            if(r+4<=rows_max-1 && c+4<=cols_max-1 &&board2d[r][c]===isPlayer && board2d[r+4][c+4]===isPlayer){
                                break
                            }
                            AI_arr[r+i][c+i]+=defense[opponent]
                            if( opponent===3 && r+3<=rows_max-1 && c+3<=cols_max-1 && board2d[r+1][c+1]===0 && board2d[r+3][c+3]===0){
                                AI_arr[r+i][c+i]*=1.5
                            }
                            if(opponent===2){
                                AI_arr[r+i][c+i]*=1.5
                            }
                        }
                        if(player===4){
                            if(r-1>=0 && c-1>=0 && board2d[r][c]===0 && board2d[r-1][c-1]===opponent) break
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 &&board2d[r+4][c+4]===0 && board2d[r+5][c+5]===opponent) break
                            //console.log(AI_board2d[r][c+i])
                            AI_arr[r+i][c+i]*=2
                        }
                        if(opponent===4){
                            if(r-1>=0 && c-1>=0 && board2d[r][c]===0 && board2d[r-1][c-1]===player) break
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 &&board2d[r+4][c+4]===0 && board2d[r+5][c+5]===player) break
                            //console.log(AI_arr[r][c+i])
                            AI_arr[r+i][c+i]*=2
                        }
                    }
                    if(player!==0 && opponent!==0){
                        if(player>opponent)
                        AI_arr[r+i][c+i]+=offense[player-opponent]
                        if(opponent>player)
                        AI_arr[r+i][c+i]+=defense[opponent-player] 
                    }
                }
            }
        }
    }
    // check diagonal up
    for (let r=4; r < rows_max; r++) {
        for (let c=0; c< cols_max-4; c++) {
             player=0;
             opponent=0;
            for (let i=0; i<5; i++) {
                if(board2d[r-i][c+i] === isPlayer){
                    player++;
                } else if(board2d[r-i][c+i] === isOpponent){
                    opponent++;
                }
            }
            for (let i=0; i<5; i++) {
                if(board2d[r-i][c+i] === ""){
                    if(player*opponent===0 && player!==opponent){
                        if(player>0){
                            // if(r-1>=0 && c-1>=0 && r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r-1][c-1]===isOpponent && board2d[r+5][c+5]===isOpponent){
                            //     break
                            // }
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r][c]===isOpponent && board2d[r+5][c+5]===isOpponent ){
                                break
                            }
                            if(r+4<=rows_max-1 && c+4<=cols_max-1 &&board2d[r][c]===isOpponent && board2d[r+4][c+4]===isOpponent){
                                break
                            }
                            AI_arr[r-i][c+i]+=offense[player]
                            if( player===3 && r-3>=0 && c+3<=cols_max-1 && board2d[r-1][c+1]===0 && board2d[r-3][c+3]===0) {
                                AI_arr[r-i][c+i]*=1.5
                            }
                            if(player===2){
                                AI_arr[r-i][c+i]*=1.5
                            }
                        }
                        if(opponent>0){
                            if(r-1>=0 && c-1>=0 && r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r-1][c-1]===isPlayer && board2d[r+5][c+5]===isPlayer){
                                break
                            }
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 && board2d[r][c]===isPlayer && board2d[r+5][c+5]===isPlayer){
                                break
                            }
                            if(r+4<=rows_max-1 && c+4<=cols_max-1 &&board2d[r][c]===isPlayer && board2d[r+4][c+4]===isPlayer){
                                break
                            }
                            AI_arr[r-i][c+i]+=defense[opponent]
                            if( opponent===3 && r-3>=0 && c+3<=cols_max-1 && board2d[r-1][c+1]===0 && board2d[r-3][c+3]===0){
                                AI_arr[r-i][c+i]*=1.5
                            }
                            if(opponent===2){
                                AI_arr[r-i][c+i]*=1.5
                            }
                        }
                        if(player===4){
                            if(r-1>=0 && c-1>=0 && board2d[r][c]===0 && board2d[r-1][c-1]===opponent) break
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 &&board2d[r+4][c+4]===0 && board2d[r+5][c+5]===opponent) break
                            //console.log(AI_board2d[r][c+i])
                            AI_arr[r-i][c+i]*=2
                        }
                        if(opponent===4){
                            if(r-1>=0 && c-1>=0 && board2d[r][c]===0 && board2d[r-1][c-1]===player) break
                            if(r+5<=rows_max-1 && c+5<=cols_max-1 &&board2d[r+4][c+4]===0 && board2d[r+5][c+5]===player) break
                            //console.log(AI_arr[r][c+i])
                            AI_arr[r-i][c+i]*=2
                        }
                    }
                    if(player!==0 && opponent!==0){
                        if(player>opponent)
                        AI_arr[r-i][c+i]+=offense[player-opponent]
                        if(opponent>player)
                        AI_arr[r-i][c+i]+=defense[opponent-player] 
                    }
                }
            }
        }
    }
    if(isPlayer==="X"){
        for (let r=0; r < rows_max; r++) {
            for (let c=0; c< cols_max; c++) {
                AI_arr[r][c]*=-1
            }
        }
    }
}
class Node{
    constructor(rows,cols,value){
        this.rows=rows
        this.cols=cols
        this.value=value
    }
}
var level=3;
function max_nodes()
{
    
    var max=0;
    var bestnode=[]
    for(var r = 0;r < rows_max; r++)
    {
        for(var c = 0;c < cols_max; c++)
        {
            if(max<AI_arr[r][c])
            {
                max=AI_arr[r][c];
                var node= new Node(r,c,max)
                bestnode.push(node);
            }
        
        }
    }
    var maxnode=bestnode.slice(-level)
    return maxnode.reverse();
}
function best_nodes()
{
    var max=0;
    var bestnode=[]
    for(var r = 0;r < rows_max; r++)
    {
        for(var c = 0;c < cols_max; c++)
        {
            if(max<AI_arr[r][c])
            {
                max=AI_arr[r][c];
                var node= new Node(r,c,max)
                bestnode.push(node);
            }
        
        }
    }
    //console.log(bestnode)
    if(bestnode.length>21)
    var maxnode=bestnode.slice(-20)
    else
    maxnode=bestnode
    return maxnode;
}
function min_nodes()
{
    
    var max=0;
    var bestnode=[]
    for(var r = 0;r < rows_max; r++)
    {
        for(var c = 0;c < cols_max; c++)
        {
            if(max>AI_arr[r][c])
            {
                max=AI_arr[r][c];
                var node= new Node(r,c,max)
                bestnode.push(node);
            }
        }
    }
    var maxnode=bestnode.slice(-level)
    return maxnode.reverse();
}
function max(x,y) 
{
return x > y ? x : y;
}
function min(x,y) 
{
return x < y ? x : y;
}
function bestMove(board2d) 
{
    // AI to make its turn
    let bestScore = -Infinity;
    let maxmove ;
    AIcheck("O",board2d)
    let nodes=best_nodes()
    console.log(nodes)
      for (let i = 0; i < nodes.length ; i++) 
        {
            if (board2d[nodes[i].rows][nodes[i].cols] === "")  
            {
                if(nodes[i].value>230)
                {
                    board2d[nodes[i].rows][nodes[i].cols] = "";
                    console.log(nodes[i])
                    return nodes[i]
                }
                board2d[nodes[i].rows][nodes[i].cols] = "O";
                let score = minimax(board2d,0, false);
                //console.log(score)
                board2d[nodes[i].rows][nodes[i].cols] = "";
                bestScore = max(score, bestScore);
                maxmove = nodes[i];
            }
        }
     return maxmove;
}
function minimax( board2d, depth, isMaximizing) 
{
    if (isMaximizing) {
        if(depth===level){
            return 0
        }
        let bestScore = -Infinity;
        AIcheck("O",board2d)
        let nodes=max_nodes()
        for (let i = 0; i < nodes.length; i++) {
            // Is the spot available?
            if (board2d[nodes[i].rows][nodes[i].cols] === "") {
                board2d[nodes[i].rows][nodes[i].cols] = "O";
                if(isWon(board2d)){
                    board2d[nodes[i].rows][nodes[i].cols] = "";
                    return 1000
                }
                let score = minimax( board2d,depth + 1, false);
                board2d[nodes[i].rows][nodes[i].cols] = "";
                bestScore = max(score, bestScore);
            }
        }
        return bestScore;
    } 
    else {
        if(depth===level){
            return 0
        }
        AIcheck("X",board2d)
        let nodes=min_nodes()
        let bestScore = -Infinity;
        for (let i = 0; i < nodes.length; i++) {
            // Is the spot available?
            if (board2d[nodes[i].rows][nodes[i].cols] === "") {
                board2d[nodes[i].rows][nodes[i].cols] = "X";
                if(isWon(board2d)){
                    board2d[nodes[i].rows][nodes[i].cols] = "";
                    return -1000
                }
                let score = minimax( board2d,depth + 1, true);
                board2d[nodes[i].rows][nodes[i].cols] = "";
                bestScore = min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function nodeToNumber(node) {
    return node.rows*rows_max+node.cols;
}

function numberToNode(number) {
    return new Node(Math.floor(number/rows_max),number%rows_max,0)
}

const Game = () => {
    // this is for board
    // default value for all the elemnt is ""
    const [board, setBoard] = useState(Array(rows_max*cols_max).fill("")); 
    const [board2d, setBoard2d] = useState(Array(rows_max).fill("").map(()=>Array(cols_max).fill("")));
    //const [turn, setTurn] = useState('yellow');
    const [isPlayer, setIsPlayer] = useState("X");
    const [message, setMessage] = useState("Click to start");
    const refresh  = () => {
        setBoard(Array(rows_max*cols_max).fill("")); 
        setBoard2d(Array(rows_max).fill("").map(()=>Array(cols_max).fill("")));
        setMessage("Click to start");
        setIsPlayer("X");  
    }

    const handleInput = (pos) => {
        const pos2d=numberToNode(pos)  
        if (isPlayer === "" || board[pos] !== "") {
            //is the game is over don't play
            // if the box has been clocked already then return
            return;
        }
        //set color for board[pos]

        const boardCopy = [...board];
        boardCopy[pos] = isPlayer;
        //alert(boardCopy)
        setBoard(boardCopy); // updating board for current player  
        board2d[pos2d.rows][pos2d.cols]=isPlayer;
        setBoard2d(board2d);
        //alert(board2d)
        if (isWon( board2d)){
            // once game is over
            setMessage(`WON: ${isPlayer}`)
            // since the game is over putting "" 
            setIsPlayer("");
            return;
        }

        if (boardCopy.indexOf("")=== -1){
            // if no more moves game is draw
            setMessage("DRAW")
            setIsPlayer("");
        } else {
            boardCopy[nodeToNumber(bestMove(board2d))]="O";
            setBoard(boardCopy);
            board2d[bestMove(board2d).rows][bestMove(board2d).cols]="O";
            setBoard2d(board2d);

            if (isWon(board2d)){
                // once game is over
                setMessage(`WON: O`)
                // since the game is over putting "" 
                setIsPlayer("");
                return;
            }
            var nextPlayer = "X"
            setIsPlayer("X"); // updating player
            setMessage(`TURN: ${nextPlayer}`)
        }
    }

    return (<div>
             <Message value={message} />
            <Board onClick={handleInput} value={board} /> 
            <Refresh onClick={refresh} value={'Refresh'} />
        </div>)
}

export default Game