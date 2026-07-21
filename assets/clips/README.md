# assets/clips

วางวิดีโอคลิปไว้ที่นี่ (mp4/webm) เช่น turntable render, gameplay clip, หรือ timelapse การปั้นโมเดล

ตัวอย่างการฝังคลิปในหน้าเว็บ (ใส่ใน `index.html` ตรง section ที่ต้องการ หรือใน gallery item):

```html
<video src="assets/clips/turntable_prop.mp4" autoplay loop muted playsinline></video>
```

ถ้าต้องการให้คลิปเป็นหนึ่งใน gallery item ให้เพิ่ม field `video` ใน `GALLERY_ITEMS`
(`js/main.js`) แล้วสลับ render เป็น `<video>` แทน `<img>` เมื่อ item นั้นมี `video` แทน `img`
