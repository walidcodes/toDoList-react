import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

const initialKeys = [];
for (let k = 3; k < 10; k++) initialKeys.push(k);

const initialTasks = [
  {
    id: 0,
    task: "wake up",
    done: true,
  },
  {
    id: 1,
    task: "eat",
    done: false,
  },
  {
    id: 2,
    task: "sleep",
    done: false,
  },
];

function App() {
  const [newTask, setNewTask] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(null);
  const [allKeys, setAllKeys] = useState(initialKeys);
  const [list, setList] = useState(initialTasks);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("allKeys"))
      setAllKeys(JSON.parse(localStorage.getItem("allKeys")));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("list"))
      setList(JSON.parse(localStorage.getItem("list")));
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("darkMode"))
  //     setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
  // }, []);

  function handleOnChange(id, check) {
    setList(
      list.map((i) => {
        if (i.id === id) return { ...i, done: check };
        else return i;
      })
    );
    localStorage.setItem(
      "list",
      JSON.stringify(
        list.map((i) => {
          if (i.id === id) return { ...i, done: check };
          else return i;
        })
      )
    );
  }

  function handleOnClick(e) {
    if (e.target.id === "lightMode" && darkMode === true) {
      setDarkMode(false);
      // localStorage.setItem("darkMode", "false");
    } else if (e.target.id === "darkMode" && darkMode === false) {
      setDarkMode(true);
      // localStorage.setItem("darkMode", "true");
    }
  }

  darkMode
    ? (document.body.style.background = "rgb(50,50,50)")
    : (document.body.style.background = "lightgrey");

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <Container className="d-flex w-50 justify-content-between">
          <img
            width="6%"
            height="6%"
            id="lightMode"
            className="align-self-center pt-4"
            src={process.env.PUBLIC_URL + "/assets/icons/lightMode.png"}
            alt="dark mode icon"
            onClick={handleOnClick}
            style={
              darkMode
                ? { opacity: "0.2", filter: "invert(0.8)" }
                : { opacity: "1" }
            }
          ></img>
          <h1
            className="mt-4 mb-2"
            style={
              darkMode ? { color: "rgba(255,255,255,0.8)" } : { color: "black" }
            }
          >
            TO DO LIST
          </h1>
          <img
            width="6%"
            height="6%"
            id="darkMode"
            className="align-self-center pt-4"
            src={process.env.PUBLIC_URL + "/assets/icons/darkMode.png"}
            alt="dark mode icon"
            onClick={handleOnClick}
            style={
              darkMode
                ? { opacity: "1", filter: "invert(0.8)" }
                : { opacity: "0.2" }
            }
          ></img>
        </Container>
        <input
          type="text"
          className="w-50"
          placeholder="Enter new task"
          style={
            darkMode
              ? { background: "rgb(70,70,70)", color: "rgba(255,255,255,0.8)" }
              : { background: "rgb(230,230,230)" }
          }
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          value={newTask}
        />
        {newTask.length && allKeys.length ? (
          <Button
            className={
              darkMode
                ? "w-50 p-3 mt-2 bg-dark border-warning text-warning mb-2"
                : "w-50 p-3 mt-2 bg-warning border-warning text-black mb-2"
            }
            onClick={() => {
              setList(
                [...list].concat({
                  id: allKeys[0],
                  task: newTask,
                  done: false,
                })
              );
              localStorage.setItem(
                "list",
                JSON.stringify(
                  [...list].concat({
                    id: allKeys[0],
                    task: newTask,
                    done: false,
                  })
                )
              );

              setAllKeys([...allKeys].slice(1));
              localStorage.setItem(
                "allKeys",
                JSON.stringify([...allKeys].slice(1))
              );

              setNewTask("");
            }}
          >
            +<br />
            <b>ADD</b>
          </Button>
        ) : (
          <Button
            className={
              allKeys.length && darkMode
                ? "w-50 p-3 mt-2 bg-transparent border-warning text-secondary mb-2"
                : allKeys.length
                ? "w-50 p-3 mt-2 bg-transparent border-warning text-muted mb-2"
                : darkMode
                ? "w-50 p-3 mt-2 bg-transparent border-danger text-light mb-2"
                : "w-50 p-3 mt-2 bg-transparent border-danger text-muted mb-2"
            }
            disabled
          >
            <br />
            {allKeys.length ? "ADD" : "burn out"}
          </Button>
        )}
        <ListGroup className="w-50">
          {list.map((i) => {
            return (
              <ListGroup.Item
                key={i.id}
                className="d-flex flex-column-reverse flex-wrap pt-4"
                style={
                  darkMode
                    ? {
                        backgroundColor: "rgb(70,70,70)",
                        color: "rgb(190,190,190",
                        borderColor: "rgb(20,20,20)",
                      }
                    : { backgroundColor: "rgb(200,200,200)" }
                }
              >
                <Checkbox
                  className="align-self-start"
                  checked={i.done}
                  sx={
                    darkMode
                      ? {
                          color: "grey",
                          "&.Mui-checked": {
                            color: "#FFC107",
                          },
                        }
                      : {
                          color: "grey",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }
                  }
                  onChange={(e) => {
                    return handleOnChange(i.id, e.target.checked);
                  }}
                />
                <p className="pt-2 align-self-center">
                  {i.done ? (
                    <del>{i.task.toLowerCase()}</del>
                  ) : (
                    <b>{i.task.toUpperCase()}</b>
                  )}
                </p>
                {deletePrompt !== i.id ? (
                  <Button
                    className=" bg-transparent border-0 text-black btn-sm"
                    onClick={() => {
                      setDeletePrompt(i.id);
                    }}
                    style={darkMode ? { opacity: "0.6" } : { opacity: "0.7" }}
                  >
                    ⛔
                  </Button>
                ) : (
                  <div className="d-flex flex-row justify-content-evenly">
                    <Button
                      className=" bg-transparent border-white text-black  btn-sm"
                      onClick={() => {
                        setDeletePrompt(null);
                      }}
                      style={
                        darkMode
                          ? { opacity: "0.7", filter: "invert(1)" }
                          : { opacity: "0.7" }
                      }
                    >
                      🛇
                    </Button>
                    <Button
                      className=" bg-transparent border-0 text-black  btn-sm"
                      style={
                        darkMode
                          ? { opacity: "0.7", filter: "invert(1)" }
                          : { opacity: "0.7" }
                      }
                      disabled
                    >
                      ↔
                    </Button>
                    <Button
                      className={
                        darkMode
                          ? "bg-transparent border-primary  btn-sm"
                          : "bg-transparent border-danger  btn-sm"
                      }
                      onClick={() => {
                        setList(list.filter((k) => k.id !== i.id));
                        localStorage.setItem(
                          "list",
                          JSON.stringify(list.filter((k) => k.id !== i.id))
                        );

                        setAllKeys([...allKeys].concat([i.id]));
                        localStorage.setItem(
                          "allKeys",
                          JSON.stringify([...allKeys].concat([i.id]))
                        );
                      }}
                      style={
                        darkMode
                          ? {
                              opacity: "0.7",
                              filter: "invert(1)",
                            }
                          : { opacity: "0.7" }
                      }
                    >
                      🗑️
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export default App;
