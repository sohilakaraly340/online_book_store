const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../fireBase.config");
const { NotFoundError } = require("../Errors/NotFoundError");

const uploadImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const storageFB = getStorage();
  const files = req.files.map((file) => ({
    mimetype: file.mimetype,
    buffer: file.buffer,
  }));

  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  const uploadPromises = files.map(async (file) => {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}-${Math.random()
      .toString(36)
      .substring(7)}`; // Adding a random string to ensure unique filenames
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return await getDownloadURL(storageRef);
  });

  const imageUrls = await Promise.all(uploadPromises);
  req.body.images = imageUrls;
  next();
};

const deleteImages = async (images) => {
  const storageFB = getStorage();
  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  const checkAndDeleteImage = async (image) => {
    const storageRef = ref(storageFB, image);
    await getMetadata(storageRef);
    await deleteObject(storageRef);
    if (metadataError.code === "storage/object-not-found")
      throw new NotFoundError("Image does not exist: ${image}");
  };

  for (const image of images) {
    await checkAndDeleteImage(image);
  }
};
module.exports = {
  uploadImage,
  deleteImages,
};
