import React from "react";
import { useDispatch } from "react-redux";
import ConfirmForm from "../../../components/ConfirmForm";
import { setModal } from "../../../components/Modal/modalSlice";

function PostMenu({ onEdit, onDelete }) {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    const setModalAction = setModal({
      isOpen: true,
      type: "confirmForm",
      children: (
        <ConfirmForm
          confirmAction={onDelete}
          message="Are you sure you want to delete this post"
        />
      ),
    });
    dispatch(setModalAction);
  };

  return (
    <>
      <div className="absolute p-2 right-2 rounded-xl w-64 bg-slate-200 dark:bg-indigo-1050 dark:text-textColorDark border dark:border-borderColorDark shadow-xl">
        <ul className="flex flex-col w-full space-y-2">
          <li className="flex w-full items-center" onClick={() => onEdit()}>
            <div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200 dark:hover:bg-indigo-850">
              <i className="fas fa-edit w-12"></i>
              <span className=" text-2xl">Edit</span>
            </div>
          </li>
          <li className="flex w-full items-center" onClick={handleClickDelete}>
            <div className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200 dark:hover:bg-indigo-850">
              <i className="fas fa-trash-alt w-12"></i>
              <span className=" text-2xl">Delete</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default PostMenu;
