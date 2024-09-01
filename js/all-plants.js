let allPlantcards = [];
let allCheckboxes = document.querySelectorAll("input[type=checkbox]");
let checked = {};

let counterElement = document.getElementById("plant-counter");
let plantCounter = 0;

/* LOAD PLANTS */

async function getPlants() {
  try {
    const response = await fetch("../files/pflanzen.json", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    let data = await response.json();

    plantCounter = data.length;
    displayPlantCounter(plantCounter);

    return data;
  } catch (error) {
    console.log(error);
  }
}

/* DISPLAY PLANTS */

getPlants().then((data) => {
  data.forEach((data) => {
    displayPlantcards(data);
  });
  allPlantcards = Array.from(document.querySelectorAll(".plantcard"));
});

function displayPlantcards(data) {
  plantcards.insertAdjacentHTML(
    "afterbegin",
    `<article class="plantcard ${getPlantLight(data.Light)} ${getPlantWater(
      data.WaterDemand
    )}wasser ${getPlantMaintenance(data.Maintenance)} ${getPlantToxic(
      data.Toxic
    )} ${getPlantAvailability(data.Stock)}">
      <div class="article-wrapper">
        <figure>
          <img src="../images/plant_types/${data.Image}" alt="${data.Name}" />
        </figure>
        <div class="article-body">
          <h2>${data.Name}</h2>
          <h3>${data.NameLatin}</h3>
          <p>
             Standort: ${getPlantLight(data.Light)}<br/>
             Wasserbedarf: ${getPlantWater(data.WaterDemand)}<br/>
             Schwierigkeitsgrad: ${getPlantMaintenanceText(
               data.Maintenance
             )}<br/>
             Giftig: ${getPlantToxic(data.Toxic)}<br/>
          </p>
          <a href="#" class="read-more">
            Jetzt kaufen <span class="sr-only">about this is some title</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
          <span class="out-of-stock">Aktuell nicht lieferbar :(</span>
        </div>
      </div>
    </article>`
  );
}

/* FILTER FUNCTIONS */

getChecked("checklight");
getChecked("checkwater");
getChecked("checktoxic");
getChecked("checkavailability");
getChecked("checkmaintenance");

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener("change", toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  setVisibility();
  displayPlantCounter(plantCounter);
}

function getChecked(name) {
  checked[name] = Array.from(
    document.querySelectorAll("input[name=" + name + "]:checked")
  ).map(function (el) {
    return el.id;
  });
}

function setVisibility() {
  plantCounter = 0;
  allPlantcards.map(function (el) {
    let checklight = checked.checklight.length
      ? _.intersection(Array.from(el.classList), checked.checklight).length
      : true;
    let checkwater = checked.checkwater.length
      ? _.intersection(Array.from(el.classList), checked.checkwater).length
      : true;
    let checktoxic = checked.checktoxic.length
      ? _.intersection(Array.from(el.classList), checked.checktoxic).length
      : true;
    let checkavailability = checked.checkavailability.length
      ? _.intersection(Array.from(el.classList), checked.checkavailability)
          .length
      : true;
    let checkmaintenance = checked.checkmaintenance.length
      ? _.intersection(Array.from(el.classList), checked.checkmaintenance)
          .length
      : true;

    if (
      checklight &&
      checkwater &&
      checktoxic &&
      checkavailability &&
      checkmaintenance
    ) {
      el.style.display = "block";
      plantCounter += 1;
    } else {
      el.style.display = "none";
    }
  });
}

/* PLANT COUNTER */

function displayPlantCounter(plantCounter) {
  counterElement.innerHTML = `${plantCounter} Pflanzen passen zu deinen aktuellen Suchkriterien`;
}

/* HELPER FUNCTIONS (DATA) */

function getPlantLight(val) {
  switch (val) {
    case 0:
      return `halbschattig`;
    case 1:
      return `hell`;
    case 2:
      return `sonnig`;
  }
}

function getPlantWater(val) {
  switch (val) {
    case 0:
      return `wenig`;
    case 1:
      return `mittel`;
    case 2:
      return `viel`;
  }
}

function getPlantMaintenanceText(val) {
  switch (val) {
    case 0:
      return `Ich bin sehr pflegeleicht`;
    case 1:
      return `Ich bin eine eher umgängliche Mitbewohnerin`;
    case 2:
      return `Ich brauche viel Aufmerksamkeit und gute Pflege`;
  }
}

function getPlantMaintenance(val) {
  switch (val) {
    case 0:
      return `pflegeleicht`;
    case 1:
      return `pflegemittel`;
    case 2:
      return `pflegehoch`;
  }
}

function getPlantToxic(val) {
  switch (val) {
    case true:
      return "giftig";
    case false:
      return "ungiftig";
  }
}

function getPlantAvailability(val) {
  switch (val) {
    case (val = 0):
      return "soldout";
    default:
      return "available";
  }
}
