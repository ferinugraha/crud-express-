import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ReadUser = () => {
    const {id} = useParams();
    const [users, setUser] = useState([]);

    useEffect(() => {
        readUsers();
    }, []);

    const readUsers = async() => {
        const response  = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(response.data);
    }


  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
        <Link to={`/`} className='button is-success'>Back</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>First Name</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>

            <tr key={users.id}>
                <td>{users.name}</td>
                <td>{users.first}</td>
                <td>{users.gender}</td>
            </tr>

            </tbody>
        </table>
    </div>
</div>
  )
}

export default ReadUser