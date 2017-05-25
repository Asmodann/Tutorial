var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var WIDTH = 500;
var HEIGHT = 500;
var score;

ctx.font = "30px Arial";

var player = {
	x: 50,
	spX: 10,
	y: 40,
	spY: 10,
	w: 20,
	h: 20,
	name: "P",
	hp: 10,
	color: "#0F0",
	atkSpd: 1,
	counter: 0,
	pressLeft: false,
	pressRight: false,
	pressTop: false,
	pressBottom: false,
};

var enemyList = {};
var upgradeList = {};
var bulletList = {};

document.addEventListener("mousemove", function(evt) {
	/*var mouseX = evt.clientX - canvas.getBoundingClientRect().left;
	var mouseY = evt.clientY - canvas.getBoundingClientRect().top;
	
	if (mouseX < (player.w/2))
		mouseX = player.w/2;
	if (mouseX > WIDTH - (player.w/2))
		mouseX = WIDTH - (player.w/2);
	if (mouseY < (player.h/2))
		mouseY = player.h/2;
	if (mouseY > HEIGHT - (player.h/2))
		mouseY = HEIGHT - (player.h/2);

	player.x = mouseX;
	player.y = mouseY;*/
});

document.addEventListener("click", function() {
	if (player.counter > 25) {
		randomlyGenerateBullet();
		player.counter = 0;
	}
});

document.addEventListener("keydown", function(evt) {
	var key = evt.which || evt.keyCode || 0;
	if (key === 37) {
		player.pressLeft = true;
	}
	if (key === 38) {
		player.pressTop = true;
	}
	if (key === 39) {
		player.pressRight = true;
	}
	if (key === 40) {
		player.pressBottom = true;
	}
});

document.addEventListener("keyup", function(evt) {
	var key = evt.which || evt.keyCode || 0;
	if (key === 37) {
		player.pressLeft = false;
	}
	if (key === 38) {
		player.pressTop = false;
	}
	if (key === 39) {
		player.pressRight = false;
	}
	if (key === 40) {
		player.pressBottom = false;
	}
});

/**
* FUNCTION "Enemy"
* @param {string} id_
* @param {int} x_
* @param {int} y_
* @param {int} spX_
* @param {int} spY_
*/
Enemy = function(id_, x_, y_, spX_, spY_, w_, h_, color_) {
	var enemy = {
		x: x_,
		spX: spX_,
		y: y_,
		spY: spY_,
		name: "E",
		id: id_,
		w: (w_ === undefined ? 30 : w_),
		h: (w_ === undefined ? 30 : h_),
		color: (color_ === undefined ? "#F00" : color_)
	};
	enemyList[id_] = enemy;
};

/**
* FUNCTION "Upgrade"
* @param {string} id_
* @param {int} x_
* @param {int} y_
* @param {int} spX_
* @param {int} spY_
*/
Upgrade = function(id_, x_, y_, spX_, spY_, w_, h_, color_, ctg_) {
	var asd = {
		x: x_,
		spX: spX_,
		y: y_,
		spY: spY_,
		name: "E",
		id: id_,
		w: (w_ === undefined ? 30 : w_),
		h: (w_ === undefined ? 30 : h_),
		color: (color_ === undefined ? "orange" : color_),
		ctg: ctg_
	};
	upgradeList[id_] = asd;
};

/**
* FUNCTION "Bullet"
* @param {string} id_
* @param {int} x_
* @param {int} y_
* @param {int} spX_
* @param {int} spY_
*/
Bullet = function(id_, x_, y_, spX_, spY_, w_, h_, color_) {
	var asd = {
		x: x_,
		spX: spX_,
		y: y_,
		spY: spY_,
		name: "E",
		id: id_,
		timeLife: 0,
		w: (w_ === undefined ? 30 : w_),
		h: (w_ === undefined ? 30 : h_),
		color: (color_ === undefined ? "black" : color_)
	};
	bulletList[id_] = asd;
};

/**
* FUNCTION "startNewGame"
*/
startNewGame = function() {
	timeWhenGameStarted = Date.now();
	player.hp = 10;
	frameCount = 0;
	lastScore = (score === undefined ? 0 : score);
	score = 0;
	enemyList = {};
	upgradeList = {};
	bulletList = {};

	randomlyGenerateEnemy();
	randomlyGenerateEnemy();
	randomlyGenerateEnemy();
}

/**
* FUNCTION "randomlyGenerateEnemy"
*/
randomlyGenerateEnemy = function() {
	var x = Math.floor(Math.random() * WIDTH);
	var y = Math.floor(Math.random() * HEIGHT);
	var w = Math.floor((Math.random() * (50 - 20)) + 20);
	var h = Math.floor((Math.random() * (50 - 20)) + 20);
	var spX = Math.floor((Math.random() * (15 - 5)) + 5);
	var spY = Math.floor((Math.random() * (15 - 5)) + 5);
	var id = Math.floor((Math.random() * 1000));

	Enemy(id, x, y, spX, spY, w, h);
}

/**
* FUNCTION "randomlyGenerateUpgrade"
*/
randomlyGenerateUpgrade = function() {
	var x = Math.floor(Math.random() * WIDTH);
	var y = Math.floor(Math.random() * HEIGHT);
	var w = 10;
	var h = 10;
	var spX = 0;
	var spY = 0;
	var id = Math.floor((Math.random() * 1000));
	var c = "orange";
	var ctg;

	if (Math.random() < 0.5) {
		ctg = "score";
	} else {
		ctg = "atkSpd";
		c = "#00F";
	}

	Upgrade(id, x, y, spX, spY, w, h, c, ctg);
}

