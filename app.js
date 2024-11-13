import * as XLSX from "./node_modules/xlsx/xlsx.mjs";

document.getElementById("file").addEventListener("change", function(e) {
    let input = e.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: "binary" });
        workBook.SheetNames.forEach(function (sheetName) {
            console.log("SheetName: " + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            console.log(JSON.stringify(rows));
        });
    };
    reader.readAsArrayBuffer(input.files[0]);
});
