function drawCanyons(t_canyon)
{
    for (var i=0; i<Canyons.length ; i++) //draw canyon 3 times
    {   
        if (i == 0) //change canyon size depend on its quantity
        {
            ThisCanyonSize = 0.8;
        }
        else if (i == 1)
        {
            ThisCanyonSize = 1.3;
        }
        else
        {
            ThisCanyonSize = 1;
        }

        fill(30);
        noStroke();
        rect(t_canyon[i].x,Character_Floor_Y_Height,100*ThisCanyonSize,Character_Floor_Y_Height+100);
        triangle( t_canyon[i].x ,Character_Floor_Y_Height , t_canyon[i].x , height , t_canyon[i].x - 50 , height)
        triangle( t_canyon[i].x+100*ThisCanyonSize , Character_Floor_Y_Height , t_canyon[i].x+100*ThisCanyonSize , height , t_canyon[i].x + 100*ThisCanyonSize + 50, height)

        //check if the character is on a canyon

    }
}

function drawCollectables(t_collectable)
{
    for (var i = 0; i <Among_Us_Collectables.length ; i++)
    {
        if (i == 0) //change collectable size depend on its quantity
        {
            ThisCollectableSize = 1.1;
        }
        else if (i == 1)
        {
            ThisCollectableSize = 1.3;
        }
        else
        {
            ThisCollectableSize = 0.8;
        }


        // if the character is not near the collectable, it will continue to be drawn
        if (t_collectable[i].found == false)
        {
            noStroke();
            fill(100,0,0);  
            ellipse(t_collectable[i].x, t_collectable[i].y, 30*ThisCollectableSize, 30*ThisCollectableSize); 
            rect(t_collectable[i].x-15*ThisCollectableSize , t_collectable[i].y, 30*ThisCollectableSize, 30*ThisCollectableSize);
            ellipse(t_collectable[i].x-8*ThisCollectableSize , t_collectable[i].y+29*ThisCollectableSize , 15*ThisCollectableSize, 20*ThisCollectableSize);
            ellipse(t_collectable[i].x+7*ThisCollectableSize , t_collectable[i].y+29*ThisCollectableSize , 15*ThisCollectableSize, 20*ThisCollectableSize);
            stroke(145);
            strokeWeight(2);
            fill(100,127,125);
            ellipse(t_collectable[i].x+8*ThisCollectableSize , t_collectable[i].y, 30*ThisCollectableSize, 10*ThisCollectableSize);
        }    
    }
}

function drawTrees()
{
    for (var i = 0; i < Trees_x.length ; i++ )
    {
        noStroke(); //tree leaves
        fill(00,50,1);
        ellipse(Trees_x[i]-40, Trees_y-65+25, 60, 60); 
        ellipse(Trees_x[i]+20, Trees_y-65-22, 150, 200); 
        ellipse(Trees_x[i]+72, Trees_y-65+99, 99, 100); 

        fill(62,42,18); // tree wood
        rect(Trees_x[i], Trees_y-65, 40, 210); 
        beginShape();
        vertex(Trees_x[i]-20, Trees_y-65+8);
        vertex(Trees_x[i], Trees_y-65+118);
        vertex(Trees_x[i], Trees_y-66+68);
        endShape();
    }

}

function drawMountains()
{
    for (var i =0; i<Mountains.length ; i++)
    {
        if (i == 0) //change mountain size depend on its quantity
        {
            ThisMountainSize = 1;
        }
        else if (i == 1)
        {
            ThisMountainSize = 1.2;
        }
        else
        {
            ThisMountainSize = 0.8;
        }

        strokeWeight(2);
        fill(72,32,3);
        triangle(Mountains[i].x, Character_Floor_Y_Height, Mountains[i].x+357*ThisMountainSize, Character_Floor_Y_Height-165*ThisMountainSize, Mountains[i].x+531*ThisMountainSize, Character_Floor_Y_Height);
        fill(109,39,0);
        triangle(Mountains[i].x+212*ThisMountainSize, Character_Floor_Y_Height-359*ThisMountainSize, Mountains[i].x+355*ThisMountainSize, Character_Floor_Y_Height, Mountains[i].x, Character_Floor_Y_Height);

        if (i == 0)
        {
            noStroke(); //the Mountains' snowcap
            fill(170);
            beginShape();
            vertex(Mountains[i].x+212, Character_Floor_Y_Height-359);
            vertex(Mountains[i].x+212-75, Character_Floor_Y_Height-359+124);
            vertex(Mountains[i].x+212-27, Character_Floor_Y_Height-359+103);
            vertex(Mountains[i].x+212+8, Character_Floor_Y_Height-359+144);
            vertex(Mountains[i].x+212+32, Character_Floor_Y_Height-359+119);
            vertex(Mountains[i].x+212+59, Character_Floor_Y_Height-359+150);
            endShape();
        }
    }

}

