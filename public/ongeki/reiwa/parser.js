// const URLbase_capture = "https://capturer.qmc.workers.dev/";
const allMusicsURL = "/public/ongeki/reiwa/ongeki_const_all.json";
var allMusics;

var testmode = false;
var modifiedScore = false;

function calculateRating(msConst, technicalScore) {
    // テクニカルスコアとレーティングから譜面のレート値を算出
    let musicRate;
    if (technicalScore >= 1007500) {
        musicRate = msConst + 2;
    } else if (technicalScore >= 1000000) {
        musicRate = msConst + 1.5 + Math.floor((technicalScore - 1e6) / 150) * 0.01;
    } else if (technicalScore >= 990000) {
        musicRate = msConst + 1 + Math.floor((technicalScore - 990000) / 200) * 0.01;
    } else if (technicalScore >= 970000) {
        musicRate = msConst + 0 + Math.floor((technicalScore - 970000) / 200) * 0.01;
    } else if (technicalScore >= 900000) {
        musicRate = msConst - 4 + Math.floor((technicalScore - 9e5) / 175) * 0.01;
    } else {
        // 計算不能。0として扱う
        musicRate = 0;
    }

    return musicRate;
}

function getLampDateData(doc) {
    const constdata = allMusics;
    let recordsdata = [];

    // レコード
    const recordsRaw = doc.getElementsByClassName("list")[0].children;

    for (let i = 0; i < recordsRaw.length; i++) {
        let musicData = recordsRaw[i].children;
        let technicalScore = parseInt(musicData[4].children[0].innerText);

        // テクニカルスコア0(=未プレイ)は飛ばす
        if (technicalScore === 0) continue;

        let pattern = /\/music\/[0-9]{1,}/g;
        let hreftxt = musicData[0].children[1].getAttribute("href");
        let musicID = parseInt(hreftxt.match(pattern)[0].slice(7));
        let musicConstData = constdata.filter(m => m.music_id === musicID)[0];

        // undefinedなら多分曲が存在していない
        if (musicConstData === undefined) continue;

        let difficulty = musicData[12].innerText.toLowerCase();
        let lamp = musicData[11].innerText;
        let date = musicData[8].innerText;

        recordsdata.push({
            id: musicID,
            diff: difficulty,
            lamp: lamp,
            date: date
        });
    }

    return recordsdata;
}

