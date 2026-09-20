/*

    HUMIVA
    Demo App

    "کار خوب را عادی کنیم"

*/


// --------------------------------
// DEMO DATA
// --------------------------------

let posts = [

  {
    user: "ناشناس",
    avatar: "🕊️",
    time: "۵ دقیقه پیش",

    text:
      "امروز دیدم همسایه‌ام چند کیسه خرید داشت. کمک کردم تا وسایلش را به خانه ببرد.",

    anonymous: true
  },

  {
    user: "سارا",
    avatar: "🌱",
    time: "۱۸ دقیقه پیش",

    text:
      "امروز قبل از اینکه وارد مترو شوم، اجازه دادم یک نفر که عجله داشت زودتر وارد شود.",

    anonymous: false
  },

  {
    user: "ناشناس",
    avatar: "🕊️",
    time: "۳۷ دقیقه پیش",

    text:
      "برای یک نفر که حال خوبی نداشت پیام فرستادم و فقط به او یادآوری کردم که تنها نیست.",

    anonymous: true
  },

  {
    user: "امیر",
    avatar: "☀️",
    time: "۱ ساعت پیش",

    text:
      "امروز کاری را که قرار بود فردا انجام بدهم، زودتر تمام کردم تا همکارم مجبور نباشد منتظر بماند.",

    anonymous: false
  }

];


const quotes = [

  {
    text:
      "هیچ مهربانی کوچکی بی‌اهمیت نیست.",

    source:
      "نقل به مضمون"
  },

  {
    text:
      "اگر می‌توانی کسی را خوشحال کنی، امروز انجامش بده.",

    source:
      "Humiva"
  },

  {
    text:
      "راه هزار کیلومتری با یک قدم شروع می‌شود.",

    source:
      "ضرب‌المثل چینی"
  },

  {
    text:
      "آنچه انجام می‌دهیم، بیش از آنچه می‌گوییم، جهان اطرافمان را شکل می‌دهد.",

    source:
      "Humiva"
  },

  {
    text:
      "یک لبخند ممکن است کوچک باشد، اما اثرش کوچک نیست.",

    source:
      "Humiva"
  }

];


// --------------------------------
// USER STATE
// --------------------------------

let user = {

  goodActions: 12,

  streak: 4,

  inspired: 7,

  dailyCompleted: false

};


// --------------------------------
// ELEMENTS
// --------------------------------

const feed =
  document.getElementById("feed");

const quotesList =
  document.getElementById("quotesList");

const toast =
  document.getElementById("toast");

const toastText =
  toast.querySelector("p");

const goodAction =
  document.getElementById("goodAction");

const charCount =
  document.getElementById("charCount");

const anonymousToggle =
  document.getElementById("anonymousToggle");

const publishButton =
  document.getElementById("publishButton");

const completeDaily =
  document.getElementById("completeDaily");


// --------------------------------
// PAGE NAVIGATION
// --------------------------------

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );

const pages =
  document.querySelectorAll(
    ".page"
  );


function openPage(pageId) {

  pages.forEach(page => {

    page.classList.remove("active");

  });


  const selected =
    document.getElementById(pageId);

  if (selected) {

    selected.classList.add("active");

  }


  navItems.forEach(item => {

    if (
      item.dataset.page === pageId
    ) {

      item.classList.add("active");

    } else {

      item.classList.remove("active");

    }

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


navItems.forEach(item => {

  item.addEventListener(
    "click",
    () => {

      openPage(
        item.dataset.page
      );

    }
  );

});


document
  .querySelectorAll("[data-page]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        openPage(
          button.dataset.page
        );

      }
    );

  });


// --------------------------------
// RENDER FEED
// --------------------------------

function renderFeed() {

  feed.innerHTML = "";


  posts.forEach(
    (post, index) => {

      const article =
        document.createElement("article");

      article.className =
        "post";


      article.innerHTML = `

        <div class="post-header">

          <div class="post-avatar">
            ${post.avatar}
          </div>

          <div>

            <div class="post-user">
              ${post.user}
            </div>

            <div class="post-time">
              ${post.time}
            </div>

          </div>

        </div>


        <p class="post-text">
          ${escapeHTML(post.text)}
        </p>


        <div class="post-actions">

          <button
            class="reaction"
            data-reaction="inspired"
            data-index="${index}"
          >
            🌱 الهام گرفتم
          </button>

          <button
            class="reaction"
            data-reaction="me"
            data-index="${index}"
          >
            🙌 من هم
          </button>

          <button
            class="reaction"
            data-reaction="thanks"
            data-index="${index}"
          >
            ✨ ارزشمند بود
          </button>

        </div>

      `;


      feed.appendChild(article);

    }
  );


  attachReactionEvents();

}