function drawClouds()
{
    fill(255,220,220,230);
    for (var i = 0; i<MovingClouds.length ;i++)
    {
        if (i == 0) //change cloud size depend on its quantity
        {
            ThisCloudSize = 0.6;
        }
        else if (i == 1)
        {
            ThisCloudSize = 0.8;
        }
        else
        {
            ThisCloudSize = 1;
        }

        noStroke();
        ellipse(MovingClouds[i].x-26*ThisCloudSize, MovingClouds[i].y+38*ThisCloudSize, 120*ThisCloudSize, 70*ThisCloudSize);
        ellipse(MovingClouds[i].x-63*ThisCloudSize, MovingClouds[i].y+55*ThisCloudSize, 70*ThisCloudSize, 50*ThisCloudSize);
        ellipse(MovingClouds[i].x-46*ThisCloudSize, MovingClouds[i].y+18*ThisCloudSize, 80*ThisCloudSize, 80*ThisCloudSize);
        ellipse(MovingClouds[i].x+44*ThisCloudSize, MovingClouds[i].y+45*ThisCloudSize, 50*ThisCloudSize, 30*ThisCloudSize);

        if(i == 1 || i == 0 || i==4)
        {
            MovingClouds[i].x +=0.1;
        }
        else if (i==2)
        {
            MovingClouds[i].x +=0.3;
        }
        else
        {
            MovingClouds[i].x +=0.43;   
        }
    }
}

function characterIdle()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-9,PlayableCharacter_y-40,18,40); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+10, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-10, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+10, PlayableCharacter_y-40,7,7);//r pupil
    ellipse(PlayableCharacter_x-10, PlayableCharacter_y-40,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+10,PlayableCharacter_y,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-10,PlayableCharacter_y,20,20,PI,0,CHORD);//l foot
}

function characterFallingVertically()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-9,PlayableCharacter_y-40,18,35); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+10, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-10, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+10, PlayableCharacter_y-40-2,7,7);//r pupil
    ellipse(PlayableCharacter_x-10, PlayableCharacter_y-40-2,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+10,PlayableCharacter_y-5,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-10,PlayableCharacter_y-5,20,20,PI,0,CHORD);//l foot
}

function characterRight()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-9,PlayableCharacter_y-40,18,35); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+12, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-8, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+13, PlayableCharacter_y-40,7,7);//r pupil
    ellipse(PlayableCharacter_x-7, PlayableCharacter_y-40,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+12,PlayableCharacter_y-2,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-8,PlayableCharacter_y,20,20,PI,0,CHORD);//l foot
}

function characterLeft()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-9,PlayableCharacter_y-40,18,35); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+8, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-12, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+7, PlayableCharacter_y-40,7,7);//r pupil
    ellipse(PlayableCharacter_x-13, PlayableCharacter_y-40,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+8,PlayableCharacter_y-2,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-12,PlayableCharacter_y,20,20,PI,0,CHORD);//l foot
}

function characterFallingRight()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-10,PlayableCharacter_y-40,19,33); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+12, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-8, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+13, PlayableCharacter_y-40-2,7,7);//r pupil
    ellipse(PlayableCharacter_x-7, PlayableCharacter_y-40-2,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+12,PlayableCharacter_y-2-5,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-8,PlayableCharacter_y-5,20,20,PI,0,CHORD);//l
}

function characterFallingLeft()
{
    fill(0,0,0);
    rect(PlayableCharacter_x-10,PlayableCharacter_y-40,19,33); //body
    ellipse(PlayableCharacter_x , PlayableCharacter_y - 40, 31,31 );//head
    stroke(0,0,0);
    fill(255,255,255);
    ellipse (PlayableCharacter_x+8, PlayableCharacter_y-40,20,7);//r eye
    ellipse (PlayableCharacter_x-12, PlayableCharacter_y-40,20,7);//l eye
    fill(0,0,0);
    ellipse(PlayableCharacter_x+7, PlayableCharacter_y-40-2,7,7);//r pupil
    ellipse(PlayableCharacter_x-13, PlayableCharacter_y-40-2,7,7);//l pupil
    fill(255,255,255);
    arc(PlayableCharacter_x+8,PlayableCharacter_y-2-5,20,20,PI,0,CHORD);//r foot
    arc(PlayableCharacter_x-12,PlayableCharacter_y-5,20,20,PI,0,CHORD);//l foot
}

function objectiveText()
{
    if (Initial_Objective_Text == true)
    {
        fill(255,255,0);
        stroke(255);
        textSize(24);
        text('Objective: find all 4 of"them"',20,100);
        text('and avoid your "shadows"',20,125);

    }


    // if the gamechar move too far from the Initial_Objective_Text text, it will dissapear
    if (PlayableCharacter_x > Objective_Text_Final_x + 395 || PlayableCharacter_x < Objective_Text_Final_x - 795 || game_score >=2)
    {
        Initial_Objective_Text = false;
    }
}

function objectiveText2()
{
    fill(255,255,0);
    stroke(255);
    textSize(18);
    text('Objective update: exorcise your "shadows" and find "them"',40,100);
    text('Press "Space" to take out your cross',40,125);
    text('and hold the "shadows" in range for 2.5 seconds',40,150);
}

function playerGameScore()
{
    fill(100);
    textSize(25);
    text(" 'IT' found:"+game_score+"/4",PlayableCharacter_x + 200 ,30);
}

function drawFlagpole(t_flagpole)
{
    fill(50);
    rect(t_flagpole.x-7,Character_Floor_Y_Height,14,-300);    
}

function drawFlag(t_flag,t_flagpole)
{
    if (t_flagpole.found == true)
    {
        fill(175);
        rect(t_flag.x,t_flag.y, 60,40);
        if (t_flag.y > (height * 3/4 -300))
        {
            t_flag.y--;
        }

    }
}

function drawHearts(t_heart, t_heartsPosition)
{
    for (var i = 0; i<t_heart ; i++)
    {
        fill(200,0,0);
        ellipse(t_heartsPosition.x + i*30, t_heartsPosition.y, 20,20);
    }
    fill(255,0,0);
    stroke(255);
    textSize(18);
    text('Your Remaining Lives: ',width/2 - 200, t_heartsPosition.y);
}