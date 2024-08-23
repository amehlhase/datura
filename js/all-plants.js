async function getPlants() {
  try {
    const response = await fetch("../files/pflanzen.json", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

getPlants().then((data) => {
  const target = document.getElementById("plantcards");
  data.forEach((data) => {
    target.insertAdjacentHTML(
      "afterbegin",
      `<article>
        <div class="article-wrapper">
          <figure>
            <img src="../images/plant_types/${data.Image}" alt="${data.Name}" />
          </figure>
          <div class="article-body">
            <h2>${data.Name}</h2>
            <h3>${data.NameLatin}</h3>
            <p>
               Standort:<br/>
               Wasserbedarf:<br/>
               Schwierigkeitsgrad:<br/>
               Giftig:<br/>
            </p>
            <a href="#" class="read-more">
              Read more <span class="sr-only">about this is some title</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </article>`
    );
  });
});
