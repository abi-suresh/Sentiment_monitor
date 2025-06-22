export const downloadCSV = async (results) => {
  try {
    const response = await fetch("http://localhost:5000/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results }),
    });

    if (!response.ok) {
      throw new Error("Failed to export CSV");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create and auto-click the download link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tweets.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed", error);
    alert("Export failed: " + error.message);
  }
};
