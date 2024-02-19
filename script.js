const generate = document.querySelector(".generate");
const reset = document.querySelector(".reset");
const data = document.querySelector(".sidebar-content");
const shuffle = document.querySelector(".shuffle");

shuffle.onclick = shuffleBoard;

const board = document.querySelector(".board");

const loadStorage = () => JSON.parse(localStorage.input || "{}");
const saveStorage = (data) => localStorage.input = JSON.stringify(data);

document.onkeyup = function(e) {
	if (e.target.tagName !== "INPUT") return;

	generateBoard();
	if (event.key === "Enter") {
		e.target.blur();
		const id = e.target.id;
		const next = `.input-group:has(#${id}) + .input-group > input`;
		try {
			document.querySelector(next).focus();
		}
		catch {
			// pass
		}
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
	data.querySelectorAll("input").forEach(input => {
		const category_title = /group-[0-9]__name/.test(input.name);
		if (category_title) categories.push(input.value);
		else {
			const elem = document.querySelector(`.${input.id}`);
			const group = input.name.match(/group-[0-9]/g)[0];
			elem.innerHTML = input.value;
			elem.classList.add(group);
		}
	})
}
reset.onclick = function resetValues() {
	let storage = loadStorage();
	data.querySelectorAll("input").forEach(input => {
		input.value = "";
		delete storage[input.id]
	});
	saveStorage(storage);
	generateBoard();
}

function shuffleArray(array) { return array.sort(() => Math.random() - 0.5) }

function shuffleBoard() {
	let board_arr = [
		[1,1], [1,2], [1,3], [1,4],
		[2,1], [2,2], [2,3], [2,4],
		[3,1], [3,2], [3,3], [3,4],
		[4,1], [4,2], [4,3], [4,4]
	]
	shuffleArray(board_arr);
	
	board_arr.forEach((item, index) => {
		const row = Math.floor(index / 4) + 1;
		const col = (index % 4) + 1;
		
		const elem = document.querySelector(`.board__item.row-${row}.col-${col}:not(.moved)`);
		
		elem.classList.add("moved");
		elem.classList.remove(`row-${row}`,`col-${col}`);
		elem.classList.add(`row-${item[0]}`,`col-${item[1]}`)
	})
	board.querySelectorAll(".moved").forEach(item => item.classList.remove("moved"));
}
generateBoard();
shuffleBoard();
// function randomEmoji() {
// 	content_list = ["🪅","🥥","🫚","🌺","🌾","🪻","🫛","🫠","🫕","🪸","🫗"]
// 	for(child of board.children) {
// 		console.log(child);
// 		child.dataset.content = content_list;
// 	}
// }