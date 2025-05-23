

//gam chararacter variables
var PlayableCharacter_x;
var PlayableCharacter_y;

var Moving_Left = false;
var Moving_Right = false;
var Character_Falling = false;
var Character_Plummet_In_Canyon = false;

//game characters mehanic
var Jump_Cap_Limit; //jump's height limit
var Character_Floor; //determine which 'surface' will allow the character to stand on

//green Character_Floor variable
var Character_Floor_Y_Height;

//collectable variables
var Among_Us_Collectables;
var ThisCollectableSize = 1;

//canyon variables
var Canyons;
var ThisCanyonSize = 1;

//mountain
var Mountains;
var ThisMountainSize = 1; //allow me to make the size of each mountain different

//trees
var Trees_x;
var Trees_y;

//the cluds
var MovingClouds;
var ThisCloudSize = 1;//allow me to make the size of each cloud different

//moon
var The_Moon_x;
var The_Moon_y;

//sidescrolling
var cameraPosX;

//initial_Objective_Text 
var Initial_Objective_Text = true;
var Objective_Text_Final_x;

//score counter
var game_score;

//final destination
var flagpole;
var flag;

//lives
var heart = 3;
var heartsPosition;

//game status
var game=false;

//platform
var platform=[];
var checkPlat;

//enemies
var enemies = [];

//voices
var emit;

//sound section
let jumpAudio;
let collectableFoundAudio;
let plummetingAudio;
let levelCompleteAudio;
let ambientAudio;
let walkingOnGrass;
var audioLoadCounter;
var audioLoaded;

//way to "win"
var facing=0;

//sound loading// all sound are from www.zasplat.com
function preload()
{   
    audioLoadCounter = 0;
    audioLoaded = false;

    soundFormats("mp3");
    jumpAudio = loadSound("assets/zapsplat_jump.mp3",audioLoadedCheck);
    collectableFoundAudio = loadSound("assets/zapsplat_collectable.mp3",audioLoadedCheck);
    plummetingAudio = loadSound("assets/zapsplat_decend.mp3",audioLoadedCheck);
    levelCompleteAudio = loadSound("assets/zapsplat_level complete.mp3",audioLoadedCheck);
    ambientAudio = loadSound("assets/zapsplat_atmos.mp3",audioLoadedCheck);
    walkingOnGrass = loadSound("assets/zapsplat_walking_grass.mp3",audioLoadedCheck);

    ambientAudio.setVolume(0.07);
    jumpAudio.setVolume(0.01);
    collectableFoundAudio.setVolume(0.1);
    plummetingAudio.setVolume(0.01);
    levelCompleteAudio.setVolume(0.5);
    walkingOnGrass.setVolume(0.05);

}

function audioLoadedCheck()
{
    audioLoadCounter+=1;
    if (audioLoadCounter == 5)
    {
        audioLoaded = true;
    }
}
//end of sound
function setup()
{   //check the bottom
    initialiseWhenPlayerDies();

    //enemies
    for (var i =0; i<6;i++)
    {
        var randomX = random(-300,1000);
        var randomY = Character_Floor_Y_Height; //well its not random right now
        var randomD = floor(random(50,300));
        var availDirection = [-1,1];
        var randomDir = floor(random(availDirection));
        enemies.push(new enemySetup(randomX,randomY,randomD,randomDir)) ;
    }

    //platforms generation
    for (var i=0;i<6;i++)
    {
        var randomX = random(-100,2000);
        var randomY = random(Character_Floor_Y_Height-20, Character_Floor_Y_Height - 140);
        var randomD = floor(random(50,300));
        var availDirection = [-1,1];
        var randomDir = floor(random(availDirection));
        platform.push( createPlatform(randomX,randomY,randomD,randomDir) );
    }
    platform.push(createPlatform(width/3 - 35,Character_Floor_Y_Height-200,0,0));

    //lives position
    heartsPosition = {x: width /2 , y: 50};

    //Mountains' x position creator
    Mountains = [{x:50},{x:0},{x:0}];
    for (var i =1 ; i <3 ; i++)
    {
        Mountains[i].x= int(random(500,2000));
    }

    //canyon position randomiser
    Canyons= [{x:0},{x:0},{x:0}];

    for (var i =0;i<3;i++)
    {
        R = random(70,1400);
        var u = i-1;
        if ( i != 0 && dist(Canyons[u] , Character_Floor_Y_Height , Canyons[i] , Character_Floor_Y_Height) <= 300)
        {i-=1;}
        Canyons[i].x = R;
    }

    //collectable position randomiser.(the found is for later)
    Among_Us_Collectables = [{x: 0, y: 0, found: false}, {x: 0, y: 0, found: false}, {x: 0, y: 0, found: false}, {x: 0, y: 0, found: false}];

    for (var i =0;i<4;i++)
    {
        Among_Us_Collectables[i].x = random(60,1800);
        Among_Us_Collectables[i].y = random(Character_Floor_Y_Height-40, Character_Floor_Y_Height-200);
    }

    //trees' fixed position
    Trees_y = Character_Floor_Y_Height - (height - Character_Floor_Y_Height);
    Trees_x = [50, 700, 900, 1300];

    //voices
    emit = new emittingVoices(PlayableCharacter_x,Character_Floor_Y_Height,0,0);
    emit.startEmittingVoices(6,300);

    //    if the audios are not loaded, the game wont run via continuous refresh
    if (audioLoaded==false)
    {
        return;
    }

    //play the ambient bgm
    ambientAudio.play();
}


