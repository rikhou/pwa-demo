const url = "./assets/mockData/data.json";

document.getElementById("getData").addEventListener("click", function () {
  fetch(url)
    .then((result) => result.json())
    .then((response) => {
      const ele = document.querySelector(".main");
      ele.textContent = response.data.data;
    });
});
