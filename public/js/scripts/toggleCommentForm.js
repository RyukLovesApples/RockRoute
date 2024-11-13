function toggleCommentForm(buttonElement, commentId) {
  const userId = buttonElement.getAttribute('data-user-id');
  const postId = buttonElement.getAttribute('data-post-id');
  console.log("User ID:", userId, "Post ID:", postId);

  const repliesContainer = document.querySelector(`.comment-card[data-comment-id="${commentId}"] .reply`);
  let commentForm = repliesContainer.querySelector("#commentForm");  // This checks if form exists already

  if (!commentForm) {
    const formHtml = `
      <form action="/comments/new" method="POST" id="commentForm">
        <input type="hidden" name="postId" value="${postId}">
        <input type="hidden" name="userId" value="${userId}">
        <input type="hidden" name="parent_comment_id" value="${commentId}">
        <input type="text" name="content" id="commentFormInput" placeholder="Add a reply" required>
        <button type="submit">
          <i class="fa fa-arrow-circle-right fa-lg"></i>
        </button>
      </form>
    `;

    // Insert the form HTML into the container
    repliesContainer.insertAdjacentHTML('beforeend', formHtml);

    // Now re-query the commentForm after it's inserted into the DOM
    commentForm = repliesContainer.querySelector('#commentForm');
    const input = repliesContainer.querySelector('input[name="content"]');
    input.focus();

    // Add window click event to remove the form when clicking outside
    window.onclick = function(event) {
      if (!commentForm.contains(event.target) && !buttonElement.contains(event.target)) {
        repliesContainer.removeChild(commentForm);  // Remove the correct form
        window.onclick = null;  // Remove the event listener to avoid memory leaks
      }
    };
  } else {
    console.log(commentForm);
    repliesContainer.removeChild(commentForm);  // If form exists, remove it
  }
}
