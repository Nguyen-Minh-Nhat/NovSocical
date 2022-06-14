import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import CardSection from "../../../components/CardSection";
import QuickViewUser from "../../../components/QuickViewUser";
import StorageKeys from "../../../constants/storageKeys";
import Follow from "../../Follow";

function ListOfSearch({ searchInput }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("user") || "";
  const [listOfSearch, setListOfSearch] = useState();
  const getSearchResult = async () => {
    try {
      const accessToken = localStorage.getItem(StorageKeys.accessToken);
      const url = `user/search/${searchTerm}`;
      const res = await axiosClient.get(url, { headers: { accessToken } });
      if (res.data.success) {
        setListOfSearch(res.data.searchUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (searchInput && mounted) {
      setSearchParams({ user: searchInput });
    }
    return () => (mounted = false);
  }, [searchInput]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (searchTerm) {
        getSearchResult();
      } else {
        setListOfSearch(null);
      }
    }
    return () => (mounted = false);
  }, [searchTerm]);

  return (
    <>
      {listOfSearch && (
        <div className="w-[48.2rem] ml-2">
          <CardSection title="Search Result">
            <div className="space-y-4">
              {listOfSearch.length > 0 ? (
                listOfSearch.map((user, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-2 rounded-xl shadow bg-slate-200 dark:bg-indigo-1000 dark:border dark:border-indigo-950"
                    width="full"
                  >
                    <QuickViewUser user={user} showFollower={true} />
                    <Follow id={user._id} listOfFollowers={user.followers} />
                  </div>
                ))
              ) : (
                <div className="flex justify-center">
                  <span className="text-indigo-600">
                    Sorry, we couldn't find any results for this search
                  </span>
                </div>
              )}
            </div>
          </CardSection>
        </div>
      )}
    </>
  );
}

export default ListOfSearch;
