import { Component, createSignal, Index } from "solid-js";
import { data } from "./data";

const App: Component = () => {
  const [value, setValue] = createSignal<string>("");
  const [meaning, setMeaning] = createSignal<string>("");

  const glossary = new Map();
  const EXAMPLES_AMOUNT = 3;

  data.forEach(([key, value]) => {
    glossary.set(key, value);
  });

  const handleOnChange = (value?: string) => {
    const meaning = glossary.get(value?.toUpperCase());
    if (meaning) {
      setMeaning(meaning);
    } else {
      setMeaning("");
    }
  };

  const getRandomAcronym = () => {
    const index = Math.floor(Math.random() * glossary.size + 1 + 1);
    return Array.from(glossary)[index][0];
  };

  console.log(getRandomAcronym());

  return (
    <div class="p-0 bg-slate-900 h-screen w-screen flex flex-col justify-center items-center text-pink-500 px-10 pb-40 pt-10 gap-40">
      <h3 class="font-medium leading-tight text-2xl mt-0 mb-2 text-white">
        Meaning of acronyms
      </h3>
      <div class="flex flex-col gap-10 w-[36rem] items-center justify-between h-screen">
        <div class="flex flex-col gap-5">
          <input
            class="block w-[36rem] p-4 text-gray-900 border rounded-lg sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="text"
            value={value() as string}
            onInput={(e) => handleOnChange(e.currentTarget.value as string)}
          />
          <div class="flex gap-10 justify-center">
            <Index each={new Array(EXAMPLES_AMOUNT)}>
              {() => {
                const name = getRandomAcronym();
                return (
                  <button
                    class="font-medium text-pink-100"
                    onClick={() => {
                      setValue(name);
                      handleOnChange(name);
                    }}
                  >
                    {name}
                  </button>
                );
              }}
            </Index>
          </div>
        </div>
        <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 ">
          {meaning()}
        </h4>
      </div>
    </div>
  );
};

export default App;
