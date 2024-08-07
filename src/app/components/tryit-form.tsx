"use client";
import React, { useContext, useState } from "react";
import { validateUsername } from "../services/auth.service";
import {  useRouter } from "next/navigation";
import { DispatchContext } from "../contexts/states";

export default function TryitForm() {
  const ERROR_COLOR = "text-red-600";
  const HINT_COLOR = "text-cyan-500";
  const [inputHint, setInputHint] = useState("");
  const [hintColor, setHintColor] = useState(ERROR_COLOR);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { authDispatch, tryItDispatch } = useContext(DispatchContext);

  const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!inputValue) {
      setInputHint("Username cannot be empty!");
      setHintColor(ERROR_COLOR);
      return;
    }
    if (inputValue.length < 3) {
      setInputHint("Username should be at least 3 characters!");
      setHintColor(HINT_COLOR);
      return;
    }
    setInputHint("");
    authDispatch({ type: "TRYING", payload: { username: inputValue } });
    const result = await validateUsername({ username: inputValue });
    if (result.is_user_valid) {
      router.replace("/login");
      return;
    }
    tryItDispatch({ type: "TRYIT" });
    router.replace("/");
  };

  const onChangeInputValue = ({ target }: { target: HTMLInputElement }) => {
    setInputValue(target.value);
  };
  return (
    <>
      <form className="relative h-[8.5rem] w-full max-w-[20rem]">
        <input
          data-testid="input-username"
          type="text"
          placeholder="username"
          autoFocus
          defaultValue={inputValue}
          onChange={onChangeInputValue}
          className={`
              w-full text-gray-600 font-normal
              focus:ring-cyan-600 ring-inset
              rounded-md block border-0 ring-1
              focus:ring-2 focus:ring-inset leading-6
              focus:border-none appearance-none
              outline-none px-5 py-1 h-10
              `}
        />
        <p
          className={`
          ${hintColor} mb-3 text-wrap
          `}
        >
          {inputHint}
        </p>
        <button
          data-testid="submit-btn"
          onClick={onSubmit}
          className={`
        bg-cyan-700 hover:bg-sky-500 w-full h-16
        text-white font-semibold
        text-2xl rounded-xl shadow-xl
        absolute bottom-0
        `}
        >
          Try it!
        </button>
      </form>
    </>
  );
}
