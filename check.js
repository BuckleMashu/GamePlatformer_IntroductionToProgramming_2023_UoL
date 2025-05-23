
function checkCollectable(t_collectable)
{
    for (var i = 0; i <Among_Us_Collectables.length ; i++)
    {
        if ( dist(PlayableCharacter_x, PlayableCharacter_y, t_collectable[i].x, t_collectable[i].y) < 70 && t_collectable[i].found == false)
        {
            t_collectable[i].found=true;
            game_score +=1;
            collectableFoundAudio.play();
        }

    }
}

function checkCanyons(t_canyon)
{
    for (var i=0; i<Canyons.length ; i++) //draw canyon 3 times
    { 
        if ((PlayableCharacter_x >= t_canyon[i].x+20 && PlayableCharacter_x <= t_canyon[i].x+80) && PlayableCharacter_y >= Character_Floor_Y_Height) 
        {
            Character_Plummet_In_Canyon = true;            
            Moving_Left = false; //prevent the character from moving left 
            Moving_Right = false; // prevent the character from moving right
            Character_Floor = height+200; // instead of Character_FloorPosY, the character will fall below the game screen

            if (PlayableCharacter_y <= height && Character_Falling == false) //allow the char to go up, as long as they are on the Character_Floor
            {
                PlayableCharacter_y +=2;
                plummetingAudio.play();
            }

            if (PlayableCharacter_y > height) // check if the character dies
            {
                heart--; // lives reduction
                if (heart > 0)
                {
                    initialiseWhenPlayerDies();
                    Character_Plummet_In_Canyon = false;//reset this vaue so the character don't fall through the ground after respanw
                }
            }
        }
        //check the character is outside of a canyon
        else if ((PlayableCharacter_x <= t_canyon[i].x && PlayableCharacter_x >= t_canyon[i].x+100) && PlayableCharacter_y <= Character_Floor_Y_Height)
        {
            Character_Plummet_In_Canyon = false;
            Character_Floor = Character_Floor_Y_Height;// allow the character to be able to land on the surface

            if (PlayableCharacter_y <= Character_Floor_Y_Height && Character_Falling == false) //allow the char to go up, as long as they are on the Character_Floor
            {PlayableCharacter_y +=2;}
        }
    }
}

function checkFlagpole(t_flagpole)
{
    if ( dist(PlayableCharacter_x,PlayableCharacter_y, t_flagpole.x,Character_Floor_Y_Height) < 70 && t_flagpole.found == false)
    {
        t_flagpole.found = true;
        levelCompleteAudio.play();
    }
}

function isTheGameOver(t_heart, t_flagpole)
{
    if (t_heart <= 0 && t_flagpole.found == false)
    {
        fill(255,0,0);
        textSize(100);
        text("GAME OVER", 250,height/2);
        Moving_Left = false;
        Moving_Right = false;
    }
    else if(t_heart > 0 && t_flagpole.found == true)
    {
        fill(200);
        textSize(100);
        text("Level...Complete??", 140,height/2); 
        Moving_Left = false;
        Moving_Right = false;
    }

}

function resetCollectable()
{
    //reset the collectable isfound
    for (var i =0;i<4;i++)
    {
        Among_Us_Collectables[i].found = false;
    }
}