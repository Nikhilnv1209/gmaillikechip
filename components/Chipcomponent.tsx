"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import { IUserinfo } from "@/app/page";
import Image from "next/image";

function Chipcomponent({ userinfo }: { userinfo: IUserinfo[] }) {
  const [localUserinfo, setLocalUserinfo] = useState<IUserinfo[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUserinfo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [userhighlight, setUserhighlight] = useState<number | null>(null);

  // Sync local userinfo state with the prop
  useEffect(() => {
    setLocalUserinfo(userinfo);
  }, [userinfo]);

  const handleUserSelect = (selectedUser: IUserinfo) => {
    setSelectedUsers([...selectedUsers, selectedUser]);
    setLocalUserinfo(
      localUserinfo.filter((user) => user.id !== selectedUser.id)
    );
    setInputText("");
    setIsInputFocused(false);
  };

  const handleUserRemove = (selectedUser: IUserinfo) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user.id !== selectedUser.id)
    );
    setLocalUserinfo([...localUserinfo, selectedUser]);
    setInputText("");
    setIsInputFocused(true);
  };

  const keydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputText === "") {
      if (userhighlight === null) {
        setUserhighlight(selectedUsers.length - 1);
      } else {
        setSelectedUsers(selectedUsers.slice(0, -1));
        setLocalUserinfo([
          ...localUserinfo,
          selectedUsers[selectedUsers.length - 1],
        ]);
        setUserhighlight(null);
      }
    } 
  };

  return (
    <div className="w-[40vw] max-w-[40vw] p-1 border-b-2 border-blue-500 min-h-10">
      <span className="flex gap-1 flex-wrap">
        {selectedUsers.map((user, index) => (
          <span
            key={user.id}
            className={`bg-[#393E46] h-10 px-3 flex gap-2 items-center text-white text-sm rounded-xl cursor-pointer border-2 justify-center ${
              userhighlight === index ? "border-blue-600" : ""
            }`}
            onClick={() => handleUserRemove(user)}
          >
            <span className="h-6 relative w-6 inline-block">
              <Image
                src={user.imageUrl}
                alt="profileimage"
                fill
                className="rounded-xl"
              />
            </span>
            <p>{user.firstName}</p>
            <span>x</span>
          </span>
        ))}
        <div className="relative flex items-center max-w-[40%]">
          <input
            className="border-none outline-none bg-inherit relative w-full"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onKeyDown={keydownHandler}
          />
          {isInputFocused && (
            <div className="flex flex-col max-h-64 absolute top-[105%] left-0 gap-2 bg-[#EEEEEE] rounded-md text-sm shadow-md overflow-y-auto overflow-x-hidden py-2 scrollbar-thin scrollbar-thumb-[#393E46] scrollbar-track-[#EEEEEE] scrollbar-thumb-rounded-md">
              {localUserinfo
                .filter((user) =>
                  user.email.toLowerCase().includes(inputText.toLowerCase())
                )
                .map((user) => (
                  <span
                    key={user.id}
                    className="h-8 px-2 flex gap-2 items-center text-black cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    <span className="h-7 relative w-7 inline-block">
                      <Image
                        src={user.imageUrl}
                        alt="profileimage"
                        fill
                        className="rounded-full"
                      />
                    </span>
                    <p>{user.email}</p>
                  </span>
                ))}
            </div>
          )}
        </div>
      </span>
    </div>
  );
}

export default Chipcomponent;
