import kaplay from "kaplay";

const k = kaplay({
    width: 1600,
    height: 800,
    background: [39, 228, 245],
    
});

k.loadBean();
k.setGravity(1900); 

const player = k.add([
    k.sprite("bean"),
    k.pos(center()),
    k.area(),
    k.body(),
    k.offscreen(),
])

player.onKeyPress("w", () => {
    if(player.isGrounded())
        player.jump();
})

player.onKeyPress("d", () => {
    player.moveBy(40,0);
})

player.onKeyPress("a", () => {
    player.moveBy(-40, 0);
})

player.onCollide("circle", () => {
    addKaboom(player.pos);
    life--;
    lifeUI.text = "Life : " + life;
    if(life == 0) 
        k.go("gameover");
});



player.onExitScreen(() => {
    k.go("gameover");
})

k.scene("gameover", () => {
    k.add([k.text("Game Over!"), k.pos(k.center()), k.setBackground([0,0,0])])
})

// Below is the platform

k.add([
    k.rect(k.width(), 300),
    k.pos(0, 500),
    k.area(), // This is basically enables the area for collison. components wil not pass through it
    k.outline(3), 
    k.body({ isStatic: true}),  
])

// This is the destroyer wall

const wall = k.add([
    k.rect(50, 800),
    k.pos(-50, 80),
    k.area(),
    k.body({ isStatic: true}),
    k.outline(3),
    "wall",
])

// below is the obstacles

let counter = 0;
let life = 5;
const counterUI = k.add([k.text("Score : 0"), k.pos(10, 10)]);
let lifeUI = k.add([k.text("Life : 5"), k.pos(1280, 10)]);

let ball = 0;


k.loop(1, () => {
    counter++;
    counterUI.text = "Score : " + counter; 
    const speeds = [600, 500, 200, 800, 700];
    const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];

    ball = k.add([
        k.circle(30),
        k.pos(1950, 0),
        k.area(),
        k.body(),
        k.outline(3),
        k.move(k.vec2(-1, 0), currentSpeed),
        "ball",
    ])
})

k.onCollide("wall", "ball", (wall, ball) => {
    k.destroy(ball);
})










