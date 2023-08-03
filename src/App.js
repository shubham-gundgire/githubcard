import { useRef, useState } from "react";
import style from "./css/app.module.css";
import axios from "axios";
function App() {
  const [isBox, setIsBox] = useState({ isData: false, data: {} });
  const [isError, setIsError] = useState({ isERR: false, error: "" });
  const inputBox = useRef();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isLoading, setIsLoading] = useState(false);

  const searchUser = async () => {
    setIsLoading(true)
    if (inputBox.current.value.length <= 0) {
      setIsError({ isERR: true, error: "Please enter username to search." });
      setIsBox({ isData: false, data: {} });
    } else {
      const data = await axios
        .get(`https://api.github.com/users/${inputBox.current.value}`)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          setIsError({
            isERR: true,
            error: "Invalid Username. Please enter valid Username.",
          });
          setIsBox({ isData: false, data: {} });
        });
      if (data) {
        setIsBox({ isData: true, data: data });
        setIsError({ isERR: false, error: "" });
      }

    }
    setIsLoading(false)
  };

  return (
    <>
      <div className={style.main}>
        <h1 className={style.gitlink}>Github</h1>
        <div className={style.box}>
          <div className={style.searchbar}>
            <input
              type="text"
              className={style.inputbox}
              ref={inputBox}
              placeholder="Enter Username To Search"
            />
            <button className={style.btn} onClick={searchUser}>
              Search
            </button>
            {isError.isERR ? (
              <div className={style.errorBox}>{isError.error}</div>
            ) : (
              <div></div>
            )}
          </div>
          {isLoading && !isBox.isData? (
            <div className={style.loadingio_spinner_rolling_k0oxecvt62}>
              <div className={style.ldio_14cmkjixb4oo}>
                <div></div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {isBox.isData ? (
            <div className={style.card}>
              <div className={style.avtarbox}>
                <img
                  src={`${isBox.data.avatar_url}`}
                  alt="Profile Picture"
                  className={style.img}
                />
              </div>
              <div className={style.infodiv}>
                <div className={style.infobox}>
                  <div className={style.title}>Username</div>
                  <div className={style.info}>{isBox.data.login}</div>
                </div>
                <div className={style.infobox}>
                  <div className={style.title}>Name</div>
                  <div className={style.info}>{isBox.data.name}</div>
                </div>
                <div className={style.infobox}>
                  <div className={style.title}>No. of public repos</div>
                  <div className={style.info}>{isBox.data.public_repos}</div>
                </div>
                <div className={style.infobox}>
                  <div className={style.title}>No. of public gists</div>
                  <div className={style.info}>{isBox.data.public_gists}</div>
                </div>
                <div className={style.infobox}>
                  <div className={style.title}>Profile created at</div>
                  <div className={style.info}>{`${new Date(
                    isBox.data.created_at
                  ).getDate()} ${
                    months[new Date(isBox.data.created_at).getMonth()]
                  } ${new Date(isBox.data.created_at).getFullYear()}`}</div>
                </div>
              </div>
            </div>
          ) : (
            <div>{isBox.isData}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
