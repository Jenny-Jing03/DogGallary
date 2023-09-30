import React, { useEffect, useState } from "react";
import { getAllBreeds } from "../utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Checkbox, Divider, Skeleton } from "antd";
import { List, Card } from "antd";

// set up a list of breeds with its sub-breeds from message
const dataManagement = (data) => {
  const allBreads = [];
  for (const [key, value] of Object.entries(data)) {
    if (value.length == 0) {
      allBreads.push(key);
    } else {
      for (const index in value) {
        allBreads.push(`${value[index]} ${key}`);
      }
    }
  }
  return allBreads;
};

const BreedSelector = ({ deleteImageByBreed, updateImageByBreed }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // load all breeds
  const loadData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getAllBreeds()
      .then((res) => {
        setData(dataManagement(res.message));
      })
      .catch(() => setLoading(true));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={loadData}
        hasMore={data.length < data.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={
          <Divider plain style={{ fontSize: "small", textAlign: "center" }}>
            nothing more
          </Divider>
        }>
        <List
          dataSource={data}
          style={{ display: "inline-grid" }}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                className="selector-checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    updateImageByBreed(item);
                  } else {
                    deleteImageByBreed(item);
                  }
                }}>{`${item}`}</Checkbox>
            </List.Item>
          )}></List>
      </InfiniteScroll>
    </div>
  );
};

export default BreedSelector;
