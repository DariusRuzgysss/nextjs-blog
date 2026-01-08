import { Post } from "@/app/types";
import { PostMeta } from "./PostMeta";
import ManagePostComment from "./ManagePostComment";

type Props = {
  post: Post;
  isEditable: boolean;
};

const PostComments = ({ post, isEditable }: Props) => {
  return (
    <div className="flex flex-col">
      {post.comments?.length ? (
        <div className="flex flex-col gap-6">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-row justify-between rounded-4xl border-(--dark)/24 border lg:py-6 lg:px-4 py-3 px-4"
            >
              <div className="flex flex-col gap-2">
                <PostMeta
                  authorName={comment.authorName}
                  authorImage={comment.authorImage}
                  createdAt={comment.createdAt}
                  showFullTime
                />
                <p>{comment.content}</p>
              </div>
              {isEditable && (
                <ManagePostComment post={post} commentId={comment.id} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No Comments</p>
      )}
    </div>
  );
};

export default PostComments;
