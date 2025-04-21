import styles from "./RatingCalculator.module.css";

export function RatingCalculator() {
  function handleClick() {
    let textbest = textAreaBest.value.length;
    let textnew = textAreaNew.value.length;
    let textrecent = textAreaRecent.value.length;
    let texttotal = textbest + textnew + textrecent;

    resultText.innerText = `${textbest} + ${textnew} + ${textrecent} = ${texttotal} characters`;
  }

  let textAreaBest, textAreaNew, textAreaRecent, resultText;

  return (
    <div class={styles.calc}>
      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col h-full">
          <label for="best">Best</label>
          <textarea id="best" ref={textAreaBest} placeholder="Enter best content here...">
          </textarea>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex flex-col flex-1">
            <label for="new">New</label>
            <textarea id="new" ref={textAreaNew} placeholder="Enter new content here...">
            </textarea>
          </div>
          <div class="flex flex-col flex-1">
            <label for="recent">Recent</label>
            <textarea id="recent" ref={textAreaRecent} placeholder="Enter recent content here...">
            </textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button type="button" onclick={handleClick}>Submit</button>
        <span ref={resultText}></span>
      </div>
    </div>
  );
}
