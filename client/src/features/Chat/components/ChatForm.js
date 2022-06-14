import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "../../../components/Box";
import { MdPermMedia, MdSend } from "react-icons/md";

function ChatForm({ onSubmit }) {
  const [imageSelected, setImageSelected] = useState();
  const [isValid, setIsValid] = useState(false);
  const [reviewImage, setReviewImage] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  useEffect(() => {
    if (watch("text") || imageSelected) {
      setIsValid(true);
    } else setIsValid(false);
  }, [watch("text"), imageSelected]);
  const handleUploadImage = (e) => {
    const image = e.target.files[0];

    const reviewImage = URL.createObjectURL(image);
    setReviewImage({ type: "local", path: reviewImage });
    setImageSelected(image);
  };
  const handleUndoUploadImage = () => {
    setReviewImage({ type: "local", path: "" });
    setImageSelected();
  };
  const onSubmitData = (data) => {
    if (isValid) {
      const formData = new FormData();
      formData.append("text", data.text);
      formData.append("image", imageSelected);
      formData.append("createAt", new Date());
      onSubmit(formData);
      reset({ text: "", image: "" });
      setImageSelected();
      setReviewImage();
    }
  };
  const handlePasteImage = (e) => {
    const item = e.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
      const image = item.getAsFile();
      const reviewImage = URL.createObjectURL(image);
      setReviewImage({ type: "local", path: reviewImage });
      setImageSelected(image);
    }
  };
  return (
    <div className="w-full px-4 h-full py-4 flex flex-col justify-center relative">
      {reviewImage?.path && (
        <div className="w-full mb-4 ">
          <Box
            width={"w-48"}
            p={"p-0"}
            custom="relative bg-slate-200 border border-solid border-slate-300 dark:border-borderColorDark shadow-md"
          >
            <div className="max-h-56 max-w-56 rounded-xl relative scrollbar">
              <img
                src={reviewImage.path}
                className="w-full h-full block"
                alt=""
              />
            </div>
            <div
              className="absolute right-0 cursor-pointer top-0 w-10 h-10 bg-indigo-600 rounded-full flex justify-center items-center text-white"
              onClick={handleUndoUploadImage}
            >
              <i className="fas fa-times font-thin"></i>
            </div>
          </Box>
        </div>
      )}

      <form
        className="h-full w-full flex space-x-4  items-center"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <div className="w-full flex-1 flex items-center min-h-[36px] rounded-xl overflow-hidden">
          <input
            type="text"
            className="flex-1 max-w-4/5 transition-all flex items-center min-h-[36px] rounded-xl overflow-hidden dark:text-textColorDark bg-slate-200 dark:bg-indigo-1050 outline-none px-4 "
            {...register("text")}
            autoComplete="off"
            onPaste={(e) => {
              handlePasteImage(e);
            }}
          />
          <input
            className="appearance-none hidden"
            type="file"
            rows="7"
            name="file"
            id="file"
            {...register("image")}
            onChange={handleUploadImage}
          />
        </div>
        <label htmlFor="file">
          <div className="w-14 h-14 flex items-center bg-slate-200 dark:bg-indigo-850 dark:text-white justify-center rounded-[50%] hover:bg-slate-400 cursor-pointer">
            <MdPermMedia />
          </div>
        </label>
        {isValid && (
          <button
            type="submit"
            className="w-14 h-14 bg-slate-200 text-indigo-600 rounded-full flex justify-center items-center  transition-all"
          >
            <MdSend />
          </button>
        )}
      </form>
    </div>
  );
}

export default ChatForm;
{
  /* <span
					className="resize w-full h-full outline-none text-3xl p-4 block"
					role="textbox"
					contentEditable
					onChange={(e) => console.log(e.target)}
				>
					{message}
				</span> */
}
