button_colors=["red", "blue", "green", "yellow"];
game_pattern=[];
user_pattern=[];
j=0;
k=0;
c=1;
level=0
function newSequence(){
    var r=Math.floor(Math.random()*4);
    random_chosen_color=button_colors[r];
    var audio=new Audio("sounds/"+random_chosen_color+".mp3");
    audio.play();
    animate(random_chosen_color);
    game_pattern[k++]=random_chosen_color;
    level+=1;
    $("h1").text("Level "+level.toString());
}
function animate(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function(){ 
        $("#"+color).removeClass("pressed");
    }, 100);
}
$(".btn").click(function (event) {
    click_button(event);
});
function click_button(event) {
    animate(event.target.id);
    var audio=new Audio("sounds/"+event.target.id+".mp3");
    audio.play();
    user_pattern[j++]=event.target.id;
    if(j==(game_pattern.length))
    {
        check_answer();
    }
}
$("body").keypress(function(){
    if(c==1)
    {
        newSequence(); 
    }
    c=c+1;
});
function check_answer(){
    var i=0;
    while (i<user_pattern.length) {
        if(user_pattern[i]!=game_pattern[i])
        {
            console.log("Wrong");
            game_over();
            $("h1").text("Game Over.Press a key to restart the game");
            game_pattern=[];
            user_pattern=[];
            k=0;
            level=0;
            j=0;
            c=1;
            break;
        }
        i=i+1;
        if(i==(user_pattern.length))
        {
            user_pattern=[];
            j=0;
            setTimeout(function(){ 
                newSequence();
            }, 500);
            
            
        }
    }
}
function game_over() {
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){ 
        $("body").removeClass("game-over");
    }, 200);
}