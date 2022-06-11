$(
    function(){
        $('.mazeArea').on('click', function(e){
            if (MazeExist && e.target != this && curSelected){
                
                if (curSelected.index() == $('.nav ul #enlarge').index()){
                    
                    let clickY = 2 * e.pageY - $(this).offset().top - e.clientY;
                    let clickX = 2 *e.pageX  - $(this).offset().left - e.clientX;
                    let str = $(this).css('transform');
                    str = str.substring(7,str.length - 1);
                    let arr = str.split(',');
            
                    $(this).css({
                        // 'transform-origin': (clickX / arr[0]) + 'px ' + (clickY / arr[3]) + 'px',
                        // 'transform-origin' : 'center center', 
                        'transform-origin' : '0 0',
                        'transform' : 'scale(' + ((arr[0]) * 2) + ', ' + ((arr[3]) * 2) + ')',
                    });    
                    window.scroll(clickX, clickY);
                    CurScreenLen = $(window).width();
                    $('.nav .middle').click();
                    $('.nav .middle').click();
                    // window.scroll(clickX,clickY);
                    // setTimeout(function(){
                    //     // window.scroll(clickX,clickY);
                    // }, 100);
                    // resizeMaze($(this), newX, newY);
                }else if (curSelected.index() == $('.nav ul #zoomOut').index()){
                    let clickY = e.pageY / 2 + $(this).offset().top / 2 - e.clientY;
                    let clickX =  e.pageX / 2 + $(this).offset().left / 2  - e.clientX;
                    let str = $(this).css('transform');
                    str = str.substring(7,str.length - 1);
                    let arr = str.split(',');
                    // $(this).css({
                    //     'transform-origin':( centerX + 'px ' + centerY + 'px'),
                    //     'transform' : 'scale(' + (arr[0] * 2) + ', ' + (arr[3] * 2) + ')',
                    // });
                    // let newX = $(this).width() * 2;
                    // let newY = $(this).height() * 2;
                    // $(this).width(newX);
                    // $(this).height(newY);
            
                    $(this).css({
                        // 'transform-origin': (clickX / arr[0]) + 'px ' + (clickY / arr[3]) + 'px'
                        'transform-origin' : '0 0',
                        'transform' : 'scale(' + ((arr[0]) / 2) + ', ' + ((arr[3]) / 2) + ')',
                    });    
        
                    window.scroll(clickX, clickY);
                    CurScreenLen = $(window).width();
                    $('.nav .middle').click();
                    $('.nav .middle').click();
                }else if (curSelected.index() == $('.nav ul #skip').index()){
                    if (e.target.tagName == 'LI'){
                        SkipPos($(e.target));
                    }
                   
                }
            }
            
        });
        
        $('.mazeArea').on('mousedown', function(e){
            if (MazeExist && e.target != this && curSelected){
                let x = e.pageX - $(this).offset().left;
                let y = e.pageY - $(this).offset().top;
                $('body').on('mousemove', function(e){
                    $('.mazeArea').offset({
                        left : e.pageX - x, 
                        top : e.pageY - y
                    });
                });

                $('body').on('mouseup', function(){
                    $(this).off('mousemove');
                    $(this).off('mouseup');
                    CurScreenLen = $(window).width();
                    $('.nav .middle').click();
                    $('.nav .middle').click();
                });
            };
        });


        $('.innerArea').on({
            mouseenter : function(){
                if (MazeExist && e.target != this && curSelected){
                    $('innerArea').css({
                        cursor : 'grab',
                    });
                };
            }, 
            mouseleave : function(){
                $('innerArea').css({
                    cursor : 'default',
                });
            }
        });
    }
);
