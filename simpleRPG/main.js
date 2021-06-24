let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
let musicplayer = document.getElementById("music");
const  gridLength = 200;
const canvas_height = 1800;
const canvas_width = 1800;
let endflag = 0;
let badflag = 0;
let goodflag = 0;
//mapArray - 決定地圖中每個格子的元素
//ctx -HTML5 Canvas用
//currentImgMainX
$(function(){
    // 0可走 1:障礙, 2:終點, 3:敵人, 4:洞洞, 5:蛋糕
    mapArray = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 4, 1, 3, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 5, 4, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 0, 1, 0, 2],
        [0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 4 ,1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1,]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0,
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0 ,0 , 80 , 130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imghole = new Image();
    imghole.src = "images/blood_building.png"
    imgcake = new Image();
    imgcake.src = "images/material.png";
    imggameover = new Image();
    imggameover.src = "images/Gameover.jpg";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray)
            {
                for(var y in mapArray[x])
                {
                    //繪製障礙
                    if(mapArray[x][y] == 1)
                    {
                        ctx.drawImage(imgMountain,32 , 65 , 32 , 32 , y * gridLength , x * gridLength, gridLength , gridLength)
                    }
                    else if(mapArray[x][y] == 3)
                    {
                        ctx.drawImage(imgEnemy,7, 40 , 104 , 135 , y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                    else if(mapArray[x][y] == 5)
                    {
                        ctx.drawImage(imgcake,130,97, 27, 29,y * gridLength, x * gridLength, gridLength, gridLength)
                    }
                }
            }
        };
    };
});

$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x": -1,
        "y": -1
    }
    targetBlock = {
        "x": -1,
        "y": -1
    }
    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁.....
    if(endflag == 0)
    {
        switch(event.code)
        {
            case "ArrowLeft":
                targetImg.x = currentImgMain.x - gridLength;
                targetImg.y = currentImgMain.y;
                cutImagePositionX = 175;
                break;
            case "ArrowUp":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y - gridLength;
                cutImagePositionX = 355;
                break;
            case "ArrowRight":
                targetImg.x = currentImgMain.x + gridLength;
                targetImg.y = currentImgMain.y;
                cutImagePositionX = 540;
                break;
            case "ArrowDown":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y + gridLength;
                cutImagePositionX = 0;
                break;
            default:
                return;
        }
        if(targetImg.x <= canvas_width - 200 && targetImg.x >= 0 && targetImg.y <= canvas_height - 200 && targetImg.y >= 0)
        {
            targetBlock.x = targetImg.x / gridLength;
            targetBlock.y = targetImg.y / gridLength;
        }
        else
        {
            targetBlock.x = -1;
            targetBlock.y = -1;
        }
        ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        if(targetBlock.x != -1 && targetBlock.y != -1)
        {
            switch(mapArray[targetBlock.y][targetBlock.x])
            {
                case 0:
                    $("#talkBox").text("");
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    break;
                case 1:
                    $("#talkBox").text("有山");
                    break;
                case 2:
                    $("#talkBox").text("抵達終點");
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    endflag = 1;
                    goodflag = 1;
                    break;
                case 3:
                    $("#talkBox").text("被敵人殺死");
                    imgMain.src = "";
                    endflag = 1;
                    badflag = 3;
                    break;
                case 4:
                    $("#talkBox").text("掉進洞裡死去");
                    ctx.drawImage(imghole,447,385, 30, 62,targetBlock.x * gridLength, targetBlock.y * gridLength, gridLength, gridLength)
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    imgMain.src = "";
                    endflag = 1;
                    badflag = 4;
                    break;
            };
        }
        else
        {
            $("#talkBox").text("邊界");
        }
        if(endflag != 0)
        {
            if(goodflag == 1)
            {
                goodend();
            }
            else
            {
                setTimeout(gameover,800);
            }
        }
        ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
});

function gameover()
{
    $("#myCanvas").css("visibility","hidden");
    $("#myCanvas").css("width",0);
    $("#myCanvas").css("height",0);
    $(".gamespace").append("<img src = 'images/Gameover.jpg' width = '1200px' height = '1200px' alt = 'gameover'>");
    if(badflag == 3)
        $(".title").text("Bad End #1");
    else if (badflag == 4)
        $(".title").text("Bad End #2");
    musicplayer.play()
}
function goodend()
{
    $("#myCanvas").css("visibility","hidden");
    $("#myCanvas").css("width",0);
    $("#myCanvas").css("height",0);
    $(".title").text("Good End #1");
    musicplayer.src = "music/歡呼聲.mp3";
    musicplayer.play();
}