/**
* FUNCTION "randomlyGenerateBullet"
*/
randomlyGenerateBullet = function() {
	var x = player.x;
	var y = player.y;
	var w = 10;
	var h = 10;

	var angle = Math.random() * 360;
	var spX = Math.cos(angle / 180 * Math.PI) * 5;
	var spY = Math.sin(angle / 180 * Math.PI) * 5;
	var id = Math.floor((Math.random() * 1000));

	Bullet(id, x, y, spX, spY, w, h);
}

/**
* FUNCTION "getDistBetweenEntity"
* @param {object} entity_a
* @param {object} entity_b
*
* @return {number} distance between
*/
getDistBetweenEntity = function(entity_a, entity_b) {
	var vx = entity_a.x - entity_b.x;
	var vy = entity_a.y - entity_b.y;
	return Math.sqrt(vx*vx+vy*vy);
};

/**
* FUNCTION "testCollision"
* @param {object} entity_a
* @param {object} entity_b
*
* @return {bool} collision
*/
testCollision = function(entity_a, entity_b) {
	var rect_a = {
		x: entity_a.x - (entity_a.w/2),
		y: entity_a.y - (entity_a.h/2),
		w: entity_a.w,
		h: entity_a.h
	}
	var rect_b = {
		x: entity_b.x - (entity_b.w/2),
		y: entity_b.y - (entity_b.h/2),
		w: entity_b.w,
		h: entity_b.h
	}

	return testCollisionRectRect(rect_a, rect_b);

	/*var distance = getDistBetweenEntity(entity_a, entity_b);
	return (distance < 30);*/
};

testCollisionRectRect = function(rect_a, rect_b) {
	return (rect_a.x <= rect_b.x + rect_b.w
		&&	rect_b.x <= rect_a.x + rect_a.w
		&&	rect_a.y <= rect_b.y + rect_b.h
		&&	rect_b.y <= rect_a.y + rect_a.h);
}

/**
* FUNCTION "updateEntity"
* @param {object} entity
*/
updateEntity = function(entity) {
	setEntityPosition(entity);
	drawEntity(entity);
};

/**
* FUNCTION "setEntityPosition"
* @param {object} entity
*/
setEntityPosition = function(entity) {
	entity.x += entity.spX;
	entity.y += entity.spY;

	if (entity.x <= 0 || entity.x >= WIDTH) {
		entity.spX = -entity.spX;
	}
	if (entity.y <= 0 || entity.y >= HEIGHT) {
		entity.spY = -entity.spY;
	}
};

/**
* FUNCTION "updatePlayerPosition"
* @param {object} entity
*/
updatePlayerPosition = function() {
	if (player.pressLeft) {
		player.x -= player.spX;
	}
	if (player.pressRight) {
		player.x += player.spX;
	}
	if (player.pressTop) {
		player.y -= player.spX;
	}
	if (player.pressBottom) {
		player.y += player.spX;
	}


	if (player.x < (player.w/2))
		player.x = player.w/2;
	if (player.x > WIDTH - (player.w/2))
		player.x = WIDTH - (player.w/2);
	if (player.y < (player.h/2))
		player.y = player.h/2;
	if (player.y > HEIGHT - (player.h/2))
		player.y = HEIGHT - (player.h/2);
};

/**
* FUNCTION "drawEntity"
* @param {object} entity
*/
drawEntity = function(entity) {
	ctx.save();
	ctx.fillStyle = entity.color;
	ctx.fillRect(entity.x - (entity.w/2), entity.y - (entity.h/2), entity.w, entity.h);
	ctx.restore();
};

/**
* FUNCTION "update"
*/
update = function() {
	isColliding = false;
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	frameCount++;
	score++;
	player.counter += player.atkSpd;

	// Enemy
	if (frameCount % 100 === 0) {
		randomlyGenerateEnemy();
	}
	// Upgrade
	if (frameCount % 75 === 0) {
		randomlyGenerateUpgrade();
	}
	// Bullet
	

	for (var key in bulletList) {
		updateEntity(bulletList[key]);
		bulletList[key].timeLife++;

		var toRemove = false;
		if (bulletList[key].timeLife > 100) {
			toRemove = true;
		}

		for (var key2 in enemyList) {
			isColliding = testCollision(bulletList[key], enemyList[key2]);
			if (isColliding) {
				toRemove = true;
				delete enemyList[key2];
				break;
			}
		}

		if (toRemove) {
			delete bulletList[key];
		}
	}

	for (var key in upgradeList) {
		updateEntity(upgradeList[key]);
		isColliding = testCollision(player, upgradeList[key]);
		if (isColliding) {
			if (upgradeList[key].ctg === "score")
				score += 1000;
			if (upgradeList[key].ctg === "atkSpd")
				player.atkSpd += 1;

			delete upgradeList[key];
		}
	}

	for (var key in enemyList) {
		updateEntity(enemyList[key]);
		isColliding = testCollision(player, enemyList[key]);
		if (isColliding) {
			player.hp -= 1;
		}
	}

	if (player.hp <= 0) {
		var timeSurvive = Date.now() - timeWhenGameStarted;
		console.log("You lost! Your survived for " + timeSurvive + " ms.");
		startNewGame();
	}

	updatePlayerPosition();
	drawEntity(player);
	ctx.fillText(player.hp + " Hp", 0, 30);
	ctx.fillText("Score: " + score, 200, 30);
	ctx.fillText("Last: " + lastScore, 200, 60);
};

startNewGame();

setInterval(update, 40);