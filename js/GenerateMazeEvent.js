$(
    function(){

        let number = $('#createMaze .number input');
        
       
        number.on('keyup', function(){
            let judge = $(this).next().next();
            let regularInt = /^-?[0-9]+$/;
            if ($(this).val() && regularInt.test($(this).val())){
                if (parseInt($(this).val()) < 1){
                    $(this).attr('accept', 'false');
                    judge.text('Row can\'t be 0 or negetive');
                    judge.addClass('error');
                }else {
                    $(this).attr('accept', 'true');
                    judge.text('Accept');
                    judge.removeClass('error');
                }     
            }else{
                $(this).attr('accept', 'false');
                judge.text($(this).val() ? 'Not An Integer' :'');
                judge.addClass('error');
            }
        });

        number.each(function(i,d){
            $(d).triggerHandler('keyup');
        });

        $('#createMaze .number .minus').on('mousedown', function(){
            let number = $(this).next();
            let flag = true; 
            function minus (){
                if (flag && number.attr('accept') == 'true'){
                    number.val(number.val() - 1);
                    number.triggerHandler('keyup');
                }
            }
            minus();
            setInterval(minus, 100);
            function callback(){
                flag = false;
                $(this).off('mouseup');
                $(this).off('mouseleave');
            }

            $('#createMaze .number .minus').on(
                {
                    'mouseup' : callback,
                    'mouseleave' : callback,
                }
            );
            
        });

        $('#createMaze .number .add').on('mousedown', function(){
            let number = $(this).prev();
            let flag = true; 
            let regularInt = /^-?[0-9]+$/;
            function add(){
                if (flag && regularInt.test(number.val())){
                    number.val(Number(number.val()) + 1);
                    number.triggerHandler('keyup');
                }
            }
            add();
            setInterval(add, 100);
            function callback(){
                flag = false;
                $(this).off('mouseup');
                $(this).off('mouseleave');
            }
            $('#createMaze .number .add').on({
                'mouseup': callback,
                'mouseleave' : callback,
                }
            );
        });

        $('#createMaze .title').on(
            {
                'mousedown' : function(e){
                    let x = e.pageX - $(this).parent().offset().left;
                    let y = e.pageY - $(this).parent().offset().top;
                    $('body').on('mousemove', function(e){
                        $('#createMaze').offset({
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

        $('#createMaze').on({     
            'selectstart' : function(e){
                e.preventDefault();
            }
        });

        $('#createMaze .exit').on(
            'click', function(){
                $(this).parent().hide();
                $('#covering').hide();
                if (curSelected && curSelected.index() == $('.nav ul #generate').index()){
                    curSelected.removeClass('selected')
                    curSelected = null;
                }
            }
        )

        $('#createMaze .submitArea .submit').on('click', function(){
            MazeExist = false;
            let rowtext = $(this).parent().siblings('.getRow').find('.number #rowNumber');
            let coltext = $(this).parent().siblings('.getCol').find('.number #colNumber');
            if (rowtext.attr('accept') == 'true' && coltext.attr('accept') == 'true'){
                $('.nav ul #delete').triggerHandler('click');
                let row = rowtext.val();
                let col = coltext.val();
                if (row % 2 == 0) row ++;
                if (col % 2 == 0) col ++;
                let maze = $('.mazeArea');
                maze.show();
                let mazeWidth = maze.width();
                let mazHeight = maze.height();
                let innerbox = $('.mazeArea .innerMaze');
                let cellY = mazHeight / row;
                let cellX = mazeWidth / col;
                if (cellY > cellX){
                    cellY = cellX;
                }else{
                    cellX = cellY;
                }let innerBoxWidth = cellX * col + 1;
                let innerBoxHeight = cellY * row;
                let marginY = (mazHeight - innerBoxHeight)/2;
                let marginX = (mazeWidth - innerBoxWidth)/2;
                cellLen = cellY;
                innerbox.css({
                    width : innerBoxWidth,
                    height : innerBoxHeight,
                    margin :  marginY+'px ' + marginX +'px'
                });
                let checkbox = $(this).prev().find('#display').prop('checked');
                $(this).prev().find('#display').prop('checked', false);
                $('#createMaze .exit').click();
                if (checkbox){

                    // for (let i = 0; i < row; i++){
                    //     let row = $('<ul></ul>');
                    //     row.css({
                    //         width : innerBoxWidth,
                    //         height : cellX,
                    //     });
                    //     for (let j = 0; j < col; j++){
                    //         let cell = $('<li></li>');
                    //         cell.css({
                    //             width : cellX,
                    //             height : cellY,
                    //             float : 'left'
                    //         });
                    //         cell.addClass('block');
                    //         row.append(cell);
                    //     } innerbox.append(row);
                    // }

                    
                    //html() + array join is faster than the element append approch in this case 
                    let ulArr = ['<ul>'];
                    for (let i = 0; i < col;i++){
                        ulArr.push('<li></li>');
                    }
                    ulArr.push('</ul>');
                    let ulstr = ulArr.join('');
                    let HTMLArr = [];
                    for (let i = 0; i < row; i++){
                        HTMLArr.push(ulstr);
                    }
                    
                    innerbox.html(HTMLArr.join(''));
                    let uls = innerbox.children();
                    uls.css({
                        width : innerBoxWidth,
                        height : cellX,
                    });

                    uls.children().css({
                        width : cellX,
                        height : cellY,
                        float : 'left'
                    });

                    uls.children().addClass('block');

                    PrimGenerateMazeWithAnimation(row,col, innerbox);
            
                }else{
                    let mazeArray = PrimGenerateMaze(row,col);
                    originMaze = mazeArray;
                    for (let i = 0; i < row; i++){
                        let row = $('<ul></ul>');
                        row.css({
                            width : innerBoxWidth,
                            height : cellX,
                        });
                        for (let j = 0; j < col; j++){
                            let cell = $('<li></li>');
                            cell.css({
                                width : cellX,
                                height : cellY,
                                float : 'left'
                            });
                            if (mazeArray[i][j] == BLOCK){
                                cell.addClass('block');
                            }else {
                                cell.addClass('empty');
                            }row.append(cell);
                        }innerbox.append(row);
                    }

                    //Array join string + html() slower than the append() in this case 

                    // let ulArr = ['<ul>'];
                    // for (let i = 0; i < col;i++){
                    //     ulArr.push('<li></li>');
                    // }
                    // ulArr.push('</ul>');
                    // let ulstr = ulArr.join('');
                    // let HTMLArr = [];
                    // for (let i = 0; i < row; i++){
                    //     HTMLArr.push(ulstr);
                    // }
                    
                    // innerbox.html(HTMLArr.join(''));

                    // for (let i = 0; i < row; i++){
                    //     let ul = innerbox.children().eq(i);
                    //     ul.css({
                    //         width : innerBoxWidth,
                    //         height : cellX
                    //     });
                    //     for (let j = 0; j < col; j++){
                    //         let li = ul.children().eq(j);
                    //         li.css({
                    //             width : cellX,
                    //             height : cellY,
                    //             float : 'left'
                    //         });
                    //         if (mazeArray[i][j] == BLOCK){
                    //             li.addClass('block');
                    //         }else {
                    //             li.addClass('empty');
                    //         }
                    //     }
                    // };

                    MazeExist = true;
                    canMove = true;
                    curPos = $('.mazeArea').children().children().eq(1).children().eq(1);
                    curPos.addClass('passed');
                    curPos.addClass('curPos');
                    curPos.css({
                        'font-size' : cellY + 'px'
                    });
                    cellLen = cellY;
                    if (curSelected && curSelected.index() == $('.nav ul #generate').index()){
                        curSelected.removeClass('selected')
                        curSelected = null;
                    }
                }

                CurScreenLen = $(window).width();
                $('.nav .middle').click();
                $('.nav .middle').click();
                
            }else{
                $('#createMaze .submitArea .submitRes').text(' Illegal Parameters')
            }
           

        });
    }
)             //Create Maze Interface Event 