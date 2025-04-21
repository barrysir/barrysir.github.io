import "./RatingCalculator.css";

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
    <>
      <div class="container">
        <div class="best-box">
          <label for="best">Best</label>
          <textarea id="best" ref={textAreaBest} placeholder="Enter best content here...">
          </textarea>
        </div>

        <div class="right-column">
          <div class="box">
            <label for="new">New</label>
            <textarea id="new" ref={textAreaNew} placeholder="Enter new content here...">
            </textarea>
          </div>
          <div class="box">
            <label for="recent">Recent</label>
            <textarea id="recent" ref={textAreaRecent} placeholder="Enter recent content here...">
            </textarea>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button type="button" onclick={handleClick}>Submit</button>
        <span ref={resultText}></span>
      </div>
    </>
  );
}
