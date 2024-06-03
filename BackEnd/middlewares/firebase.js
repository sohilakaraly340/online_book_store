const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../fireBase.config");

const uploadImage = async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error("Error occurred while uploading images:", err);
    res.status(500).json({
      status: "failed",
      message: "Image upload failed. Please try again later.",
    });
  }
};
const deleteImages = async (images) => {
  try {
    const storageFB = getStorage();
    await signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_USER,
      process.env.FIREBASE_AUTH
    );
    await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storageFB, image);
        try {
          await deleteObject(storageRef);
          console.log(`Successfully deleted: ${image}`);
        } catch (error) {
          if (error.code === "storage/object-not-found") {
            console.log(`Image not found: ${image}`);
          } else {
            console.log(`Error deleting ${image}:`, error.message);
          }
        }
      })
    );
  } catch (err) {
    console.log("error in deleted Image from firebase", err.message);
  }
};
module.exports = {
  uploadImage,
  deleteImages,
};
