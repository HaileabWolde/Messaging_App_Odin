import SideBar from "../Home/SideBar";
import Group_List from "./Group_List";
import Each_Group from "./Each_Group";
import { useEffect, useState } from "react";
import axios from "axios";
function Groups(){

    const [users, setallUser] = useState([])

    useEffect(() => {
    async function fetchallfriends() {
      try {
        const response = await axios.get("http://localhost:3000/allusers", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });


        setallUser(response.data.alluser || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchallfriends();
  }, []);
    return(

        <div
        className="min-h-screen grid grid-cols-[100px_300px_1fr]"

        >
            <SideBar/>
            <Group_List
            users={users}
            />
            <Each_Group/>
        </div>
    )
}

export default Groups;