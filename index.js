//teste de suporte
const registerServiceWorker = async () => {
  //
    if ("serviceWorker" in navigator) {
      
      try {
        const registration = await navigator.serviceWorker.register("./sw.js",);
    }catch (error) {
      console.log("Service worker registration failed:", error);
    }

  }
}