function draw()
{

    // allow the screen to center on the game character
    cameraPosX = PlayableCharacter_x - width/2;

    ///////////DRAWING CODE//////////
    //Blue sky
    background(0,30,80);

    ////THE GREEN GROUND////
    noStroke();
    fill(0,70,0);
    rect(0, Character_Floor_Y_Height, width, height - Character_Floor_Y_Height);
    ////END OF THE GREEN GROUND////

    ////THE MOON////
    fill(255,100,100);
    ellipse(The_Moon_x,The_Moon_y,100,100);
    ////END OF THE MOON////

    ////PLAYER'S REMAINING LIVES////
    drawHearts(heart, heartsPosition);
    ////END OF DRAWING LIVES////

    // translate the og (0,0) to (-170.66,0)
    push();
    translate(-cameraPosX,0); 


    /////CANYON/////
    drawCanyons(Canyons);
    checkCanyons(Canyons);

    //repeated code for other game mechanic to work
    if (Character_Plummet_In_Canyon == false)
    {Character_Floor = Character_Floor_Y_Height;}
    else if (Character_Plummet_In_Canyon == true)
    {Character_Floor = height+200;}
    ////END OF CANYON////


    /////CLOUDS////
    drawClouds();
    ////END OF CLOUDS///


    ////MOUNTAINS/////
    drawMountains();
    ////END OF MOUNTAINS////

    ////TREES////
    drawTrees();
    ////END OF TREES/////

    ////FLAGPOLE//////
    drawFlagpole(flagpole);
    checkFlagpole(flagpole);
    drawFlag(flag,flagpole);
    /////END OF FLAGPOLE//////

    /////COLLECTABLES////
    checkCollectable(Among_Us_Collectables);
    drawCollectables(Among_Us_Collectables);
    ////END OF COLLECTABVLES////

    /////PLATFORMS///////
    for (var i =0;i<platform.length;i++)
    {
        platform[i].draw();
    }

    for (var i = 0; i<platform.length;i++)
    {
        platform[i].checkPlatforms(PlayableCharacter_x,PlayableCharacter_y);
        if (platform[i].onPlat == true)
        {
            Character_Floor = platform[i].position.y;
        }
    }
    /////END OF PLATFORMS//////

    /////PLAYABLE CHARACTER SPRITES////
    if(Moving_Left && Character_Falling) //falling to the left
    {
        characterFallingLeft();

    }

    else if(Moving_Right && Character_Falling)//falling to the right
    {
        characterFallingRight();
    }
    else if(Moving_Left)//moving to the left
    {   
        characterLeft();

    }
    else if(Moving_Right)//moving to the right
    {
        characterRight();

    }
    else if(Character_Falling || Character_Plummet_In_Canyon)// falling vertically
    { 
        characterFallingVertically();
    }
    else //idle
    {
        characterIdle();
    }
    ////END OF PLAYABLE CHARACTER SRPITE/////

    ////ENEMIES//////
    for (var i = 0; i<enemies.length;i++)
    {
        enemies[i].drawEnemies();
        enemies[i].contactEnemiesCheck(PlayableCharacter_x,PlayableCharacter_y);

        //for the player
        if (game_score >=2 && keyCode == 32)
        {
            enemies[i].crossDraw(PlayableCharacter_x,PlayableCharacter_y,facing);
        }
    }


    ////END OF ENEMIES/////


    ////OBJECTIVE TEXT////
    objectiveText();
    ///END OF OBJECTIVE TEXT////

    ////PLAYER SCORE/////
    playerGameScore();
    ////END OF PLAYER SCORE////

    pop();
    ////objective 2///
    if (game_score >=2)
    {
        objectiveText2();
        console.log('3');
    }
    ////end of objective 2///

    /////VOICES///////
    if (game_score >=4)
    {
        emit.updateVoices(); 
    }    
    //////END OF VOICES////

    ////GAME EMCHANIC CODES////
    if (Character_Falling == true) //jumping
    {PlayableCharacter_y-=4;}

    if (PlayableCharacter_y <= Jump_Cap_Limit) //character stop gaining height when max height reached
    {Character_Falling = false;}

    if (Character_Falling == false && PlayableCharacter_y<=Character_Floor)//for falling down
    {
        PlayableCharacter_y +=3;
    }

    if (Moving_Left) // move the char to the LEFT, and shift the translate respective to the character
    {
        PlayableCharacter_x -=3;
        The_Moon_x += 0.15;
    }

    if (Moving_Right) // move the char to the RIGHT, and shift the translate respective to the character
    {
        PlayableCharacter_x +=3;
        The_Moon_x -= 0.15;
    }
    /////END OF GAME MECHANIC CODES/////

    ////GAME STATUS/////
    if (heart <= 0 && flagpole.found == false)
    {
        for (var i =0;i<255;i=i+0.5)
        {
            fill(0,0,0,i);
            rect(0,0,width,height);
        }

    }
    isTheGameOver(heart,flagpole);
    /////END OF GAME STATUS/////
}

