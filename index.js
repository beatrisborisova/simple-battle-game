const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playBtn = document.getElementById('play-btn');
const errorField = document.getElementById('error');
const playingField = document.getElementById('playing');
const winnerContainer = document.getElementById('winner-container');
const winner = document.getElementById('winner');
const main = document.getElementById('main');

const playContainer = document.getElementById('play');
const attack1 = document.getElementById('one');
const attack2 = document.getElementById('two');


const healthLineOne = document.getElementById('health-line-one');
const healthLineTwo = document.getElementById('health-line-two');
const healthContainer = document.getElementById('health-container');

const image_input1 = document.getElementById("image_input1");
const image_input2 = document.getElementById("image_input2");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");

playBtn.addEventListener('click', start);

function start() {


	if (player1.value != '' && player2.value != '') {
		main.style.display = 'none';
		playBtn.style.display = 'none'
		healthContainer.style.display = 'none';
		const playerOne = new Fighter(player1.value, player2.value);
		const playerTwo = new Fighter(player2.value, player1.value);

		fight(playerOne, playerTwo);
		healthContainer.style.display = 'flex';

	} else {
		errorField.style.color = '#b41414';
	}
}


function Fighter(name, rival) {

	this.getName = getName();
	this.strength = 0;
	this.agility = Math.random();
	this.vitality = 0;
	this.hp = 50;

	function getName() {
		return name;
	};

	this.getHp = function getHp() {
		return this.hp;
	};

	this.takeDamage = function takeDamage(damage = 10) {
		damage = 10 + (this.strength * 5);
		damage = damage - (this.agility * 3);
		this.vitality--;
		this.hp -= damage;
		return damage;
	};

	this.dealDamage = function dealDamage(rival) {
		this.vitality++;
		this.hp += (this.vitality * 10) + (this.strength * 5) + (this.agility * 3);
	};
};


function fight(player1, player2) {

	attack1.addEventListener('click', firstIsAttacking);
	attack2.addEventListener('click', secondIsAttacking);

	image_input1.style.display = 'none';
	image_input2.style.display = 'none';

	if (!image1.hasAttribute('hasImage')) {
		image1.style.backgroundImage = `url("player_placeholder.png")`;
	};

	if (!image2.hasAttribute('hasImage')) {
		image2.style.backgroundImage = `url("player_placeholder.png")`;
	};

	document.getElementById('first-image-container').style.border = 'none';
	document.getElementById('second-image-container').style.border = 'none';
	document.getElementById('optional').style.display = 'none';

	healthLineOne.textContent = 'Health';
	healthLineTwo.textContent = 'Health';
	document.getElementById('first-name').textContent = `${player1.getName}`
	document.getElementById('second-name').textContent = `${player2.getName}`


	function healthChange() {

		if (player1.getHp() <= 100) {
			healthLineOne.style.width = player1.getHp() + "%";
		};

		if (player2.getHp() <= 100) {
			healthLineTwo.style.width = player2.getHp() + "%";
		}
	}


	function firstIsAttacking() {
		player2.takeDamage();
		player1.dealDamage(player2);

		healthChange();
		if (player1.getHp() <= 0 || player2.getHp() <= 0) {
			if (player1.getHp() <= 0) {
				winner.textContent = `${player2.getName}`;
				image2.style.border = '15px solid #59a152';
				winnerContainer.style.display = 'block';
				playingField.style.display = 'none';
				healthContainer.style.display = 'none';

			} else {
				winner.textContent = `${player1.getName}`;
				image1.style.border = '15px solid #59a152';
				winnerContainer.style.display = 'block';
				playingField.style.display = 'none';
				healthContainer.style.display = 'none';
			}
		}
	};

	function secondIsAttacking() {
		player1.takeDamage();
		player2.dealDamage(player1);

		healthChange();

		if (player1.getHp() <= 0 || player2.getHp() <= 0) {
			if (player2.getHp() <= 0) {
				winner.textContent = `${player1.getName}`;
				image1.style.border = '15px solid #59a152';
				winnerContainer.style.display = 'block';
				playingField.style.display = 'none';
				healthContainer.style.display = 'none';
			} else {
				winner.textContent = `${player2.getName}`;
				image2.style.border = '15px solid #59a152';
				winnerContainer.style.display = 'block';
				playingField.style.display = 'none';
				healthContainer.style.display = 'none';
			}
		}
	};
};

image_input1.addEventListener("change", () => {
	const result = image_input1.files[0];
	const image = document.getElementById('image1');
	addImage(result, image);
});

image_input2.addEventListener("change", () => {
	const result = image_input2.files[0];
	const image = document.getElementById('image2');
	addImage(result, image);
});


function addImage(result, imageField) {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		const uploaded_image = reader.result;
		imageField.style.backgroundImage = `url(${uploaded_image})`;
		imageField.setAttribute('hasImage', 'true')
	});
	reader.readAsDataURL(result);
};