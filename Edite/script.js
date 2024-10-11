quill.on('text-change', () => {
  recipienteSemRef.innerHTML = quill.getSemanticHTML();
});