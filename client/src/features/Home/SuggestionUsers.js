import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import Button from "../../components/Button";
import CardSection from "../../components/CardSection";
import QuickViewUser from "../../components/QuickViewUser";
import StorageKeys from "../../constants/storageKeys";
import Follow from "../Follow";

function SuggestionUsers() {
  const accessToken = localStorage.getItem(StorageKeys.accessToken);
  const [suggestionsUsers, setSuggestionsUsers] = useState([]);

  useEffect(() => {
    const getSuggestionUsers = async () => {
      const res = await axiosClient.get("user/suggestionsUser", {
        headers: { accessToken },
      });
      setSuggestionsUsers(res.data.users);
    };
    getSuggestionUsers();
  }, []);

  return (
    <>
      {suggestionsUsers?.length > 0 && (
        <CardSection title="You May Know">
          <div className="flex-col w-full space-y-4">
            {suggestionsUsers.map((user) => (
              <div
                key={user._id}
                className="flex w-full items-center justify-between hover:bg-slate-100 dark:hover:bg-indigo-850 p-2 rounded-xl"
              >
                <div className="flex-1 p-1">
                  <QuickViewUser user={user} showFollower={true} />
                </div>

                <Follow id={user._id} listOfFollowers={user.followers} />
              </div>
            ))}
            <div className="mt-12">
              <Button custom="w-full" p="p-4">
                {" "}
                See All
              </Button>
            </div>
          </div>
        </CardSection>
      )}
    </>
  );
}

export default SuggestionUsers;