// --------------------------------
// REACTIONS
// --------------------------------

function attachReactionEvents() {

  const reactions =
    document.querySelectorAll(
      ".reaction"
    );


  reactions.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.reaction;


        if (type === "inspired") {

          user.inspired++;

          updateStats();

          showToast(
            "این ایده را برای خودت ذخیره کردی 🌱"
          );

        }


        if (type === "me") {

          showToast(
            "حالا یک کار کوچک برای خودت انتخاب کن 🙌"
          );

        }


        if (type === "thanks") {

          showToast(
            "قدردانی تو ثبت شد ✨"
          );

        }


        button.disabled = true;

        button.style.opacity = ".55";

      }
    );

  });

}


// --------------------------------
// ADD GOOD ACTION
// --------------------------------

goodAction.addEventListener(
  "input",
  () => {

    charCount.textContent =
      goodAction.value.length;

  }
);


publishButton.addEventListener(
  "click",
  publishGoodAction
);


function publishGoodAction() {

  const text =
    goodAction.value.trim();


  if (!text) {

    showToast(
      "اول بنویس چه کار خوبی انجام دادی 🌱"
    );

    goodAction.focus();

    return;

  }


  const isAnonymous =
    anonymousToggle.checked;


  const newPost = {

    user:
      isAnonymous
        ? "ناشناس"
        : "دوست هومیوا",

    avatar:
      isAnonymous
        ? "🕊️"
        : "🌱",

    time:
      "همین الان",

    text:
      text,

    anonymous:
      isAnonymous

  };


  posts.unshift(newPost);


  user.goodActions++;


  updateStats();


  goodAction.value = "";

  anonymousToggle.checked = false;

  charCount.textContent = "0";


  showToast(
    isAnonymous
      ? "کارت خوب به‌صورت ناشناس ثبت شد 🕊️"
      : "کارت خوب ثبت شد 🌱"
  );


  setTimeout(
    () => {

      openPage("homePage");

      renderFeed();

    },
    900
  );

}


// --------------------------------
// DAILY ACTION
// --------------------------------

completeDaily.addEventListener(
  "click",
  () => {

    if (user.dailyCompleted) {

      showToast(
        "این کار خوب امروز قبلاً ثبت شده 🌱"
      );

      return;

    }


    user.dailyCompleted = true;

    user.goodActions++;

    user.streak++;


    completeDaily.textContent =
      "امروز انجامش دادی ✓";


    completeDaily.style.opacity =
      ".65";


    updateStats();


    showToast(
      "آفرین. حالا گوشی را کنار بگذار و ادامه روزت را زندگی کن. 🌱"
    );

  }
);


// --------------------------------
// REFRESH FEED
// --------------------------------

document
  .getElementById("refreshFeed")
  .addEventListener(
    "click",
    () => {

      showToast(
        "کارهای خوب تازه شدند ✨"
      );

      renderFeed();

    }
  );


// --------------------------------
// QUOTES
// --------------------------------

function renderQuotes() {

  quotesList.innerHTML = "";


  quotes.forEach(
    quote => {

      const card =
        document.createElement("div");

      card.className =
        "quote-card";


      card.innerHTML = `

        <div class="quote-symbol">
          ❝
        </div>

        <p class="quote-text">
          ${escapeHTML(quote.text)}
        </p>

        <div class="quote-source">
          — ${escapeHTML(quote.source)}
        </div>

      `;


      quotesList.appendChild(card);

    }
  );

}


// --------------------------------
// STATS
// --------------------------------

function updateStats() {

  document
    .getElementById("goodCount")
    .textContent =
      user.goodActions;


  document
    .getElementById("streakCount")
    .textContent =
      user.streak;


  document
    .getElementById("impactCount")
    .textContent =
      user.inspired;


  document
    .getElementById("profileGood")
    .textContent =
      user.goodActions;

}


// --------------------------------
// TOAST
// --------------------------------

let toastTimer;


function showToast(message) {

  clearTimeout(toastTimer);


  toastText.textContent =
    message;


  toast.classList.add(
    "show"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2800
    );

}


// --------------------------------
// SECURITY
// --------------------------------

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


// --------------------------------
// INITIALIZE
// --------------------------------

renderFeed();

renderQuotes();

updateStats();


// --------------------------------
// DEMO WELCOME
// --------------------------------

setTimeout(
  () => {

    showToast(
      "به هومیوا خوش آمدی؛ کار خوب را عادی کنیم. 🌱"
    );

  },
  800
);