//allow the user's directional key input to move the character
function keyPressed()
{
    if (keyCode == 37)
    {Moving_Left=true;
     facing = -1;
     if (PlayableCharacter_y >= Character_Floor_Y_Height)
     {
         walkingOnGrass.play();
     }
    } // moving left

    else if(keyCode==39)
    {Moving_Right=true;
     facing = 1;
     if (PlayableCharacter_y >= Character_Floor_Y_Height)
     {
         walkingOnGrass.play();
     }
    } // moving right

    else if(keyCode==38 && PlayableCharacter_y >= Character_Floor) //jumping
    {
        Character_Falling = true;
        Jump_Cap_Limit = PlayableCharacter_y -150; //set the max jump height according to where the character jumped
        jumpAudio.play();
    }
}

//stopping the character's movement on key release
function keyReleased()
{
    if (keyCode == 37)
    {Moving_Left=false;}//stop moving left

    else if(keyCode==39)
    {Moving_Right=false;}//stop moving right

    else if(keyCode==38)
    {Character_Falling = false;} //stop jumping
}

function initialiseWhenPlayerDies() // so things like canyons, mountains, and collectables dont change position for every respawn
{
    //    if the audios are not loaded, the game wont run via continuous refresh
    if (audioLoaded==false)
    {
        return;
    }

    //play the ambient bgm
    ambientAudio.play();

    //background creation
    createCanvas(1024, 576);
    Character_Floor_Y_Height = height * 3/4;

    //default character positioning
    PlayableCharacter_x = width/3;
    PlayableCharacter_y = Character_Floor_Y_Height-201;

    //moon position
    The_Moon_x = 100;
    The_Moon_y = 75;

    //scrolling
    cameraPosX=0;

    //ending poisition for the Initial_Objective_Text
    Objective_Text_Final_x = PlayableCharacter_x;

    //score = 0 for every reset
    game_score = 0;
    if (heart <3)
    {
        resetCollectable();
        for (var i =0;i<enemies.length;i++)
        {
            enemies[i].alive = true;
            enemies[i].lives = 250;
        }
    }

    //the flagpole
    flagpole = { x: 2000, found: false};
    flag = {x: flagpole.x+7 , y: height*3/4};//to show whether the character have found the flagpole or not

    //cloud position randomiser
    MovingClouds = [{x: 0 , y:0},{x: 0 , y:0},{x:0 , y: 0},{x:0 , y: 0},{x:0 , y: 0}];
    for (var i =0; i<5 ; i++)
    {
        MovingClouds[i].x = int(random(150,500));
        MovingClouds[i].y = int(random(50,150));
    }

}