import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../../../api/axiosClient";
import commentApi from "../../../api/commentApi";
import { SocketContext } from "../../../App";
import { alerts } from "../../../components/Alert/alertSlice";
import StorageKeys from "../../../constants/storageKeys";
import updateList from "../../../myFunction/updateList";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import ListOfChildComment from "./ListOfChildComment";

function ListOfComment({ post, postID, setNumberOfComments }) {
  const [replyCommentID, setReplyCommentID] = useState(null);
  const [listOfComment, setListOfComment] = useState([]);
  const apiURL = "/comment";
  const accessToken = localStorage.getItem(StorageKeys.accessToken);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const getListOfComment = async () => {
      const url = `${apiURL}/${postID}`;
      try {
        const res = await axiosClient.get(url, { headers: { accessToken } });
        if (res.data.success && mounted) {
          setListOfComment(res.data.listOfComment);
        } else console.log(1);
      } catch (error) {
        console.log(error);
      }
    };
    getListOfComment();
    return () => {
      mounted = false;
    };
  }, []);

  const handleClickReply = (replyCommentID) => {
    setReplyCommentID(replyCommentID);
  };

  const handleCreateComment = async (data) => {
    try {
      const res = await commentApi.create(data);
      if (res.data.success) {
        const newComment = res.data.newComment;
        await socket.emit("createComment", { post, newComment });
        setNumberOfComments((prevNum) => ++prevNum);
        setListOfComment((list) => [newComment, ...list]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await commentApi.deleteCommentById(commentId);
      if (res.data.success) {
        await socket.emit("deleteComment", { post, commentId });
        setNumberOfComments((prevNum) => --prevNum);
        setListOfComment(updateList(listOfComment, commentId, [], "delete"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (data) => {
    try {
      const res = await commentApi.updateCommentById(
        data.get("commentID"),
        data,
      );
      if (res.data.success) {
        const alertAction = alerts(res.data.message);
        dispatch(alertAction);
        setListOfComment(
          updateList(res.data.updatedComment, data.get("commentID"), "edit"),
        );
      } else console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //socket
  useEffect(() => {
    socket.on("createCommentToClient", (newComment) => {
      setNumberOfComments((prevNum) => ++prevNum);
      setListOfComment((list) => [newComment, ...list]);
    });

    return () => {
      socket.off("createCommentToClient");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (commentID) => {
      setNumberOfComments((prevNum) => --prevNum);
      setListOfComment((list) =>
        list.filter((comment) => comment._id !== commentID),
      );
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket]);

  return (
    <div className="space-y-10">
      <div className="mt-4">
        <CommentForm
          onSubmit={handleCreateComment}
          type={`creatNewComment${postID}`}
          initialValue={{
            post: postID,
            commentText: "",
            _id: "",
          }}
        />
      </div>
      {listOfComment.map((comment) => {
        return (
          <div key={comment._id} className="relative">
            {comment.childComments?.length > 0 && (
              <div className="absolute w-[0.1rem] left-[1.65rem] h-full ">
                <div className="h-full border-l-[0.2rem] border-solid border-slate-200 dark:border-indigo-850 "></div>
              </div>
            )}
            {replyCommentID === comment._id && (
              <div className="absolute w-[0.1rem] left-[1.65rem] h-full ">
                <div className="h-full border-l-[0.2rem] border-solid border-slate-200 dark:border-indigo-850 "></div>
              </div>
            )}
            <Comment
              comment={comment}
              onClickReply={handleClickReply}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
              setReplyCommentID={setReplyCommentID}
            />

            <div className="ml-[1.75rem] pl-[2.65rem] relative">
              {replyCommentID === comment._id ? (
                <ListOfChildComment commentID={comment._id} postID={postID} />
              ) : (
                <>
                  {comment.childComments?.length > 0 && (
                    <div
                      className="text-2xl cursor-pointer group"
                      onClick={() => handleClickReply(comment._id)}
                    >
                      <div className="w-[2.75rem] h-[200%] bg-white dark:bg-indigo-950 pb-4 bottom-0 absolute -left-[0.1rem]">
                        <div className="w-[90%] h-full border-l-[0.2rem] border-b-[0.2rem] rounded-bl-3xl border-solid border-slate-200 dark:border-indigo-850  "></div>
                      </div>
                      <i className="fas fa-reply rotate-180 ml-2"></i>{" "}
                      <span className="group-hover:underline">
                        {" "}
                        {comment.childComments?.length} replies
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfComment;
