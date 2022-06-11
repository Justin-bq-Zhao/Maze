$('body').on('keydown', function(e){   //catch the key event 
    let key = e.keyCode; //get key code 
    if (canMove && MazeExist && curPos && (key == 40 || key == 83 || key == 39 || key == 68 || key == 37 || key == 65 || key == 38 || key == 87)){
        e.preventDefault();
        if (!this.timer ) {  //if can move and maze exist    
            if (key == 40 || key == 83){  //down
                nextPos('down');
            }else if (key == 39 || key == 68){  //right
                nextPos('right');
            }else if (key == 37 || key == 65){  //left
                nextPos('left');
            }else if (key == 38 || key == 87){  //up
                nextPos('up');
            };
            this.timer = setTimeout(function(){   //Timeout for prevent move too fast
                document.querySelector('body').timer = undefined;
            }, 100);  //100ms can move 1 step 
        }
    }
});