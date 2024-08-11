const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

async function uploadImageToBlobStorage(context, filePath) {
    try {
        const connectionString = process.env.STORAGE_ACCOUNT_CONNECTION_STRING;
        const containerName = 'screenshots';  // Use the name of your existing container

        const blobName = path.basename(filePath);

        // Create a BlobServiceClient
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        // Get a reference to the existing container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Read the file content
        const content = fs.readFileSync(filePath);

        // Set the content type to image/jpg
        const options = {
            blobHTTPHeaders: {
                blobContentType: "image/jpg"
            }
        };

        // Upload data to the blob
        const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content), options);
        context.log.info(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

        // Get the URL of the uploaded blob
        const blobUrl = blockBlobClient.url;
        context.log.info(`Blob URL: ${blobUrl}`);

        return blobUrl;

    } catch (error) {
        context.log.error("Error uploading to Blob Storage:", error);
    }
}

module.exports = {
    uploadImageToBlobStorage
}
