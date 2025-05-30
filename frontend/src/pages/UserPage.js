import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import AboutMe from '../components/AboutMe'
import Essentials from '../components/Essentials'
import Interests from '../components/Interests'
import LookingFor from '../components/LookingFor'
import Basics from '../components/Basics'
import MyAnthem from '../components/MyAnthem';
import axios from "axios";
import '../styles/Profile.css'

const MePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) return <div>{error.toString()}</div>

  return(
    <div>{data &&
      <div className="profile-base">
        <Header name={data.name} 
          pfp={data.pfp}/>

        <AboutMe title="My top songs"
          names={data.track_names} 
          artists={data.track_artists}/>

        <Essentials title="My top artists"
          list={data.artist_names.slice(0, 3)}/>

        <Interests title="Genres"
          list={data.genres}/>

        <LookingFor title="Uniqueness score"
          x={100 - data.popularity}/>

        <Basics title="Recommendations"
          artist={data.rec_artist} 
          track={data.rec_track}/>

        <MyAnthem title="My album"
          name={data.album} 
          pfp={data.album_pfp} 
          artist={data.album_artist}/>
      </div>  
    }
      
    </div>
  );
  
}
export default MePage;
