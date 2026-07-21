# assets/models

วางไฟล์ `.glb` (หรือ `.gltf` + textures) ของโมเดลจริงไว้ที่นี่

ตั้งชื่อไฟล์ตาม `id` ของแต่ละโปรเจกต์ใน `js/main.js` (ตัวแปร `PROJECTS`) เช่น:

- `prop.glb`
- `prop2.glb`
- `char.glb`

จากนั้นแก้ path ใน `PROJECTS` แต่ละรายการ จาก URL ของ CDN ตัวอย่าง ให้เป็น:

```js
model: 'assets/models/prop.glb',
```
