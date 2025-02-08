document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.gif-container')
	const numberOfGifs = 100 // Adjust the number of GIFs as needed
	const segments = 10 // Number of segments to divide the width into

	function createGif() {
		const gif = document.createElement('div')
		gif.classList.add('gif')
		resetGif(gif)
		gif.addEventListener('animationend', () => {
			resetGif(gif)
		})
		gif.addEventListener('click', () => {
			const rect = gif.getBoundingClientRect()
			gif.remove()
			showLoveMessage(rect.left + rect.width / 2, rect.top + rect.height / 2)
		})
		container.appendChild(gif)
	}

	function resetGif(gif) {
		const segmentWidth = 100 / segments
		const segment = Math.floor(Math.random() * segments)
		gif.style.left = `${
			segment * segmentWidth + Math.random() * segmentWidth
		}vw`
		gif.style.setProperty('--fall-duration', `${Math.random() * 2 + 3}s`) // Random duration between 3s and 5s for falling
		gif.style.setProperty('--play-duration', `${Math.random() * 1.5 + 1}s`) // Random duration between 1s and 2.5s for frame changes
		gif.style.animationDelay = `${Math.random() * 5}s` // Random delay up to 5s for fall
		gif.style.animationPlayState = 'running'
	}

	let heartClicked = 0

	function showLoveMessage(left, top) {
		heartClicked++
		const message = document.createElement('div')
		message.classList.add('love-message')
		message.style.left = `${left}px`
		message.style.top = `${top}px`
		message.textContent = 'I love you!'
		container.appendChild(message)
	}

	setTimeout(() => {
		if (heartClicked === 0) {
			const clickMessage = document.createElement('div')
			clickMessage.classList.add('click-message')
			clickMessage.textContent = 'Click on heart'
			document.body.appendChild(clickMessage)
		}
	}, 5000)

	for (let i = 0; i < numberOfGifs; i++) {
		createGif()
	}

	let Clicks = 0
	let NoClicks = 0
	let cachedIP = null

	async function getIP() {
		if (cachedIP) {
			return cachedIP
		}
		const response = await fetch('https://api.ipify.org?format=json')
		const data = await response.json()
		cachedIP = data.ip
		return cachedIP
	}

	const noButton = document.querySelector('.button_no')
	const yesButton = document.querySelector('.button_yes')
	const buttons = document.querySelector('.buttons')
	const gif = document.querySelector('.cat-gif')
	const title = document.querySelector('.title')
	const heart = document.querySelector('.gif-container')

	yesButton.addEventListener('click', () => {
		Clicks++
		if (Clicks === 1) {
			title.textContent = 'Yay! I love you too!'
			gif.src = 'gif/cat-love.gif'
			buttons.style.display = 'none'
		} else if (Clicks === 2) {
			title.textContent = 'aww...'
			gif.src = 'gif/cat-sad.gif'
			buttons.style.display = 'none'
		}
	})

	noButton.addEventListener('click', async () => {
		NoClicks++
		if (NoClicks === 3) {
			await getIP()
			title.innerHTML = `ok then...<br><br><br>ip: ${cachedIP}<br>DNS: 8.8.8.8<br>WAN: 100.10.40<br> WAN TYPE: Private Net<br>Gateway: 192.168.1.254`
			gif.style.display = 'none'
			buttons.style.display = 'none'
			heart.style.display = 'none'
		} else if (Clicks === 1) {
			title.innerHTML = 'So... think again...<br>Will you be my valentine?'
			Clicks = 0
		} else {
			Clicks++
			if (Clicks === 2) {
				title.textContent = 'aww...'
				gif.src = 'gif/cat-sad.gif'
				buttons.style.display = 'none'
			} else if (Clicks === 1) {
				title.textContent = 'Are you sure?'
				gif.src = 'gif/cat-waiting.gif'
			}
		}
	})
})
