const fs = require('fs')
const request = require('request')

const root = '/root/zhmoegirlorg-20190410-wikidump/'
const list = fs.readFileSync(root + 'zhmoegirlorg-20190410-titles.txt', 'utf8').split('\n')

function fetch(i) {
	let title = list[i]
	let url = 'https://zh.moegirl.org/api.php?action=parse&format=json&page=' + encodeURIComponent(title) + '&prop=wikitext'
	console.log('fetch', i, title)
	request.get(url)
		.on('error', error => console.log(i, title, error))
		.pipe(fs.createWriteStream(root + i + '.json'))
}

let i = 0
let timer = setInterval(() => {
	fetch(i)
	if (i === list.length) {
		clearInterval(timer)
	} else {
		i++
	}
}, 250)