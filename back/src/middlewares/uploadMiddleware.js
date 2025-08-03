const multer = require("multer");
const path = require("path");

// Use memory storage to pass the buffer directly to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedVideoTypes = /mp4|avi|mov|wmv|flv|webm|mkv/;
  const allowedAudioTypes = /mp3|wav|ogg|aac|flac|m4a/;
  const allowedDocumentTypes = /pdf|doc|docx|txt|rtf/;
  const allowedArchiveTypes = /zip|rar|7z/;

  // Combine all allowed types
  const allowedTypes =
    /jpeg|jpg|png|gif|webp|mp4|avi|mov|wmv|flv|webm|mkv|mp3|wav|ogg|aac|flac|m4a|pdf|doc|docx|txt|rtf|zip|rar|7z/;

  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File type not allowed. Allowed types: Images (jpeg, jpg, png, gif, webp), Videos (mp4, avi, mov, wmv, flv, webm, mkv), Audio (mp3, wav, ogg, aac, flac, m4a), Documents (pdf, doc, docx, txt, rtf), Archives (zip, rar, 7z)"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max for videos and larger files
});

module.exports = upload;
