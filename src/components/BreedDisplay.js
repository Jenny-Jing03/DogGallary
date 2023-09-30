import React from "react";
import { Card } from "antd";

const getBreedFromImage = (url) => {
  const breedList = url.split("/")[4].split("-");
  if (breedList.length == 1) {
    return breedList[0];
  }
  const breed = breedList[1];
  const subBreed = breedList[0];
  return `${breed} ${subBreed}`;
};

const cardGenerator = (url) => {
  let cards = [];
  const keys = Object.keys(url); // get all breeds' name
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    for (let index = 0; index < url[key].length; index++) {
      let item = url[key][index];
      // generate a new card component
      cards.push(
        <div className="infinit-div-card">
          <Card
            title={getBreedFromImage(item)}
            bordered={false}
            style={{ width: "350px" }}>
            <img
              alt="placeholder"
              src={item}
              style={{
                maxHeight: "200px",
                maxWidth: "300px",
                width: "auto",
                height: "auto",
              }}
            />
          </Card>
        </div>
      );
    }
  }
  return cards;
};

const BreedDisplay = (images) => {
  return <div className="infinit-div">{cardGenerator(images.imageUrl)}</div>;
};

export default BreedDisplay;
