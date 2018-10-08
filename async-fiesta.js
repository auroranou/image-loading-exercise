$(() => {
  const $bucket = $('.photo-bucket');
  const draw = img => $bucket.append(img);

  // Variable for tracking whether to keep loading images or not
  let loadingAllowed = true;

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id => `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`;

  const startLoading = () => {
    const batches = IMAGE_IDS.reduce((memo, curr, currIdx) => {
      if (currIdx % 5 === 0) {
        memo[currIdx / 5] = [curr];
      } else {
        const idx = Math.floor(currIdx / 5);
        memo[idx].push(curr);
      }
      return memo;
    }, []);

    batches.map(batch => processImageBatch(batch));
    console.log('Images loaded successfully');
  };

  const stopLoading = () => {
    // TODO: Implement me.
    console.log('Stop!');
    loadingAllowed = false;
  };

  function fetchImage(imgId) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = getImageUrl(imgId);
    });
  }

  async function processImageBatch(batch) {
    let batchPromises = batch.map(imgId => fetchImage(imgId));
    const results = await Promise.all(batchPromises);
    results.forEach(img => draw(img));
  }

  $('button.start').on('click', startLoading);
  $('button.stop').on('click', stopLoading);

});
