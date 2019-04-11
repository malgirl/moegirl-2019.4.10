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

timeout = 1000
for (let i = 0; i < list.length; i++) {
	let data = fs.readFileSync(root + i + '.json', 'utf8')
	let title = list[i]
	try {
		let result = JSON.parse(data)
		if (result.parse === undefined) {
			console.log(i, title, result.error)
			throw new Error()
		}
	} catch (error) {
		setTimeout(fetch, timeout, i)
		timeout += 350
		continue
	}
}