$('.AStarPathFind .title').on(
    {
        'mousedown' : function(e){
            let x = e.pageX - $(this).parent().offset().left;
            let y = e.pageY - $(this).parent().offset().top;
            $('body').on('mousemove', function(e){
                $('.AStarPathFind').offset({
                    left : e.pageX - x, 
                    top : e.pageY - y
                });
            });

            $('body').on('mouseup', function(){
                $(this).off('mousemove');
                $(this).off('mouseup');
            })
        },

        'selectstart' : function(e){
            e.preventDefault();
        }
        
    }
);

$('.AStarPathFind').on('selectstart', function(e){
    e.preventDefault();
});

$('.AStarPathFind .exit').on('click', function(){
    $('.AStarPathFind').hide();
    $('#covering').hide();
    curSelected && curSelected.removeClass('selected')
    curSelected = null;
});



$('.AStarPathFind .submit').on('click', function(){
    if (MazeExist && curPos && originMaze){
        $('.AStarPathFind .exit').triggerHandler('click');
        let checkbox = $(this).prev().find('#showProcess').prop('checked');
        $(this).prev().find('#showProcess').prop('checked', false);
        
        if (checkbox){
            AStarWithAnimation(originMaze, [curPos.parent().index(), curPos.index()], [originMaze.length - 2, originMaze[0].length - 2]);

        }else {
            let res = AStarMarked(originMaze, [curPos.parent().index(), curPos.index()], [originMaze.length - 2, originMaze[0].length - 2]);
            let index = 0;
            window.AstarAnimation  = setInterval(function(){
                if (index < res.length){
                    
                    forAstar(res[index]);
                    index++;
                }else{
                    clearInterval(window.AstarAnimation);
                    curSelected && curSelected.removeClass('selected')
                    curSelected = null;
                }
            },0.001);
        }
    }else{
        alert('Please generate a maze first');
    }
    
});

