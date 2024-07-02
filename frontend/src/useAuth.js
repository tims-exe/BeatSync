import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
        console.log('done')
      })
      .catch((error) => {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
          } else if (error.request) {
            console.log('No response received:', error.request);
          } else {
            console.log('Error creating request:', error.message);
          }
      })
    }, [code])
}

export default useAuth