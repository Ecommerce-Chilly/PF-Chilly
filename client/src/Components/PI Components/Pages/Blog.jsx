import React from "react";
import WorkInProgress from "../WorkInProgress/WorkInProgress";
// import axios from "axios";
// import { useSelector } from "react-redux";

function Blog() {
  // let user = useSelector((state) => state.userInfo);

  // let data = {
  //   service_id: "service_movy3fh",
  //   template_id: "template_bwd3tub",
  //   user_id: "9Ttq_y5p96nZfIkib",
  //   template_params: {
  //     email: userInfo.email,
  //   },
  // };

  // React.useEffect(async () => {
  //   await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
  // }, []);

  return (
    <div>
      <WorkInProgress />
    </div>
  );
}

export default Blog;
