import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import Box from "../../components/Box";
import CardSection from "../../components/CardSection";
import { setModal } from "../../components/Modal/modalSlice";
import AddEditPost from "./Pages/AddEditPost";

function Post() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);

  const handleClickAddPost = () => {
    const action = setModal({
      isOpen: true,
      type: "post",
      children: (
        <AddEditPost
          initialData={{
            type: "create",
            initialValue: { postText: "", postImage: "" },
          }}
        />
      ),
    });
    dispatch(action);
  };
  return (
    <div className="">
      {
        <div className="mb-6">
          <CardSection title="Create Post">
            <div
              className=" flex items-center cursor-pointer"
              onClick={handleClickAddPost}
            >
              <Avatar avatar={user.avatar} />
              <Box custom="bg-[#f0f2f5] rounded-xl py-2 px-4 w-full ml-4 flex-1 hover:bg-[#E4E6E9] dark:bg-[#BEDAFD] dark:text-slate-700">
                <span className="opacity-80">
                  Hello {user.firstName}!!! what's new?
                </span>
              </Box>
            </div>
          </CardSection>
        </div>
      }
    </div>
  );
}

export default Post;