function parseScorePremium(table, lampDateData) {
    const constdata = allMusics;
    let r = [];

    for (let i = 0; i < table.length; i++) {
        let musicData = table[i].children;
        let technicalScore = parseInt(musicData[3].innerText.replace(/,/g, ""));

        let pattern = /\/music\/[0-9]{1,}/g;
        let hreftxt = musicData[0].getElementsByTagName("a")[0].getAttribute("href");
        let musicID = parseInt(hreftxt.match(pattern)[0].slice(7));
        let musicConstData = constdata.filter(m => m.music_id === musicID)[0];

        let title = musicData[0].getElementsByTagName("a")[0].innerText;

        if (musicConstData == undefined) continue;

        let artist = musicConstData["artist"];
        let difficultyRaw = musicData[1].innerText;

        let difficulty;
        switch (difficultyRaw) {
            case "Bas":
                difficulty = "basic";
                break;
            case "Adv":
                difficulty = "advanced";
                break;
            case "Exp":
                difficulty = "expert";
                break;
            case "Mas":
                difficulty = "master";
                break;
            case "Lun":
                difficulty = "lunatic";
                break;
        }

        // console.log(title, difficulty, musicID, technicalScore, artist);

        if (technicalScore === 0) break;

        let date = lampDateData.filter(m => m.id === musicID && m.diff === difficulty)[0].date;

        let lampTxt = lampDateData.filter(m => m.id === musicID && m.diff === difficulty)[0].lamp;
        let isFullBell = lampTxt.includes("FB");
        let isAllBreak = lampTxt.includes("AB");
        let isFullCombo = lampTxt.includes("FC");

        let msConst = Number(musicData[2].innerText.replace("?", ""));
        let msConstUnknown = musicData[2].innerText.includes("?");

        let musicRate = Number(musicData[4].innerText);

        // 誤差丸め込み
        musicRate = Math.round(musicRate * 100) / 100;

        // 一部楽曲のスコアがおかしいことに対する対応

        // Perfect Shining!! / Lunatic / 13+
        if (title === "Perfect Shining!!" && difficulty === "lunatic") {
            let tempScoreStr = document.querySelector("#fix_perfectshining").value;
            if (tempScoreStr !== "") {
                modifiedScore = true;
                let tempScore = parseInt(tempScoreStr);
                technicalScore = tempScore > 0 && tempScore <= 1010000 ? tempScore : technicalScore;
                isFullCombo = document.querySelector("#fix_perfectshining_fc").checked;
                isAllBreak = document.querySelector("#fix_perfectshining_ab").checked;
                isFullBell = document.querySelector("#fix_perfectshining_fb").checked;
                musicRate = calculateRating(msConst, technicalScore);
            }
        }

        let scoreRank = "D";
        if (technicalScore >= 500000) {
            scoreRank = "C";
        }
        if (technicalScore >= 600000) {
            scoreRank = "B";
        }
        if (technicalScore >= 700000) {
            scoreRank = "BB";
        }
        if (technicalScore >= 800000) {
            scoreRank = "BBB";
        }
        if (technicalScore >= 850000) {
            scoreRank = "A";
        }
        if (technicalScore >= 900000) {
            scoreRank = "AA";
        }
        if (technicalScore >= 940000) {
            scoreRank = "AAA";
        }
        if (technicalScore >= 970000) {
            scoreRank = "S";
        }
        if (technicalScore >= 990000) {
            scoreRank = "SS";
        }
        if (technicalScore >= 1000000) {
            scoreRank = "SSS";
        }
        if (technicalScore >= 1007500) {
            scoreRank = "SSS+";
        }

        r.push({
            title: title,
            artist: artist,
            id: musicID,
            score: technicalScore,
            is_fullbell: isFullBell,
            is_allbreak: isAllBreak,
            is_fullcombo: isFullCombo,
            rank: scoreRank,
            diff: difficulty,
            const: msConst,
            rating: musicRate,
            date: date,
            is_const_unknown: msConstUnknown
        });
    }

    return r;
}

// async function parsePage(userid) {
//     const urlTechnical = URLbase_capture + `?id=${userid}&type=normal`;
//     const urlRating = testmode ? "https://capturer-test.qmc.workers.dev" : URLbase_capture + `?id=${userid}&type=premium`;
//     const parser = new DOMParser();

//     const pageTechnical = await (await fetch(urlTechnical)).json();
//     const docTechnical = parser.parseFromString(pageTechnical.txt, "text/html");

//     // Premiumチェック
//     if (docTechnical.getElementsByClassName("net-premium").length === 0) {
//         alert("ユーザーはオンゲキ-NETのプレミアムコースに登録していません。（月をまたいだ場合は再度OngekiScoreLogにスコアを登録してください）");
//         return false;
//     }

//     const pageRating = await (await fetch(urlRating)).json();
//     const docRating = parser.parseFromString(pageRating.txt, "text/html");

//     const lampDateData = getLampDateData(docTechnical);

//     // プロフィール
//     const profiles = docTechnical.getElementsByClassName("table")[0].firstElementChild.children;
//     const playerName = profiles[0].children[1].innerText;
//     const ratings = profiles[4].children[1].innerText;
//     const current = ratings.slice(0, 5);
//     const best = ratings.slice(-6, -1);

