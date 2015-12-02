$(document).ready(function () {
    $('.div-ratings').raty(
        {
            path: 'images/',  
            score: function () {
                return $(this).attr('data-score'); 
            },
            half: true,
            starHalf: 'star-half.png', 
        }); 

    /* book title click - start */
    //$(".book-title a").click(function () {
    //    var bookid = $(this).data("book-id");
    //    $("#content").load("BookDetails.html" );
    //});
    //
    /* book title click - end */


});
 
