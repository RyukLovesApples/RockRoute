function toggleCommentForm(buttonElement, commentId) {
  const userId = buttonElement.getAttribute('data-user-id');
  const postId = buttonElement.getAttribute('data-post-id');
  console.log("User ID:", userId, "Post ID:", postId);

  const repliesContainer = document.querySelector(`.comment-card[data-comment-id="${commentId}"] .reply`);

    if (!repliesContainer.querySelector('.reply')) {
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

      repliesContainer.insertAdjacentHTML('beforeend', formHtml);
      const input = repliesContainer.querySelector('input[name="content"]');
      input.focus();
    }
}
