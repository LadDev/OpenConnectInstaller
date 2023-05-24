// import usFlag from "../assets/images/flags/us.jpg"
// import spain from "../assets/images/flags/spain.jpg"
// import germany from "../assets/images/flags/germany.jpg"
// import italy from "../assets/images/flags/italy.jpg"
// import russia from "../assets/images/flags/russia.jpg"

import flagus from "../assets/images/flags/us.svg";
import flagspain from "../assets/images/flags/spain.svg";
import flaggermany from "../assets/images/flags/germany.svg";
import flagitaly from "../assets/images/flags/italy.svg";
import flagrussia from "../assets/images/flags/russia.svg";
import flagchina from "../assets/images/flags/china.svg";
import flagfrench from "../assets/images/flags/french.svg";

const languages = {
  sp: {
    label: "Española",
    flag: flagspain,
  },
  gr: {
    label: "Deutsche",
    flag: flaggermany,
  },
  it: {
    label: "Italiana",
    flag: flagitaly,
  },
  rs: {
    label: "русский",
    flag: flagrussia,
  },
  en: {
    label: "English",
    flag: flagus,
  },
  cn: {
    label: "中国人",
    flag: flagchina,
  },
  fr: {
    label: "français",
    flag: flagfrench,
  },
}

export default languages
