class Todo {
  constructor(data, templateSelector, updateCheck, updateTotal) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._data = data;
    this._templateSelector = document.querySelector(templateSelector);
    this._updateCheck = updateCheck;
    this._updateTotal = updateTotal;
  }

  _toggleCheck() {
    this._completed = !this._completed;
  }

  _handleDelete() {
    this._todoElement.remove();
    this._todoElement = null;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCheck();
      this._updateCheck(this._completed);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._updateTotal(this._completed);
      this._handleDelete();
    });
  }

  _getTemplate() {
    return this._templateSelector.content
      .querySelector(".todo")
      .cloneNode(true);
  }

  _generateNameEl() {
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoNameEl.textContent = this._name;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _generateDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._getTemplate();
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._generateNameEl();
    this._generateCheckboxEl();
    this._generateDateEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
