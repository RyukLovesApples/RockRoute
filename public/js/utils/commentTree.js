export function buildCommentTree(comments) {
  const commentMap = new Map();
  comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
  });

  const tree = [];
  commentMap.forEach(comment => {
      if (comment.parent_comment_id) {
          const parent = commentMap.get(comment.parent_comment_id);
          if (parent) {
              parent.replies.push(comment);
          }
      } else {
          tree.push(comment);
      }
  });
  return tree;
}
