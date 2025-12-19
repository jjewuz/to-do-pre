const items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const data = localStorage.getItem("tasks");
	return data ? JSON.parse(data) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	editButton.onclick = () => {
		textElement.contentEditable = true;
		textElement.focus();
	};

	textElement.onblur = () => {
		textElement.contentEditable = false;
		saveTasks(getTasksFromDOM());
	};

	textElement.onkeydown = e => {
		if (e.key === "Enter") {
			e.preventDefault();
			textElement.blur();
		}
	};

	deleteButton.onclick = () => {
		clone.remove();
		saveTasks(getTasksFromDOM());
	};

	duplicateButton.onclick = () => {
		const newItem = createItem(textElement.textContent);
		listElement.prepend(newItem);
		saveTasks(getTasksFromDOM());
	};

	return clone;
}

function getTasksFromDOM() {
	return [...listElement.querySelectorAll(".to-do__item-text")].map(el => el.textContent);
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(item => listElement.append(createItem(item)));

formElement.addEventListener("submit", e => {
	e.preventDefault();
	const value = inputElement.value.trim();
	if (value) {
		listElement.prepend(createItem(value));
		saveTasks(getTasksFromDOM());
		inputElement.value = "";
	}
});