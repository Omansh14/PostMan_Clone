console.log("Postman");

// utility Function
// 1.utility function to Get Dom Element from String

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialise the Number of Parameter

let addedParamsCount = 0;

// doing the display of Paramter box is none  hide it initially

// let parameterBox = document.getElementById("ParameterBox")
// parameterBox.style.display='none';

// if the user click the params Box , hide the JASON Box

let paramsRadio = document.getElementById("ParamsRadio");
paramsRadio.addEventListener("click", () => {
  //   console.log("Params");
  document.getElementById("RequestJasonBox").style.display = "none";
  document.getElementById("ParameterBox").style.display = "block";
});

// if the user click on JASON Box , Hide the param Box

let jasonRadio = document.getElementById("JasonRadio");
jasonRadio.addEventListener("click", () => {
  //   console.log("Jason");

  document.getElementById("ParameterBox").style.display = "none";
  document.getElementById("RequestJasonBox").style.display = "block";
});

let addparam = document.getElementById("AddParam");
addparam.addEventListener("click", (e) => {
  //   console.log("add");
  e.preventDefault();
  let Params = document.getElementById("Params");
  let String = `
  <div class="form-row my-2">
    <label for="InputUrl" class="col-sm-2 col-form-label">Parameter-${
      addedParamsCount + 2
    }</label>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="ParameterKey${
          addedParamsCount + 2
        }" placeholder="Enter Parameter-${addedParamsCount + 2} key">
    </div>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="ParameterValue${
          addedParamsCount + 2
        }"
            placeholder="Enter Parameter-${addedParamsCount + 2} Value">
    </div>
    <button id="AddParam" class="btn btn-primary DeleteParam">-</button>
    </div>`;

  // convert the Element String to DOM node

  let paramElement = getElementFromString(String);
  Params.appendChild(paramElement);
  addedParamsCount++;

  // Adding an Event Lisner to remove the Paramater from the Dom

  let RemoveParams = document.getElementsByClassName("DeleteParam");
  for (items of RemoveParams) {
    items.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});

// If the user clicks on Submit Button

let Submit = document.getElementById("Submit");
Submit.addEventListener("click", (e) => {
  e.preventDefault();
  // Show Please Wait in the Response Box To request Patience from the user

  // document.getElementById("ResponseJasonText").value =
  //   "Please Wait  Fetching Your Response ....";

  document.getElementById("ResponsePrism").innerHTML =
    "Please Wait  Fetching Your Response ....";

  // Fetch all the values user has Entered value

  let url = document.getElementById("InputUrl").value;
  let RequestType = document.querySelector(
    "input[name = 'RequestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name = 'ContentType']:checked"
  ).value;

  //Log all the value in the console for Debugging
  // console.log("url is url" , url)
  // console.log("RequestType is " , RequestType)
  // console.log("contentType is " , contentType)

  // if User has used a Params Option insted of JASON , collect all the Parameter in an Object

  let data = {};
  if (contentType == "param") {
    for (let i = 0; i <= addedParamsCount; i++) {
      if (document.getElementById("ParameterKey" + (i + 1)) != undefined) {
        let Key = document.getElementById("ParameterKey" + (i + 1)).value;
        let Value = document.getElementById("ParameterValue" + (i + 1)).value;
        data[Key] = Value;
      }
    }

    data = JSON.stringify(data); // converting object data into String
  } else {
    data = document.getElementById("RequestJasonText").value;
  }

  //Log all the value in the console for Debugging
  console.log("url is url", url);
  console.log("RequestType is ", RequestType);
  console.log("contentType is ", contentType);
  console.log("Data is ", data);

  // if our Request Type is GET , invoke fetch api to create a Post Request

  if (RequestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((Response) => Response.text())
      .then((text) => {
        // document.getElementById("ResponseJasonText").value = text;
        document.getElementById("ResponsePrism").innerHTML = text;

      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((Response) => Response.text())
      .then((text) => {
        // document.getElementById("ResponseJasonText").value = text;
        document.getElementById("ResponsePrism").innerHTML = text;
      });
  }
});