import './App.css';

function App() {


  return (
    <div className="app-container">

      <p className="app-container__title">Upload Your Image</p>
      <p className="app-container__subtitle">File should be jpg or png...</p>

          <form className="box has-advanced-upload" method="post" action="" encType="multipart/form-data">
            <div className="box__input">
              <input className="box__file" type="file" name="files[]" id="file" />
              <label htmlFor="file"><span className="box__dragndrop">Drag or drop file here</span>.</label>
              <button className="box__button" type="submit">Upload</button>
            </div>

            <div className="box__uploading">Uploading…</div>
            <div className="box__success">Done!</div>
            <div className="box__error">Error! <span></span>.</div>

          </form>

      <p className="app-container__subtitle_2">Or</p>

      <form className="box" method="post" action="" encType="multipart/form-data">
            <div className="box__input">
              <input className="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />

              <button className="box__button" type="submit">Upload</button>
            </div>

            <div className="box__uploading">Uploading…</div>
            <div className="box__success">Done!</div>
            <div className="box__error">Error! <span></span>.</div>
            
          </form>


    </div>
  );
}

export default App;
