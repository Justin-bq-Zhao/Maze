function generateBasicMaze(ylen, xlen){
    let maze = [];
    for (let i = 0; i < ylen; i++){
        let arr = [];
        for (let j = 0; j < xlen; j++){
            arr.push(BLOCK);
        }maze.push(arr);
    }return maze;
}

function PrimGenerateMaze(Ylen, Xlen){
    if (Ylen % 2 == 0) Ylen ++;
    if (Xlen % 2 == 0) Xlen ++;

    //empty length and bound
    let  y= (Ylen - 1) / 2;
    let  x= (Xlen - 1) / 2;
    let YBound = Ylen - 1;
    let XBound = Xlen - 1;


    //create a maze
    let maze = generateBasicMaze(Ylen,Xlen);

    
    let accessNum =Math.ceil(( y * x ) / hard);
    let curIndex = -1;

    let parent = new Array(y * x);
    for (let i = 0; i < parent.length; i++) parent[i] = i;

    let access = new Array();

    //choose a location start randomly
    for (let i = 0; i < accessNum; i++){
        let subaccess = new Array();
        let cury = Math.floor(Math.random() * y);
        let curx = Math.floor(Math.random() * x);
        
        let randomStart = convertCoordinate(cury, curx);
        subaccess.push(randomStart);
    
        maze[randomStart[0]][randomStart[1]] = EMPTY;                                           //Mazeupdate
        access.push(subaccess);
    }
    while (access.length){
        curIndex = getNextIndex(access.length, curIndex);
        if (access[curIndex].length == 0){
            access[curIndex] = access[access.length - 1];
            access.pop();
            continue;
        }
        let cur = getElementRamdomly(access[curIndex]);
        for (let index = 0; index < Createdirs.length; index++){
            let tempY = cur[0] + Createdirs[index][0];
            let tempX = cur[1] + Createdirs[index][1];
            if (tempX < 1 || tempX >= XBound || tempY < 1 || tempY >= YBound){
                continue;
            } 
            if (maze[tempY][tempX] != EMPTY){
                maze[tempY][tempX] = EMPTY;                             //Mazeupdate
                access[curIndex].push([tempY, tempX]);                    //Arrayupdate
            }else if (find(parent,linearIndex(cur[0], cur[1], x)) != find(parent,linearIndex(tempY,tempX,x))){
                //demolish the wall
                maze[cur[0] + Createdirs[index][0] / 2][cur[1] + Createdirs[index][1] /2] = EMPTY; //Mazeupdate
                union(parent, linearIndex(cur[0], cur[1], x), linearIndex(tempY,tempX,x));
            }
        };
    }return maze;   
}

function linearIndex(yi, xi, x){
    let realY = (yi - 1) /2;
    let realX = (xi - 1) /2;
    return realY * x + realX;
}

function convertCoordinate( y, x){
    return [y * 2 + 1, x * 2 + 1];
}

function union(parent, start, end){
    parent[find(parent, start)] = end;
}

function find(parent,index){
    let origin = index;
    while (parent[index] != index){
        index = parent[index];
    }parent[origin] = index;
    return index;
}

function getElementRamdomly(coor){
    let len = coor.length;
    let index = Math.floor(Math.random() * len);
    let temp = coor[index];
    coor[index] = coor[len - 1];
    coor.pop();
    return temp;
}

function getEnd(YLen, XLen){
    return [YLen % 2 == 0 ? YLen - 1 : YLen - 2 ,XLen % 2 == 0 ? XLen - 1 : XLen - 2];
}


function getNextIndex(accessLen, curIndex){
    if (curIndex >= (accessLen - 1)){
        return 0;
    }return ++curIndex;
}



// function PrimGenerateMazeWithAnimation(Ylen, Xlen, $Object){
//     let rowList = $Object.children();
//     if (Ylen % 2 == 0) Ylen ++;
//     if (Xlen % 2 == 0) Xlen ++;

//     //empty length and bound
//     let  y= (Ylen - 1) / 2;
//     let  x= (Xlen - 1) / 2;
//     let YBound = Ylen - 1;
//     let XBound = Xlen - 1;


//     //create a maze
//     let maze = generateBasicMaze(Ylen,Xlen);

//     //choose a location start randomly
//     let cury = Math.floor(Math.random() * y);
//     let curx = (Math.floor(Math.random() * x));
//     let access = [];
//     let randomStart = convertCoordinate(cury, curx);
//     access.push(randomStart);
//     let parent = new Array(y * x);
//     for (let i = 0; i < parent.length; i++) parent[i] = i;
//     maze[randomStart[0]][randomStart[1]] = EMPTY;                                           //Mazeupdate
//     rowList.eq(randomStart[0]).children().eq(randomStart[1]).removeClass('block');
//     rowList.eq(randomStart[0]).children().eq(randomStart[1]).addClass('current');


