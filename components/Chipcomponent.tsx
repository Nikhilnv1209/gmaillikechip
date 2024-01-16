"use client";
import { useRef, useState } from "react";
import { emails } from "@/constants/emails";

function Chipcomponent() {
  const [Emails, setEmails] = useState<string[]>(emails);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = (email: string) => {
    if(selectedEmails.includes(email)) return;
    const newSelectedEmails = [...selectedEmails, email];
    const newemails = emails.filter((email) => !newSelectedEmails.includes(email));
    setSelectedEmails(newSelectedEmails);
    setEmails(newemails);
    setInputValue("");
    setIsInputFocused(false);
  };

  const handleSelectedEmails = (email: string) => {
    const newSelectedEmails = selectedEmails.filter((selectedEmail) => selectedEmail !== email);
    const newemails = [...emails, email];
    setSelectedEmails(newSelectedEmails);
    setEmails(newemails);
  }

  return (
    <div className="w-[40%] max-w-[40%] p-1 border border-black min-h-10">
      <span className="flex gap-1 flex-wrap">
        {selectedEmails.length > 0 &&
          selectedEmails.map((email, index) => {
            return (
              <span
                key={email + index}
                className="bg-black/40 h-8 px-3 flex gap-2 items-center text-white text-sm rounded-full cursor-pointer"
                onClick={() => {handleSelectedEmails(email)}}
              >
                <p>{email}</p>
                <span>x</span>
              </span>
            );
          })}
        {/* input for the emails */}
        <div className="relative flex items-center max-w-[40%]">
          <input
            className="border-none outline-none bg-inherit relative w-full"
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
          />
          {isInputFocused && (
            <div className="flex flex-col max-h-40 absolute top-[105%] left-0 gap-2 bg-white shadow-md overflow-y-auto overflow-x-hidden">
              {Emails.length > 0 &&
                Emails
                  .filter((email) => email.includes(inputValue))
                  .map((email, index) => {
                    return (
                      <span
                        key={email + index}
                        className="h-8 px-3 flex gap-2 items-center text-black cursor-pointer"
                        onClick={() => handleInputClick(email)}
                      >
                        <p>{email}</p>
                      </span>
                    );
                  })}
            </div>
          )}
        </div>
        {/* <span className='bg-black/40 h-8 px-3 flex items-center text-white'>
        <p>hello this is an email</p>
      </span>
      <span className='bg-black/40 h-8 px-3 flex items-center text-white'>
        <p>hello this is an email</p>
      </span>
      <span className='bg-black/40 h-8 px-3 flex items-center text-white'>
        <p>hello this is an email</p>
      </span>
      <span className='bg-black/40 h-8 px-3 flex items-center text-white'>
        <p>hello this is an email</p>
      </span> */}
      </span>
    </div>
  );
}

export default Chipcomponent;
