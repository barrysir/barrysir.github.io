const URLbase_jacket = "/public/ongeki/reiwa/musicjackets/";

window.addEventListener("DOMContentLoaded", function () {
    // ユーザーID読み込み
    document.getElementById("osl_id").value = localStorage.getItem("osl_id");

    // 設定読み込み
    document.getElementById("showprev").checked = localStorage.getItem("showprev") === "true";
    document.getElementById("showaddrate").checked = localStorage.getItem("showaddrate") === "true";
    document.getElementById("shownew").checked = localStorage.getItem("shownew") === "true";
    document.getElementById("shownewemb").checked = localStorage.getItem("shownewemb") === "true";

    // 初回読み込み時は新曲枠平均や新曲枠など(showaddrate, shownew)を表示する
    if (localStorage.getItem("showaddrate") === null) {
        document.getElementById("showaddrate").checked = true;
    }
    if (localStorage.getItem("shownew") === null) {
        document.getElementById("shownew").checked = true;
    }

    // 「一部楽曲のスコア登録」読み込み
    // Perfect Shining!! / Lunatic / 13+
    document.getElementById("fix_perfectshining").value = localStorage.getItem("fix_perfectshining") || "";
    document.getElementById("fix_perfectshining_fc").checked = localStorage.getItem("fix_perfectshining_fc") === "true";
    document.getElementById("fix_perfectshining_ab").checked = localStorage.getItem("fix_perfectshining_ab") === "true";
    document.getElementById("fix_perfectshining_fb").checked = localStorage.getItem("fix_perfectshining_fb") === "true";
});

// https://zenn.dev/de_teiu_tkg/articles/0938b41ec85d20
const toBlob = (base64) => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
        buffers[i] = decodedData.charCodeAt(i);
    }
    try {
        const blob = new Blob([buffers.buffer], {
            type: "image/jpeg",
        });
        return blob;
    } catch (e) {
        return null;
    }
};

