'use strict';
const functions = require('firebase-functions');

const mkdirp = require('mkdirp');
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const crypto = require('crypto');
const mkdirpp = require('mkdirp-promise');
const vision = require('@google-cloud/vision');
// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 800;
const THUMB_MAX_WIDTH = 800;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';
const storage = admin.storage()
const { Storage } = require('@google-cloud/storage');



const VERY_UNLIKELY = 'VERY_UNLIKELY';
const UNLIKELY = 'UNLIKELY';
const BLURRED_FOLDER = 'blurred';

/**
 * When an image is uploaded in the Storage bucket the information and metadata of the image (the
 * output of ImageMagick's `identify -verbose`) is saved in the Realtime Database.
 */


exports.metadata = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const buckett = admin.storage().bucket();
  buckett.file(object.name).getMetadata().then((Metadata => {
    console.log(Metadata);
  }));

  // Create random filename with same extension as uploaded file.
  const randomFileName = crypto.randomBytes(20).toString('hex') + path.extname(filePath);
  const tempLocalFile = path.join(os.tmpdir(), randomFileName);

  // Exit if this is triggered on a file that is not an image.
  if (!object.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  let metadata;
  // Download file from bucket.
  const bucket = storage.bucket(object.bucket);
  await bucket.file(filePath).download({ destination: tempLocalFile });
  // Get Metadata from image.
  const result = await spawn('identify', ['-verbose', tempLocalFile], { capture: ['stdout', 'stderr'] });
  // Save metadata to realtime datastore.
  metadata = imageMagickOutputToObject(result.stdout);
  const safeKey = makeKeyFirebaseCompatible(filePath);
  await admin.database().ref(safeKey).set(metadata);
  console.log('Wrote to:', filePath, 'data:', metadata);
  // Cleanup temp directory after metadata is extracted
  // Remove the file from temp directory
  await fs.unlinkSync(tempLocalFile)
  return console.log('cleanup successful!');
});

/**
 * Convert the output of ImageMagick's `identify -verbose` command to a JavaScript Object.
 */
function imageMagickOutputToObject(output) {
  let previousLineIndent = 0;
  const lines = output.match(/[^\r\n]+/g);
  lines.shift(); // Remove First line
  lines.forEach((line, index) => {
    const currentIdent = line.search(/\S/);
    line = line.trim();
    if (line.endsWith(':')) {
      lines[index] = makeKeyFirebaseCompatible(`"${line.replace(':', '":{')}`);
    } else {
      const split = line.replace('"', '\\"').split(': ');
      split[0] = makeKeyFirebaseCompatible(split[0]);
      lines[index] = `"${split.join('":"')}",`;
    }
    if (currentIdent < previousLineIndent) {
      lines[index - 1] = lines[index - 1].substring(0, lines[index - 1].length - 1);
      lines[index] = new Array(1 + (previousLineIndent - currentIdent) / 2).join('}') + ',' + lines[index];
    }
    previousLineIndent = currentIdent;
  });
  output = lines.join('');
  output = '{' + output.substring(0, output.length - 1) + '}'; // remove trailing comma.
  output = JSON.parse(output);
  console.log('Metadata extracted from image', output);
  return output;
}

/**
 * Makes sure the given string does not contain characters that can't be used as Firebase
 * Realtime Database keys such as '.' and replaces them by '*'.
 */
function makeKeyFirebaseCompatible(key) {
  return key.replace(/\./g, '*');
}



/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we blur it using ImageMagick.
 */
exports.blurOffensiveImages = functions.storage.object().onFinalize(async (object) => {
  // Ignore things we've already blurred
  if (object.name.startsWith(`${BLURRED_FOLDER}/`)) {
    console.log(`Ignoring upload "${object.name}" because it was already blurred.`);
    return null;
  }

  // Check the image content using the Cloud Vision API.
  const visionClient = new vision.ImageAnnotatorClient();
  const data = await visionClient.safeSearchDetection(
    `gs://${object.bucket}/${object.name}`
  );

  const safeSearch = data[0].safeSearchAnnotation;
  console.log('SafeSearch results on image', safeSearch);

  // Tune these detection likelihoods to suit your app.
  // The current settings show the most strict configuration
  // Docs: https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
  if (
    safeSearch.adult == 'LIKELY' ||
    safeSearch.violence == 'LIKELY' ||
    safeSearch.adult == 'VERY_LIKELY' ||
    safeSearch.violence == 'VERY_LIKELY' ||
    safeSearch.racy == 'VERY_LIKELY' ||
    safeSearch.adult == 'POSSIBLE' ||
    safeSearch.violence == 'POSSIBLE'
  ) {
    console.log('Offensive image found. Blurring.');
    // return blurImage(object.name, object.bucket, object.metadata);
    const buckett = admin.storage().bucket();

    return buckett.file(object.name).delete();

  }

  return null;
});

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 */
async function blurImage(filePath, bucketName, metadata) {
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const bucket = admin.storage().bucket(bucketName);

  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  console.log('Temporary directory has been created', tempLocalDir);

  // Download file from bucket.
  await bucket.file(filePath).download({ destination: tempLocalFile });
  console.log('The file has been downloaded to', tempLocalFile);

  // Blur the image using ImageMagick.
  await spawn('convert', [tempLocalFile, '-channel', 'RGBA', '-blur', '0x8', tempLocalFile]);
  console.log('Blurred image created at', tempLocalFile);

  // Uploading the Blurred image.
  await bucket.upload(tempLocalFile, {
    // destination: `${BLURRED_FOLDER}/${filePath}`,
    // destination: `${filePath}`,
    metadata: { metadata: metadata }, // Keeping custom metadata.
  });
  console.log('Blurred image uploaded to Storage at', filePath);

  // Clean up the local file
  fs.unlinkSync(tempLocalFile);
  console.log('Deleted local file', filePath);
}

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image MIME type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    return console.log('Already a Thumbnail.');
  }

  // Cloud Storage files.
  const bucket = admin.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = {
    contentType: contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };

  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir)
  // Download file from bucket.
  await file.download({ destination: tempLocalFile });
  console.log('The file has been downloaded to', tempLocalFile);
  // Generate a thumbnail using ImageMagick.
  await spawn('convert', [tempLocalFile, '-resize', '400x400', '-background', 'white','-gravity','center','-extent','400x400', tempLocalThumbFile], { capture: ['stdout', 'stderr'] });
  // await spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], { capture: ['stdout', 'stderr'] });
  console.log('Thumbnail created at', tempLocalThumbFile);
  // Uploading the Thumbnail.
  await bucket.upload(tempLocalThumbFile, { destination: thumbFilePath, metadata: metadata });
  console.log('Thumbnail uploaded to Storage at', thumbFilePath);
  // Once the image has been uploaded delete the local files to free up disk space.
  fs.unlinkSync(tempLocalFile);
  fs.unlinkSync(tempLocalThumbFile);
  // Get the Signed URLs for the thumbnail and original image.
  const config = {
    action: 'read',
    expires: '03-01-2500',
  };
  const results = await Promise.all([
    thumbFile.getSignedUrl(config),
    file.getSignedUrl(config),
  ]);
  console.log('Got Signed URLs.');
  const thumbResult = results[0];
  const originalResult = results[1];
  const thumbFileUrl = thumbResult[0];
  const fileUrl = originalResult[0];
  // Add the URLs to the Database
  await admin.database().ref('images').push({ path: fileUrl, thumbnail: thumbFileUrl });
  return console.log('Thumbnail URLs saved to database.');
});

