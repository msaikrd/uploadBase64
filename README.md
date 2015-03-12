uploadBase64 First Release
=======================================================

### Upload image file and convert Base64 with Jquery

uiConstruction.js is a plugin for jQuery that adds a beautiful and parameterized a form Under Construction. It works in all modern browsers including touch devices.


#### Usage

**HTML code:**
```html
<input id="input-file" type="file" multiple accept="image/*" name="file" />
```

**JavaScript code:**
**Standar usage:**
```javascript
$('#input-file').uploadBase64();
```
**Advance usage:**
```javascript
$('#input-file').uploadBase64({
  limit:5, // Limit to upload image (Default unlimit)
  maxsize:20024, // Max size in KB (Default unlimit)
  filetype:['jpg','jpeg','png'] // List of supported extensions (Default JPG, JPEG, PNG, GIF)
});
```

#### Requirements

jQuery 1.7 or later

#### Browser support
* Chrome, Safari 5, Firefox, IE 7 or later

#### License
Released under a non-commercial BSD license
