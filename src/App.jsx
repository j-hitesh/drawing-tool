import { Tldraw, useEditor } from 'tldraw'
import './app.css'

function App() {

  return (
    <div className='main-cont'>
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw>
          <ChildTldraw />
        </Tldraw>
      </div>
    </div>

  );
}

function ChildTldraw() {
  const editor = useEditor();

  const clickme = async () => {
    const result = Array.from(editor.getCurrentPageShapeIds());
    const data = await editor.getSvgString(result);
    // console.log(data);
    svgToPng(data.svg, data.width, data.height);
    // console.log(data.svg);
  };

  const svgToPng = (svg, width, height) => {
    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const urlimg = URL.createObjectURL(svgBlob);
    img.src = urlimg;
 
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, width, height);

      const pngUrl = canvas.toDataURL("image/png");
      console.log(pngUrl);
      downloadImage(pngUrl);
    };
  };

  const downloadImage = (pngUrl) => {
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'my-image.png';
    link.click();
  };
  return (
    <button onClick={clickme} className='btn'>Download Image</button>
  );
}
export default App
