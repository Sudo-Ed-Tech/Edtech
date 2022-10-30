import React from "react";

function UserLogout() {
  localStorage.removeItem("studentLoginStatus");
  window.location.href = "/user-login";

  return (
    <div></div>
  )
}
export default UserLogout;
