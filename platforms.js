//platform

function createPlatform(x,y,distancePlat,directionPlat)
{
    var t={
        OGplatMovingDist : distancePlat,
        direction : directionPlat,
        check1: function()
        {
            if (this.direction == 1)
            {
                this.platMovingDist = distancePlat;
            }
            else if (this.direction == -1)
            {
                this.platMovingDist = distancePlat * -1;
            }
        },
        platMovingDist : distancePlat,
        z : 0,

        position:undefined,
        setup: function(x,y)
        {
            //set up the platform position
            this.check1();
            this.position = createVector(x,y);
        },

        //moving the platforms
        movingPlat: function()
        {   
            if (this.direction != 0)
            {
                if (this.z != this.platMovingDist)
                {
                    this.position.x= this.position.x + this.direction;
                    this.z = this.z + this.direction;
                    if (this.z == this.platMovingDist)
                    {
                        console.log('2');
                        this.direction = this.direction * -1;
                        this.platMovingDist = this.platMovingDist * -1;
                        this.z =0;
                    }
                }
            }
        },

        //drawing of platforms
        draw: function()
        {
            push();
            translate(this.position.x,this.position.y);
            this.movingPlat();
            fill('rgba(0,0,0, 0.25)');
            strokeWeight(2);
            stroke('rgba(150,150,150, 0.25)');
            rect(0,0,70,10);
            pop();    
        },
        //check whether the player is on a platform
        onPlat: false,
        checkPlatforms: function (gcX,gcY)
        {
            if (
                (gcX >= this.position.x && 
                 gcX <= this.position.x+70) && 
                (gcY >= this.position.y && 
                 gcY <= this.position.y+20)
            )
            {
                this.onPlat = true;
                console.log("1");
            }
            else
            {
                this.onPlat = false;
            }
        }

    };

    t.setup(x,y);

    return t;
}

//particle? after the player collect 4 collectables

function generateVoices(startX,startY,speedX,speedY)
{
    this.x=startX;
    this.y=startY;
    this.Sx=speedX;
    this.Sy=speedY;
    this.age = 0;
    this.alpha = 255;
    this.textPool=[
        'is that it...?',
        'is the last one in the pit?',
        'things are not the same after the purge....',
        'I miss my parents...',
        'think...positive...',
        'mabe the final shadow is in the pit..',
        'are the shadows...fragments of me?'
    ];
    var temp = random(this.textPool);
    this.voicesDraw= function(){
        var d = dist(this.x, this.y, width/3,Character_Floor_Y_Height-40);
        if (d < 100)
        {
            this.alpha = 0;
        }
        else{
            this.alpha = 200;
        }
        fill(200,200,200,this.alpha);
        stroke(150,150,150,0.5);
        textSize(24);

        text(temp,this.x,this.y);

    }

    this.updateVoices = function()
    {
        this.x+=this.Sx;
        this.y+=this.Sy;

        this.age++;
    }
}

function emittingVoices(startX,startY,speedX,speedY)
{
    this.x=startX;
    this.y=startY;
    this.Sx=speedX;
    this.Sy=speedY;
    this.lifetime = 0;
    this.startparticles = 0;
    this.voices =[];
    this.addVoices = function()
    {
        var p = new generateVoices(
            random(startX-10,startX+10),
            random(startY-10,startY+10),
            random(speedX-1,speedX+1),
            random(speedY-1,speedY+1));
        return p;
    }
    this.startEmittingVoices = function(startParticles,lifetime)
    {
        this.startParticles = startParticles;
        this.lifetime = lifetime;
        for(var i=0;i<startParticles;i++)
        {
            this.voices.push(this.addVoices());
        }
    }

    this.updateVoices = function()
    {
        var deadVoices = 0;
        for(var i=this.voices.length-1;i>-1;i--)
        {
            this.voices[i].voicesDraw();
            this.voices[i].updateVoices();
            if (this.voices[i].age > this.lifetime)
            {
                this.voices.splice(i,1);
                deadVoices++
                console.log('w');
            }
        }
        if (deadVoices >0)
        {
            for(var i =0;i<deadVoices;i++)
            {
                this.voices.push(this.addVoices());  
            }
        }
    }
}