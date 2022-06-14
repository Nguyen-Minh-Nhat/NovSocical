import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from "../../../components/Box";
import Button from "../../../components/Button";
import CardSection from "../../../components/CardSection";
import CloseButton from "../../../components/CloseButton";
import QuickViewUser from "../../../components/QuickViewUser";
import ErrorMessage from "../../Auth/components/ErrorMessage";
import CloudImg from "./CloudImg";
import { MdPermMedia } from "react-icons/md";

function PostForm({ onSubmit, initialData, type }) {
  const user = useSelector((state) => state.user.current);
  const [imageSelected, setImageSelected] = useState(initialData.postImage);
  const [isValid, setIsValid] = useState(false);
  const [reviewImage, setReviewImage] = useState({});
  useEffect(() => {
    setReviewImage({
      type: initialData.postImage ? "cloud" : "local",
      path: initialData.postImage,
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmitForm = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "postImage") {
        formData.append(key, imageSelected);
      } else formData.append(key, data[key]);
    });
    if (isValid) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    if (watch("postText") || imageSelected) {
      setIsValid(true);
    } else setIsValid(false);
  }, [watch("postText"), imageSelected]);

  const handleAddImage = (e) => {
    const image = e.target.files[0];
    const reviewImage = URL.createObjectURL(image);
    setReviewImage({ type: "local", path: reviewImage });
    setImageSelected(image);
  };
  const inputEl = useRef(null);
  const handleUndoAddImage = () => {
    setReviewImage({ type: "local", path: "" });
    setImageSelected();
  };

  return (
    <div className="w-[50rem] min-h-[42.8rem] max-h-[63.6rem] relative overflow-hidden">
      <CardSection title={`${type} Post`} close={<CloseButton />}>
        <div className="flex items-start">
          <QuickViewUser user={user} showEmail={true} />
        </div>
        <form
          className="w-full h-full mt-4 flex flex-col pb-4 "
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="max-h-[36.4rem] overflow-y-scroll scrollbar">
            <div className="flex flex-col mt-4 mb-4">
              <textarea
                className=" outline-none resize-none dark:border-indigo-950 rounded-lg bg-white dark:bg-indigo-950 px-6 py-4 h-full"
                type="text"
                rows="3"
                name="content"
                defaultValue={initialData.postText || ""}
                {...register("postText")}
                placeholder="Write something..."
              />
              {errors.content ? (
                <ErrorMessage message={"Content post is required field"} />
              ) : (
                ""
              )}
            </div>
            {reviewImage.path && (
              <Box custom="relative border border-solid border-slate-300 dark:border-borderColorDark shadow-md p-2">
                <div className="rounded-lg relative scrollbar">
                  {reviewImage.type === "cloud" ? (
                    <CloudImg publicId={reviewImage.path} />
                  ) : (
                    <img
                      src={reviewImage.path}
                      className="w-full h-full"
                      alt=""
                    />
                  )}
                  <CloseButton onClick={handleUndoAddImage} absolute={true} />
                </div>
              </Box>
            )}
          </div>
          <div className="flex flex-col my-8">
            <div className="border border-solid border-slate-300 dark:border-indigo-950 shadow-md flex justify-between rounded-lg bg-white px-4 py-2 h-full focus:outline-indigo-600 dark:bg-indigo-1050 items-center">
              <label className=" font-semibold">Attach</label>
              <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                <i className="far fa-grin-beam text-5xl"></i>
              </div>
              <label htmlFor="file">
                <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                  <MdPermMedia />
                </div>
              </label>
              <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                <i className="fas fa-user-tag"></i>
              </div>

              <div className="w-16 h-16 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>

            <input
              ref={inputEl}
              className="appearance-none hidden"
              type="file"
              rows="7"
              name="file"
              id="file"
              {...register("postImage")}
              onChange={handleAddImage}
            />
          </div>
          <Button type="submit" w="w-full" h="h-[4rem] " isValid={isValid}>
            <span className="capitalize">{type} Post</span>
          </Button>
        </form>
      </CardSection>
    </div>
  );
}

export default PostForm;
