$(
    function(){
        $('.manualBox .exit').on('click', function(){
            $(this).parent().hide();
            $('#covering').hide();
            canMove  = true;
            if (curSelected && curSelected.index() == $('.nav ul #manual').index()){
                curSelected.removeClass('selected')
                curSelected = null;
            
            }
        });
    }
)