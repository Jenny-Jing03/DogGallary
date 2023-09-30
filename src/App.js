import { Layout } from "antd";
import { getRandomBreed, getByBreed } from "./utils";
import { useEffect, useState } from "react";
import { List, Card, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Skeleton } from "antd";
import BreedSelector from "./components/BreedSelector";
import BreedDisplay from "./components/BreedDisplay";
const { Header, Sider, Content } = Layout;

const getBreedFromImage = (url) => {
  const breedList = url.split("/")[4].split("-");
  if (breedList.length == 1) {
    return breedList[0];
  }
  const breed = breedList[1];
  const subBreed = breedList[0];
  return `${breed} ${subBreed}`;
};

function App() {
  const [checkStatus, setCheckStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState({});

  const updateImageByBreed = (breed) => {
    // get breed name with sub breed
    const breedList = breed.split(" ");
    let name;
    if (breedList.length > 1) {
      name = `${breedList[1]}/${breedList[0]}`;
    } else {
      name = breedList[0];
    }

    // regenare the image
    getByBreed(name).then((data) => {
      if (checkStatus) {
        const tmp = { ...imageUrl, [name]: data.message };
        console.log("update", tmp);
        setImageUrl(tmp);
      } else {
        setCheckStatus(true);
        const tmp = { [name]: data.message };
        setImageUrl(tmp);
      }
    });
  };

  const deleteImageByBreed = (breed) => {
    // get breed name with sub breed
    const breedList = breed.split(" ");
    let name;
    if (breedList.length > 1) {
      name = `${breedList[1]}/${breedList[0]}`;
    } else {
      name = breedList[0];
    }

    // delete url
    let tmp = { ...imageUrl };
    delete tmp[breed];
    console.log("tmp", tmp);
    if (Object.keys(tmp).length == 0) {
      setCheckStatus(false);
      updateRandomImage();
    } else {
      setImageUrl(tmp);
    }
  };

  // get 20 random image of dog by default
  const updateRandomImage = () => {
    getRandomBreed(20).then((data) => {
      setImageUrl({ random: data.message });
    });
  };

  useEffect(() => {
    updateRandomImage();
  }, []);

  return (
    <Layout>
      <Header className="header-backgroud">
        {<h1 className="header-text">Dog Gallary</h1>}
      </Header>
      <Layout theme="light">
        <Sider
          className="sider"
          style={{
            backgroundColor: "#dee9fc",
            width: "30%",
            maxwidth: "350px",
            padding: 15,
            margin: 0,
            height: 800,
            overflow: "auto",
          }}>
          <div className="sider-title">Breeds</div>
          <BreedSelector
            deleteImageByBreed={deleteImageByBreed}
            updateImageByBreed={updateImageByBreed}
          />
        </Sider>
        <Content
          className="content-background"
          style={{ padding: 20, margin: 0, height: 800, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={Object.keys(imageUrl).length}
            next={updateRandomImage}
            hasMore={imageUrl.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}>
            <BreedDisplay imageUrl={imageUrl} />
          </InfiniteScroll>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
