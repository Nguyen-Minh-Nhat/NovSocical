import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../../api/postApi";
import Box from "../../../components/Box";
import PostCard from "./PostCard";
import { loadMorePosts } from "../postSlice";

function ListOfPost({ isLoading }) {
  const [page, setPage] = useState(2);
  const [isLoadMore, setIsLoadMore] = useState(0);
  const postList = useSelector((state) => state.post.postList);
  const dispatch = useDispatch();
  const [isFinalPage, setIsFinalPage] = useState(false);

  const endPageRef = useRef();

  useEffect(() => {
    const endPage = endPageRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (endPage) observer.observe(endPage);
    return () => {
      if (endPage) observer.unobserve(endPage);
    };
  }, []);

  useEffect(() => {
    var mounted = true;
    if (isLoadMore > 1 && !isFinalPage) {
      if (mounted) {
        const getChannelContent = async () => {
          try {
            const res = await postApi.getAll(page);

            if (res.data.message) {
              if (res.data.listOfPost.length === 0) {
                setIsFinalPage(true);
                return;
              }
              dispatch(loadMorePosts(res.data.listOfPost));
              setPage((p) => p + 1);
            } else console.log(res);
          } catch (error) {}
        };
        getChannelContent();
      }
      setIsLoadMore(1);
    }

    return () => {
      mounted = false;
    };
  }, [isLoadMore]);

  return (
    <>
      {isLoading && (
        <Box custom="h-96 w-full">
          <div className="animate-pulse flex space-x-4 h-96">
            <div className="rounded-full bg-gray-700 h-20 w-20"></div>
            <div className="flex-1 space-y-20 py-1">
              <div className="h-8 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-8 bg-gray-700 rounded col-span-2"></div>
                  <div className="h-8 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </Box>
      )}
      {postList.length > 0 && (
        <div className="w-full flex flex-col space-y-4">
          {!isLoading &&
            postList.map((post, index) => (
              <div key={index}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
      )}
      <div ref={endPageRef}></div>
    </>
  );
}

export default ListOfPost;
