import sharp from "sharp";
import AWS from "aws-sdk";
import imageType from "image-type";

export const STORAGE_URI = "https://tripnote.sgp1.cdn.digitaloceanspaces.com";
const BUCKET_NAME = "tripnote";

const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint.href,
  accessKeyId: "DO00Q8H3RJ4A822TFH3Z",
  secretAccessKey: "OLkWsPH849h4/ioNtZwwFwix6WjynQmmHIXbH50PqCE",
});

/**
 * File Name Generator
 */

export const generateFileNameM = (id: string) => {
  const filename = `${id}-M.jpg`;
  return filename;
};

export const generateFileNameL = (id: string) => {
  const filename = `${id}-L.jpg`;
  return filename;
};

export const generateFileNameS = (id: string) => {
  const filename = `${id}-S.jpg`;
  return filename;
};

export const generateImageUrl = (fileName: string) => {
  return `${STORAGE_URI}/${fileName}`;
};

export const generateImageUrls = (id: string) => {
  const imageM = generateImageUrl(generateFileNameM(id));
  const imageL = generateImageUrl(generateFileNameL(id));
  const imageS = generateImageUrl(generateFileNameS(id));
  return { imageM, imageS, imageL };
};

/**
 * Functions
 */

export const removeImage = async (url: string) => {
  if (!url) return;
  try {
    const fileName = url.replace(STORAGE_URI, "");
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    await s3.deleteObject(params).promise();
    return;
  } catch (err) {
    throw Error;
  }
};

export const removeImages = async (urls: string[]) => {
  if (urls.length < 1) return;
  try {
    const objects = urls.map((url) => ({ Key: url.replace(STORAGE_URI, "") }));
    const params = {
      Bucket: BUCKET_NAME,
      Delete: { Objects: objects },
    };

    await s3.deleteObjects(params).promise();
    return;
  } catch (err) {
    throw Error;
  }
};

const saveImage = async (fileName: string, buff: Buffer) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buff,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    await s3.putObject(params).promise();
    const url = generateImageUrl(fileName);

    return url;
  } catch (err) {
    throw err;
  }
};

const reduceSizeImage = async (
  imageBuff: Buffer,
  maxPixel: number,
  quality: number
) => {
  try {
    const imageFile = await imageType(imageBuff);

    const resized = await sharp(imageBuff)
      .withMetadata()
      .jpeg({ quality, progressive: true })
      // .webp({ quality })
      .resize({
        width: maxPixel,
        height: maxPixel,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();
    return resized;
  } catch (err) {
    throw JSON.stringify(err);
  }
};

export const saveImages = async (
  fileNames: string[],
  buffs: Buffer[],
  maxPixel?: number,
  quality?: number
) => {
  await Promise.all(
    fileNames.map(async (fileName, index) => {
      let buff = buffs[index];

      if (maxPixel && quality) {
        buff = await reduceSizeImage(buffs[index], maxPixel, quality);
      }
      await saveImage(fileName, buff);
      return;
    })
  );

  return fileNames.map((f) => generateImageUrl(f));
};

export const saveImagesMultiSize = async (ids: string[], base64s: string[]) => {
  console.log("creating buffs from base64");
  const buffs = base64s.map((base64) => Buffer.from(base64, "base64"));

  // for Size M
  console.log("saving imageM files");
  const fileNameMs = ids.map((id) => generateFileNameM(id));
  await saveImages(fileNameMs, buffs, 720, 90);
  // for Size S
  console.log("saving imageS files");
  const fileNameSs = ids.map((id) => generateFileNameS(id));
  await saveImages(fileNameSs, buffs, 10, 80);
  // for Size L
  console.log("saving imageL files");
  const fileNameLs = ids.map((id) => generateFileNameL(id));
  saveImages(fileNameLs, buffs, 1280, 95);

  return;
};
