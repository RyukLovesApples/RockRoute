export const renderComment = (comment, userId) => {
  let commentHTML = `
      <div class="comment-card" data-comment-id="${comment.id}" data-user-id="${comment.user_id}" data-post-id="${comment.post_id}">
          <div class="author-info-card">
              <img src="/images/download.png" alt="${comment.username} avatar" class="avatar">
              <div class="user-info">
                  <p class="username">${comment.username}</p>
                  <time datetime="${comment.created_at.toISOString()}">
                      Created at: ${new Date(comment.created_at).toLocaleDateString('de-DE')}
                  </time>
              </div>
          </div>
          <p>${comment.content}</p>
          <div class="controls">
              <div class="general-controls">
                <div class="vote-controls">
                  <form action="${comment.userVote && comment.userVote.upvote ? "/vote/" + comment.userVote.id : "/vote"}" method="POST" class="vote-form">
                    <input type="hidden" name="commentId" value="${comment.id}">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="vote" value="upvote">
                    <button type="submit" class="${comment.userVote && comment.userVote.upvote ? "voted" : ""}">
                      <i class="fa-solid fa-arrow-up"></i>
                    </button>
                  </form>
                  <p id="vote-count-comment-${comment.id}">${comment.voteCount ? comment.voteCount : 0}</p>
                  <form action="${comment.userVote && comment.userVote.downvote ? "/vote/" + comment.userVote.id : "/vote"}" method="POST" class="vote-form">
                    <input type="hidden" name="commentId" value="${comment.id}">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="vote" value="downvote">
                    <button type="submit" class="${comment.userVote && comment.userVote.downvote ? "voted" : ""}">
                      <i class="fa-solid fa-arrow-down"></i>
                    </button>
                  </form>
                  </div>
                  <button data-user-id="${comment.user_id}" data-post-id="${comment.post_id}" onclick="toggleCommentForm(this, '${comment.id}')">
                      <i class="fa-regular fa-comment"></i> ${comment.replies.length}
                  </button>
                  <button><i class="fa-solid fa-share"></i> Share</button>
              </div>
              ${comment.user_id === userId ? `
                  <div class="logged-user-controls">
                      <button id="commentUpdateButton_${comment.id}" class="comment-card" onclick="toggleUpdateCommentForm('${comment.id}')">
                          <i class="fas fa-edit"></i> Edit
                      </button>
                      <form class="deleteForm" action="/comments/${comment.id}/delete?_method=DELETE" method="POST">
                          <input type="hidden" name="postId" value="${comment.post_id}">
                          <button type="submit" class="comment-card">
                              <i class="fa-solid fa-trash"></i> Delete
                          </button>
                      </form>
                  </div>
              ` : ''}
          </div>
          <div class="reply" data-comment-id="${comment.id}"></div>
          <form action="/comments/${comment.id}?_method=PUT" method="POST" style="display: none;" id="commentUpdateForm_${comment.id}">
              <input type="hidden" name="postId" value="${comment.post_id}">
              <input type="hidden" name="commentId" value="${comment.id}">
              <div class="textarea-container">
                  <textarea name="content" id="commentUpdateInput" placeholder="Update comment" required>${comment.content}</textarea>
                  <div class="button-container">
                      <button type="submit">Update</button>
                      <button type="button" class="cancel-button" onclick="cancelUpdate('${comment.id}')">Cancel</button>
                  </div>
              </div>
          </form>
      </div>
  `;

  if (comment.replies && comment.replies.length > 0) {
    commentHTML += '<div class="replies">';
    comment.replies.forEach(reply => {
        commentHTML += renderComment(reply, userId);
    });
    commentHTML += '</div>';
}

return commentHTML;
};
