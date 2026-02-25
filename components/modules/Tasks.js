import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
function Tasks({ data, next, prev, fetchTodos }) {
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/auth/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchTodos();
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  console.log({ data });
  return (
    <div className="tasks">
      {loading ? (
        <>
          <BlogItem />
          <BlogItem />
        </>
      ) : (
        data?.map((task) => (
          <div className="tasks__card" key={task._id}>
            <span className={task.status}></span>
            <p>{task.title}</p>
            <RiMastodonLine />
            <h4>{task.description}</h4>
            <div>
              {prev && (
                <button
                  className="button-back"
                  onClick={() => {
                    changeStatus(task._id, prev);
                  }}
                >
                  <BiLeftArrow />
                  {prev}
                </button>
              )}
              {next && (
                <button
                  className="button-next"
                  onClick={() => {
                    changeStatus(task._id, next);
                  }}
                >
                  {next}
                  <BiRightArrow />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;

const BlogItem = (props) => (
  <ContentLoader viewBox="0 0 500 280" height={280} width={300} {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="392" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="339" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="374" height="20" />
  </ContentLoader>
);
