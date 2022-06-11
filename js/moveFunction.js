function nextPos(str){
    if (str == 'down'){
        let nextRow = curPos.parent().next();
        if (nextRow){
            let MTL = nextRow.children().eq(curPos.index()); //Moving target location
            if (MTL[0].className != 'block'){
                changeCurPos(MTL);
            }
        }      
    }else if (str == 'left'){
        let prev = curPos.prev();
        if (prev && prev[0].className != 'block'){
            changeCurPos(prev);
        }
    }else if (str == 'right'){
        let next = curPos.next();
        if (next && next[0].className != 'block'){
            changeCurPos(next);
        }
    }else {
        let prevRow = curPos.parent().prev();
        if (prevRow){
            let MTL = prevRow.children().eq(curPos.index()); //Moving target location
            if (MTL[0].className != 'block'){
                changeCurPos(MTL);
            }
        }
    }
}

function changeCurPos(newPos){
    curPos.removeClass('curPos');
    newPos.addClass('passed');
    newPos.addClass('curPos');
    newPos.css({
        'font-size' : cellLen + 'px'
    });
    curPos = newPos;
}

function SkipPos(newPos){
    if (newPos.get(0).className == 'block'){
        alert('Can\'t skip into a block');
    }else{
        changeCurPos(newPos);
    }
}

function forAstar(location){
    let newPos = $('.mazeArea .innerMaze').children().eq(location[0]).children().eq(location[1]);
    curPos.removeClass('curPos');
    curPos.removeClass('AStarCover');
    newPos.addClass('correct');
    newPos.addClass('curPos');
    curPos = newPos;
}