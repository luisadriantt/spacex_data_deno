const launchData = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/launches/latest");
  const data = await response.json();
  console.log(data);
};

launchData();
