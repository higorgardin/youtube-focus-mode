/**
 * Tratamentos de inicialização
 */
function onInit() {
  const currentLocation = window.location;

  if (!currentLocation.host.includes("youtube")) {
    return;
  }

  checkContent();
}

async function checkContent() {
  chrome.storage.sync.get(["isEnabled"], async function (result) {
    if (Boolean(result.isEnabled)) {
      const tries = 200;
      let i = 0;

      const timer = (ms) => new Promise((res) => setTimeout(res, ms));

      while (i < tries) {
        // Remove o container de conteúdo
        const contentContainer = [
          ...document.getElementsByTagName("ytd-browse"),
        ];
        if (contentContainer && contentContainer.length) {
          contentContainer[0].style.visibility = "hidden";
        }

        // Remove o ícone de notificação
        const notificationButton = document.getElementsByTagName(
          "ytd-notification-topbar-button-renderer"
        );
        if (notificationButton && notificationButton.item(0)) {
          notificationButton.item(0).remove();
        }

        // Remove os botões laterais de navegação do modo tela cheia
        const buttonList = [
          ...document.getElementsByTagName("ytd-guide-entry-renderer"),
        ].filter((_, i) => i < 6);
        if (buttonList && buttonList.length) {
          buttonList.forEach((button) => {
            const hasElement = [...button.childNodes].some(
              (node) => node.href && node.href.includes("explore")
            );

            if (hasElement) {
              button.remove();
            }

            const isShorts = [...button.childNodes].some(
              (node) =>
                node.title && node.title.toLowerCase().includes("shorts")
            );

            if (isShorts) {
              button.remove();
            }
          });
        }

        // Remove os botões laterais de navegação do modo responsivo
        const buttonResponsiveList = [
          ...document.getElementsByTagName("ytd-mini-guide-entry-renderer"),
        ];
        if (buttonResponsiveList && buttonResponsiveList.length) {
          buttonResponsiveList.forEach((button) => {
            const hasElement = [...button.childNodes].some(
              (node) => node.href && node.href.includes("explore")
            );

            if (hasElement) {
              button.remove();
            }

            const isShorts = [...button.childNodes].some(
              (node) =>
                node.title && node.title.toLowerCase().includes("shorts")
            );

            if (isShorts) {
              button.remove();
            }
          });
        }

        await timer(5);

        // console.log(i);

        i++;
      }
    }
  });
}

onInit();
