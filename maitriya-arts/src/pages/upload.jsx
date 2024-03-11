import { useState } from "react";

export default function Uploads() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const uploadImg = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/product/upload", {
      method: "POST",
      body: JSON.stringify({
        file: image,
        name
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log(image);
  };
  return (
    <div>
        <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])}/>
        <input type="text" name='name' onChange={(e)=>setName(e.target.value)} />
        <button onClick={uploadImg}>Upload</button>
    </div>
  );
}
