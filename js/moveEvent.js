$('body').on('keydown', function(e){   //catch the key event 
    if (!this.timer && MazeExist && curPos) {  //if can move and maze exist    
        let key = e.keyCode; //get key code 
        if (key == 40 || key == 83){  //down
            e.preventDefault();
            nextPos('down');
        }else if (key == 39 || key == 68){  //right
            e.preventDefault();
            nextPos('right');
        }else if (key == 37 || key == 65){  //left
            e.preventDefault();
            nextPos('left');
        }else if (key == 38 || key == 87){  //up
            e.preventDefault();
            nextPos('up');
        };
        this.timer = setTimeout(function(){   //Timeout for prevent move too fast
            document.querySelector('body').timer = undefined;
        }, 100);  //100ms can move 1 step 
    }
});