$(function(){
   var all_question_run  = [ null, [0,0] , [0,0] , [0,0] ,[0,0]];
   var currentQuiz = null;
   var lastQuiz = 0;
   $("#startButton").click(function()
    {
        if(currentQuiz == null)
        {
            $("#ROCN_picture").show()
            $("#question").text("請問這是甚麼戰艦?");
            lastQuiz = 0;
            currentQuiz = Math.floor(Math.random() * 4 + 1);
            all_question_run[currentQuiz][0] = 1;
            all_question_run[currentQuiz][1] = lastQuiz;
            lastQuiz = currentQuiz;
            $("#ROCN_picture").attr("src","圖檔/" + answers[currentQuiz].name + ".jpg");
            $("#options").empty();
            answers[currentQuiz].answer.forEach(function(element,index,array)
            {
                $("#options").append(`<input name = "options" type = "radio"
                                    value = "${index}"><label>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value","Next");
        }
        else
        {
            $.each($(":radio"),function(i,val){
                if(val.checked)
                {
                    answers[currentQuiz].check_correct = val.value;
                    var flag = 0;
                    for(var i = 1; i < all_question_run.length; i++)
                    {
                        if(all_question_run[i][0] == 0)
                            flag = 1;
                    }
                    if(flag == 0)
                    {
                        var total_fraction = 0;
                        $("#ROCN_picture").hide();
                        $("#question").empty();
                        $("#options").empty();
                        $("#options").append(`<table>`);
                        for(var i = 0; i < 4; i++)
                        {
                            $("#options").append(`<tr>`);
                            $("#options").append(`<td><img src = "圖檔/${answers[currentQuiz].name}.jpg"</td>`)
                            $("#options").append(`<td><p>${answers[currentQuiz].Description}</p></td>>`)
                            if(answers[currentQuiz].answer[answers[currentQuiz].check_correct][1] != 0)
                            {
                                $("#options").append(`<td>answer:Correct!</td>`);
                                total_fraction +=answers[currentQuiz].answer[answers[currentQuiz].check_correct][1];
                                answers[currentQuiz].check_correct = -1;
                            }
                            else
                            {
                                $("#options").append(`<td>answer:Wrong!</td>`);
                                total_fraction +=answers[currentQuiz].answer[answers[currentQuiz].check_correct][1];
                                answers[currentQuiz].check_correct = -1;
                            }
                            lastQuiz = currentQuiz;
                            currentQuiz = all_question_run[currentQuiz][1];
                            all_question_run[lastQuiz][0] = 0;
                            all_question_run[lastQuiz][1] = 0;
                            $("#options").append(`</tr>`);
                        }
                        $("#options").append(`</table>`);
                        $("#question").text("總得分:" + total_fraction);
                        $("#startButton").attr("value","重新開始");
                        currentQuiz = null;
                        return false;
                    }
                    else
                    {
                        var no_repeat_question = 0;
                        while(no_repeat_question == 0)
                        {
                            currentQuiz =Math.floor(Math.random() * 4 + 1);
                            if(all_question_run[currentQuiz][0] == 0)
                                no_repeat_question = 1;
                        }
                        all_question_run[currentQuiz][0] = 1;
                        all_question_run[currentQuiz][1] = lastQuiz;
                        lastQuiz = currentQuiz;
                        $("#ROCN_picture").attr("src","圖檔/"+ answers[currentQuiz].name + ".jpg");
                        $("#options").empty();
                        answers[currentQuiz].answer.forEach(function(element,index,array)
                        {
                            $("#options").append(`<input name = "options" type = "radio"
                                                value = "${index}"><label>${element[0]}</label><br><br>`);
                        });
                    }
                }
            });
        }
    });
});