//     const bestsTable = docRating.getElementById("rating_old").getElementsByClassName("table_wrap scalable")[0].getElementsByTagName("tbody")[0].children;
//     const bestsOutTable = docRating.getElementById("rating_old").getElementsByClassName("table_wrap scalable")[1].getElementsByTagName("tbody")[0].children;
//     const newsTable = docRating.getElementById("rating_new").getElementsByClassName("table_wrap scalable")[0].getElementsByTagName("tbody")[0].children;
//     const newsOutTable = docRating.getElementById("rating_new").getElementsByClassName("table_wrap scalable")[1].getElementsByTagName("tbody")[0].children;
//     const recentsTable = docRating.querySelector("#rating_recent > div:nth-child(4) > table:nth-child(1) > tbody:nth-child(3)").children; // いずれ統一

//     let recordsdata = parseScorePremium(bestsTable, lampDateData);
//     const outRecordsdata = parseScorePremium(bestsOutTable, lampDateData);
//     let newRecordsdata = parseScorePremium(newsTable, lampDateData);
//     const outNewRecordsdata = parseScorePremium(newsOutTable, lampDateData);
//     const recentRecordsdata = parseScorePremium(recentsTable, lampDateData);

//     // スコア手入力ある場合はべ枠と新曲枠の候補枠を結合してソートして上位だけに切りそろえる
//     if (modifiedScore) {
//         recordsdata = recordsdata.concat(outRecordsdata).sort((a, b) => b.rating - a.rating).slice(0, 30);
//         newRecordsdata = newRecordsdata.concat(outNewRecordsdata).sort((a, b) => b.rating - a.rating).slice(0, 15);
//     }

//     const reachable = docRating.querySelector("span.subtitle").innerText.slice(-6);

//     return {
//         player_name: playerName,
//         rating: current,
//         rating_max: best,
//         records: recordsdata,
//         new_records: newRecordsdata,
//         rec_records: recentRecordsdata,
//         reachable: reachable
//     }
// }

function selectFile(accept = null) {
    return new Promise(async resolve => {
        const fileInputElement = document.createElement('input');
        fileInputElement.type = 'file';
        if (accept) fileInputElement.accept = accept;
        fileInputElement.addEventListener('change', () => {
            const file = fileInputElement.files[0];
            resolve(file);
        });
        fileInputElement.addEventListener('cancel', () => {
            console.log('No file selected.');
            resolve(null);
        });
        fileInputElement.click();
    });
}

async function loadFile() {
    let file = await selectFile();
    let data;
    if (file == null) {
        data = {};
    } else {
        let text = await file.text();
        data = JSON.parse(text);
    }
    return data;
}

async function parsePage(userId) {
    function one(arr) {
        if (arr.length > 1) {
            return null;
        } else if (arr.length == 0) {
            return null;
        } else {
            return arr[0];
        }
    }
    
    function findSongId(song) {
        let m; 
        m = one(allMusics.filter(m => m.title === song.title && m.artist === song.artist));
        if (m) {
            // overwrite displayed song constant, if loading act 2 constants or etc.
            m[song.diff.toLowerCase()].const = song.const;
            return m.music_id;
        }
        
        m = one(allMusics.filter(m => m.title.substr(0, 5) === song.title.substr(0, 5)));
        if (m) {
            m[song.diff.toLowerCase()].const = song.const;
            return m.music_id;
        }
        
        // Couldn't find the song, just return a random id so the image formatting doesn't screw up
        console.log(`Couldn't find song id for song ${song.artist} - ${song.title}`);
        return 27;
    }

    function addSongId(songs) {
        for (let song of songs) {
            song.id = findSongId(song);
        }
        return songs;
    }
    
    const data = await loadFile();
    if (data.best == null) {        // failed to load file
        return false;
    }

    return {
        player_name: data.name,
        rating: data.rating,
        rating_max: data.ratingMax,
        records: addSongId(data.best),
        new_records: addSongId(data.news),
        rec_records: addSongId(data.recent),
        reachable: data.ratingMax,  // doesn't do anything
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    allMusics = await (await fetch(allMusicsURL)).json();
});