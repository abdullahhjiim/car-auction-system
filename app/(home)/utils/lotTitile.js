const  lotTitle = (title) => {
  if (title === "odometer") {
    return "Odometer";
  } else if (title === "year") {
    return "Year";
  } else if (title === "vehicle_type_ids") {
    return "Vehicle Type";
  } else if (title === "fuel_type_ids") {
    return "Fuel Type";
  } else if (title === "drive_train_ids") {
    return "Drive Train";
  } else if (title === "cylinder_ids") {
    return "Cylinder";
  } else if (title === "body_style_ids") {
    return "Body style";
  } else if (title === "location_ids") {
    return "Location";
  } else if (title === "transmission_ids") {
    return "Transmission";
  } else if (title === "make_ids") {
    return "Make";
  } else if (title === "model_ids") {
    return "Model";
  } else if (title === "engine_type_ids") {
    return "Engine type";
  } else if (title === "sale_date") {
    return "Sale Date";
  }else if (title === "color_ids") {
    return "Color";
  }else {
    return "title";
  }
}

export default lotTitle;
