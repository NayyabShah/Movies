// console.log("data", data);
// var movies = data.results;
// console.log("movies", movies);

function getData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer MTEyNmMzYTYtY2Q2OS00MzM5LWE3MDEtNDliM2YxMjA2Mzhl"
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  fetch("https://api.m3o.com/v1/movie/Search?query=action", requestOptions)
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayData(data.results);
      generateSelectOptions(data.results);
      createEvents(data.results);
    })
    .catch((error) => console.log("error", error));
}
getData();

// function createTable(movies) {
//   var tbody = document.getElementById("tbody");
//   for (let i = 0; i < movies.length; i++) {
//     console.log(movies[i].original_title, movies[i].original_language);
//     var tr = document.createElement("tr");

//     var td1 = document.createElement("td");
//     td1.innerHTML = movies[i].original_title;
//     var td2 = document.createElement("td");
//     td2.innerHTML = movies[i].original_language;

//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tbody.appendChild(tr);
//   }
// }
// display data

const displayData = (movies) => {
  console.log("title", movies);
  const tbody = document.getElementById("table-data");
  tbody.innerHTML = "";
  // console.log("tbody", tbody);
  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.innerHTML = movie.title;
    td2.innerHTML = movie.original_language;
    td3.innerHTML = movie.vote_average;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
};

//   const button = document.getElementById("myEndBtn");
//   button.addEventListener("click", () => {
//     table.style.display = "none";
//   });
// };
// // create Events
const createEvents = (movies) => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  console.log("checkboxes", checkboxes);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      filterMovies(movies);
    });
  });
  const select = document.getElementById("language-select");
  select.addEventListener("change", () => {
    filterMovies(movies);
  });
};

// generating select
const generateSelectOptions = (movies) => {
  console.log("movies", movies);
  const language = movies.map((movie) => {
    return movie.original_language;
  });
  console.log("language", language);
  const myLanguage = [...new Set(language)];
  console.log("myLanguage", myLanguage);
  const select = document.getElementById("language-select");
  myLanguage.forEach((oneLanguage) => {
    const option = document.createElement("option");
    option.innerHTML = oneLanguage;
    option.setAttribute("value", oneLanguage);
    select.appendChild(option);
  });
};

// filter
const filterMovies = (movies) => {
  const select = document.getElementById("language-select").value;
  // console.log(select.value);
  // console.log("select", select);
  const checkboxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((input) => input.value);
  console.log("checkboxes", checkboxes);
  let range = {};

  if (checkboxes.length !== 0 && checkboxes.length !== 3) {
    range = calculateRanges(checkboxes);
  }

  const filteredMovies = movies.filter((movie) => {
    return (
      (movie.original_language === select || select === "all") &&
      (checkboxes.length === 0 ||
        checkboxes.length === 3 ||
        (movie.vote_average >= range.min && movie.vote_average <= range.max))
    );
  });
  console.log("filteredMovies", filteredMovies);
  displayData(filteredMovies);
};

const calculateRanges = (checkboxes) => {
  let max = 0;
  let min = 0;
  if (checkboxes.length === 2) {
    const sortedCheckboxes = checkboxes.sort();
    if (!sortedCheckboxes.includes("2")) {
      console.log("to be done!");
      max = ranges[sortedCheckboxes[1]].max;
      min = ranges[sortedCheckboxes[0]].min;
    } else {
      max = ranges[sortedCheckboxes[1]].max;
      min = ranges[sortedCheckboxes[0]].min;
    }
  } else {
    max = ranges[checkboxes[0]].max;
    min = ranges[checkboxes[0]].min;
  }
  console.log("max", max);
  console.log("min", min);
  const range = {
    min: min,
    max: max,
  };
  return range;
};

// const filterMoviesCheckboxes = (movies) => {
//   const checkboxes = [
//     ...document.querySelectorAll("input[type='checkbox']:checked"),
//   ];
//   console.log("checkboxes", checkboxes);

//   const mappedCheckboxes = checkboxes.map(
//     (checkbox) => checkbox.average_voting
//   );
//   console.log("mappedCheckboxes", mappedCheckboxes);

//   const filteredMovies = movies.filter((movie) => {
//     return mappedCheckboxes.includes(movie.average_voting);
//   });

//   console.log("filteredMovies", filteredMovies);
//   displayData(filteredMovies);
// };
