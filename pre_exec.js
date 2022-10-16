async function checkContent() {
  var currentLocation = window.location;
  // console.log(currentLocation);

  chrome.storage.sync.get(["isEnabled"], async function (result) {
    if (Boolean(result.isEnabled)) {
      const tries = 200;
      let i = 0;

      const timer = (ms) => new Promise((res) => setTimeout(res, ms));

      while (i < tries) {
        const skeletonList = [
          ...document.getElementsByClassName(
            "rich-grid-media-skeleton mini-mode"
          ),
        ];
        skeletonList.forEach((elem) => (elem.style.visibility = "hidden"));

        const contentContainer = [
          ...document.getElementsByTagName("ytd-browse"),
        ];

        if (contentContainer && contentContainer.length) {
          contentContainer[0].style.visibility = "hidden";
        }

        await timer(5);

        // console.log(i);

        i++;
      }
    }
  });
}

checkContent();
