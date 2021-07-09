import React from 'react'
import { Link } from 'react-router-dom';

const Student = (props) => {
    const usersObjects = props.usersObjects;
    const id = props.id;
    const profile = usersObjects[id].profile
    const pathname = "/students/" + usersObjects[id].profile.first_name + "-"+ usersObjects[id].profile.last_name;
    console.log(usersObjects[id].profile);
    return (
        <>
            <tr>
                <td>
                    {usersObjects && id && 
                        <img src = {usersObjects[id].profile.photoURL} style = {{width: "20%" ,borderRadius: "50%"}} />
                    }
                </td>
                <td>
                    {usersObjects && id && 
                        <Link to = {{
                            pathname: pathname,
                            state: {
                            profile: profile,
                            id: id,
                            
                        },
                        }} style = {{textDecoration: "none", color: "white"}}>
                            <b>
                            {usersObjects[id].profile.first_name}  {usersObjects[id].profile.last_name}
                            </b>
                         </Link>
                    }
                </td>
                
                <td>
                    {usersObjects && id &&
                        usersObjects[id].profile.fatherName
                    }
                </td>
                <td>
                    {usersObjects && id &&
                        usersObjects[id].profile.motherName
                    }
                </td>
                <td>
                    {usersObjects && id &&
                        usersObjects[id].profile.phone
                    }
                </td>
                <td>
                    {usersObjects && id &&
                        usersObjects[id].profile.email
                    }
                </td>
            </tr>
        </>
    )
}

export default Student
