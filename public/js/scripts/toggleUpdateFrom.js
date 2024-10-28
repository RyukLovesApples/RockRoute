function toggleUpdateCommentForm(commentId) {
  const form = document.getElementById('commentUpdateForm_' + commentId);
  if(form) {
    if(form.style.display === "none") {
      form.style.display = "block";
      document.getElementById("commentUpdateInput").focus();

      const formPosition = form.getBoundingClientRect();
      const scrollTop = window.scrollY;
      if(formPosition.bottom > window.innerHeight) {
        window.scrollTo({
          top: formPosition.top + scrollTop,
          behavior: 'smooth' 
      });
      }


    } else {
      form.style.display = "none"
    }
  }

  console.log("toggleUpdateForm.js is loaded");
}

const textareas = document.querySelectorAll('textarea');

textareas.forEach(textarea => {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

function cancelUpdate(commentId) {
  const form = document.getElementById(`commentUpdateForm_` + commentId);
  if(form) {
    form.style.display = 'none';
  }
}
