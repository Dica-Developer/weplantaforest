export function getConfig() {
  var config = {
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('jwt')
    }
  };
  return config;
};
