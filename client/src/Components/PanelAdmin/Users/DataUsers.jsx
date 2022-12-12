import React, { useEffect } from "react";
import { getDataUser } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import TargetToDataUsers from "./TargetToDataUsers";

function DataUsers() {
  const dispatch = useDispatch();
  const { userDataInCheckout, userNotInData } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  return (
    <div>
      {userDataInCheckout.length > 0 ? (
        userDataInCheckout?.map((e) => <TargetToDataUsers key={e.id} {...e} />)
      ) : (
        <p>{userNotInData} </p>
      )}
    </div>
  );
}

export default DataUsers;
