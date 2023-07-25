import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

/* 
body
margin: 0
padding: 0
bgcolor: white
flex
justify-center
font

app
box-shadow
border-radius

*/

const App = () => {
  const [tasks, setTasks] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const authToken = cookies.Token;
  const userEmail = cookies.Email;
  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const resJson = await res.json();
      setTasks(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white shadow-xl rounded-[10px] p-[10px] w-[80rem] mt-[50px]">
      {!authToken && <Auth />}
      {authToken && (
        <div className="">
          <ListHeader listName={"Tasks for the day"} getData={getData} />
          <p className="flex justify-end border-b-2 border-gray-100 py-2 text-sm font-medium">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
