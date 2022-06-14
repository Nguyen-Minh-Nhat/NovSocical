import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import Box from "../../../components/Box";
import CloudImg from "./CloudImg";

function CommentForm({ onSubmit, initialValue, type }) {
  const userID = useSelector((state) => state.user.current.userID);
  const [reviewImage, setReviewImage] = useState({
    type: initialValue.commentImage ? "cloud" : "local",
    path: initialValue.commentImage,
  });
  const [imageSelected, setImageSelected] = useState(initialValue.commentImage);

  const { register, handleSubmit, reset, setValue } = useForm({
    model: "onChange",
  });
  const userAvatar = useSelector((state) => state.user.current.avatar);
  const onSubmitForm = (data) => {
    if (!data.commentText && !imageSelected) {
      alert("you must have at least one field for your comment");
    } else {
      const formData = new FormData();
      const isImageChange = initialValue.commentImage !== imageSelected;
      formData.append("commentID", initialValue._id);
      formData.append("postID", initialValue.post);
      formData.append("userID", userID);
      formData.append("commentText", data.commentText);
      formData.append("commentImage", imageSelected);
      formData.append("isImageChange", isImageChange);
      onSubmit(formData);
      handleRemoveImage();
      reset();
    }
  };

  const handleAddImage = (e) => {
    const image = e.target.files[0];
    const reviewImage = URL.createObjectURL(image);
    setReviewImage({ type: "local", path: reviewImage });
    setImageSelected(image);
  };
  const handleRemoveImage = () => {
    setReviewImage({ type: "local", path: "" });
    setImageSelected();
  };

  useEffect(() => {
    setValue("commentText", initialValue.commentText);
  }, [initialValue]);

  return (
    <>
      <div className="flex w-full items-center">
        <div className="mr-4">
          <Avatar avatar={userAvatar} size="w-14 h-14" />
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
          <Box custom="w-full py-3 flex items-center relative bg-[#f0f2f5] rounded-xl dark:bg-[#BEDAFD] ">
            <input
              className="w-full outline-none dark:text-black bg-[#f0f2f5] dark:bg-[#BEDAFD]"
              autoFocus
              type="text"
              placeholder="write an answer..."
              {...register("commentText")}
              autoComplete="off"
            />
            <div className=" absolute right-8 text-xl opacity-60 ">
              <label htmlFor={type}>
                <i className="fas fa-photo-video cursor-pointer"></i>
              </label>
              <input
                className="appearance-none hidden"
                type="file"
                id={type}
                name=""
                {...register("commentImage")}
                onChange={(e) => handleAddImage(e)}
              />
            </div>
          </Box>
        </form>
      </div>
      {reviewImage.path && (
        <div className="ml-16 mt-4 relative w-40 h-40">
          <span
            className="absolute right-2 text-white cursor-pointer "
            onClick={handleRemoveImage}
          >
            x
          </span>
          {reviewImage.type === "cloud" ? (
            <CloudImg publicId={reviewImage.path} />
          ) : (
            <img
              src={reviewImage.path}
              alt=""
              className="w-auto h-auto object-cover"
            />
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(CommentForm);
