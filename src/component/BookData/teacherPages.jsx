// يستورد كل الصور داخل مجلد Right TB تلقائياً
const images = import.meta.glob(
  "../../assets/imgs/pages/G5 TB/*.png",
  { eager: true }
);


export const teacherPages = Object.keys(images)
  .sort((a, b) => {
    const numA = Number(a.match(/(\d+)\.png$/)[1]);
    const numB = Number(b.match(/(\d+)\.png$/)[1]);
    return numA - numB;
  })
  .map((key) => images[key].default);


