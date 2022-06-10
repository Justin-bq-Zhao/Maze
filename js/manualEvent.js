$(
    function(){
        $('.manualBox .exit').on('click', function(){
            $(this).parent().hide();
            $('#covering').hide();
        });
    }
)