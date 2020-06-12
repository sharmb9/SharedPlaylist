  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  export const getHashParams = () => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    const e = r.exec(q);
    if (e) hashParams[e[1]] = decodeURIComponent(e[2]);
    return hashParams;
  };

  //   Gets current user_id
  export const getUserId = async (props) => {
    let userId;
    const params = getHashParams();
    let access_token = params.access_token;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    try {
      const res = await fetch(
        ("https://api.spotify.com/v1/me", { headers: headers })
      );
      const resJson = await res.json();
      userId = resJson.id;
      return userId;
    } catch (error) {
      console.log(error.message);
    }
  };

