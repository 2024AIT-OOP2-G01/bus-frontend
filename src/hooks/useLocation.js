// 位置情報を取得するためのhooks

import { useState, useEffect } from "react";

const useLocation = () => {
  const [location, setLocation] = useState([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation([latitude, longitude]);
    }

    function errorCallback(error) {
      alert(`Error getting location: ${error.message}`);
    }
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation([latitude, longitude]);
    }

    function errorCallback(error) {
      alert(`Error getting location: ${error.message}`);
    }
  };

  return [location, {setLocation,getLocation}];
};

export default useLocation;
