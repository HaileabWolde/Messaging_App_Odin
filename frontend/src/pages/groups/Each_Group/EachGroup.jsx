import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import SideBar from "../../Home/SideBar"
import Group_List from "../Group_List"
import Each_Group from "./Each_Group"
function EachGroup(){
     const { id } = useParams();
      const [users, setallUser] = useState([])
    const [allchats, setallChats] = useState([])
    const [groupname, setGroupName] = useState('')
    const [groupMembers, setGroupMemebers] = useState([])
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

    async function fetchallgroupMessages(){
        try{
            let response = await axios.get(`http://localhost:3000/allgroupconvo/${id}`, {
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })
          const {name, members, messages} =  response.data.singleConvo
          setGroupName(name)
          setGroupMemebers(members)
          setallChats(messages)
          
        }
        catch(error){
            console.log("error", error.response.data)
        }
    }

    fetchallfriends();
    fetchallgroupMessages()
  }, []);
    return (
        <div
          className="min-h-screen grid grid-cols-[100px_300px_1fr]"
        >
            <SideBar/>
            <Group_List
             users={users}
            />
            <Each_Group
            groupname={groupname}
            allchats={allchats}
            />
        </div>
    )
}

export default EachGroup;