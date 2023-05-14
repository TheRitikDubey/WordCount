import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import TableContent from "./TableContent";
function Table() {
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
      "https://288f-2405-201-400c-488e-8593-6027-4da4-7105.ngrok-free.app/api/v1/getImages"; //will change as pet ngrok
    const response = await axios.post(api, { url: url }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    console.log(data);
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
                      {data.image2.length>0 ? (
                        <tr>
                             <td>{data.weburl}</td>
                            <td>{data.wordCount}</td>
                            <td>{data.favourite === true? "true":"false"}</td>
                            <td>
                                {
                                    data.image2.map((image,idx) => {
                                       return <li><a target="_blank" href={image}>{image}</a></li>
                                    })
                                }
                            </td>
                            <td>videos</td>
                            <td>{data.favourite === true?<button>Remove</button> : <button>Add to Favourite</button>}</td>
                        </tr>
                      ) : (
                        ""
                      )}
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
