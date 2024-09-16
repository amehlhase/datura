const nav = document.getElementById("nav");
let navHtml = `<ul><li><a href="/index.html">Start</a></li>
<li>Pflanzen <i class="fa fa-caret-down" aria-hidden="true"></i><i class="fa fa-caret-right" aria-hidden="true"></i>  
  <ul class="dropdown">
    <li><a href="/sites/all-plants.html">Alle Pflanzen</a></li>
    <li><a href="/sites/memory.html">Memory</a></li>
  </ul>
</li>
<li>About <i class="fa fa-caret-down" aria-hidden="true"></i><i class="fa fa-caret-right" aria-hidden="true"></i>
    <ul class="dropdown">
      <li><a href="/sites/about.html">Über diese Seite</a></li>
      <li><a href="/sites/contact.html">Kontakt</a></li>
      <li><a href="/sites/impressum.html">Impressum</a></li>
    </ul>
  </li>
</ul>`;

nav.insertAdjacentHTML("afterbegin", navHtml);
