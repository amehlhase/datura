const effectObserverConfig = {
  rootMargin: "-100px",
  threshold: 0,
};

const effectObserver = new IntersectionObserver(
  effectObserverCallback,
  effectObserverConfig
);

const effectElements = document.querySelectorAll(".animate__animated");

for (const element of effectElements) {
  effectObserver.observe(element);
}

function effectObserverCallback(entries, observer) {
  for (const { isIntersecting, target } of entries) {
    if (isIntersecting) {
      const effect = target.dataset.effect;

      target.classList.add(`animate__${effect}`);
      observer.unobserve(target);
    }
  }
}

let attempts = 0;

function initMemory() {
  document.querySelector(".new__game").addEventListener("click", restartMemory);

  document
    .querySelector(".memory__board")
    .addEventListener("click", handleBoardClick);
  startMemory();
}

initMemory();

function startMemory() {
  attempts = 0;
  displayCounter(attempts);
  const shuffledPlants = getShuffledPlants();
  displayPlants(shuffledPlants);
}

function restartMemory() {
  if (window.confirm("Neues Spiel starten?")) {
    startMemory();
  }
}

function getShuffledPlants() {
  const plants = [
    {
      name: "Alocasia",
      img: {
        src: "/images/plant_types/alocasia.jpg",
        alt: "Alocasia",
      },
      id: 1,
    },
    {
      name: "Birkenfeige",
      img: {
        src: "/images/plant_types/birkenfeige.jpg",
        alt: "Birkenfeige",
      },
      id: 2,
    },
    {
      name: "Bogenhanf",
      img: {
        src: "/images/plant_types/bogenhanf.jpg",
        alt: "Bogenhanf",
      },
      id: 3,
    },
    {
      name: "Calathea Insignis",
      img: {
        src: "/images/plant_types/calathea-insignis.jpg",
        alt: "Calathea Insignis",
      },
      id: 4,
    },
    {
      name: "Calathea Orbifolia",
      img: {
        src: "/images/plant_types/calathea-orbifolia.jpg",
        alt: "Calathea Orbifolia",
      },
      id: 5,
    },
    {
      name: "Calathea Ornata",
      img: {
        src: "/images/plant_types/calathea-ornata.jpg",
        alt: "Calathea Ornata",
      },
      id: 6,
    },
    {
      name: "Efeutute",
      img: {
        src: "/images/plant_types/efeutute.jpg",
        alt: "Efeutute",
      },
      id: 7,
    },
    {
      name: "Geldbaum",
      img: {
        src: "/images/plant_types/geldbaum.jpg",
        alt: "Geldbaum",
      },
      id: 8,
    },
    {
      name: "Goldfruchtpalme",
      img: {
        src: "/images/plant_types/goldfruchtpalme.jpg",
        alt: "Goldfruchtpalme",
      },
      id: 9,
    },
    {
      name: "Grünlilie",
      img: {
        src: "/images/plant_types/gruenlilie.jpg",
        alt: "Grünlilie",
      },
      id: 10,
    },
    {
      name: "Kaktus",
      img: {
        src: "/images/plant_types/kaktus.jpg",
        alt: "Kaktus",
      },
      id: 11,
    },
    {
      name: "Maranta Leuconeura",
      img: {
        src: "/images/plant_types/maranta.jpg",
        alt: "Maranta Leuconeura",
      },
      id: 12,
    },
    {
      name: "Monstera",
      img: {
        src: "/images/plant_types/monstera.jpg",
        alt: "Monstera",
      },
      id: 13,
    },
    {
      name: "Sukkulente",
      img: {
        src: "/images/plant_types/sukkulente.jpg",
        alt: "Sukkulente",
      },
      id: 14,
    },
    {
      name: "Ufopflanze",
      img: {
        src: "/images/plant_types/ufopflanze.jpg",
        alt: "Ufopflanze",
      },
      id: 15,
    },
  ];

  const duplicatedPlants = [...plants, ...plants];

  const shuffledPlants = _.shuffle(duplicatedPlants);

  return shuffledPlants;
}

function displayPlants(plants) {
  let html = "";
  for (const { img, id } of plants) {
    html += `
          <div class="plant" data-id="${id}">
          <img class="plant__img" src="${img.src}">
      </div>
      `;
  }

  document.querySelector(".memory__board").innerHTML = html;
}

function displayCounter(attemptsCount) {
  document.querySelector(".counter").innerHTML = `Versuche: ${attemptsCount}`;
}

function handleBoardClick(e) {
  const clickedElement = e.target;

  const clickedPlant = clickedElement.closest(".plant");

  if (!clickedPlant) {
    return;
  }

  clickedPlant.classList.add("plant--visible");

  const openPlants = document.querySelectorAll(
    ".plant--visible:not(.plant--found)"
  );
  if (openPlants.length < 2) {
    return;
  }
  attempts++;
  displayCounter(attempts);

  const plantsMatch = comparePlants(openPlants);

  const board = document.querySelector(".memory__board");

  if (plantsMatch) {
    deactivatePlants(openPlants);
  } else {
    board.classList.add("memory__board--inactive");
    window.setTimeout(hidePlants, 1000, openPlants, board);
  }

  checkGameEnd();
}

function comparePlants([firstPlant, secondPlant]) {
  return firstPlant.dataset.id === secondPlant.dataset.id;
}

function deactivatePlants(plants) {
  for (const plant of plants) {
    plant.classList.add("plant--found");
  }
}

function hidePlants(plants, board) {
  for (const plant of plants) {
    plant.classList.remove("plant--visible");
  }
  board.classList.remove("memory__board--inactive");
}

function checkGameEnd() {
  const unfinishedPlants = document.querySelectorAll(
    ".plant:not(.plant--found)"
  );

  if (unfinishedPlants.length === 0) {
    alert("Spiel gewonnen!");
    return true;
  } else {
    return false;
  }
}
