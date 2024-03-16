import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (localStorage.getItem("allKeys"))
      setAllKeys(JSON.parse(localStorage.getItem("allKeys")));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("list"))
      setList(JSON.parse(localStorage.getItem("list")));
  }, []);

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

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <h1 className="mt-4 mb-2">TO DO LIST</h1>
        <input
          className="w-50"
          placeholder="Enter new task"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          value={newTask}
        />
        {newTask.length && allKeys.length ? (
          <Button
            className="w-50 p-3 mt-2 bg-warning border-warning text-black mb-2"
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
              allKeys.length
                ? "w-50 p-3 mt-2 bg-transparent border-warning text-muted mb-2"
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
                style={{ backgroundColor: "rgb(200,200,200)" }}
              >
                <input
                  className="align-self-start"
                  type="checkbox"
                  checked={i.done}
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
                    style={{ opacity: "0.7" }}
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
                      style={{ opacity: "0.7" }}
                    >
                      🛇
                    </Button>
                    <Button
                      className=" bg-transparent border-0 text-black  btn-sm"
                      style={{ opacity: "0.7" }}
                      disabled
                    >
                      ↔
                    </Button>
                    <Button
                      className=" bg-transparent border-danger text-black  btn-sm "
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
                      style={{ opacity: "0.7" }}
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