// https://qiita.com/h53/items/05139982c6fd81212b08
function toISOStringWithTimezone(date) {
    const pad = function (str) {
        return ('0' + str).slice(-2);
    };
    const year = (date.getFullYear()).toString();
    const month = pad((date.getMonth() + 1).toString());
    const day = pad(date.getDate().toString());
    const hour = pad(date.getHours().toString());
    const min = pad(date.getMinutes().toString());
    const sec = pad(date.getSeconds().toString());
    const tz = -date.getTimezoneOffset();
    const sign = tz >= 0 ? '+' : '-';
    const tzHour = pad((tz / 60).toString());
    const tzMin = pad((tz % 60).toString());

    return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`;
}

function loadingState(b) {
    if (b) {
        // ローダー表示
        document.getElementById("imggen_loader").style.display = "block";

        // 生成ボタン非表示
        document.getElementById("generate").style.display = "none";
    } else {
        // ローダー非表示
        document.getElementById("imggen_loader").style.display = "none";

        // 生成ボタン表示
        document.getElementById("generate").style.display = "block";
    }
}

function initializeArea() {
    const bestSongs = document.getElementById("img-best-songs");
    while (bestSongs.firstChild) bestSongs.removeChild(bestSongs.firstChild);
    const newSongs = document.getElementById("img-new-songs");
    while (newSongs.firstChild) newSongs.removeChild(newSongs.firstChild);
    const imgWrapper = document.getElementById("result-img-wrapper");
    while (imgWrapper.firstChild) imgWrapper.removeChild(imgWrapper.firstChild);
}

function removeButtons() {
    document.getElementById("generate-image").style.display = "none";
    document.getElementById("download").style.display = "none";
    document.getElementById("share").style.display = "none";
}

function renderImage() {
    loadingState(true);
    removeButtons();
    // useCORS required to render jackets, which are loaded from reiwa
    html2canvas(document.getElementById("pre-render-area"), { scale: 2, useCORS: true, }).then(c => {
        document.getElementById("pre-render-area").style.display = "none";
        const img = document.createElement("img");
        img.src = c.toDataURL("image/jpeg");
        img.id = "result-img";
        img.style.width = "min(100%, 900px)";
        document.getElementById("result-img-wrapper").appendChild(img);
        document.getElementById("result-img-wrapper").style.display = "block";
        document.getElementById("download").style.display = "block";
        document.getElementById("share").style.display = "block";
        loadingState(false);
    });
    loadingState(false);
}

function renderSongsArea(area, songs, newestDate) {
    for (let i = 0; i < songs.length; i++) {
        // ジャケットURL取得
        let musicId = songs[i].id;
        let jacketURL;
        for (let j = 0; j < allMusics.length; j++) {
            if (allMusics[j].music_id === musicId) {
                let filename = md5(allMusics[j].title + allMusics[j].artist) + ".webp"
                jacketURL = URLbase_jacket + filename;
                break;
            }
        }

        // 難易度・ランプ・ランク・スコア取得
        let musicDiff = songs[i].diff.toLowerCase().slice(0, 3);

        let musicLamp = "";
        let musicLampColor;
        if (songs[i].is_allbreak) {
            musicLamp = "ALL BREAK";
            musicLampColor = "rgb(255, 170, 210)";
        } else if (songs[i].is_fullcombo) {
            musicLamp = "FULL COMBO";
            musicLampColor = "#fff";
        }

        let fbPosBottom = "32px";
        if (songs[i].is_fullbell) {
            if (songs[i].is_allbreak || songs[i].is_fullcombo) {
                fbPosBottom = "54px";
            }
        }

        let musicScore = songs[i].score;
        let musicScoreRank = songs[i].rank;
        let rankColor;
        if (musicScoreRank === "D") {
            rankColor = "#888888";
        } else if (musicScoreRank === "C") {
            rankColor = "#b87333";
        } else if (musicScoreRank === "B" || musicScoreRank === "BB" || musicScoreRank === "BBB") {
            rankColor = "#03b1fc";
        } else if (musicScoreRank === "A" || musicScoreRank === "AA" || musicScoreRank === "AAA") {
            rankColor = "#fc6203";
        } else if (musicScoreRank === "S" || musicScoreRank === "SS" || musicScoreRank === "SS+") {
            rankColor = "#fc8403";
        } else if (musicScoreRank === "SSS") {
            rankColor = "#ffdf75";
        } else {
            rankColor = "#03fc1c";
        }

        // 描画
        let musicBlock = document.createElement("div");
        musicBlock.className = "img-song-block";

        let musicBlockUpper = musicBlock.appendChild(document.createElement("div"));
        musicBlockUpper.className = "img-song-block-upper";

        // データ部
        let musicBlockData = musicBlockUpper.appendChild(document.createElement("div"));
        musicBlockData.className = "img-song-block-data";

        let musicRank = musicBlockData.appendChild(document.createElement("div"));
        musicRank.className = "img-song-rank";
        musicRank.innerText = "#" + String(i + 1);

        let musicConstTxt = musicBlockData.appendChild(document.createElement("div"));
        musicConstTxt.className = "img-song-txt";
        musicConstTxt.innerText = "CONST";

        let musicConst = musicBlockData.appendChild(document.createElement("div"));
        musicConst.className = "img-song-const";
        musicConst.innerText = songs[i].const.toFixed(1);
        if (songs[i].is_const_unknown) {
            musicConst.innerText += "*";
            musicConst.style.color = "#ff8888";
        }

        let ratingArrow = musicBlockData.appendChild(document.createElement("div"));
        ratingArrow.className = "img-song-arrow";
        ratingArrow.innerText = "▼";

        let muscRatingTxt = musicBlockData.appendChild(document.createElement("div"));
        muscRatingTxt.className = "img-song-txt";
        muscRatingTxt.innerText = "RATING";

        let musicRating = musicBlockData.appendChild(document.createElement("div"));
        musicRating.className = "img-song-const";
        console.log(songs[i].rating);
        musicRating.innerText = songs[i].rating.toFixed(2);

        // ジャケット部
        let musicBlockImg = musicBlockUpper.appendChild(document.createElement("div"));
        musicBlockImg.className = "img-song-block-img";

        let musicJacket = musicBlockImg.appendChild(document.createElement("img"));
        // let copyrightmode = document.getElementById("copyrightmode").checked;
        // musicJacket.src = copyrightmode ? "../commonassets/images/ban.png" : jacketURL;
        musicJacket.src = jacketURL;

        if (document.querySelector("#shownewemb").checked && newestDate.getTime() === new Date(songs[i].date).getTime()) {
            let musicNewest = musicBlockImg.appendChild(document.createElement("div"));
            musicNewest.className = "img-new-emblem";
            musicNewest.innerText = "NEW!!";
        }

        let musicDiffEmblem = musicBlockImg.appendChild(document.createElement("div"));
        musicDiffEmblem.className = "img-diff-emblem " + musicDiff;

        if (musicLamp !== "") {
            let musicLampTxt = musicBlockImg.appendChild(document.createElement("div"));
            musicLampTxt.className = "img-score-lamp";
            musicLampTxt.innerText = musicLamp;
            musicLampTxt.style.color = musicLampColor;
        }

        if (songs[i].is_fullbell) {
            let musicFullBell = musicBlockImg.appendChild(document.createElement("div"));
            musicFullBell.className = "img-score-bell";
            musicFullBell.innerText = "FULL BELL";
            musicFullBell.style.bottom = fbPosBottom;
        }

        let musicScoreRankTxt = musicBlockImg.appendChild(document.createElement("div"));
        musicScoreRankTxt.className = "img-score-rank";
        musicScoreRankTxt.innerText = musicScore.toLocaleString() + " ";
        let musicRankTxt = musicScoreRankTxt.appendChild(document.createElement("span"));
        musicRankTxt.innerText = musicScoreRank;
        musicRankTxt.style.color = rankColor;

        let musicBlockLower = musicBlock.appendChild(document.createElement("div"));
        musicBlockLower.className = "img-song-block-lower";

        let musicTitle = musicBlockLower.appendChild(document.createElement("div"));
        musicTitle.className = "img-song-block-lower-title";
        musicTitle.innerText = songs[i].title;

        area.appendChild(musicBlock);
    }
}

async function generate() {
    loadingState(true);

    // if (document.getElementById("osl_id").value === "") {
    //     alert("ユーザーIDが入力されていません。");
    //     loadingState(false);
    //     return;
    // }

    // ユーザープロフィール取得
    const userid = 0; // document.getElementById("osl_id").value;
    const userData = await parsePage(userid);

    if (!userData) {
        loadingState(false);
        return;
    }

    document.getElementById("pre-render-area").style.display = "block";

    // ユーザー名を保存
    localStorage.setItem("osl_id", userid);

    // 設定を保存
    localStorage.setItem("showprev", document.getElementById("showprev").checked);
    localStorage.setItem("showaddrate", document.getElementById("showaddrate").checked);
    localStorage.setItem("shownew", document.getElementById("shownew").checked);
    localStorage.setItem("shownewemb", document.getElementById("shownewemb").checked);
    // localStorage.setItem("copyrightmode", document.getElementById("copyrightmode").checked);

    // 「一部楽曲のスコア登録」を保存
    // Perfect Shining!! / Lunatic / 13+
    localStorage.setItem("fix_perfectshining", document.getElementById("fix_perfectshining").value);
    localStorage.setItem("fix_perfectshining_fc", document.getElementById("fix_perfectshining_fc").checked);
    localStorage.setItem("fix_perfectshining_ab", document.getElementById("fix_perfectshining_ab").checked);
    localStorage.setItem("fix_perfectshining_fb", document.getElementById("fix_perfectshining_fb").checked);

    // 描画
    // 初期化
    initializeArea();
    removeButtons();

    // // ヘッダ(著作権モード関連)
    // if (document.getElementById("copyrightmode").checked) {
    //     document.getElementById("img-logoimg").style.display = "none";
    //     document.getElementById("img-header-text").style.marginLeft = "0px";
    // } else {
    //     document.getElementById("img-logoimg").style.display = "block";
    //     document.getElementById("img-header-text").style.marginLeft = "20px";
    // }

    // 背景(著作権モード関連)
    // document.getElementById("pre-render-area").style.background = "white url(images/bg_mesh.png) repeat";
    // if (document.getElementById("copyrightmode").checked) {
    //     document.getElementById("pre-render-area").style.background = "linear-gradient(20deg, #fff 10%, #efefef 10%, #efefef 20%, #fff 20%, #fff 20%, #fff 30%, #efefef 30%, #efefef 40%, #fff 40%, #fff 40%, #fff 50%, #efefef 50%, #efefef 60%, #fff 60%, #fff 60%, #fff 70%, #efefef 70%, #efefef 80%, #fff 80%, #fff 80%, #fff 90%, #efefef 90%)";
    // }

    // 生成日時
    document.getElementById("img-datetime").style.width = "fit-content";
    const now = new Date();
    const generatedDatetime = toISOStringWithTimezone(now).replaceAll("-", "/").replaceAll("T", " ").substring(0, 19);
    document.getElementById("v-generate-dt").innerText = generatedDatetime;

    // 最新日時取得
    const newSongs = userData.new_records;
    const bestSongs = userData.records;

    let newestDateInitial = new Date("1970/01/01");
    let newestSongIdx = -1;
    for (let i = 0; i < newSongs.length; i++) {
        const date = new Date(newSongs[i].date);
        if (date > newestDateInitial) {
            newestDateInitial = date;
            newestSongIdx = i;
        }
    }
    for (let i = 0; i < bestSongs.length; i++) {
        const date = new Date(bestSongs[i].date);
        if (date > newestDateInitial) {
            newestDateInitial = date;
            newestSongIdx = i;
        }
    }

    // ベスト枠楽曲
    const bestSongsArea = document.getElementById("img-best-songs");
    renderSongsArea(bestSongsArea, bestSongs, newestDateInitial);

    const imgTitle = document.getElementById("img-title");
    imgTitle.innerText = "ベスト枠対象上位30曲";

    // 新曲枠楽曲
    if (document.getElementById("shownew").checked) {
        imgTitle.innerText = "ベスト枠・新曲枠対象楽曲";
        const newSongsArea = document.getElementById("img-new-songs");
        document.getElementById("img-new").style.display = "block";
        renderSongsArea(newSongsArea, newSongs, newestDateInitial);
    } else {
        document.getElementById("img-new").style.display = "none";
    }

    // 著作権モード対応タイトル
    // if (document.getElementById("copyrightmode").checked) imgTitle.innerText = "オンゲキ " + imgTitle.innerText;

    // レート計算
    // ベスト枠
    let bestRateSum = 0;
    for (let i = 0; i < bestSongs.length; i++) {
        bestRateSum += bestSongs[i].rating;
    }
    const bestRateAvg = (bestRateSum / 30).toFixed(4);

    // 新曲枠
    let newRateSum = 0;
    for (let i = 0; i < newSongs.length; i++) {
        newRateSum += newSongs[i].rating;
    }
    const newRateAvg = (newRateSum / 15).toFixed(4);

    // リセント枠
    const recentSongs = userData.rec_records;
    let recentRateSum = 0;
    for (let i = 0; i < recentSongs.length; i++) {
        recentRateSum += recentSongs[i].rating;
    }
    const recentRateAvg = (recentRateSum / 10).toFixed(4);

    // ベスト枠のうちLUNATICでない最高レーティング楽曲のレート
    let maxBestNonLunaticRate = 0;
    for (let i = 0; i < bestSongs.length; i++) {
        if (bestSongs[i].diff !== "lunatic") {
            maxBestNonLunaticRate = bestSongs[i].rating;
            break;
        }
    }

    // 新曲枠のうちLUNATICでない最高レーティング楽曲のレート
    let maxNewNonLunaticRate = 0;
    for (let i = 0; i < newSongs.length; i++) {
        if (newSongs[i].diff !== "lunatic") {
            maxNewNonLunaticRate = newSongs[i].rating;
            break;
        }
    }


    // プレイヤー名・レート
    document.getElementById("v-player-name").innerText = userData.player_name;
    document.getElementById("v-current-rating").innerText = userData.rating;
    document.getElementById("v-max-rating").innerText = userData.rating_max;
    document.getElementById("v-avg-rating").innerText = bestRateAvg;

    // レート追加情報
    if (document.getElementById("showaddrate").checked) {
        document.getElementById("img-rating-additional").style.display = "block";
        document.getElementById("v-new-rating").innerText = newRateAvg;
        document.getElementById("v-recent-rating").innerText = recentRateAvg;
        document.getElementById("v-reachable-rating").innerText = ((bestRateAvg * 30 + newRateAvg * 15 + Math.max(maxBestNonLunaticRate, maxNewNonLunaticRate) * 10) / 55).toFixed(4);
    } else {
        document.getElementById("img-rating-additional").style.display = "none";
    }

    if (document.getElementById("showprev").checked) {
        document.getElementById("generate-image").style.display = "block";
    } else {
        renderImage();
    }

    loadingState(false);
}

function download() {
    const now = new Date();
    const downloadable = document.createElement("a");
    downloadable.href = document.getElementById("result-img").src;
    downloadable.download = "best_" + String(Math.floor(now.getTime() / 1000)) + ".jpg";
    downloadable.click();
}

function share() {
    if (!navigator.canShare) { alert("このブラウザはシェアに対応していません！"); return; }
    const img = document.getElementById("result-img");
    const cBase = document.getElementById("imgcanvasbase");
    const canvas = cBase.appendChild(document.createElement("canvas"));
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.style.display = "none";
    const canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg");
    const blob = toBlob(dataURL);
    const imageFile = new File([blob], "image.jpg", {
        type: "image/jpeg",
    });
    navigator.share({
        files: [imageFile],
    }).then(() => {
        canvas.remove();
    }).catch((error) => {
        console.log(error);
        canvas.remove();
    });
}
