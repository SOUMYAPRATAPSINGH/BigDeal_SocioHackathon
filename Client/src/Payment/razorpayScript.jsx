// razorpayScript.jsx

export const loadRazorpayScript = (onScriptLoad) => {
  // Load Razorpay script asynchronously
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.onload = onScriptLoad;
  document.body.appendChild(script);
};

export const createRazorpayInstance = (options, onSuccess, onFailure) => {
  try {
    if (!window.Razorpay) {
      throw new Error("Razorpay script not loaded");
    }

    const razorpayInstance = new window.Razorpay(options);

    razorpayInstance.on("payment.success", onSuccess);
    razorpayInstance.on("payment.error", (response) => {
      console.error("Payment error:", response);
      onFailure();
    });

    return razorpayInstance;
  } catch (error) {
    console.error("Error creating Razorpay instance:", error);
    onFailure();
  }
};
