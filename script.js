const appData = {
  stories: [
    {
      id: "lightning-god",
      title: "Lightning God",
      blurb: "A prince trains beneath stormlight while ancient seams begin to tear.",
      description:
        "In the cliffside realm of Veil, Arlington wrestles with a dangerous Nightcrawler gift while his parents—Ali and Anakia—fight to teach him control before Phase Bleed consumes more than pride.",
      chapters: [
        {
          id: "lg-1",
          title: "Father and Son",
          text: "On a sunlit terrace, Ali drills Arlington in dagger work and phasing discipline while Anakia watches in quiet warning. Every strike becomes a lesson in restraint, and every vanished step leaves a mark in the world.",
          choices: [
            "Trust Ali's discipline",
            "Challenge every limit",
            "Ask Anakia for guidance",
          ],
        },
        {
          id: "lg-2",
          title: "Phase Bleed",
          text: "At dusk, Arlington senses a seam pulling deeper than line-of-sight. The ocean wind carries whispers through the lemon trees, promising power if he dares to step just once beyond the rule.",
          choices: [
            "Step to the seam's edge",
            "Report it immediately",
            "Keep the secret for now",
          ],
        },
        {
          id: "lg-3",
          title: "Lantern Oath",
          text: "Under glass lanterns, the family binds a new oath: strength without cruelty, speed without hunger. The vow feels fragile—but it is the first bridge between fear and mastery.",
          choices: [
            "Swear the oath openly",
            "Swear in silence",
            "Refuse until stronger",
          ],
        },
      ],
    },
    {
      id: "ashen-crown",
      title: "Ashen Crown",
      blurb: "A fallen dynasty seeks a relic before the night courts claim the throne.",
      description:
        "When the Ember Court collapses, an exiled heir and a reluctant sentinel hunt the Ashen Crown through shrine-cities, mausoleum libraries, and living firestorms.",
      chapters: [
        {
          id: "ac-1",
          title: "The Last Coronation",
          text: "The bells of Cindervault ring for a coronation that should never happen. Beneath black banners and drifting ash, the heir accepts a circlet that burns with inherited memory.",
          choices: ["Accept the omen", "Hide the crown", "Name a regent"],
        },
        {
          id: "ac-2",
          title: "Vault of Embers",
          text: "Deep under the basilica, maps ignite when spoken over. The sentinel warns that each lit path demands a sacrifice the mapkeeper does not choose.",
          choices: ["Read the living map", "Seal the vault", "Burn false routes"],
        },
        {
          id: "ac-3",
          title: "Night Court Bargain",
          text: "Moon judges gather at the obsidian stairs. They offer protection from civil war in exchange for one binding promise no crown can break twice.",
          choices: ["Take the bargain", "Demand better terms", "Walk away"],
        },
      ],
    },
  ],
};

const state = {
  activeStoryId: null,
  activeChapterId: null,
};

const views = {
  library: document.getElementById("libraryView"),
  story: document.getElementById("storyView"),
  reader: document.getElementById("readerView"),
};

const libraryGrid = document.getElementById("libraryGrid");
const storyTitle = document.getElementById("storyTitle");
const storyDescription = document.getElementById("storyDescription");
const chapterList = document.getElementById("chapterList");
const readerMeta = document.getElementById("readerMeta");
const readerChapterTitle = document.getElementById("readerChapterTitle");
const readerChapterText = document.getElementById("readerChapterText");
const choiceList = document.getElementById("choiceList");
const choiceMessage = document.getElementById("choiceMessage");

const backToLibraryBtn = document.getElementById("backToLibraryBtn");
const backToLibraryBtnSecondary = document.getElementById("backToLibraryBtnSecondary");
const backToStoryBtn = document.getElementById("backToStoryBtn");

function getStory(storyId) {
  return appData.stories.find((story) => story.id === storyId) || null;
}

function getChapter(story, chapterId) {
  return story.chapters.find((chapter) => chapter.id === chapterId) || null;
}

function showView(viewName) {
  Object.entries(views).forEach(([name, element]) => {
    element.classList.toggle("hidden", name !== viewName);
  });
}

function saveChoice(storyId, chapterId, choiceText) {
  const key = "veilChoices";
  const raw = localStorage.getItem(key);
  const savedChoices = raw ? JSON.parse(raw) : [];

  savedChoices.push({
    storyId,
    chapterId,
    choiceText,
    savedAt: new Date().toISOString(),
  });

  localStorage.setItem(key, JSON.stringify(savedChoices));
}

function renderLibrary() {
  libraryGrid.innerHTML = "";

  appData.stories.forEach((story) => {
    const card = document.createElement("article");
    card.className = "story-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${story.title}: open story details`);

    const cover = document.createElement("div");
    cover.className = "cover-placeholder";
    cover.textContent = "✦";

    const title = document.createElement("h3");
    title.textContent = story.title;

    const blurb = document.createElement("p");
    blurb.textContent = story.blurb;

    const readBtn = document.createElement("button");
    readBtn.type = "button";
    readBtn.className = "read-btn";
    readBtn.textContent = "Read";

    const openStory = () => openStoryDetail(story.id);

    card.addEventListener("click", openStory);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStory();
      }
    });

    readBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      openStory();
    });

    card.append(cover, title, blurb, readBtn);
    libraryGrid.append(card);
  });
}

function openStoryDetail(storyId) {
  const story = getStory(storyId);
  if (!story) return;

  state.activeStoryId = storyId;
  storyTitle.textContent = story.title;
  storyDescription.textContent = story.description;

  chapterList.innerHTML = "";

  story.chapters.forEach((chapter, index) => {
    const listItem = document.createElement("li");
    const chapterBtn = document.createElement("button");
    chapterBtn.type = "button";
    chapterBtn.className = "chapter-btn";
    chapterBtn.textContent = `Chapter ${index + 1}: ${chapter.title}`;
    chapterBtn.addEventListener("click", () => openReader(story.id, chapter.id));

    listItem.append(chapterBtn);
    chapterList.append(listItem);
  });

  showView("story");
}

function openReader(storyId, chapterId) {
  const story = getStory(storyId);
  if (!story) return;

  const chapter = getChapter(story, chapterId);
  if (!chapter) return;

  state.activeStoryId = storyId;
  state.activeChapterId = chapterId;

  readerMeta.textContent = `${story.title} · ${chapter.title}`;
  readerChapterTitle.textContent = chapter.title;
  readerChapterText.textContent = chapter.text;
  choiceMessage.textContent = "";

  choiceList.innerHTML = "";
  chapter.choices.forEach((choiceText) => {
    const listItem = document.createElement("li");
    const choiceBtn = document.createElement("button");
    choiceBtn.type = "button";
    choiceBtn.className = "choice-btn";
    choiceBtn.textContent = choiceText;

    choiceBtn.addEventListener("click", () => {
      saveChoice(storyId, chapterId, choiceText);
      choiceMessage.textContent = `Choice saved: ${choiceText}`;
    });

    listItem.append(choiceBtn);
    choiceList.append(listItem);
  });

  showView("reader");
}

backToLibraryBtn.addEventListener("click", () => showView("library"));
backToLibraryBtnSecondary.addEventListener("click", () => showView("library"));
backToStoryBtn.addEventListener("click", () => {
  if (state.activeStoryId) {
    openStoryDetail(state.activeStoryId);
  }
});

renderLibrary();
showView("library");