//     let generateInterval = setInterval(function(){
//         if (access.length){
//             let cur = getElementRamdomly(access);
//             rowList.eq(cur[0]).children().eq(cur[1]).removeClass('current');
//             rowList.eq(cur[0]).children().eq(cur[1]).addClass('empty');
//             for (let index = 0; index < Createdirs.length; index++){
//                 let tempY = cur[0] + Createdirs[index][0];
//                 let tempX = cur[1] + Createdirs[index][1];
//                 if (tempX < 1 || tempX >= XBound || tempY < 1 || tempY >= YBound){
//                     continue;
//                 } 
//                 if (maze[tempY][tempX] != EMPTY){
//                     maze[tempY][tempX] = EMPTY;                             //Mazeupdate
//                     rowList.eq(tempY).children().eq(tempX).removeClass('block');
//                     rowList.eq(tempY).children().eq(tempX).addClass('current');
//                     access.push([tempY, tempX]);                    //Arrayupdate
//                 }else if (find(parent,linearIndex(cur[0], cur[1], x)) != find(parent,linearIndex(tempY,tempX,x))){
//                     //demolish the wall
//                     let cy = cur[0] + Createdirs[index][0] / 2;
//                     let cx = cur[1] + Createdirs[index][1] /2;
//                     maze[cy][cx] = EMPTY; //Mazeupdate
//                     rowList.eq(cy).children().eq(cx).removeClass('block');
//                     rowList.eq(cy).children().eq(cx).addClass('empty');
//                     union(parent, linearIndex(cur[0], cur[1], x), linearIndex(tempY,tempX,x));
//                 }
//             };
//         }else {
//             clearInterval(generateInterval);
//             originMaze = maze;
//         }
//     }, 0.001);
// }
function PrimGenerateMazeWithAnimation(Ylen, Xlen, $Object){
    let rowList = $Object.children();
    if (Ylen % 2 == 0) Ylen ++;
    if (Xlen % 2 == 0) Xlen ++;

    //empty length and bound
    let  y= (Ylen - 1) / 2;
    let  x= (Xlen - 1) / 2;
    let YBound = Ylen - 1;
    let XBound = Xlen - 1;


    //create a maze
    let maze = generateBasicMaze(Ylen,Xlen);

    let accessNum =Math.ceil(( y * x ) / hard);
    let curIndex = -1;

    let parent = new Array(y * x);
    for (let i = 0; i < parent.length; i++) parent[i] = i;

    let access = new Array();

    //choose a location start randomly
    for (let i = 0; i < accessNum; i++){
        let subaccess = new Array();
        let cury = Math.floor(Math.random() * y);
        let curx = Math.floor(Math.random() * x);
        
        let randomStart = convertCoordinate(cury, curx);
        subaccess.push(randomStart);
    
        maze[randomStart[0]][randomStart[1]] = EMPTY;                                           //Mazeupdate
        rowList.eq(randomStart[0]).children().eq(randomStart[1]).removeClass('block');
        rowList.eq(randomStart[0]).children().eq(randomStart[1]).addClass('current');
        access.push(subaccess);
    }


    let generateInterval = setInterval(function(){
        // console.log(access);
        curIndex = getNextIndex(access.length, curIndex);
        // console.log(curIndex);
        if (access[curIndex].length){
            let cur = getElementRamdomly(access[curIndex]);
            rowList.eq(cur[0]).children().eq(cur[1]).removeClass('current');
            rowList.eq(cur[0]).children().eq(cur[1]).addClass('empty');
            for (let index = 0; index < Createdirs.length; index++){
                let tempY = cur[0] + Createdirs[index][0];
                let tempX = cur[1] + Createdirs[index][1];
                if (tempX < 1 || tempX >= XBound || tempY < 1 || tempY >= YBound){
                    continue;
                } 
                if (maze[tempY][tempX] != EMPTY){
                    maze[tempY][tempX] = EMPTY;                             //Mazeupdate
                    rowList.eq(tempY).children().eq(tempX).removeClass('block');
                    rowList.eq(tempY).children().eq(tempX).addClass('current');
                    access[curIndex].push([tempY, tempX]);                    //Arrayupdate
                }else if (find(parent,linearIndex(cur[0], cur[1], x)) != find(parent,linearIndex(tempY,tempX,x))){
                    //demolish the wall
                    let cy = cur[0] + Createdirs[index][0] / 2;
                    let cx = cur[1] + Createdirs[index][1] /2;
                    maze[cy][cx] = EMPTY; //Mazeupdate
                    rowList.eq(cy).children().eq(cx).removeClass('block');
                    rowList.eq(cy).children().eq(cx).addClass('empty');
                    union(parent, linearIndex(cur[0], cur[1], x), linearIndex(tempY,tempX,x));
                }
            };
        }else {
            access[curIndex] = access[access.length - 1];
            access.pop();
            if (!access.length){
                clearInterval(generateInterval);
                originMaze = maze;
                MazeExist = true;
                canMove  = true;
                curPos = $('.mazeArea').children().children().eq(1).children().eq(1);
                curPos.addClass('passed');
                curPos.addClass('curPos');
                
                curPos.css({
                    'font-size' : cellLen + 'px'
                });

                curSelected && curSelected.removeClass('selected')
                curSelected = null;
            };
        };
    }, 0.001);
}