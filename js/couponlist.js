

const url = "https://sdwebau.shopainternal.com/json/aaa_productlist.json";
const hostUrl = "http://127.0.0.1:5500/";

async function fetchJsonData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const ul = document.getElementById("couponList");

    data.forEach(function (data) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const couponUrl = `${hostUrl}couponexpand.html?productName=${encodeURIComponent(
        data.ProductName
      )}`;

      if (data.ProductName.includes("/coupon")) {
        a.href = "http://127.0.0.1:5500/couponlist.html";
        a.textContent =
          data.ProductId + "-" + data.Advertiser + " - " + data.Headline;
      } else {
        a.href = couponUrl;
        a.textContent =
          data.ProductId + "-" + data.Advertiser + " - " + data.Headline;
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    document.getElementById("loading").style.display = "none";
    ul.style.display = "block";
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

fetchJsonData();