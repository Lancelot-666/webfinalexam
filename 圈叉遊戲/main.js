let current_table_element;
let player_choice;
let computer_choice;
let start = 0;
let player = 1;
let winflag = 0;
function init()
{
    current_table_element = document.getElementsByTagName("img");
}
$("#playbutton").click(function()
{
    if(start == 0)
    {
        $(".mymodal1").css("visibility","visible");
        $("#O").click(function()
        {
            player_choice = true;
            computer_choice = false;
            start = 1;
            $(".mymodal1").css("visibility","hidden");
        });
        $("#X").click(function()
        {
            player_choice = false;
            computer_choice = true; 
            start = 1;
            $(".mymodal1").css("visibility","hidden");
        });
    }
    else
    {
        if(winflag == 1)
            reset_all();
    }
})
function ch(i)
{
    if(start == 1 && winflag == 0) 
    {
        if(current_table_element[i].alt !='E')
            return;
        if(player_choice == true ) 
        {
            current_table_element[i].src = "圖檔/圈.png";
            current_table_element[i].alt = "O";
            player++;
        }
        else 
        {
            current_table_element[i].src = "圖檔/叉.png";
            current_table_element[i].alt = "X";
            player++;
        }
        whowins();
        if(winflag == 1)
        {
            $("#playbutton").attr("value","restart")
            return;
        }
        $(".mymodal2").css("visibility","visible");
        $('#end').text("computer player");
        setTimeout(computerplaytime,2000);
        setTimeout(function () {$(".mymodal2").css("visibility","hidden");},2000)
        setTimeout(whowins,2005);
        setTimeout(function () {
                if(winflag == 1)
                {
                    $("#playbutton").attr("value","restart")
                    return;
                }
            },2010)
    }
    else
        return;
}
function reset_all()
{
    for(var i = 0; i < 9; i++)
    {
        current_table_element[i].src = "圖檔/E.gif";
        current_table_element[i].alt = "E";
    };
    current_table_element = document.getElementsByTagName("img");
    start = 0;
    player_choice = null;
    computer_choice = null;
    player = 1;
    winflag = 0;
    $('#end').text("player");
    $("#playbutton").attr("value","play")
}
function computerplaytime()
{
    let computer_choice_position = Math.floor(Math.random() * 9);
    while(current_table_element[computer_choice_position].alt != "E")
        computer_choice_position = Math.floor(Math.random() * 9);
    if(computer_choice == true)
    {
        current_table_element[computer_choice_position].src = "圖檔/圈.png";
        current_table_element[computer_choice_position].alt = "O";
        player++;
    } 
    else
    {
        current_table_element[computer_choice_position].src = "圖檔/叉.png";
        current_table_element[computer_choice_position].alt = "X";
        player++;
    }
}
function whowins()
{
    if(current_table_element[0].alt + current_table_element[1].alt + current_table_element[2].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[3].alt + current_table_element[4].alt + current_table_element[5].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[6].alt + current_table_element[7].alt + current_table_element[8].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[0].alt + current_table_element[3].alt + current_table_element[6].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[1].alt + current_table_element[4].alt + current_table_element[7].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[2].alt + current_table_element[5].alt + current_table_element[8].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[2].alt + current_table_element[4].alt + current_table_element[6].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[0].alt + current_table_element[4].alt + current_table_element[8].alt == "OOO")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[0].alt + current_table_element[1].alt + current_table_element[2].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[3].alt + current_table_element[4].alt + current_table_element[5].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[6].alt + current_table_element[7].alt + current_table_element[8].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[0].alt + current_table_element[3].alt + current_table_element[6].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[1].alt +current_table_element[4].alt + current_table_element[7].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[2].alt + current_table_element[5].alt + current_table_element[8].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[2].alt + current_table_element[4].alt +current_table_element[6].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else if(current_table_element[0].alt + current_table_element[4].alt + current_table_element[8].alt == "XXX")
    {
        if((player - 1) % 2 == 1)
            $('#end').text("player win!");
        else
            $('#end').text("computer player win!");
        winflag = 1;
    }
    else
    {
        for(var i = 0; i < 9 ; i++)
        {
            if(current_table_element[i].alt == "E")
            {
                $('#end').text("player");
                return;
            }
        }
        $('#end').text("Draw!!!");
        winflag = 1;
        return;
    }
}