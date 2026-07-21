# assets/renders

วางรูป breakdown ของแต่ละโปรเจกต์ไว้ที่นี่ (Wireframe / UV Layout / High Poly / Low Poly / Texture maps)

แนะนำตั้งชื่อไฟล์ตาม `id` โปรเจกต์ + ประเภท เช่น:

- `prop_wireframe.jpg`
- `prop_uv.jpg`
- `prop_highpoly.jpg`
- `prop_lowpoly.jpg`
- `prop_basecolor.jpg`, `prop_normal.jpg`, `prop_roughness.jpg`, `prop_metallic.jpg`, `prop_ao.jpg`

จากนั้นเพิ่ม object `renders` ในแต่ละรายการของ `PROJECTS` (`js/main.js`) เช่น:

```js
renders: {
  wireframe: 'assets/renders/prop_wireframe.jpg',
  uv: 'assets/renders/prop_uv.jpg',
  highPoly: 'assets/renders/prop_highpoly.jpg',
  lowPoly: 'assets/renders/prop_lowpoly.jpg',
  textures: [
    'assets/renders/prop_basecolor.jpg',
    'assets/renders/prop_normal.jpg',
    'assets/renders/prop_roughness.jpg',
    'assets/renders/prop_metallic.jpg',
    'assets/renders/prop_ao.jpg',
  ],
},
```

แล้วแก้ `renderBreakdownTab()` ให้ใช้ `<img src="...">` แทน placeholder `<div class="bp-placeholder">`
