import React from "react";
import ErrorMessage from "../../features/Auth/components/ErrorMessage";

function InputField(props) {
  return (
    <div className="flex flex-col">
      <label
        className="text-2xl font-normal text-gray-600 mb-3 dark:text-textColorDark"
        htmlFor="email"
      >
        {props.label}
      </label>
      <input
        className="border w-full rounded-xl bg-slate-50 dark:bg-indigo-1050 dark:border-indigo-950 p-4 outline-none focus:border-indigo-600"
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={`${props.label}`}
        {...props.register(`${props.name}`)}
        autoComplete="off"
        defaultValue={props.defaultValue || ""}
      />
      {props.error ? <ErrorMessage message={props.error.message} /> : ""}
    </div>
  );
}

export default InputField;
