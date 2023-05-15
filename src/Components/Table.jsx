import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import TableContent from "./TableContent";
function Table() {
  const baseUrl =
    "https://a8a3-2405-201-400c-488e-4447-2c3-5f26-dad6.ngrok-free.app";
  const [url, setUrl] = useState("");
  const [data, setData] = useState("null");
  const FetchDetails = async () => {
    const link = url;
    console.log("this is link", link);
    const payload = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    };

    const api =
      "https://a8a3-2405-201-400c-488e-4447-2c3-5f26-dad6.ngrok-free.app/api/v1/getImages"; //will change as pet ngrok
    const response = await axios.post(api, { url: url }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const HandleFavourite = async (e) => {
    if (e === true) {
      data.favourite = false;
    //   const api =
    //     "https://a8a3-2405-201-400c-488e-4447-2c3-5f26-dad6.ngrok-free.app/api/v1/delete/url"; //will change as pet ngrok
    //   const response = await axios.post(api, { url: url }).then((res) => {
    //     console.log(res.data);
    //   });
    } else {
      data.favourite = true;
    }
  };
  const fetchAll = async () => {
    const allSearch = baseUrl + "/api/v1/get/AllResults";
    // const result = await axios.get(allSearch).then((res) => {
    //   console.log("ye hai sara data:", res);
    // });
    axios({
      url: allSearch,
      method: "get",
      headers: {
        "X-Id-Token": "abc123abc123",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // fetchAll();
  }, [data]);
  return (
    <>
      <div id="wrapper">
        <div className="search">
          <input
            className="src"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search URl"
            type="search"
            name=""
            id=""
          />
          <button className="btn" onClick={FetchDetails}>
            Get Insights
          </button>
        </div>
        <div className="table">
          <div>
            <h1>This is our table</h1>
          </div>
          <div>
            <table>
              <tr>
                <th>Domain name</th>
                <th>Word Count</th>
                <th>favourite</th>
                <th>All Images</th>
                <th>Media-Links</th>
                <th>Actions</th>
              </tr>
              {data !== "null" ? (
                <>
                  <tr>
                    <td>{data.weburl}</td>
                    <td>{data.wordCount}</td>
                    <td>{data.favourite === true ? "true" : "false"}</td>
                    <td>
                      {data.image2.map((image, idx) => {
                        return (
                          <li>
                            <a target="_blank" href={image}>
                              {image}
                            </a>
                          </li>
                        );
                      })}
                    </td>
                    <td>
                      {data.MediaLinks.map((link, idx) => {
                        return (
                          <li>
                            <a target="_blank" href={link}>
                              {link}
                            </a>
                          </li>
                        );
                      })}
                    </td>
                    <td>
                      {data.favourite === true ? (
                        <button onClick={HandleFavourite(true)}>
                          Remove
                        </button>
                      ) : (
                        <button onClick={HandleFavourite(false
                        )}>
                          Add to Favourite
                        </button>
                      )}
                    </td>
                  </tr>
                </>
              ) : (
                ""
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
