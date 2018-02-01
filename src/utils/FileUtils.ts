import {FilePath} from "@ionic-native/file-path";
import {Entry, File} from "@ionic-native/file";
import * as path from "path";

export class FileUtils {
w
    constructor(private file: File, private filePath: FilePath) { }


    readAsDataURL(fileURL){
        return this.filePath.resolveNativePath(fileURL)
            .then(filePath=> this.handlePreviewAndResolveFileUrl(filePath));
            //.then(file => this.handleFileUpload(file));
    }


    private handlePreviewAndResolveFileUrl(filePath) {
        alert(filePath);
        return this.file.resolveLocalFilesystemUrl(filePath);
    }


    private handleFileUpload(file: Entry) {
        const dirname = path.dirname(file.nativeURL);
        const filename = file.name;

        return this.file.readAsDataURL(dirname, filename);
    }


}
