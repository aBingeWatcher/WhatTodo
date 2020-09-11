$(document).ready(function(){
    $('form').on('submit', function(){

        var item= $('form input');     //equal to the input field in the form
        var todo= { item: item.val() };

        //app.post() in todoController.js is fired when this ajax request is made
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,    //this data can be accessed in app.post() [todoController.js]
            
            success: function(data){        //*** data in param is updated data after being added in the todoController.js 
                //do something with the data via front end framework
                
                location.reload();     //reloading the page so that new data can be added in the list
            }
        });

        return false;

    });

    $('li').on('click', function(){
        var item= $(this).text().replace(/ /g,"-"); //blank space is replaced with -
        $.ajax({
            type:'DELETE',
            url: '/todo/'+ item,
            success: function(data){
                //do something with the data via front  end 
                location.reload();
            }
        });

    });
});