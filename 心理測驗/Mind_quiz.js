//類似window.onload
$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //當按鈕按下後，要做得事情
    $("#startButton").click(function(){
        
        if(currentQuiz == null)
        {
            currentQuiz = 0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選項區清空
            $("#options").empty();
            //將選項逐個加入
            questions[0].answers.forEach(function(element,index,array)
            {
                $("#options").append(`<input name = 'options' type = 'radio'
                value = '${index}'><label>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value","Next");
            //將按鈕上的文字換成Next
        }
        else
        {
            //已經開始作答從這邊繼續
            //拜訪哪一個選項有類選取
            //alert(questions[currentQuiz].answers[i][1]);
            $.each($(":radio"),function(i,val){
                if(val.checked)
                {
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        //通往最終結果的標題
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項清空
                        $("#options").empty();
                        //顯示最終結果
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                        return false;
                    }
                    else
                    {
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function (element,index,array) 
                        {
                           $("#options").append(`<input name = "options" type = "radio" value = '${index}'
                           <label>${element[0]}</label><br><br>` ); 
                        });
                    }
                }
            });
        }  
    });
});
