function enemySetup(startX,starY,distance,directions)
{
    //enemies set up
    this.x = startX;
    this.y = starY;
    this.OGwalkingTimer = distance;
    this.direction = directions;
    this.alive = true;
    this.lives = 250;
    //weapon set up
    this.crossOn = false;
    if (this.direction == 1)
    {
        this.walkingTimer=distance;
        this.z = 0;
    }

    if (this.direction == -1)
    {
        this.walkingTimer = 0;
        this.z = distance;
    }
    
    this.drawEnemiesIdle = function()
    {
        stroke(0);
        fill(0,0,0);
        rect(this.x-9,this.y-40,18,40); //body
        ellipse(this.x , this.y - 40, 31,31 );//head
        stroke(0,0,0);
        fill(0,0,0);
        ellipse (this.x+10, this.y-40,20,7);//r eye
        ellipse (this.x-10, this.y-40,20,7);//l eye
        fill(0,0,0);
        ellipse(this.x+10, this.y-40,7,7);//r pupil
        ellipse(this.x-10, this.y-40,7,7);//l pupil
        fill(0,0,0);
        arc(this.x+10,this.y,20,20,PI,0,CHORD);//r foot
        arc(this.x-10,this.y,20,20,PI,0,CHORD);//l foot
    }

    this.drawEmeniesLeft = function()
    {
        stroke(0);
        fill(0,0,0);
        rect(this.x-9,this.y-40,18,35); //body
        ellipse(this.x , this.y - 40, 31,31 );//head
        stroke(0,0,0);
        fill(0,0,0);
        ellipse (this.x+8, this.y-40,20,7);//r eye
        ellipse (this.x-12, this.y-40,20,7);//l eye
        fill(0,0,0);
        ellipse(this.x+7, this.y-40,7,7);//r pupil
        ellipse(this.x-13, this.y-40,7,7);//l pupil
        fill(0,0,0);
        arc(this.x+8,this.y-2,20,20,PI,0,CHORD);//r foot
        arc(this.x-12,this.y,20,20,PI,0,CHORD);//l foot
    }

    this.drawEnemiesRight = function()
    {
        stroke(0);
        fill(0,0,0);
        rect(this.x-9,this.y-40,18,35); //body
        ellipse(this.x , this.y - 40, 31,31 );//head
        stroke(0,0,0);
        fill(0,0,0);
        ellipse (this.x+12, this.y-40,20,7);//r eye
        ellipse (this.x-8, this.y-40,20,7);//l eye
        fill(0,0,0);
        ellipse(this.x+13, this.y-40,7,7);//r pupil
        ellipse(this.x-7, this.y-40,7,7);//l pupil
        fill(0,0,0);
        arc(this.x+12,this.y-2,20,20,PI,0,CHORD);//r foot
        arc(this.x-8,this.y,20,20,PI,0,CHORD);//l foot
    }
    
    //drawing of weapon
    this.crossDraw= function(gcX,gcY,facing)
    {
        this.gcx = gcX;
        this.gcy= gcY;
        this.gcFacing = facing;
        if (this.gcFacing==-1)
        {
            fill(255, 215, 0);
            noStroke();
            rect(this.gcx-11,this.gcy-30,3,16);
            rect(this.gcx-15,this.gcy-25,12,3);

            noFill();
            stroke(250,250,250,10);
            ellipse(this.gcx-11,this.gcy-25,140,140);
            this.crossOn = true;

            var radialGlow =[];
            for(var i=0;i<30;i++)
            {
                var randomX = random(-70,70);
                var randomY = random(-70,70);
                var temp = createVector(randomX,randomY);
                temp.normalize();
                temp.mult(69);
                radialGlow.push( temp );
            }
            push();
            fill(255,215,0,5);
            stroke(255,215,0,5);
            translate(this.gcx-11,this.gcy-25);
            for (var i =0; i<radialGlow.length;i++)
            {
                line(0,0,radialGlow[i].x,radialGlow[i].y);
            }
            pop();
        }
        if (this.gcFacing == 1)
        {            
            fill(255, 215, 0);
            noStroke();
            rect(this.gcx+12,this.gcy-30,3,16);
            rect(this.gcx+8,this.gcy-25,12,3); 

            noFill();
            stroke(250,250,250,10);
            ellipse(this.gcx+12,this.gcy-25,140,140);
            this.crossOn = true;

            var radialGlow =[];
            for(var i=0;i<30;i++)
            {
                var randomX = random(-70,70);
                var randomY = random(-70,70);
                var temp = createVector(randomX,randomY);
                temp.normalize();
                temp.mult(69);
                radialGlow.push( temp );
            }
            push();
            fill(255,215,0,5);
            stroke(255,215,0,5);
            translate(this.gcx+12,this.gcy-25);
            for (var i =0; i<radialGlow.length;i++)
            {
                line(0,0,radialGlow[i].x,radialGlow[i].y);
            }
            pop();
        }

    }
    
    //enemies movement
    this.movement=function()
    {
        if (this.z != this.walkingTimer)
        {
            this.x= this.x + this.direction;
            if (this.z == this.walkingTimer-(this.direction))
            {
                this.direction = this.direction * -1;
                this.walkingTimer = this.walkingTimer +(this.OGwalkingTimer * this.direction);
            }
            this.z = this.z + this.direction;
        }
    }
    
    
    this.drawEnemies=function()
    {   
        if (this.alive == true)
        {
            this.movement();
            if (this.z == this.walkingTimer-(this.direction))
            {
                for (var i =0;i<50;i++)
                {
                    this.drawEnemiesIdle();
                }
            }
            if (this.direction==1)
            {
                this.drawEnemiesRight();
            }
            else if (this.direction == -1)
            {
                this.drawEmeniesLeft();
            }
        }
    }

    this.contactEnemiesCheck = function(gc_x,gc_y)
    {
        //for player and enemy
        var d = dist(gc_x,gc_y,this.x,this.y);
        if (d < 40 && this.alive == true)
        {
            heart--; // lives reduction
            if (heart > 0)
            {
                this.alive = true;
                this.crossOn = false;
                initialiseWhenPlayerDies();
            }
        }

        //for enemy and weapon
        if (d<140 && this.crossOn == true)
        {
            this.lives --;
            if (this.lives==0)
            {this.alive = false;}

        }
        else
        {
            this.crossOn == false;
        }

    }
}