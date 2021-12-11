import Axios from "axios";

let colors = {
  primary: "#4595A4",
  secondary: "#fff",
  transparent: "#ffffff00",
  blue: '#1c3941',
  disableButtonColor: "#ffffff85",
  err: "red",
  grey: "#1a1a1a",
  black: "black",
  translucentBG: "RGBA(0,0,0,0.07)",
  yellow: "#ffdd33",
};

function docHt() {
  return document.documentElement.clientHeight;
}
function docWd() {
  return document.documentElement.clientWidth;
};
function s3GlobalPath(name, type) {
  return `https://gsg-image-uploads.s3-accelerate.amazonaws.com/webcontent/${type}/${name}`;
}
function retrievePath() {
  return "https://gsg-image-uploads.s3.amazonaws.com/Homeplan/";
}

function get(key) {
  return localStorage.getItem(key);
}
function set(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(key, value);
}
function removeItem(key) {
  localStorage.removeItem(key);
}
function getURL(url) {
  return `https://api.getsetgo.fitness/base_ind/API/v1/${url}`;
}
function updateLoc(cb) {
  if (!(get("loc") && get("products") && get("region"))) {
    callAPI(
      "https://ipinfo.io/?token=22065f6a076bdf",
      "get",
      data => {
        changeLocation(data, cb);
      },
      err => {
        askLocation(err);
      }
    );
  } else {
    changeLocation({ data: JSON.parse(get("loc")) }, cb);
  }
  // changeLocation({});
}
function changeLocation(data, cb) {
  console.log("Data loc--->", data);
  data = data.data;
  let locObj = {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country
  };
  set("loc", locObj);
  let region = "row";
  let AE = [
    "AE",
    "OM",
    "QA",
    "SA",
    "BH",
    "KW",
    "TR",
    "SY",
    "IR",
    "EG",
    "IQ",
    "IL",
    "YE",
    "LB",
    "JO",
    "PS",
    "CY",
    "IR"
  ];
  let IN = ["IN", "NP", "LK", "BT", "MM", "PK", "BD", "AF", "MV"];
  if (AE.indexOf(locObj.country) >= 0) region = "ae";
  if (IN.indexOf(locObj.country) >= 0) region = "in";
  // let entryptedRegion = encryption(`${region}|${(new Date(Date.now()))}`);
  // console.log("entryptedRegion",`${region}|${(new Date(Date.now()))}`, entryptedRegion);
  // callAPI(`https://api.getsetgo.fitness/base_ind/API/v1/user_packages/${entryptedRegion}`,'get',(data)=>{console.log(data)}, (err)=>{console.log(err)});
  // set("products", config[region]);
  // set("offer", config["offer"]);
  set('region', region); console.log(region);
  cb(region);
}
function askLocation(err) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLoc);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function setLoc(position) {
  console.log(position);
}
// function encryption(dataToBeEncrypted) {
//     let encrypted_string = '';
//     encrypted_string = ((aes.encrypt(dataToBeEncrypted, secret_key, { iv: secret_iv}).toString()).replace(/\//g, '_')).replace(/\+/g, '-');
//     return encrypted_string;
//   }
function callAPI(url, type, success, error, data, key) {
  const interceptor = Axios.interceptors.request.use(function (config) {
    if (key) {
      config.headers["x-api-key"] = key;
    }
    else {
      config.headers["X-Auth-Token"] = get("GSG_client_auth");
    }
    return config;

  });
  switch (type) {
    case "get":
      Axios.get(url)
        .then(data => {
          success(data);
        })
        .catch(err => {
          error(err);
        });
      break;
    case "post":
      Axios.post(url, data)
        .then(data => {
          success(data);
        })
        .catch(err => {
          error(err);
        });
      break;
    default:
      return;
  }
  Axios.interceptors.request.eject(interceptor);//Cleanup up old config AV
}

function cmtoinch(n) {
  return n * 0.393701;
}
function inchtocm(n) {
  return n * 2.54;
}
function lbtokg(w) {
  return w * 0.453592;
}
function kgtolb(w) {
  return w * 2.20462;
}
function fttocm(w) {
  return w * 30.48;
}
function inchtoft(w) {
  return w / 12;
}
function cmtoft(w) {
  return w * 0.0328084;
}

function formatDate(dt) {
  //console.log("dt", dt);
  dt = new Date(dt);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
  return date ? `${date} ${months[dt.getMonth()]} ${dt.getFullYear()}` : '--'
}
function storeCompanyName() {
  let url_string = window.location.href
  let url = new URL(url_string);
  let urlSplit = url.hash.split('/');
  if (!get('company')) 
  {
    if (urlSplit.length >= 3 && urlSplit[1] === ('company'))
      {set('company', urlSplit[2])
      window.location.replace('/');
    }
  
    }
  
}
export {
  docHt,
  docWd,
  s3GlobalPath,
  colors,
  retrievePath,
  callAPI,
  get,
  set,
  getURL,
  updateLoc,
  removeItem,
  cmtoinch,
  inchtocm,
  lbtokg,
  kgtolb,
  fttocm,
  inchtoft,
  cmtoft,
  formatDate,
  storeCompanyName
};
