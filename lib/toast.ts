export const toast = {
  success: (message: string) => {
    const el = document.createElement("div");
    el.innerText = message;

    el.className =
      "fixed top-5 right-5 z-[9999] px-4 py-2 rounded-lg shadow-lg " +
      "bg-green-50 text-green-700 border border-green-200 " +
      "backdrop-blur-md transition-all" +
      "translate-x-0 animate-in slide-in-from-right";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 6000);
  },

  error: (message: string) => {
    const el = document.createElement("div");
    el.innerText = message;

    el.className =
      "fixed top-5 right-5 z-[9999] px-4 py-2 rounded-lg shadow-lg " +
      "bg-red-50 text-red-700 border border-red-200 " +
      "backdrop-blur-md transition-all" +
      "translate-x-0 animate-in slide-in-from-right";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 7000);
  },
};