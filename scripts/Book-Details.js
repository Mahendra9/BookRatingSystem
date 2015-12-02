function getQueryStrings() {
    var assoc = {};
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');

    for (var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
            assoc[decode(key[0])] = decode(key[1]);
        }
    }

    return assoc;
}

function getBookDetails(bookID) {
    $.ajax({
        type: "GET",
        url: "BooksDetails.json",
        async: true,
        dataType: "json",
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("application/j-son;charset=UTF-8");
            }
        },
        success: function (data) {
            parseObject(data, bookID);
        },
        error: function (xhr, textStatus, errorThrown) { 
            $("#err-msg").text("Sorry but there was an error:" + xhr.status + " " + xhr.statusText);
            $("div[class='row']").hide();
            $("#err-msg").show();
            $("body").css({ 'background-size': '1600px 1000px' });
        }
    });
}

function parseObject(data, bookID) {
    var parsedObj = eval(data);
    var isBookExists = false;
    for (var i = 0; i < parsedObj.Books.length; i++) {
        if (parsedObj.Books[i].book_id === bookID) {
            isBookExists = true;
            $("#img-lg").attr("src", parsedObj.Books[i].book_img_src);
            $("#book-title").text(parsedObj.Books[i].book_title);
            $("#author").text(parsedObj.Books[i].book_author);
            $("#num-pages").text(parsedObj.Books[i].book_num_pages);
            $("#num-views").text(parsedObj.Books[i].book_num_views);
            $("#num-buys").text(parsedObj.Books[i].book_num_buys);

            var isBookOwned = eval(parsedObj.Books[i].book_is_owned);
            if (isBookOwned) {
                $("#is-user-owned").addClass("label-success");
                $("#is-user-owned").text("Owned");
            }
            else {
                $("#is-user-owned").addClass("label-danger");
                $("#is-user-owned").text("Buy");
            }

            $("#avg-rating").attr("data-score", parsedObj.Books[i].book_avg_rating);

            $('.div-ratings').raty({
                path: 'images/',
                score: function () {
                    return $(this).attr('data-score');
                },
                half: true,
                starHalf: 'star-half.png'
            });

            $("#para-1").text(parsedObj.Books[i].book_para_1);
            $("#para-2").text(parsedObj.Books[i].book_para_2);
            $("#para-3").text(parsedObj.Books[i].book_para_3);
        }
    }
    if (!isBookExists) {
        $("#err-msg").text("OOPS!!! This book does not exist in our website");
        $("div[class='row']").hide();
        $("#err-msg").show();
        $("body").css({ 'background-size': '1600px 1000px' });
    }
}

$(document).ready(function () {
    var qs = getQueryStrings();
    for (var item in qs) {
        if (item == 'bookId') {
            getBookDetails(qs[item]);
        }
        else {
            $("#err-msg").text("Cannot process the query strings.");
            $("div[class='row']").hide();
            $("#err-msg").show();
            $("body").css({ 'background-size': '1600px 1000px' });
        }
    }
});

