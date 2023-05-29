const { google } = require("googleapis");
const fs = require("fs");
const credentials = require("../config/credentials.config");

class ggDriver {
  // contructor
  constructor() {
    this.credentials = credentials;
    this.refreshToken = credentials.refresh_token;
    this.oAuth2Client = new google.auth.OAuth2(
      this.credentials.client_id,
      this.credentials.client_secret,
      this.credentials.redirect_uris[0]
    );
    this.oAuth2Client.setCredentials({ refresh_token: this.refreshToken });
    this.drive = google.drive({ version: "v3", auth: this.oAuth2Client });
  }

  // upload image
  async uploadImage(imageFilePath, imageName) {
    try {
      const fileMetadata = {
        name: imageName || "example_image.jpg",
      };

      const imageReadStream = fs.createReadStream(imageFilePath);
      const media = {
        mimeType: "image/jpeg",
        body: imageReadStream,
      };

      const res = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id, webViewLink",
      });
      const fileId = res.data.id;

      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const webViewLink = res.data.webViewLink;
      const id = res.data.id;
      return {
        webViewLink,
        id
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // delete
  async deleteFile(fileId) {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });

      console.log("File deleted. File ID:", fileId);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = ggDriver;
