$(function(){
    $('.nav .middle').attr('open', false);
    $('.nav .middle').on('click', function(){
        let menusTip = $(this);
        $(this).parents('.nav').stop();
        if (menusTip.attr('open')){
            menusTip.parents('.nav').animate(
                {
                    left : CurScreenLen,
                }, 500, 'linear', function(){
                    menusTip.text('');
                    menusTip.prop('title', 'open');
                }
            );
            menusTip.attr('open', false); 
        }else {
            menusTip.parents('.nav').animate(
                {
                    left : CurScreenLen - 60,
                }, 500, 'linear', function(){
                    menusTip.text('');
                    menusTip.prop('title', 'close');
                }
            );
            menusTip.attr('open', true); 
        }
    });

    $('.nav .middle, .nav ul li').on('selectstart', function(e){
        e.preventDefault();
    });



    $('.nav ul').on('click', function(e){
        
        curSelected && curSelected.removeClass('selected');
        if ($(e.target).index() == $('.nav ul #generate').index()){
            $('.AStarPathFind').hide();
            $('.manualBox').hide();
        }else if ($(e.target).index() == $('.nav ul #pathfinding').index()){
            $('#createMaze').hide();
            $('.manualBox').hide();
        }else if ($(e.target).index() == $('.nav ul #manual').index()){
            $('.AStarPathFind').hide();
            $('#createMaze').hide();
        }else{
            $('#covering').hide();
            $('.AStarPathFind').hide();
            $('#createMaze').hide();
            $('.manualBox').hide();
        }
        if ($(e.target).index() == $('.nav ul #delete').index() || $(e.target).index() == $('.nav ul #refresh').index()){
            curSelected = null;
        }else {
            curSelected = $(e.target);
        $(curSelected).addClass('selected');
        }

        
    });

    $('.nav ul #generate').on('click', function(){
        $('#createMaze').show();
        $('#covering').width($(window).width());  
        $('#covering').height($(window).height() - 1);
        $('#covering').show();
    });

    $('.nav ul #delete').on('click', function(){
        $('.mazeArea .innerMaze').empty();
        MazeExist = false;
        originMaze = null;
        curPos = null;
        $('.mazeArea').css({
            'transform' : 'scale(1,1)'
        });
    });

    $('.nav ul #refresh').on('click', function(){
        if (MazeExist){
            clearInterval(window.AstarAnimation);
            $('.mazeArea').css({
                'transform' : 'scale(1,1)',
            });    
            let MazeRows = originMaze.length;
            let MazeCols = originMaze[0].length;
            let inner = document.querySelector('.mazeArea .innerMaze');
            for (let i = 0; i < MazeRows; i++){
                for (let j = 0; j < MazeCols; j++){
                    inner.children[i].children[j].className = originMaze[i][j] == BLOCK ? 'block' : 'empty';
                }
            }
            SkipPos($('.mazeArea .innerMaze').children().eq(1).children().eq(1));
            

            $('.mazeArea').css({
                left : 77,
                top : 6
            });

            CurScreenLen = $(window).width();
            $('.nav .middle').click();
            $('.nav .middle').click();
        }
    });


    $('.nav ul #pathfinding').on('click', function(){
        
        $('.AStarPathFind').show();
        $('#covering').width($(window).width());  
        $('#covering').height($(window).height() - 1);
        $('#covering').show();
    });

    $('.nav ul #manual').on('click', function(){
        $('.manualBox').show();
        $('#covering').width($(window).width());  
        $('#covering').height($(window).height() - 1);
        $('#covering').show();
    });

});