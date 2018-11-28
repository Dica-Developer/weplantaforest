let createProfileImageUrl = function createProfileImageUrl(imageFileName, width, height) {
  if (imageFileName && imageFileName != 'default') {
    return 'http://localhost:8081/user/image/' + imageFileName + '/' + width + '/' + height + '?random=' + Math.random();
  } else {
    return '/assets/images/default_user.jpg';
  }
};

let createTeamImageUrl = function createTeamImageUrl(imageFileName, width, height) {
  if (imageFileName && imageFileName != 'default') {
    return 'http://localhost:8081/team/image/' + imageFileName + '/' + width + '/' + height + '?random=' + Math.random();
  } else {
    //TODO: add default team image
    return '/assets/images/default_user.jpg';
  }
}

export {
  createProfileImageUrl, createTeamImageUrl
}
