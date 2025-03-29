const movie_container=document.querySelector('.movies-container');
const loadMoreButton = document.getElementById('load-more'); 
let currentPage = 1;
const moviesByGenre = [];

import { createCards, createCard } from "./search.js";

export function getIdFromWindowLocation(){
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  return urlParams.get("id");
}

function getLocalStorageData(jsonName){
const moviesArr= JSON.parse(window.localStorage.getItem(jsonName));
if(!moviesArr){return};
return moviesArr;
// console.log(typeof(moviesArr.results[0].genre_id));
}

function filterMoviesArr(){
  getLocalStorageData(movies);
 moviesByGenre = moviesArr.filter((movie) =>{
  movie.genre_id === Number(getIdFromWindowLocation());
});
return moviesByGenre;
}

// const moviesByGenreObj= {
//     "page": 1,
//     "results": [
//       {
//         "adult": false,
//         "backdrop_path": "/gsQJOfeW45KLiQeEIsom94QPQwb.jpg",
//         "genre_ids": [28, 53],
//         "id": 1125899,
//         "original_language": "en",
//         "original_title": "Cleaner",
//         "overview": "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
//         "popularity": 572.5151,
//         "poster_path": "/mwzDApMZAGeYCEVjhegKvCzDX0W.jpg",
//         "release_date": "2025-02-19",
//         "title": "Cleaner",
//         "video": false,
//         "vote_average": 6.495,
//         "vote_count": 98
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/8eifdha9GQeZAkexgtD45546XKx.jpg",
//         "genre_ids": [28, 53, 878],
//         "id": 822119,
//         "original_language": "en",
//         "original_title": "Captain America: Brave New World",
//         "overview": "After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
//         "popularity": 421.1844,
//         "poster_path": "/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
//         "release_date": "2025-02-12",
//         "title": "Captain America: Brave New World",
//         "video": false,
//         "vote_average": 6.111,
//         "vote_count": 1127
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/ibF5XVxTzf1ayzZrmiJqgeQ39Qk.jpg",
//         "genre_ids": [28, 10752],
//         "id": 1373723,
//         "original_language": "en",
//         "original_title": "The Codes of War",
//         "overview": "War stories about family, ethics and honor include the true story of two U.S. Marines who in a span of six seconds, must stand their ground to stop a suicide truck bomb, a Navy Corpsman who attempts to hold on to his humanity, and a WW2 soldier who gets separated from his squad and is forced to re-evaluate his code.",
//         "popularity": 422.4411,
//         "poster_path": "/oXeiQAfRK90pxxhP5iKPXQqAIN1.jpg",
//         "release_date": "2025-03-20",
//         "title": "The Codes of War",
//         "video": false,
//         "vote_average": 8.1,
//         "vote_count": 7
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/e807jDKiFcntZS32ze88X6I96OD.jpg",
//         "genre_ids": [16, 28],
//         "id": 1297763,
//         "original_language": "ja",
//         "original_title": "ニンジャバットマン対ヤクザリーグ",
//         "overview": "The Batman family has returned to the present to discover that Japan has disappeared, and a giant island - Hinomoto - is now in the sky over Gotham City.  At the top sit the Yakuza, a group of superpowered individuals who reign without honor or humanity and look suspiciously like the Justice League. Now, it’s up to Batman and his allies to save Gotham!",
//         "popularity": 210.1604,
//         "poster_path": "/sVVT6GYFErVv0Lcc9NvqCu0iOxO.jpg",
//         "release_date": "2025-03-17",
//         "title": "Batman Ninja vs. Yakuza League",
//         "video": false,
//         "vote_average": 6.7,
//         "vote_count": 78
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/deUWVEgNh2IGjShyymZhaYP40ye.jpg",
//         "genre_ids": [28, 12, 53],
//         "id": 1356039,
//         "original_language": "es",
//         "original_title": "Contraataque",
//         "overview": "When a hostage rescue mission creates a new enemy, Capt. Guerrero and his elite soldiers must face an ambush by a criminal group.",
//         "popularity": 180.8217,
//         "poster_path": "/lI2uFlSEkwXKljqiry7coaJ6wIS.jpg",
//         "release_date": "2025-02-27",
//         "title": "Counterattack",
//         "video": false,
//         "vote_average": 8.4,
//         "vote_count": 556
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/is9bmV6uYXu7LjZGJczxrjJDlv8.jpg",
//         "genre_ids": [28, 12],
//         "id": 1229730,
//         "original_language": "fr",
//         "original_title": "Carjackers",
//         "overview": "By day, they're invisible—valets, hostesses, and bartenders at a luxury hotel. By night, they're the Carjackers, a crew of skilled drivers who track and rob wealthy clients on the road. As they plan their ultimate heist, the hotel director hires a ruthless hitman, to stop them at all costs. With danger closing in, can Nora, Zoe, Steve, and Prestance pull off their biggest score yet?",
//         "popularity": 165.7281,
//         "poster_path": "/wbkPMTz2vVai7Ujyp0ag7AM9SrO.jpg",
//         "release_date": "2025-03-27",
//         "title": "Carjackers",
//         "video": false,
//         "vote_average": 7.1,
//         "vote_count": 6
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/AtciHGgpOU7ngsVhXbS2S5Spdlv.jpg",
//         "genre_ids": [28, 35],
//         "id": 1077782,
//         "original_language": "en",
//         "original_title": "Old Guy",
//         "overview": "Stuck at a dead end but vying for the love of spunky club manager Anata, aging contract killer Danny Dolinski is thrilled when The Company pulls him back in the field, but only to train Gen Z newcomer Wihlborg, a prodigy assassin with an attitude.",
//         "popularity": 140.9969,
//         "poster_path": "/ulVVfNY8bmy1RbHfY4zi3fOwGzh.jpg",
//         "release_date": "2024-12-13",
//         "title": "Old Guy",
//         "video": false,
//         "vote_average": 5.598,
//         "vote_count": 56
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/gFFqWsjLjRfipKzlzaYPD097FNC.jpg",
//         "genre_ids": [28, 80, 53],
//         "id": 1126166,
//         "original_language": "en",
//         "original_title": "Flight Risk",
//         "overview": "A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
//         "popularity": 147.8383,
//         "poster_path": "/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
//         "release_date": "2025-01-22",
//         "title": "Flight Risk",
//         "video": false,
//         "vote_average": 6.1,
//         "vote_count": 545
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/nYQJYdfoy7Tkx6bPzUpmCMmyJ4y.jpg",
//         "genre_ids": [53, 28],
//         "id": 1151470,
//         "original_language": "en",
//         "original_title": "The Vigilante",
//         "overview": "Returning from Afghanistan, Jessica, a Spec OPS Marine, finds herself in a war she never imagined and discovers middle America suburbia has changed when her thirteen year old sister, Aimee, is abducted by sex traffickers.",
//         "popularity": 123.3499,
//         "poster_path": "/xD9LpYZYmNch2EhHWIJXXFayENH.jpg",
//         "release_date": "2023-09-08",
//         "title": "The Vigilante",
//         "video": false,
//         "vote_average": 5.9,
//         "vote_count": 20
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/mhKQ5ntqlXyck0TWh1pCpn42aAx.jpg",
//         "genre_ids": [28, 80, 53],
//         "id": 1217379,
//         "original_language": "en",
//         "original_title": "Hellhound",
//         "overview": "Ready to leave his profession behind, Loreno, an assassin, lends help to an old friend, Cetan, and taking one last job in Thailand seeking out a local kingpin. A lapse in judgment means Loreno crosses paths with old colleague Paul.",
//         "popularity": 128.5324,
//         "poster_path": "/h1BtcTEk0pbe9XhbxrAp2oLKoWb.jpg",
//         "release_date": "2024-06-20",
//         "title": "Hellhound",
//         "video": false,
//         "vote_average": 6.625,
//         "vote_count": 28
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/2n7lYEeIbucsEQCswRcVB6ZYmMP.jpg",
//         "genre_ids": [878, 12, 28],
//         "id": 777443,
//         "original_language": "en",
//         "original_title": "The Electric State",
//         "overview": "An orphaned teen hits the road with a mysterious robot to find her long-lost brother, teaming up with a smuggler and his wisecracking sidekick.",
//         "popularity": 141.7648,
//         "poster_path": "/1TZ9Er1xEAKizzKKqYVgJIhNkN2.jpg",
//         "release_date": "2025-03-07",
//         "title": "The Electric State",
//         "video": false,
//         "vote_average": 6.594,
//         "vote_count": 809
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/hD2SN5bbqxk0kcRmsATJkXObgnZ.jpg",
//         "genre_ids": [28, 80, 14, 53],
//         "id": 1405338,
//         "original_language": "ja",
//         "original_title": "Demon City 鬼ゴロシ",
//         "overview": "Framed for his family's murder and left for dead, an ex-hitman will stop at nothing to exact revenge on the masked \"demons\" who have taken over his city.",
//         "popularity": 129.1596,
//         "poster_path": "/g5PqsFFrayyRL1Ldgib2lMYuJXg.jpg",
//         "release_date": "2025-02-26",
//         "title": "Demon City",
//         "video": false,
//         "vote_average": 6.883,
//         "vote_count": 175
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
//         "genre_ids": [28, 878, 35, 10751, 12, 14],
//         "id": 939243,
//         "original_language": "en",
//         "original_title": "Sonic the Hedgehog 3",
//         "overview": "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
//         "popularity": 142.4798,
//         "poster_path": "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
//         "release_date": "2024-12-19",
//         "title": "Sonic the Hedgehog 3",
//         "video": false,
//         "vote_average": 7.759,
//         "vote_count": 2286
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/pwfXx2O3eFXi5dtWCV5XJPQJgqN.jpg",
//         "genre_ids": [28, 53],
//         "id": 1143407,
//         "original_language": "hi",
//         "original_title": "स्काई फ़ोर्स",
//         "overview": "In the 1965 Indo-Pak War, India faces a devastating surprise attack. Wing Commander Ahuja leads a retaliatory strike, but Squadron Leader Vijaya goes missing after a heroic solo engagement against a superior enemy jet. Ahuja spends 23 years seeking the truth and uncovering a cover-up.",
//         "popularity": 113.1866,
//         "poster_path": "/f1KLUpaW7rbXhUm5SxG1lpPFFCJ.jpg",
//         "release_date": "2025-01-24",
//         "title": "Sky Force",
//         "video": false,
//         "vote_average": 7.472,
//         "vote_count": 18
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/7q5RVohE85yuQ9uZWXEXlHmfUOE.jpg",
//         "genre_ids": [28, 27],
//         "id": 1062276,
//         "original_language": "en",
//         "original_title": "Dark Match",
//         "overview": "A small-time wrestling company accepts a well-paying gig in a backwoods town only to learn, too late, that the community is run by a mysterious cult leader with devious plans for their match.",
//         "popularity": 99.4836,
//         "poster_path": "/6E6fBED3ix7FmrWUWZdeYG4vqK8.jpg",
//         "release_date": "2024-07-21",
//         "title": "Dark Match",
//         "video": false,
//         "vote_average": 4.8,
//         "vote_count": 10
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
//         "genre_ids": [28, 80, 53],
//         "id": 1197306,
//         "original_language": "en",
//         "original_title": "A Working Man",
//         "overview": "Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss's daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.",
//         "popularity": 158.6079,
//         "poster_path": "/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg",
//         "release_date": "2025-03-26",
//         "title": "A Working Man",
//         "video": false,
//         "vote_average": 6.7,
//         "vote_count": 32
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/bA4Io3xv46oEyP4O51uU0EKbluF.jpg",
//         "genre_ids": [28, 80],
//         "id": 995926,
//         "original_language": "ko",
//         "original_title": "베테랑 2",
//         "overview": "The veteran detective Seo Do-cheol and his team at Major Crimes, relentless in their pursuit of criminals, join forces with rookie cop Park Sun-woo to track down a serial killer who has plunged the nation into turmoil.",
//         "popularity": 95.8448,
//         "poster_path": "/gAtP0usArK5gVOBObnsENKLwML8.jpg",
//         "release_date": "2024-09-13",
//         "title": "I, the Executioner",
//         "video": false,
//         "vote_average": 7,
//         "vote_count": 45
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/7cNE2qydew1c8fqnlhWjkE3DHc2.jpg",
//         "genre_ids": [28, 18, 12, 10752],
//         "id": 927342,
//         "original_language": "ta",
//         "original_title": "அமரன்",
//         "overview": "A heroic true story of Major Mukund Varadarajan, an Indian Army officer who displayed extraordinary bravery during a counterterrorism mission in Kashmir’s Shopian district. The film captures his courage in protecting his nation and the devotion of his wife Indhu Rebecaa Varghese.",
//         "popularity": 92.4649,
//         "poster_path": "/eCB06m1KUGilEOlIzb40nkQhVY0.jpg",
//         "release_date": "2024-10-31",
//         "title": "Amaran",
//         "video": false,
//         "vote_average": 7.4,
//         "vote_count": 197
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
//         "genre_ids": [28, 12, 53],
//         "id": 539972,
//         "original_language": "en",
//         "original_title": "Kraven the Hunter",
//         "overview": "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
//         "popularity": 84.6957,
//         "poster_path": "/1GvBhRxY6MELDfxFrete6BNhBB5.jpg",
//         "release_date": "2024-12-11",
//         "title": "Kraven the Hunter",
//         "video": false,
//         "vote_average": 6.6,
//         "vote_count": 1488
//       },
//       {
//         "adult": false,
//         "backdrop_path": "/hlfu6g0h0D65SjkVhQBU20zePTl.jpg",
//         "genre_ids": [28, 12, 14, 16],
//         "id": 1357633,
//         "original_language": "ja",
//         "original_title": "俺だけレベルアップな件 -ReAwakening-",
//         "overview": "Over a decade after 'gates' connecting worlds appeared, awakening 'hunters' with superpowers, weakest hunter Sung Jinwoo encounters a double dungeon and accepts a mysterious quest, becoming the only one able to level up, changing his fate. A catch-up recap of the first season coupled with an exclusive sneak peek of the first two episodes of the highly anticipated second season in one momentous theatrical fan experience.",
//         "popularity": 73.4435,
//         "poster_path": "/dblIFen0bNZAq8icJXHwrjfymDW.jpg",
//         "release_date": "2024-11-26",
//         "title": "Solo Leveling -ReAwakening-",
//         "video": false,
//         "vote_average": 6.9,
//         "vote_count": 173
//       }
//     ],
//     "total_pages": 2172,
//     "total_results": 43440
//   }

  function mainGenrePageFunction(moviesData){
    filterMoviesArr();
    movie_container.innerHTML='';

    if(moviesData && moviesData.length>0){
        createCards(moviesData, movie_container);
    }else{
        movie_container.textContent="There are no available results. Please choose another genre";
    }
  }

export function loadMoreAddHide(results){
    if (results.page < results.total_pages) {
        loadMoreButton.style.display = 'block'; 
        loadMoreButton.addEventListener('click', () => {
            currentPage++;
            mainGenrePageFunction(currentPage);
            if (currentPage === results.total_pages) {
                loadMoreButton.style.display = 'none'; 
            }
        },{once: true});
    } else {
        loadMoreButton.style.display = 'none';
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    mainGenrePageFunction(moviesByGenre.results);
    loadMoreAddHide(moviesByGenre);
})