$(() => {
  const $bucket = $('.photo-bucket');
  const draw = img => $bucket.append(img);

  // Variable for tracking whether to keep loading images or not
  let loadingAllowed = true;

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id => `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`;

  function startLoading() {
    loadingAllowed = true;

    const batchIterator = getImages();
    let res = batchIterator.next();

    while (!res.done) {
      if (loadingAllowed) {
        res.value.then(imagesToDraw => {
          imagesToDraw.map(i => draw(i));
        });

        res = batchIterator.next();
      }
    }
  }

  function getBatches() {
    return IMAGE_IDS.reduce((memo, curr, currIdx) => {
      if (currIdx % 5 === 0) {
        memo[currIdx / 5] = [curr];
      } else {
        const idx = Math.floor(currIdx / 5);
        memo[idx].push(curr);
      }
      return memo;
    }, []);
  }

  function* getImages() {
    const batches = getBatches();
    let i = 0;

    while (i < batches.length) {
      if (loadingAllowed) {
        const batch = batches[i];
        const batchPromises = batch.map(imgId => fetchImage(imgId));
        yield Promise.all(batchPromises);

        i += 1;
      }
    }
  }

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

  $('button.start').on('click', startLoading);
  $('button.stop').on('click', stopLoading);

});
