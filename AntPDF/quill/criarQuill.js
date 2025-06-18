const toolbarOptions = [
  [{ 'undo': 'customUndo' }, { 'redo': 'customRedo' }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'align': [] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
  [{ 'color': [] }, { 'background': [] }],
  ['clean']
];

const quill = new Quill('#divTexto', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

const undoButton = document.querySelector('.ql-undo');
undoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
</svg>`;
if (undoButton) {
  undoButton.addEventListener('click', function () {
    quill.history.undo();
  });
}

const redoButton = document.querySelector('.ql-redo');
redoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
</svg>`;
if (redoButton) {
  redoButton.addEventListener('click', function () {
    quill.history.redo();
  });
}
