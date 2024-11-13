const commentForm = document.getElementById("commentFormInput");
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldFocus = urlParams.get("reply") === "true";
  if (shouldFocus) {
      if (commentForm) {
        commentForm.focus();
      }
  }
});

const commentButton = document.querySelector(".comment-btn");
commentButton.addEventListener("click", () => {
  commentForm.focus();
})
