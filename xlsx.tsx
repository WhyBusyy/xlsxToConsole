import { useState } from "react";
import * as XLSX from "xlsx";

// 엑셀 등록
const [isLoading, setIsLoading] = useState(false);

const returnExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setIsLoading(true);
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // 첫 번째 시트 데이터 가져오기
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);
    const requestData = {
      items: excelData,
    };

    const response = await fetch("/excel", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    console.log("엑셀 업로드 결과:", result);

    if (response.ok) {
      alert("엑셀 파일이 성공적으로 업로드되었습니다.");
    } else {
      alert("엑셀 파일 업로드에 실패했습니다.");
    }
  } catch (error) {
    console.error("엑셀 파일 처리 중 오류:", error);
    alert("엑셀 파일 처리 중 오류가 발생했습니다.");
  } finally {
    setIsLoading(false);
  }
};
