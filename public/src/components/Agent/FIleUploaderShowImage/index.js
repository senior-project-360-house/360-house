import FileUploader from "react-firebase-file-uploader";
import React from "react";
import { withFirebase } from "../../../server/Firebase";
export default withFirebase(props => {
  const { setProgress, setIsUploading, setFiles, setFileURL } = props;
  return (
    <FileUploader
      name="house"
      multiple
      randomizeFilename
      accept="image/*"
      onChange={event => {
        const files = event.target.files;
        console.log(event);
        setFiles(Object.values(files));
      }}
      onUploadStart={() => {
        setProgress(0);
        setIsUploading(true);
      }}
      onUploadError={error => {
        setIsUploading(false);
        console.log(error);
      }}
      onUploadSuccess={filename => {
        console.log(filename);
      }}
      onProgress={progress => setProgress(progress)}
    />
  );
});
