//Create empty header object
let header = undefined;
let ctx = undefined;

//FPS implementation from -> http://jsfiddle.net/m1erickson/CtsY3/
//Animation settings
let targetFramerate = 1000 / 60; //60 fps
let then = Date.now();
let now  = Date.now();
let startTime = then;
let elapsed = -1;
let drawframe = 0;


//On document load, create the header object
document.onload = createHeader();

//Creates the header object
function createHeader() {
    header = document.createElement("canvas");
    
    //Header info
    header.id     = "header_canvas";
    header.width  = 600;
    header.height = 150;
    //header.style.backgroundColor = "#ffaaff";

    //Get drawing context from header
    ctx = header.getContext('2d');

    //Find the spot at which to inject the new header
    var injection_spot = document.getElementById("header_injection");

    //Append it
    injection_spot.append(header);

    //Start to update the header
    update();
}

//Update the header
function update(currentTime)
{
    //Request the function to be run again
    requestAnimationFrame(update)

    now = Date.now();
    elapsed = now - then;

    //If we've passed enough time, update
    if(elapsed > targetFramerate)
    {   
        drawframe++;

        //Set then variable accordingly
        then = now - (elapsed % targetFramerate);

        //Update code
        clearCanvas(elapsed);
        drawName(elapsed);
    }
}

//Clears the canvas every frame.
function clearCanvas(deltaTime)
{
    ctx.clearRect(0, 0, header.width, header.height);
}

//Name variables
let letter_spacing = 10;
let spacing_multiplier = .2;
let letters_start_x = 45;
let letters_start_y = 120;
let stroke_offset = 10;
let spaced_stroke_offset = 4;
let canvas_letter_spacing = 20;

//Draws my name to the header object.
function drawName(deltaTime)
{
    ctx.globalAlpha = 1.0;
    ctx.font = "55px geist_rndregular";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = .5;

    var current_x = letters_start_x;
    var current_y = letters_start_y;

    var name = "joe aquiare";

    for(var i = 0; i < name.length; i++)
    {
        ctx.globalAlpha = 1.0; //Reset global alpha every loop

        var letter = name.charAt(i); //Get the current letter of the word

        ctx.strokeText(letter, current_x - stroke_offset, current_y + stroke_offset); //Draw stagnant lined text

        var draw_y = letters_start_y - (2 * Math.sin(drawframe * .04 + (i * spacing_multiplier))); //Get the Y position of the floaty text

        ctx.globalAlpha = Math.abs((1 * Math.sin(drawframe * .01 + (i * spacing_multiplier)))); //Alter global alpha based on wave
        spaced_stroke_offset = current_y - draw_y * 1.1;

        //Glitchy effect
        let random_y = 0;
        if(Math.random() * 10 > 9.8) random_y = Math.random() * 50 - 25;

        //Do floaty stroke text
        ctx.strokeText(letter, current_x - stroke_offset - spaced_stroke_offset, current_y + stroke_offset + spaced_stroke_offset + random_y);

        //Do floaty fill text
        ctx.fillText(letter, current_x, draw_y);

        //Bump the x position for the next letter
        current_x += ctx.measureText(letter).width + letter_spacing;
    }

    letter_spacing = lerp(letter_spacing, 2, .02);
    letters_start_x = lerp(letters_start_x, 88, .02);
}

//Simple lerp function
function lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}