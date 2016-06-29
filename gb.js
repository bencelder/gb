function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    c.style.cursor = "none";

    cursor = new Cursor(0, 0);

    paused = -1; // -1 = not paused, 1 = paused
    keys = [];
    player = new Player( c.width / 2., c.height/2. );

    bullets = [];

    patrols = [];

    time_between_patrols = 1000; // ms
    last_patrol = Date.now();
    p = new Patrol(100, 100);
    patrols.push(p);

    //var music = new Audio("tangerine_dreams.mp3");
    //music.play();

    // set up the screen
    hres = 144;
    vres = 160;
    screen = [];
    for (var i = 0; i < hres; i++)
        screen[i] = [];

    for (var i = 0; i < hres; i++)
        for (var j = 0; j < vres; j++)
            screen[i][j] = 1;

    for (var i = 0; i < hres; i++)
        for (var j = 0; j < vres; j++)
            screen[i][j] = 0;

    dudex = 70;
    dudey = 80;

    screen[dudex][dudey] = 3;



    lastframe = Date.now();
    game_loop = setInterval( function(){loop()}, 1000./60);
}

function loop(){
    now = Date.now();
    dt = (now - lastframe)/1000;
    lastframe = now;

    while (keys.length > 0){
        switch (keys.pop()){
            case 97:
                dudex--;
                break;
            case 115:
                dudey++;
                break;
            case 119:
                dudey--;
                break;
            case 100:
                dudex++;
                break;
        }
    }

    /*
    // pause
    if (paused == 1){
        draw();
        return;
    }

    // create new objects
    if (now - last_patrol > time_between_patrols){
        // choose a side to start from
        var side = Math.floor( Math.random()*4 );
        if (side == 0)
            p = new Patrol( -20, Math.random()*c.height );
        if (side == 1)
            p = new Patrol( Math.random()*c.width, -20);
        if (side == 2)
            p = new Patrol( c.width + 20, Math.random()*c.height );
        if (side == 3)
            p = new Patrol( Math.random()*c.width, c.height + 20 );

        patrols.push(p);
        last_patrol = now;
    }

    // update game objects
    player.update(dt);

    for (var i = 0; i < bullets.length; i++)
        bullets[i].update(dt);

    for (var i = 0; i < patrols.length; i++)
        patrols[i].update(dt);

    // check for destruction
    new_bullets = [];
    for (var i = 0; i < bullets.length; i++){
        b = bullets[i];
        if (b.collided)
            continue;
        new_bullets.push(b);
    }
    bullets = new_bullets;

    new_patrols = [];
    for (var i = 0; i < patrols.length; i++){
        p = patrols[i];
        //if (now - p.created > p.duration)
            //continue;
        if (p.health < 0)
            continue;
        new_patrols.push(p);
    }
    patrols = new_patrols;
    */

    for (var i = 0; i < hres; i++)
        for (var j = 0; j < vres; j++)
            screen[i][j] = 0;

    screen[dudex][dudey] = 3;

    // draw everything
    draw();

}

function draw(){
    /*
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, c.width, c.height);
    */


    dx = c.width/144;
    dy = c.height/160;

    /*
    ctx.beginPath();
    for (var i = 0; i < c.height; i+= dy){
        ctx.moveTo(0, i);
        ctx.lineTo(c.width, i);
    }
    ctx.stroke();

    ctx.beginPath();
    for (var i = 0; i < c.width; i+= dx){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, c.height);
    }
    ctx.stroke();
    */

    for (var i = 0; i < hres; i++)
        for (var j = 0; j < vres; j++){
            if (screen[i][j] == 0)
                ctx.fillStyle = "#FFFFFF"
            if (screen[i][j] == 3)
                ctx.fillStyle = "#000000"


            ctx.fillRect(i*dx, j*dy, dx, dy);
        }


    /*
    cursor.draw();
    player.draw();

    for (var i = 0; i < bullets.length; i++)
        bullets[i].draw();

    for (var i = 0; i < patrols.length; i++)
        patrols[i].draw();
    */
}


function keyDown(e){
    /*
    //alert(e.keyCode);
    kc = e.keyCode;
    keys[kc] = true;

    if (kc == 80)
        paused *= -1;
    */
}

function keyUp(e){
    //keys[e.keyCode] = false;
}

function onKeyPress(e){
    //alert(e.keyCode);
    keys.push(e.keyCode);
}

function mouseMove(e){
    cursor.x = e.clientX - c.offsetLeft;
    cursor.y = e.clientY - c.offsetTop;
}
