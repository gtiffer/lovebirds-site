// Love Birds website script. Settings come from src/data/site.ts through the page
// layout (window.LOVEBIRDS): appStoreID is filled in once the app is live, and
// provider is App Store Connect's campaign token.
(function () {
  const settings = window.LOVEBIRDS || { appStoreID: "", provider: "" };

  // The same sky as the app, by the visitor's clock.
  const h = new Date().getHours();
  const sky = h >= 5 && h < 8 ? "dawn" : h >= 8 && h < 17 ? "day" : h >= 17 && h < 20 ? "dusk" : "night";
  document.querySelectorAll(".scene .bg").forEach((img) => { img.src = img.getAttribute("src").replace(/bg_home_\w+\.png$/, `bg_home_${sky}.png`); });

  // "Get Love Birds": the App Store once the app is listed; until then, a note.
  // A button with data-campaign (blog posts) is tagged so App Store Connect can
  // count installs per post.
  document.querySelectorAll("[data-get]").forEach((a) => {
    if (settings.appStoreID) {
      const campaign = a.dataset.campaign;
      a.href = campaign && settings.provider
        ? `https://apps.apple.com/app/apple-store/id${settings.appStoreID}?pt=${settings.provider}&ct=${encodeURIComponent(campaign)}&mt=8`
        : `https://apps.apple.com/app/id${settings.appStoreID}`;
      return;
    }
    a.addEventListener("click", (event) => {
      event.preventDefault();
      const soon = a.parentElement.querySelector(".soon") || document.getElementById("soon");
      if (soon) soon.hidden = false;
    });
  });
})();
