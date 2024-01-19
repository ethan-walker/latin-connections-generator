const generate = document.querySelector(".generate");
const data = document.querySelector(".sidebar-content");

const board = document.querySelector(".board");

const loadStorage = () => JSON.parse(localStorage.input || "{}");
const saveStorage = (data) => localStorage.input = JSON.stringify(data);

document.onkeyup = function(e) {
	if (e.target.tagName !== "INPUT") return;
	
	if (event.key === "Enter") {
		e.target.blur();
	}
	if (event.key === "Backspace" && !e.target.value) {
		generate.setAttribute("aria-disabled", "true")
	}
};

data.querySelectorAll("input").forEach(input => {
	input.onblur = function saveValue(e) {
		const elem = e.target;
		let storage = loadStorage();
		storage[elem.id] = elem.value;
		saveStorage(storage);
		if (fullData()) {
			generate.setAttribute("aria-disabled", "false");
		}
		else {
			generate.setAttribute("aria-disabled", "true");
		}
	}
})
function loadValues() {
	let storage = loadStorage();
	for (let id in storage) {
		document.getElementById(id).value = storage[id];
	}
	if (fullData()) {
		generate.setAttribute("aria-disabled", "false");
		generateBoard();
	}
	else {
		generate.setAttribute("aria-disabled", "true");
	}
}
loadValues();
function fullData() {
	const inputs = Array.from(data.querySelectorAll("input"))
	return inputs.every(input => input.value);
}

generate.onclick = generateBoard;

function generateBoard() {
	let categories = [];
	let count = 0;
	data.querySelectorAll("input").forEach(input => {
		const category_title = /group-[0-9]__name/.test(input.name);
		if (category_title) categories.push(input.value);
		else {
			const group = input.name.match(/group-[0-9]/g)[0];
			board.children[count].innerHTML = input.value;
			board.children[count].classList.add(group);
			count ++;
		}
	})
console.log(categories);
}
const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function shuffleBoard() {
	let board_arr = [
		[1,1], [1,2], [1,3], [1,4],
		[2,1], [2,2], [2,3], [2,4],
		[3,1], [3,2], [3,3], [3,4],
		[4,1], [4,2], [4,3], [4,4]
	]
	shuffleArray(board_arr);
	console.log(board_arr);
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			const item = document.querySelector(`.board__item.row-${row+1}.col-${col+1}`);
			item.classList.remove(`row-${row+1}`,`col-${col+1}`);
			item.classList.add(`row-${board_arr[row*4+col][0]}`,`row-${board_arr[row*4+col][1]}`)
		}
	}
}
// function randomEmoji() {
// 	content_list = ["🪅","🥥","🫚","🌺","🌾","🪻","🫛","🫠","🫕","🪸","🫗"]
// 	for(child of board.children) {
// 		console.log(child);
// 		child.dataset.content = content_list;
// 	}
// }