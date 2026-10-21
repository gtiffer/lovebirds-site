// Love Birds website settings. Fill in appStoreID once Love Birds is listed
// (the number in its App Store link: apps.apple.com/app/id1234567890).
const LOVEBIRDS = { appStoreID: "" };

(function () {
  // The same sky as the app, by the visitor's clock.
  const h = new Date().getHours();
  const sky = h >= 5 && h < 8 ? "dawn" : h >= 8 && h < 17 ? "day" : h >= 17 && h < 20 ? "dusk" : "night";
  // Swap only the file name, so the page works at any path (GitHub Pages serves it under /lovebirds-site/).
  document.querySelectorAll(".scene .bg").forEach((img) => { img.src = img.getAttribute("src").replace(/bg_home_\w+\.png$/, `bg_home_${sky}.png`); });

  // "Get Love Birds": the App Store once the app is listed; until then, a note.
  document.querySelectorAll("[data-get]").forEach((a) => {
    if (LOVEBIRDS.appStoreID) {
      a.href = `https://apps.apple.com/app/id${LOVEBIRDS.appStoreID}`;
      return;
    }
    a.addEventListener("click", (event) => {
      event.preventDefault();
      const soon = document.getElementById("soon");
      if (soon) soon.hidden = false;
    });
  });
})();
