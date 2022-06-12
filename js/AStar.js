function endPrice(curY, curX, endY, endX){
    return Math.abs(curY - endY) + Math.abs(curX - endX);
}

function startPrice(path){
    let cur = path[path.length - 1];
    let parent = cur[2];
    let res = 1;
    while (parent != -1){
        parent = path[parent][2];
        res ++;
    }return res;
}

function AStarMarked(originMap,start,end) {
    
    //start and end
    let StartY = start[0];
    let StartX = start[1];
    let EndY = end[0];
    let EndX = end[1];
    //get the length and height of this map
    let row = originMap.length;


    // if (row > 0) {
    let cols = originMap[0].length;
    // } else {
    //     return null;
    // }
    //deepcopy map
    let map = [];
    for (let i = 0; i < row; i++) {
        let sub = [];
        for (let j = 0; j < cols; j++){
            sub.push(originMap[i][j]);
        }map.push(sub);
    }

    //if have bounds(the can't reach cells surrounding the map), bound is 1 and row - 1, else 0 and row
    const FIRSTROW =  1;
    const LASTROW = row - 2;
    const FIRSTCOLS = 1
    const LASTCOLS = cols - 2;
    //directions
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    //create a deque to save waiting check coordinates, (y, x, parent, price)
    let curCoordinate = new MinHeap();
    //create a list to save passed path
    let passedPath = [];
    //add start to deque
    curCoordinate.insert([StartY, StartX, -1, endPrice(StartY, StartX, EndY, EndX)]);
    //start loop
    while (curCoordinate.getLength()){
        let cur = curCoordinate.pop();
        passedPath.push(cur);
        map[cur[0]][cur[1]] = PASSED;
        //if reach end
        if (cur[0] == EndY && cur[1] == EndX){
            //add path in to list
            let res = [];
            res.push([EndY, EndX]);
            let parent = cur[2];
            while (parent != -1){
                cur = passedPath[parent];
                res.push([cur[0], cur[1]]);
                parent = cur[2];
            }//reverse list
            let lo = 0;
            let hi = res.length - 1;
            while (lo < hi){
                let temp = res[lo];
                res[lo++] = res[hi];
                res[hi--] = temp;
            }
            return res;
        }for (let i = 0; i < dirs.length; i++) {
            let tempY = cur[0] + dirs[i][0];
            let tempX = cur[1] + dirs[i][1];
            //if coordinate no allow, continue
            if (tempY < FIRSTROW || tempY > LASTROW || tempX < FIRSTCOLS || tempX > LASTCOLS || map[tempY][tempX] != EMPTY){
                continue;
            }
                
            map[tempY][tempX] = CURRENTPATH;
            curCoordinate.insert([tempY, tempX, passedPath.length -1, startPrice(passedPath) + endPrice(tempY, tempX, EndY, EndX)]);
        }
    }return null;
}


function AStarWithAnimation(originMap,start,end) {
    
    //start and end
    let StartY = start[0];
    let StartX = start[1];
    let EndY = end[0];
    let EndX = end[1];
    //get the length and height of this map
    let row = originMap.length;


    // if (row > 0) {
    let cols = originMap[0].length;
    // } else {
    //     return null;
    // }
    //deepcopy map
    let map = [];
    for (let i = 0; i < row; i++) {
        let sub = [];
        for (let j = 0; j < cols; j++){
            sub.push(originMap[i][j]);
        }map.push(sub);
    }

    //if have bounds(the can't reach cells surrounding the map), bound is 1 and row - 1, else 0 and row
    const FIRSTROW =  1;
    const LASTROW = row - 2;
    const FIRSTCOLS = 1
    const LASTCOLS = cols - 2;
    //directions
    let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    //create a deque to save waiting check coordinates, (y, x, parent, price)
    let curCoordinate = new MinHeap();
    //create a list to save passed path
    let passedPath = [];
    //add start to deque
    curCoordinate.insert([StartY, StartX, -1, endPrice(StartY, StartX, EndY, EndX)]);
    // $('.mazeArea .innerMaze').children().eq(StartY).children().eq(StartX).addClass('current');
    document.querySelector('.mazeArea .innerMaze').children[StartY].children[StartX].className = 'current';
    //start loop

    window.AstarAnimation = setInterval(function(){
        if (curCoordinate.getLength()){
            let cur = curCoordinate.pop();
            passedPath.push(cur);
            map[cur[0]][cur[1]] = PASSED; 
            // $('.mazeArea .innerMaze').children().eq(cur[0]).children().eq(cur[1]).addClass('AStarCover');
            document.querySelector('.mazeArea .innerMaze').children[cur[0]].children[cur[1]].className = 'AStarCover';
            //if reach end
            if (cur[0] == EndY && cur[1] == EndX){
                clearInterval(window.AstarAnimation);
                //add path in to list
                let res = [];
                res.push([EndY, EndX]);
                let parent = cur[2];
                while (parent != -1){
                    cur = passedPath[parent];
                    res.push([cur[0], cur[1]]);
                    parent = cur[2];
                }//reverse list
                let lo = 0;
                let hi = res.length - 1;
                while (lo < hi){
                    let temp = res[lo];
                    res[lo++] = res[hi];
                    res[hi--] = temp;
                }

                let index = 0;
                let reslen = res.length;
                window.drawCorrectPath = setInterval(function(){
                    if (index < reslen){
                        forAstar(res[index++]);
                    }else {

                        clearInterval(window.drawCorrectPath);
                        window.AstarAnimation = null;
                    }
                },0.001);
                
                
            }for (let i = 0; i < dirs.length; i++) {
                let tempY = cur[0] + dirs[i][0];
                let tempX = cur[1] + dirs[i][1];
                //if coordinate no allow, continue
                if (tempY < FIRSTROW || tempY > LASTROW || tempX < FIRSTCOLS || tempX > LASTCOLS || map[tempY][tempX] != EMPTY){
                    continue;
                }
                    
                map[tempY][tempX] = CURRENTPATH;
                $('.mazeArea .innerMaze').children().eq(tempY).children().eq(tempX).addClass('current');
                curCoordinate.insert([tempY, tempX, passedPath.length -1, startPrice(passedPath) + endPrice(tempY, tempX, EndY, EndX)]);
            }
        }else {
            clearInterval(window.AstarAnimation);
            window.AstarAnimation = null;
            canMove  = true;
            if (curSelected && curSelected.index() == $('.nav ul #pathfinding').index()){
                curSelected.removeClass('selected')
                curSelected = null;
                
            }
        }
    }, 0.001);
}