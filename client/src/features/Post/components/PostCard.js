import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/postApi";
import { SocketContext } from "../../../App";
import { alerts } from "../../../components/Alert/alertSlice";
import Box from "../../../components/Box";
import MenuButton from "../../../components/MenuButton";
import { setModal } from "../../../components/Modal/modalSlice";
import QuickViewUser from "../../../components/QuickViewUser";
import getDifferenceTime from "../../../myFunction/getDifferenceTime";
import AddEditPost from "../Pages/AddEditPost";
import { addNewPost, deletePost, updatePost } from "../postSlice";
import CloudImg from "./CloudImg";
import Like from "./Like";
import ListOfComments from "./ListOfComment";
import PostMenu from "./PostMenu";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const user = useSelector((state) => state.user.current);
  const imgRef = useRef();
  const { differenceNumber, timeUnit } = getDifferenceTime(post.createdAt);

  const [isShowComment, setIsShowComment] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [numberOfComments, setNumberOfComments] = useState(
    post.comments.length,
  );

  //check liked
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post, user]);

  //delete post
  const handleDeletePost = async () => {
    try {
      const res = await postApi.deletePostById(post._id);
      if (res.data.success) {
        const action = deletePost(post._id);

        const alertAction = alerts({
          type: "success",
          message: res.data.message,
        });

        dispatch(alertAction);
        dispatch(action);
      }
    } catch (error) {
      alert(error);
    }
  };
  //edit post
  const handleEditPost = () => {
    const action = setModal({
      isOpen: true,
      children: (
        <AddEditPost
          initialData={{
            type: "edit",
            initialValue: post,
          }}
        />
      ),
    });
    dispatch(action);
  };

  return (
    <>
      <Box height="w-full" bg="bg-white shadow-lg" p="p-6 pb-2">
        <div className="flex flex-1 mb-6 items-center">
          <div className="flex-1">
            <QuickViewUser
              user={post.user}
              other={`${differenceNumber} ${timeUnit} ago`}
            />
          </div>

          <MenuButton>
            <PostMenu onDelete={handleDeletePost} onEdit={handleEditPost} />
          </MenuButton>
        </div>

        <div>
          {post.postText && <div className="py-2">{post.postText}</div>}
          {post.postImage && (
            <div
              ref={imgRef}
              className="w-full max-h-[76rem] overflow-hidden bg-indigo-300 rounded-xl"
            >
              <CloudImg publicId={post.postImage} />
            </div>
          )}
        </div>

        <div className="flex justify-between mb-[0.2rem]">
          <span className="text-slate-600 dark:text-textColorDark">
            <span className="text-indigo-600">{post.likes.length} </span>
            Likes
          </span>
          {numberOfComments > 0 && (
            <span
              onClick={() => setIsShowComment(!isShowComment)}
              className="hover:underline decoration-[0.5px] cursor-pointer text-slate-600 dark:text-textColorDark"
            >
              <span className="text-indigo-600 ">{numberOfComments}</span>
              {numberOfComments > 1 ? "	Comments" : " Comment"}
            </span>
          )}
        </div>
        <div className="flex flex-1 justify-between pt-2  border-t border-solid border-slate-300 dark:border-slate-600">
          <Like
            postID={post._id}
            isLiked={isLiked}
            socket={socket}
            post={post}
          />
          <div
            className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative dark:text-textColorDark"
            onClick={() => setIsShowComment(true)}
          >
            <i className="far fa-comment-alt"></i> Comment
          </div>
        </div>
        {isShowComment && (
          <div className="border-t w-full border-solid border-slate-300 dark:border-slate-600 pt-4 mt-2">
            <ListOfComments
              type="comment"
              postID={post._id}
              setNumberOfComments={setNumberOfComments}
              post={post}
            />
          </div>
        )}
      </Box>
    </>
  );
}

export default PostCard;
