$(() => {

  const $bucket = $('.photo-bucket');
  const draw = img => $bucket.append(img);

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id => `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`;

  const startLoading = () => {
    // TODO: Implement me.
    console.log('Start!');
  };

  const stopLoading = () => {
    // TODO: Implement me.
    console.log('Stop!');
  };

  $('button.start').on('click', startLoading);
  $('button.stop').on('click', stopLoading);

});
