let lastBettingTime = 0;
let tokenIndex = 0;

const tokens = [
	"demo",
	"demo",
	"demo"
];

function getAuthorizationToken() {
	const token = tokens[tokenIndex];
	tokenIndex = (tokenIndex + 1) % tokens.length;
	return `Bearer ${token}`;
}

async function checkSignal() {
	const url = 'https://crash-gateway-cr.100hp.app/state?id_n=1play_luckyjet';
	const response = await fetch(url, {
		headers: {
			'Authorization': getAuthorizationToken()
		}
	});
	const data = await response.json();
	const state = data.current_state;

	// const mainImage = document.querySelector('.main-image');
	const mainButton = document.querySelector('#main-btn .text')
	if (state === 'ending') {
		mainButton.textContent = 'ЗАБИРАЙ'
		mainButton.classList.toggle('blink', true)
	} else  {
		mainButton.textContent = 'ПОДОЖДИ'
		mainButton.classList.toggle('blink', false)

		if (state === 'betting' && Date.now() - lastBettingTime > 5000) {
			lastBettingTime = Date.now();
		}
	}
}

checkSignal()
setInterval(checkSignal, 1000);