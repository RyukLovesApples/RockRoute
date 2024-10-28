window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldFocus = urlParams.get("reply") === "true";

  if (shouldFocus) {
      const commentForm = document.getElementById("commentFormInput");
      if (commentForm) {
        commentForm.focus();
      }
  }
});
