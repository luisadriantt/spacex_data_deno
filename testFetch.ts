const postData = () => {
  const data: object = {
    name: "elon",
    job: "billionare",
  };

  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

postData();
