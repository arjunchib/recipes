export default function TextFieldButton(props) {
  return (
    <div className="relative">
      <input
        className="shadow rounded-lg block w-full pr-[6.8rem]"
        type="text"
      />
      <button
        type="button"
        className="absolute right-0 top-0 bottom-0 rounded-r-lg text-white px-4 bg-gray-50 min-w-[6rem] border-transparent"
      >
        {props.button || "Submit"}
      </button>
    </div>
  );
}
