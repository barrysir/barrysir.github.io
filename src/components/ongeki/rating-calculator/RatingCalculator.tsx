import { parseBestFrame } from "./parsing";
import styles from "./RatingCalculator.module.css";
import { createSignal, Show } from "solid-js";

function sum<T>(arr: T[], key: (a: T) => number): number {
  return arr.reduce((acc, x) => acc + key(x), 0);
}

type FrameInfo = {
  name: string;
  size: number;
  average: number;
  total: number;
  errors?: string;
};

function calcFrame(name: string, text: string, size: number): FrameInfo {
  let frame = parseBestFrame(text, size);
  let ratingSum = sum(frame.scores, (s) => s.rating);
  return {
    name: name,
    size: frame.scores.length,
    average: ratingSum / size,
    total: ratingSum,
    errors: frame.errors.map((err) =>
      `${name} - Line ${err.lineno}: ${err.error}`
    ).join("\n"),
  };
}

export function RatingCalculator() {
  const [tableData, setTableData] = createSignal<FrameInfo[]>([]);
  const [showSyntax, setShowSyntax] = createSignal(false);

  function questionMarkIcon() {
    return (
      <span
      class="cursor-pointer text-gray-400 text-lg align-top"
      onclick={() => setShowSyntax(x => !x)}
      title="Toggle syntax help"
      >
      ?
      </span>
    );
  }

  function handleClick() {
    let framebest = calcFrame("Best", textAreaBest.value, 30);
    let framenew = calcFrame("New", textAreaNew.value, 15);
    let framerecent = calcFrame("Recent", textAreaRecent.value, 10);
    let frametotal = {
      name: "Total",
      size: (framebest.size + framenew.size + framerecent.size),
      average: (framebest.total + framenew.total + framerecent.total) / 55,
      total: framebest.total + framenew.total + framerecent.total,
    };

    setTableData([framebest, framenew, framerecent, frametotal]);

    // resultText.innerText = `${framebest} + ${framenew} + ${framerecent} = ${texttotal} characters`;
  }

  let textAreaBest, textAreaNew, textAreaRecent, resultText;

  return (
    <div class={styles.calc}>
      <h2 class="m-0 mb-2">Rating Calculator {questionMarkIcon()}</h2>
      <Show when={showSyntax()}>
        <div class="syntax border text-sm p-2 my-2">
          <span class="font-bold">Syntax:</span>
          <div class="grid grid-flow-col grid-rows-3 text-xs mt-1">
            <span><code>13.55</code>: simple rating</span>
            <span><code>13.6 1001000</code>: chart constant + score</span>
            <span><code>13.7 1007831 ABFB</code>: AB/FB flags</span>
            <span><code>16.0 x10</code>: line multipliers</span>
            <span><code>14.7 1003400   // Adverse Gaff</code>: comments</span>
          </div>
        </div>
      </Show>
      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col h-full">
          <label for="best">Best</label>
          <textarea
            id="best"
            ref={textAreaBest}
            placeholder="Enter best content here..."
          >
          </textarea>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex flex-col flex-1">
            <label for="new">New</label>
            <textarea
              id="new"
              ref={textAreaNew}
              placeholder="Enter new content here..."
            >
            </textarea>
          </div>
          <div class="flex flex-col flex-1">
            <label for="recent">Recent</label>
            <textarea
              id="recent"
              ref={textAreaRecent}
              placeholder="Enter recent content here..."
            >
            </textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button type="button" onclick={handleClick}>Submit</button>
      </div>
      <Show when={tableData().length > 0}>
        <div class="flex justify-center mt-4">
          <table class="border border-collapse">
            <thead>
              <tr>
                <th class="border text-center w-24"></th>
                <th class="border text-center w-16">Count</th>
                <th class="border text-center w-24">Average</th>
                <th class="border text-center w-24">Sum</th>
              </tr>
            </thead>
            <tbody>
              {tableData().map((frame) => (
                <tr>
                  <td class="border font-bold text-center">{frame.name}</td>
                  <td class="border text-center">{frame.size}</td>
                  <td class="border text-center">{frame.average.toFixed(3)}</td>
                  <td class="border text-center">{frame.total.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="mt-4 text-xs">
          <span class="text-red-500 whitespace-pre-wrap">
            {tableData().map((frame) => frame.errors).filter((x) =>
              (x != undefined) && (x.length > 0)
            ).join("\n")}
          </span>
        </div>
      </Show>
    </div>
  );
}
