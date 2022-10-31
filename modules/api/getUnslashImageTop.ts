import { createApi } from "unsplash-js";

// on your node server
console.log(
  "🚀 ~ file: getUnslashImageTop.ts ~ line 6 ~ process.env.UNSPLASH_ACCESS_KEY",
  process.env.UNSPLASH_ACCESS_KEY
);

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

export const getUnsplashImageTop = async (query: string): Promise<string> => {
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 1,
      orientation: "landscape",
    });
    console.log(
      "🚀 ~ file: getUnslashImageTop.ts ~ line 17 ~ getUnsplashImageTop ~ response",
      response
    );

    if (!response || !response.response) throw Error;

    return response.response.results[0].urls.small;
  } catch (error) {
    console.log(
      "🚀 ~ file: getUnslashImageTop.ts ~ line 22 ~ getUnsplashImageTop ~ error",
      error
    );
    return "";
  }
};
