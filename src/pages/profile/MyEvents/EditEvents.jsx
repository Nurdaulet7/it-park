import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectCurrentEvent } from "../../../redux/slices/eventsSlice";

const EditEvents = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentEvent = useSelector(selectCurrentEvent);
  // const fetchStatus =

  return <div>EditEvents</div>;
};

export default EditEvents;
