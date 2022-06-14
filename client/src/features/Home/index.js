import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import postApi from "../../api/postApi";
import Post from "../Post";
import ListOfPost from "../Post/components/ListOfPost";
import { setPostList } from "../Post/postSlice";
import HomeSidebar from "./HomeSidebar";

function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await postApi.getAll();
        if (res.data.success) {
          const action = setPostList(res.data.listOfPost);
          dispatch(action);
          setIsLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    };
    getAllPosts();
  }, []);
  return (
    <div className="w-full flex justify-center pb-10">
      <div className="flex flex-col max-w-[65.6rem] w-full">
        <Post />
        <ListOfPost isLoading={isLoading} />
      </div>
      <HomeSidebar />
    </div>
  );
}
export default Home;
