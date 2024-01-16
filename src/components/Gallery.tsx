import { useState, useEffect, Fragment } from "react";

import GalleryItem from "./GalleryItem";
import GalleryTitle from "./GalleryTitle";
import GalleryLink from "./GalleryLink";
import Popup from "./Popup";
import { getDatabase, ref, child, get } from "firebase/database";

interface Popup {
  title: string;
  image: string;
}

interface Picture {
  id: string;
  name: string;
  thumb: string;
  popup: string;
}

interface Category {
  name: string;
  pictures: Picture[];
}

function Gallery() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [categorizedPictures, setCategorizedPictures] = useState<Category[]>(
    [],
  );

  useEffect(() => {
    const database = getDatabase();
    const databasePath = "/inktober2018";

    get(child(ref(database), databasePath)).then((snapshot) => {
      const results = snapshot.val();
      const normalizedPictures = Object.keys(results)
        .sort()
        .reverse()
        .map((category) => {
          const categorizedResults = results[category];
          return {
            name: category,
            pictures: Object.keys(categorizedResults)
              .reverse()
              .map((id: string) => {
                const { name, thumb, popup } = categorizedResults[
                  id
                ] as Picture;
                return { id, name, thumb, popup };
              }),
          };
        });
      setCategorizedPictures(normalizedPictures);
    });
  }, []);

  function openPopup(title: string, image: string) {
    setPopup({ title, image });
  }

  function closePopup() {
    setPopup(null);
  }

  return (
    <>
      {popup && (
        <Popup title={popup.title} image={popup.image} close={closePopup} />
      )}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {categorizedPictures.map((category) => (
          <Fragment key={category.name}>
            <GalleryTitle text={category.name} />
            {category.pictures.map((picture) => {
              return (
                <GalleryItem
                  key={picture.id}
                  name={picture.name}
                  thumb={picture.thumb}
                  url={picture.popup}
                  onClick={openPopup}
                />
              );
            })}
          </Fragment>
        ))}
        <GalleryLink
          link="https://www.instagram.com/p/BnT1LhRgard/"
          url="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/ee774b75-e4fd-4928-8dd7-834bbefb5ee7/2018promptlist.jpeg?format=1000w"
        />
        <GalleryLink
          link="https://www.instagram.com/p/BnL2dxfg8Uq/"
          url="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/ee774b75-e4fd-4928-8dd7-834bbefb5ee7/2018promptlist.jpeg?format=1000w"
        />
      </div>
    </>
  );
}

export default Gallery;
